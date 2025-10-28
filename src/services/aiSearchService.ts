import type {
  AISearchResponse,
  AISearchQuestion,
  AISearchAnswer,
  AISearchConversation,
  AISearchHistory,
} from '@/interfaces/aiSearch'

// API base URL - from environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

/**
 * Performs AI-powered book search
 * @param question - The user's question
 * @param userEmail - User's email for tracking
 * @param conversationId - Optional conversation ID for context
 * @returns AI-generated response with book recommendations
 */
export async function searchWithAI(
  question: string,
  userEmail: string,
  conversationId?: string
): Promise<AISearchResponse> {
  // Transform to match Python backend's expected format (snake_case)
  const requestBody: Record<string, unknown> = {
    question,
    user_email: userEmail,
  }

  // Only include conversationId if it exists
  if (conversationId) {
    requestBody.conversation_id = conversationId
  }

  console.log('Sending AI Search request:', requestBody)

  try {
    const response = await fetch(`${API_BASE_URL}/api/ai-search/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('AI Search API error response:', {
        status: response.status,
        statusText: response.statusText,
        errorData
      })
      throw new Error(
        errorData.error?.message ||
        errorData.detail ||
        `API error: ${response.status} ${response.statusText}`
      )
    }

    const data: AISearchResponse = await response.json()
    console.log('AI Search response:', data)
    return data
  } catch (error) {
    console.error('AI Search API Error:', error)
    throw error
  }
}

/**
 * Fetches a specific question by ID
 * @param questionId - The question ID
 * @returns The question data
 */
export async function getQuestion(questionId: string): Promise<AISearchQuestion> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/ai-search/questions/${questionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch question: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Get Question Error:', error)
    throw error
  }
}

/**
 * Fetches a specific answer by ID
 * @param answerId - The answer ID
 * @returns The answer data with recommendations
 */
export async function getAnswer(answerId: string): Promise<AISearchAnswer> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/ai-search/answers/${answerId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch answer: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Get Answer Error:', error)
    throw error
  }
}

/**
 * Fetches all answers for a specific question
 * @param questionId - The question ID
 * @returns List of answers for the question
 */
export async function getAnswersForQuestion(questionId: string): Promise<AISearchAnswer[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/ai-search/questions/${questionId}/answers`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch answers: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Get Answers Error:', error)
    throw error
  }
}

/**
 * Fetches a conversation by ID for a specific user
 * @param userEmail - The user's email address
 * @param conversationId - The conversation ID
 * @returns The conversation with all messages
 */
export async function getConversation(
  userEmail: string,
  conversationId: string
): Promise<AISearchConversation> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/ai-search/conversations/${encodeURIComponent(userEmail)}/${encodeURIComponent(conversationId)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        errorData.detail ||
        `Failed to fetch conversation: ${response.status} ${response.statusText}`
      )
    }

    return await response.json()
  } catch (error) {
    console.error('Get Conversation Error:', error)
    throw error
  }
}

/**
 * Deletes a specific conversation from user's chat history
 * @param userEmail - The user's email address
 * @param conversationId - The conversation ID to delete
 * @returns Success confirmation payload (if provided by API)
 */
export async function deleteConversation(
  userEmail: string,
  conversationId: string
): Promise<Record<string, unknown>> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/ai-search/conversations/${encodeURIComponent(userEmail)}/${encodeURIComponent(conversationId)}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      if (response.status === 404) {
        return { success: true, message: 'Conversation not found' }
      }
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        errorData.detail ||
        `Failed to delete conversation: ${response.status} ${response.statusText}`
      )
    }

    if (response.status === 204) {
      return { success: true }
    }

    return await response.json().catch(() => ({ success: true }))
  } catch (error) {
    console.error('Delete Conversation Error:', error)
    throw error
  }
}

/**
 * Deletes all conversations for a user
 * @param userEmail - The user's email address
 * @returns Success confirmation payload (if provided by API)
 */
export async function deleteAllConversations(
  userEmail: string
): Promise<Record<string, unknown>> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/ai-search/conversations/user/${encodeURIComponent(userEmail)}/all`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        errorData.detail ||
        `Failed to delete all conversations: ${response.status} ${response.statusText}`
      )
    }

    if (response.status === 204) {
      return { success: true }
    }

    return await response.json().catch(() => ({ success: true }))
  } catch (error) {
    console.error('Delete All Conversations Error:', error)
    throw error
  }
}

/**
 * Fetches all conversations for a specific user
 * @param userEmail - The user's email address
 * @param limit - Maximum number of conversations to return (default: 20)
 * @returns List of user's conversations
 */
export async function getUserConversations(
  userEmail: string,
  limit: number = 20
): Promise<AISearchConversation[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/ai-search/conversations/user/${encodeURIComponent(userEmail)}?limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch user conversations: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Get User Conversations Error:', error)
    throw error
  }
}

/**
 * Fetches search history for a user
 * @param userEmail - The user's email address
 * @param limit - Maximum number of records to return (default: 20)
 * @returns List of search history records
 */
export async function getSearchHistory(
  userEmail: string,
  limit: number = 20
): Promise<AISearchHistory[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/ai-search/history/${encodeURIComponent(userEmail)}?limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch search history: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Get Search History Error:', error)
    throw error
  }
}

/**
 * Health check for AI Search service
 * @returns Service status and configuration
 */
export async function healthCheck(): Promise<{ status: string; [key: string]: unknown }> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/ai-search/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Health check failed: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Health Check Error:', error)
    throw error
  }
}

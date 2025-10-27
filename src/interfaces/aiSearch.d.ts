/**
 * AI Search Question Interface
 * Represents a question sent to the AI model for advanced book search
 */
export interface AISearchQuestion {
  // Identification
  id: string

  // Question Content
  question: string

  // User Information
  userEmail: string

  // Metadata
  createdAt: Date

  // Optional: Search context and parameters
  searchContext?: {
    previousQuestionId?: string // Reference to previous question in conversation
    genre?: string // If user specified a genre
    priceRange?: {
      min?: number
      max?: number
    }
    filters?: {
      inStockOnly?: boolean
      language?: string
      rating?: number
    }
  }

  // Optional: AI model configuration
  modelConfig?: {
    temperature?: number // Control randomness (0-1)
    maxTokens?: number // Maximum response length
    topP?: number // Nucleus sampling parameter
  }
}

/**
 * AI Search Answer Interface
 * Represents an answer from the AI model for advanced book search
 */
export interface AISearchAnswer {
  // Identification
  id: string
  questionId: string // Reference to the question

  // Answer Content
  answer: string

  // User Information (for tracking/history)
  userEmail: string

  // Metadata
  createdAt: Date

  // Optional: Recommended books based on AI analysis
  recommendedBooks?: {
    bookId: string
    title: string
    author: string
    relevanceScore: number // 0-1, how relevant to the question
    reason: string // Why this book was recommended
  }[]

  // Optional: Search suggestions
  suggestions?: string[] // Follow-up questions or search refinements

  // Optional: AI model metadata
  modelMetadata?: {
    model: string // Model name (e.g., "gpt-4", "claude-3")
    tokensUsed: number // Number of tokens consumed
    confidence: number // 0-1, AI confidence in the answer
    processingTime: number // Time taken to generate response (ms)
  }

  // Optional: Source information
  sources?: {
    type: 'book' | 'author' | 'genre' | 'knowledge_base'
    reference: string
    title?: string
  }[]
}

/**
 * AI Search Conversation Interface
 * Represents a conversation thread between user and AI
 */
export interface AISearchConversation {
  id: string
  userEmail: string
  title: string // Auto-generated from first question
  createdAt: Date
  updatedAt: Date
  messages: AISearchMessage[]
}

/**
 * AI Search Message Interface
 * Represents a single message in the conversation
 */
export interface AISearchMessage {
  id: string
  conversationId: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  bookReferences?: string[] // Book IDs mentioned in this message
}

/**
 * AI Search History Interface
 * Simplified interface for displaying search history
 */
export interface AISearchHistory {
  id: string
  question: string
  answer: string
  userEmail: string
  createdAt: Date
  bookRecommendations?: number // Count of recommended books
}

/**
 * AI Search Request Interface
 * Used when making API requests to the AI search endpoint
 */
export interface AISearchRequest {
  question: string
  userEmail: string
  conversationId?: string // If continuing a conversation
  context?: {
    genre?: string
    priceRange?: {
      min?: number
      max?: number
    }
    filters?: Record<string, unknown>
  }
}

/**
 * AI Search Response Interface
 * Response from the AI search API
 */
export interface AISearchResponse {
  success: boolean
  data?: {
    questionId: string
    answerId: string
    answer: string
    recommendedBooks?: {
      bookId: string
      title: string
      author: string
      price: number
      coverImageUrl?: string
      relevanceScore: number
      reason: string
    }[]
    suggestions?: string[]
    conversationId?: string
  }
  error?: {
    code: string
    message: string
  }
}

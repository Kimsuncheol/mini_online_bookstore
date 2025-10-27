'use client'

import { useState, useEffect, useRef } from 'react'
import type { AISearchMessage } from '@/interfaces/aiSearch'
import { useAuth } from '@/contexts/AuthContext'
import { searchWithAI } from '@/services/aiSearchService'

// Extended message type with recommendations and suggestions
export interface ExtendedAISearchMessage extends AISearchMessage {
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
}

interface UseAIConversationProps {
  open: boolean
}

export function useAIConversation({ open }: UseAIConversationProps) {
  const { user } = useAuth()
  const [query, setQuery] = useState('')
  const [messages, setMessages] = useState<ExtendedAISearchMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const conversationId = useRef<string | undefined>(undefined)

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest'
    })
  }

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom()
    }
  }, [messages])

  // Clear history automatically when modal closes
  useEffect(() => {
    if (!open) {
      // Reset all conversation state
      setMessages([])
      setQuery('')
      setIsLoading(false)
      setError(null)
      conversationId.current = undefined
    }
  }, [open])

  const handleSendMessage = async () => {
    if (!query.trim() || isLoading) return

    // Check if user is authenticated
    const userEmail = user?.email
    if (!userEmail) {
      const errorMessage: ExtendedAISearchMessage = {
        id: `msg_${Date.now()}_error`,
        conversationId: 'error',
        role: 'assistant',
        content: 'Please sign in to use the AI Book Assistant.',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
      return
    }

    const userMessage: ExtendedAISearchMessage = {
      id: `msg_${Date.now()}_user`,
      conversationId: conversationId.current || 'temp',
      role: 'user',
      content: query.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setQuery('')
    setIsLoading(true)
    setError(null)

    try {
      // Call the real API
      const response = await searchWithAI(
        userMessage.content,
        userEmail,
        conversationId.current
      )

      if (response.success && response.data) {
        // Update conversation ID if it's a new conversation
        if (response.data.conversationId) {
          conversationId.current = response.data.conversationId
        }

        // Create AI response message with recommendations and suggestions
        const aiMessage: ExtendedAISearchMessage = {
          id: response.data.answerId,
          conversationId: response.data.conversationId || conversationId.current || 'temp',
          role: 'assistant',
          content: response.data.answer,
          timestamp: new Date(),
          bookReferences: response.data.recommendedBooks?.map((book) => book.bookId),
          recommendedBooks: response.data.recommendedBooks,
          suggestions: response.data.suggestions,
        }

        setMessages((prev) => [...prev, aiMessage])
      } else {
        // Handle API error response
        throw new Error(response.error?.message || 'Failed to get AI response')
      }
    } catch (err) {
      console.error('AI Search Error:', err)
      const errorMsg = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMsg)

      // Add error message to chat
      const errorMessage: ExtendedAISearchMessage = {
        id: `msg_${Date.now()}_error`,
        conversationId: conversationId.current || 'error',
        role: 'assistant',
        content: `I apologize, but I encountered an error: ${errorMsg}. Please try again.`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return {
    query,
    setQuery,
    messages,
    isLoading,
    error,
    messagesEndRef,
    handleSendMessage,
    isAuthenticated: !!user,
  }
}

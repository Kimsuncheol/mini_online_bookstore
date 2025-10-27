'use client'

import { forwardRef } from 'react'
import { Stack } from '@mui/material'
import type { ExtendedAISearchMessage } from './useAIConversation'
import AIMessageBubble from './AIMessageBubble'
import AILoadingIndicator from './AILoadingIndicator'
import AIEmptyState from './AIEmptyState'

interface AIMessageListProps {
  messages: ExtendedAISearchMessage[]
  isLoading: boolean
}

const AIMessageList = forwardRef<HTMLDivElement, AIMessageListProps>(
  ({ messages, isLoading }, ref) => {
    if (messages.length === 0) {
      return <AIEmptyState />
    }

    return (
      <Stack spacing={3}>
        {messages.map((message) => (
          <AIMessageBubble key={message.id} message={message} />
        ))}
        {isLoading && <AILoadingIndicator />}
        {/* Invisible element for auto-scrolling */}
        <div ref={ref} />
      </Stack>
    )
  }
)

AIMessageList.displayName = 'AIMessageList'

export default AIMessageList

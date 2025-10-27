'use client'

import { Box, Paper, Typography, Avatar } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import type { ExtendedAISearchMessage } from './useAIConversation'
import AIBookRecommendations from './AIBookRecommendations'

interface AIMessageBubbleProps {
  message: ExtendedAISearchMessage
}

export default function AIMessageBubble({ message }: AIMessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isUser ? 'row-reverse' : 'row',
        alignItems: 'flex-start',
        gap: 1.5,
      }}
    >
      <Avatar
        sx={{
          bgcolor: isUser ? 'secondary.main' : 'primary.main',
          width: 32,
          height: 32,
        }}
      >
        {isUser ? <PersonIcon sx={{ fontSize: 18 }} /> : <AutoAwesomeIcon sx={{ fontSize: 18 }} />}
      </Avatar>
      <Box sx={{ maxWidth: '70%', flex: 1 }}>
        <Paper
          sx={{
            p: 2,
            bgcolor: isUser ? 'primary.main' : 'background.paper',
            color: isUser ? 'white' : 'text.primary',
            borderRadius: 2,
            borderTopLeftRadius: isUser ? 2 : 0,
            borderTopRightRadius: isUser ? 0 : 2,
          }}
        >
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {message.content}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              mt: 1,
              opacity: 0.7,
              fontSize: '0.7rem',
            }}
          >
            {message.timestamp.toLocaleTimeString()}
          </Typography>
        </Paper>

        {/* Display book recommendations for AI messages */}
        {!isUser && message.recommendedBooks && message.recommendedBooks.length > 0 && (
          <AIBookRecommendations books={message.recommendedBooks} />
        )}
      </Box>
    </Box>
  )
}

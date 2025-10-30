'use client'

import { Box, IconButton, Stack, Typography, Avatar, Divider } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import AIMessageList from './ai/AIMessageList'
import AIInputArea from './ai/AIInputArea'
import { useAIConversation } from './ai/useAIConversation'

interface SearchPageAIModalProps {
  onBackToSearch: () => void
  isOpen: boolean
}

export default function SearchPageAIModal({
  onBackToSearch,
  isOpen,
}: SearchPageAIModalProps) {
  const {
    query,
    setQuery,
    messages,
    isLoading,
    messagesEndRef,
    handleSendMessage,
  } = useAIConversation({ open: isOpen })

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '80vh',
        maxHeight: '700px',
      }}
    >
      {/* AI Mode Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <IconButton
            onClick={onBackToSearch}
            size="small"
            sx={{
              bgcolor: 'background.paper',
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Avatar
            sx={{
              bgcolor: 'primary.main',
              width: 36,
              height: 36,
            }}
          >
            <AutoAwesomeIcon sx={{ fontSize: 20 }} />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem' }}>
              AI Book Assistant
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
              Ask me anything about books
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Divider />

      {/* Messages Area */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 2,
          bgcolor: 'background.default',
        }}
      >
        <AIMessageList
          messages={messages}
          isLoading={isLoading}
          ref={messagesEndRef}
        />
      </Box>

      <Divider />

      {/* Input Area */}
      <AIInputArea
        query={query}
        isLoading={isLoading}
        onChange={setQuery}
        onSend={handleSendMessage}
      />
    </Box>
  )
}

'use client'

import { Box, TextField, InputAdornment, IconButton, Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

interface AIInputAreaProps {
  query: string
  isLoading: boolean
  onChange: (value: string) => void
  onSend: () => void
}

export default function AIInputArea({ query, isLoading, onChange, onSend }: AIInputAreaProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
      <TextField
        fullWidth
        multiline
        maxRows={4}
        placeholder="Ask about books, authors, recommendations..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isLoading}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={onSend}
                  disabled={!query.trim() || isLoading}
                  color="primary"
                  sx={{
                    bgcolor: query.trim() && !isLoading ? 'primary.main' : 'transparent',
                    color: query.trim() && !isLoading ? 'white' : 'text.disabled',
                    '&:hover': {
                      bgcolor: query.trim() && !isLoading ? 'primary.dark' : 'transparent',
                    },
                  }}
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 3,
          },
        }}
      />
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: 'block', mt: 1, textAlign: 'center' }}
      >
        Press Enter to send, Shift + Enter for new line
      </Typography>
    </Box>
  )
}

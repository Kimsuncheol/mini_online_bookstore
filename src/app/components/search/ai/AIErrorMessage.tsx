'use client'

import { Box, Paper, Typography, Button } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import RefreshIcon from '@mui/icons-material/Refresh'

interface AIErrorMessageProps {
  message: string
  onRetry?: () => void
}

export default function AIErrorMessage({ message, onRetry }: AIErrorMessageProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Paper
        sx={{
          p: 3,
          maxWidth: 500,
          bgcolor: 'error.lighter',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'error.light',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <ErrorOutlineIcon sx={{ color: 'error.main', fontSize: 28, mt: 0.5 }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'error.main', mb: 1 }}>
              Error
            </Typography>
            <Typography variant="body2" color="text.primary" sx={{ mb: 2 }}>
              {message}
            </Typography>
            {onRetry && (
              <Button
                size="small"
                variant="outlined"
                color="error"
                startIcon={<RefreshIcon />}
                onClick={onRetry}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                }}
              >
                Retry
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

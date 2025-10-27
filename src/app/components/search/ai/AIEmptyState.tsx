'use client'

import { Box, Typography } from '@mui/material'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'

export default function AIEmptyState() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        textAlign: 'center',
      }}
    >
      <AutoAwesomeIcon
        sx={{
          fontSize: 80,
          color: 'primary.main',
          opacity: 0.3,
          mb: 2,
        }}
      />
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        Welcome to AI Book Search
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 500 }}>
        Ask me anything about books! I can help you find recommendations, explain plots,
        suggest similar titles, and answer questions about authors and genres.
      </Typography>
    </Box>
  )
}

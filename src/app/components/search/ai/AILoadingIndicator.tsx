'use client'

import { Box, Paper, Avatar, CircularProgress } from '@mui/material'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'

export default function AILoadingIndicator() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Avatar
        sx={{
          bgcolor: 'primary.main',
          width: 32,
          height: 32,
        }}
      >
        <AutoAwesomeIcon sx={{ fontSize: 18 }} />
      </Avatar>
      <Paper
        sx={{
          p: 2,
          bgcolor: 'background.paper',
          borderRadius: 2,
        }}
      >
        <CircularProgress size={20} />
      </Paper>
    </Box>
  )
}

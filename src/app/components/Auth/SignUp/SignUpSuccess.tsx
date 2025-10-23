'use client'

import { Box, Button, Typography, Alert } from '@mui/material'

interface SignUpSuccessProps {
  email: string
  onContinue: () => void
}

export default function SignUpSuccess({ email, onContinue }: SignUpSuccessProps) {
  return (
    <Box sx={{ textAlign: 'center', py: 3 }}>
      <Alert severity="success" sx={{ mb: 2 }}>
        Check your email for a sign-up link! This link will expire in 24 hours.
      </Alert>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        We&apos;ve sent a secure link to <strong>{email}</strong>
      </Typography>
      <Button
        variant="contained"
        onClick={onContinue}
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          textTransform: 'none',
        }}
      >
        Back to Home
      </Button>
    </Box>
  )
}

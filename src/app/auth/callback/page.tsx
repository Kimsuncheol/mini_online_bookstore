import { Suspense } from 'react'
import { Box, CircularProgress } from '@mui/material'
import CallbackHandler from './CallbackHandler'

export const metadata = {
  title: 'Completing Sign-in | BookNest',
  description: 'Please wait while we complete your sign-in process',
}

function LoadingFallback() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 2,
      }}
    >
      <CircularProgress size={60} />
    </Box>
  )
}

export default function CallbackPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CallbackHandler />
    </Suspense>
  )
}

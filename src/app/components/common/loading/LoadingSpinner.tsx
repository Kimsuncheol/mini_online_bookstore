import { Box, CircularProgress } from '@mui/material'

interface LoadingSpinnerProps {
  size?: number
  fullHeight?: boolean
}

export default function LoadingSpinner({ size = 60, fullHeight = true }: LoadingSpinnerProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: fullHeight ? '60vh' : 'auto',
        py: fullHeight ? 0 : 4,
      }}
    >
      <CircularProgress size={size} />
    </Box>
  )
}

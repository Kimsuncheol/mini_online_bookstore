import { Box, Button } from '@mui/material'

type HeaderGuestActionsProps = {
  onSignIn: () => void
}

export default function HeaderGuestActions({ onSignIn }: HeaderGuestActionsProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <Button
        variant="contained"
        onClick={onSignIn}
        sx={{
          textTransform: 'none',
          fontWeight: 600,
          px: 2.5,
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
            boxShadow: '0 6px 16px rgba(102, 126, 234, 0.4)',
          },
        }}
      >
        Sign In
      </Button>
    </Box>
  )
}

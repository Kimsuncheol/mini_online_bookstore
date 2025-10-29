import { ReactNode } from 'react'
import { Box } from '@mui/material'

interface FavoritesLayoutProps {
  children: ReactNode
}

export default function FavoritesLayout({ children }: FavoritesLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#fafafa',
      }}
    >
      {children}
    </Box>
  )
}

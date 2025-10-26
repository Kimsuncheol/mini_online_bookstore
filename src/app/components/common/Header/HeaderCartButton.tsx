import type { MouseEvent } from 'react'
import { IconButton, alpha } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

type HeaderCartButtonProps = {
  onClick: (event: MouseEvent<HTMLElement>) => void
}

export default function HeaderCartButton({ onClick }: HeaderCartButtonProps) {
  return (
    <IconButton
      sx={{
        color: 'text.primary',
        '&:hover': {
          backgroundColor: alpha('#667eea', 0.1),
        },
      }}
      onClick={onClick}
    >
      <ShoppingCartIcon />
    </IconButton>
  )
}

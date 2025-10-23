'use client'

import React from 'react'
import { Box, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CategoryDropdown from '../../home/CategoryDropdown'

interface CategoryButtonProps {
  label?: string
}

export default function CategoryButton({ label = 'All categories' }: CategoryButtonProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <Button
        startIcon={<MenuIcon />}
        endIcon={<KeyboardArrowDownIcon />}
        onClick={handleClick}
        variant="outlined"
        sx={{
          textTransform: 'none',
          fontWeight: 600,
          px: 2.5,
          py: 1,
          borderRadius: '20px',
          borderColor: 'divider',
          color: 'text.primary',
          transition: 'all 0.2s',
          '&:hover': {
            borderColor: 'primary.main',
            backgroundColor: (theme) => theme.palette.mode === 'light'
              ? 'rgba(102, 126, 234, 0.05)'
              : 'rgba(102, 126, 234, 0.1)',
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
          }
        }}
      >
        {label}
      </Button>
      <CategoryDropdown
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      />
    </Box>
  )
}

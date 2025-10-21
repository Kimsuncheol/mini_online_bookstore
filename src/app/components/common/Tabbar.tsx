'use client'

import React, { useState } from 'react'
import {
  Box,
  Toolbar,
  Button,
  Chip,
  alpha
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import StarIcon from '@mui/icons-material/Star'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import CategoryIcon from '@mui/icons-material/Category'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CategoryDropdown from '../home/CategoryDropdown'

export default function Tabbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundColor: '#ffffff',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          minHeight: '64px',
          px: { xs: 2, sm: 4 },
          gap: 2
        }}
      >
        {/* Left side - Modern Navigation chips */}
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
          <Chip
            icon={<StarIcon sx={{ fontSize: 18 }} />}
            label="Recommended"
            clickable
            sx={{
              fontWeight: 600,
              fontSize: '0.9rem',
              px: 1,
              height: '38px',
              borderRadius: '20px',
              backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
              color: 'primary.main',
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
              transition: 'all 0.2s',
              '&:hover': {
                backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.2),
                borderColor: 'primary.main',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(102, 126, 234, 0.2)',
              },
              '& .MuiChip-icon': {
                color: 'primary.main',
              }
            }}
          />
          <Chip
            icon={<TrendingUpIcon sx={{ fontSize: 18 }} />}
            label="Trending"
            clickable
            sx={{
              fontWeight: 600,
              fontSize: '0.9rem',
              px: 1,
              height: '38px',
              borderRadius: '20px',
              backgroundColor: (theme) => alpha(theme.palette.grey[100], 0.8),
              color: 'text.primary',
              transition: 'all 0.2s',
              '&:hover': {
                backgroundColor: (theme) => alpha(theme.palette.grey[200], 0.9),
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              },
              '& .MuiChip-icon': {
                color: 'text.secondary',
              }
            }}
          />
          <Chip
            icon={<CategoryIcon sx={{ fontSize: 18 }} />}
            label="Categories"
            clickable
            sx={{
              fontWeight: 600,
              fontSize: '0.9rem',
              px: 1,
              height: '38px',
              borderRadius: '20px',
              backgroundColor: (theme) => alpha(theme.palette.grey[100], 0.8),
              color: 'text.primary',
              transition: 'all 0.2s',
              '&:hover': {
                backgroundColor: (theme) => alpha(theme.palette.grey[200], 0.9),
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              },
              '& .MuiChip-icon': {
                color: 'text.secondary',
              }
            }}
          />
        </Box>

        {/* Right side - Modern All categories button with dropdown */}
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
                backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.05),
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
              }
            }}
          >
            All categories
          </Button>
          <CategoryDropdown
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          />
        </Box>
      </Toolbar>
    </Box>
  )
}

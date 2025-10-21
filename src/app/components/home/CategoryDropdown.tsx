'use client'

import React from 'react'
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box
} from '@mui/material'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import LocalPoliceIcon from '@mui/icons-material/LocalPolice'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import FavoriteIcon from '@mui/icons-material/Favorite'
import PersonIcon from '@mui/icons-material/Person'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import PsychologyIcon from '@mui/icons-material/Psychology'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'
import ScienceIcon from '@mui/icons-material/Science'
import ChildCareIcon from '@mui/icons-material/ChildCare'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import PaletteIcon from '@mui/icons-material/Palette'

interface Category {
  name: string
  icon: React.ReactNode
  color: string
}

const categories: Category[] = [
  { name: 'Fiction', icon: <AutoStoriesIcon />, color: '#667eea' },
  { name: 'Mystery & Thriller', icon: <LocalPoliceIcon />, color: '#f093fb' },
  { name: 'Science Fiction & Fantasy', icon: <RocketLaunchIcon />, color: '#4facfe' },
  { name: 'Romance', icon: <FavoriteIcon />, color: '#fa709a' },
  { name: 'Biography & Memoir', icon: <PersonIcon />, color: '#feca57' },
  { name: 'Business & Economics', icon: <BusinessCenterIcon />, color: '#48dbfb' },
  { name: 'Self-Help & Psychology', icon: <PsychologyIcon />, color: '#a29bfe' },
  { name: 'History', icon: <HistoryEduIcon />, color: '#fd79a8' },
  { name: 'Science & Technology', icon: <ScienceIcon />, color: '#00d2d3' },
  { name: 'Children & Young Adult', icon: <ChildCareIcon />, color: '#ff9ff3' },
  { name: 'Health & Wellness', icon: <FitnessCenterIcon />, color: '#54a0ff' },
  { name: 'Arts & Photography', icon: <PaletteIcon />, color: '#feca57' },
]

interface CategoryDropdownProps {
  anchorEl: HTMLElement | null
  open: boolean
  onClose: () => void
}

export default function CategoryDropdown({ anchorEl, open, onClose }: CategoryDropdownProps) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          mt: 1.5,
          minWidth: 320,
          maxHeight: 500,
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          overflow: 'hidden',
          '& .MuiList-root': {
            py: 1
          }
        }
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <Box sx={{ px: 2.5, py: 1.5, pb: 1 }}>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
            color: 'text.secondary',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontSize: '0.75rem'
          }}
        >
          Browse Categories
        </Typography>
      </Box>
      <Divider sx={{ mb: 1 }} />

      {categories.map((category, index) => (
        <MenuItem
          key={category.name}
          onClick={onClose}
          sx={{
            px: 2.5,
            py: 1.5,
            mx: 1,
            borderRadius: '12px',
            transition: 'all 0.2s',
            '&:hover': {
              backgroundColor: 'rgba(102, 126, 234, 0.08)',
              transform: 'translateX(4px)',
              '& .MuiListItemIcon-root': {
                transform: 'scale(1.1)',
              }
            }
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 40,
              color: category.color,
              transition: 'transform 0.2s',
            }}
          >
            {category.icon}
          </ListItemIcon>
          <ListItemText
            primary={category.name}
            primaryTypographyProps={{
              fontWeight: 500,
              fontSize: '0.95rem'
            }}
          />
        </MenuItem>
      ))}
    </Menu>
  )
}

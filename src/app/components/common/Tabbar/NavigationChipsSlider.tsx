'use client'

import React, { useRef } from 'react'
import { Box, alpha } from '@mui/material'
import NavigationChips from './NavigationChips'
import { BookCategoryNavItem } from '@/data/bookCategories'

interface NavigationChipsSliderProps {
  chips: BookCategoryNavItem[]
  onChipClick?: (chipId: string) => void
}

export default function NavigationChipsSlider({
  chips,
  onChipClick,
}: NavigationChipsSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <Box
      ref={containerRef}
      sx={{
        display: 'flex',
        gap: 1.5,
        overflowX: 'auto',
        overflowY: 'hidden',
        flex: 1,
        scrollBehavior: 'smooth',
        '&::-webkit-scrollbar': {
          height: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: (theme) => alpha(theme.palette.primary.main, 0.4),
          borderRadius: '3px',
          '&:hover': {
            background: (theme) => alpha(theme.palette.primary.main, 0.6),
          },
        },
      }}
    >
      <Box sx={{ display: 'flex', gap: 1.5, whiteSpace: 'nowrap', pb: 0.5 }}>
        <NavigationChips chips={chips} onChipClick={onChipClick} />
      </Box>
    </Box>
  )
}

'use client'

import React, { useCallback } from 'react'
import { Box, Toolbar, useMediaQuery, useTheme } from '@mui/material'
import NavigationChips from './NavigationChips'
import NavigationChipsSlider from './NavigationChipsSlider'
import CategoryButton from './CategoryButton'
import { BOOK_CATEGORY_NAV_ITEMS } from '@/data/bookCategories'

export default function Tabbar() {
  const theme = useTheme()
  const isLargeScreen = useMediaQuery(theme.breakpoints.up(1440))

  const handleChipClick = useCallback((chipId: string) => {
    // Placeholder for analytics or custom routing hooks
    console.debug('Tabbar chip clicked:', chipId)
  }, [])

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
          gap: 2,
          flexWrap: isLargeScreen ? 'nowrap' : 'wrap',
          alignItems: 'center',
        }}
      >
        {/* Left side - Navigation Chips */}
        {isLargeScreen ? (
          <NavigationChips
            chips={BOOK_CATEGORY_NAV_ITEMS}
            onChipClick={handleChipClick}
          />
        ) : (
          <NavigationChipsSlider
            chips={BOOK_CATEGORY_NAV_ITEMS}
            onChipClick={handleChipClick}
          />
        )}

        {/* Right side - Category Button */}
        <Box sx={{ flexShrink: 0 }}>
          <CategoryButton label="All categories" />
        </Box>
      </Toolbar>
    </Box>
  )
}

'use client'

import React from 'react'
import { Box, Chip, alpha } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BOOK_CATEGORY_NAV_ITEMS,
  BookCategoryNavItem,
} from '@/data/bookCategories'

interface NavigationChipsProps {
  chips?: BookCategoryNavItem[]
  onChipClick?: (chipId: string) => void
}

export default function NavigationChips({
  chips = BOOK_CATEGORY_NAV_ITEMS,
  onChipClick,
}: NavigationChipsProps) {
  const pathname = usePathname()

  const handleChipClick = (chipId: string) => {
    if (onChipClick) {
      onChipClick(chipId)
    }
  }

  return (
    <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'nowrap' }}>
      {chips.map((chip) => {
        const isActive =
          pathname === chip.href || pathname?.startsWith(`${chip.href}/`)

        return (
          <Link
            key={chip.id}
            href={chip.href}
            style={{ textDecoration: 'none' }}
          >
            <Chip
              icon={chip.icon}
              label={chip.label}
              clickable
              onClick={() => handleChipClick(chip.id)}
              sx={{
                fontWeight: 600,
                fontSize: '0.9rem',
                px: 1,
                height: '38px',
                borderRadius: '20px',
                backgroundColor: isActive
                  ? (theme) => alpha(theme.palette.primary.main, 0.12)
                  : (theme) => alpha(theme.palette.grey[100], 0.9),
                color: isActive ? 'primary.main' : 'text.primary',
                border: '1px solid',
                borderColor: isActive
                  ? (theme) => alpha(theme.palette.primary.main, 0.3)
                  : 'transparent',
                transition: 'all 0.2s',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: isActive
                    ? (theme) => alpha(theme.palette.primary.main, 0.2)
                    : (theme) => alpha(theme.palette.grey[200], 0.9),
                  borderColor: isActive ? 'primary.main' : 'divider',
                  transform: 'translateY(-2px)',
                  boxShadow: isActive
                    ? '0 4px 8px rgba(102, 126, 234, 0.25)'
                    : '0 4px 8px rgba(0, 0, 0, 0.08)',
                },
                '& .MuiChip-icon': {
                  color: isActive ? 'primary.main' : 'text.secondary',
                },
              }}
            />
          </Link>
        )
      })}
    </Box>
  )
}

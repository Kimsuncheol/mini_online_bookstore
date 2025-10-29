'use client'

import React from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/navigation'

// Icons for quick access
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import HistoryIcon from '@mui/icons-material/History'
import StorefrontIcon from '@mui/icons-material/Storefront'

export interface QuickAccessItem {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  route: string
  color: string
  bgColor: string
}

interface QuickAccessGridProps {
  items?: QuickAccessItem[]
  columns?: { xs: number; sm: number; md: number }
}

export const DEFAULT_QUICK_ACCESS_ITEMS: QuickAccessItem[] = [
  {
    id: 'checkin',
    title: 'Daily Check-in',
    description: 'Earn coupons and build streaks',
    icon: <CalendarTodayIcon sx={{ fontSize: 32 }} />,
    route: '/checkin',
    color: 'error.main',
    bgColor: 'rgba(244, 67, 54, 0.1)',
  },
  {
    id: 'favorites',
    title: 'My Favorites',
    description: 'View your wishlist',
    icon: <FavoriteBorderIcon sx={{ fontSize: 32 }} />,
    route: '/favorites',
    color: 'error.main',
    bgColor: 'rgba(244, 67, 54, 0.1)',
  },
  {
    id: 'history',
    title: 'Reading History',
    description: 'Track your purchases',
    icon: <HistoryIcon sx={{ fontSize: 32 }} />,
    route: '/reading-history',
    color: 'info.main',
    bgColor: 'rgba(33, 150, 243, 0.1)',
  },
  {
    id: 'store',
    title: 'Browse Store',
    description: 'Discover new books',
    icon: <StorefrontIcon sx={{ fontSize: 32 }} />,
    route: '/books/recommended',
    color: 'success.main',
    bgColor: 'rgba(76, 175, 80, 0.1)',
  },
]

export default function QuickAccessGrid({
  items = DEFAULT_QUICK_ACCESS_ITEMS,
  columns = { xs: 2, sm: 2, md: 4 },
}: QuickAccessGridProps) {
  const router = useRouter()

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: `repeat(${columns.xs}, 1fr)`,
          sm: `repeat(${columns.sm}, 1fr)`,
          md: `repeat(${columns.md}, 1fr)`,
        },
        gap: 2,
      }}
    >
      {items.map((item) => (
        <Card
          key={item.id}
          onClick={() => router.push(item.route)}
          sx={{
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            backgroundColor: item.bgColor,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: 4,
              borderColor: item.color,
            },
          }}
        >
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', py: 3 }}>
            <Box sx={{ color: item.color, mb: 1.5 }}>
              {item.icon}
            </Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
              {item.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {item.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}

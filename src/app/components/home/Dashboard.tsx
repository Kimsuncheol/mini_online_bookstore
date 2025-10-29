'use client'

import React, { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Stack,
  Typography,
  Card,
  CardContent,
  Alert,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Tabbar from '../common/Tabbar'
import HeroBookCarousel from '../book/HeroBookCarousel'
import DashboardPageSkeleton from './DashboardPageSkeleton'
import type { Book } from '@/interfaces/book'

// Icons for quick access
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import HistoryIcon from '@mui/icons-material/History'
import StorefrontIcon from '@mui/icons-material/Storefront'

interface QuickAccessItem {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  route: string
  color: string
  bgColor: string
}

export default function Dashboard() {
  const router = useRouter()
  const { user } = useAuth()
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch featured books
  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch featured books from API
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/books/featured`)
        if (!response.ok) throw new Error('Failed to fetch featured books')

        const data = await response.json()
        setFeaturedBooks(data.books || data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load featured books')
        // Set empty featured books for graceful fallback
        setFeaturedBooks([])
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedBooks()
  }, [])

  const quickAccessItems: QuickAccessItem[] = [
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

  if (loading) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Tabbar />
        <DashboardPageSkeleton />
      </Box>
    )
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Tabbar />

      <Container maxWidth="lg" sx={{ py: 4, pb: 6 }}>
        {/* Welcome Section */}
        {user && (
          <Stack spacing={1} sx={{ mb: 5 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Welcome back, {user.displayName || 'Reader'}! 👋
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Discover new books, earn rewards, and build your reading streak
            </Typography>
          </Stack>
        )}

        {error && (
          <Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        {/* Quick Access Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2.5 }}>
            Quick Access
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              gap: 2,
            }}
          >
            {quickAccessItems.map((item) => (
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
        </Box>

        {/* Featured Books Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2.5 }}>
            Featured Books 🔥
          </Typography>
          {featuredBooks.length > 0 ? (
            <HeroBookCarousel
              books={featuredBooks.map((book) => ({
                id: book.id,
                title: book.title,
                author: book.author,
                description: book.description || '',
                price: book.price,
                pageCount: book.pageCount,
                originalPrice: book.originalPrice,
                coverImageUrl: book.coverImageUrl,
              }))}
              carouselConfig={{
                display: { gap: 24 },
                behavior: { autoPlay: true, autoPlayInterval: 5000 },
              }}
            />
          ) : (
            <Card sx={{ p: 4, textAlign: 'center', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="body1" color="text.secondary">
                Featured books will appear here soon
              </Typography>
            </Card>
          )}
        </Box>
      </Container>
    </Box>
  )
}

'use client'

import { useEffect, useState, useCallback } from 'react'
import { Container, Grid, Typography, Box, Alert, CircularProgress } from '@mui/material'
import { useAuth } from '@/contexts/AuthContext'
import { useCart } from '@/contexts/CartContext'
import FavoriteItem from './FavoriteItem'
import { getUserLikes, removeLikeByBookAndUser } from '@/app/api/like'
import type { Like } from '@/interfaces/like'

export default function MyFavorites() {
  const { user, loading: authLoading } = useAuth()
  const { addToCart } = useCart()
  const [favorites, setFavorites] = useState<Like[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch favorites
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user?.email) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        const likes = await getUserLikes(user.email)
        setFavorites(likes || [])
      } catch (err) {
        console.error('Error fetching favorites:', err)
        setError(err instanceof Error ? err.message : 'Failed to load favorites')
      } finally {
        setLoading(false)
      }
    }

    if (!authLoading) {
      fetchFavorites()
    }
  }, [user?.email, authLoading])

  // Handle remove from favorites
  const handleRemove = useCallback(
    async (bookId: string) => {
      if (!user?.email) return

      try {
        await removeLikeByBookAndUser(bookId, user.email)
        setFavorites((prev) => prev.filter((fav) => fav.bookId !== bookId))
      } catch (err) {
        console.error('Error removing favorite:', err)
        setError(err instanceof Error ? err.message : 'Failed to remove favorite')
      }
    },
    [user?.email]
  )

  // Handle add to cart
  const handleAddToCart = useCallback(
    async (bookId: string) => {
      try {
        const book = favorites.find((fav) => fav.bookId === bookId)
        if (!book) return

        await addToCart(bookId, book.title, book.price, book.coverImageUrl || '')
      } catch (err) {
        console.error('Error adding to cart:', err)
        setError(err instanceof Error ? err.message : 'Failed to add to cart')
      }
    },
    [favorites, addToCart]
  )

  // Show loading state
  if (authLoading || loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    )
  }

  // Not authenticated
  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            My Favorites
          </Typography>
        </Box>
        <Alert severity="info">
          Please log in to view your favorite books.
        </Alert>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
          My Favorites
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {favorites.length} book{favorites.length !== 1 ? 's' : ''} saved
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      {/* Empty State */}
      {favorites.length === 0 ? (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            px: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            borderRadius: 2,
            border: '2px dashed',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            No favorite books yet
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Start adding books to your favorites to see them here
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((favorite) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={favorite.bookId}>
              <FavoriteItem
                book={favorite}
                onRemove={handleRemove}
                onAddToCart={handleAddToCart}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}

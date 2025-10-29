'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Stack,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import DeleteIcon from '@mui/icons-material/Delete'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import type { Like } from '@/interfaces/like'

interface FavoriteItemProps {
  book: Like
  onRemove?: (bookId: string) => void
  onAddToCart?: (bookId: string) => void
}

export default function FavoriteItem({
  book,
  onRemove,
  onAddToCart,
}: FavoriteItemProps) {
  const router = useRouter()
  const [isRemoving, setIsRemoving] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  const handleRemove = () => {
    setIsRemoving(true)
    try {
      onRemove?.(book.bookId)
    } finally {
      setIsRemoving(false)
    }
  }

  const handleAddToCart = () => {
    setIsAdding(true)
    try {
      onAddToCart?.(book.bookId)
    } finally {
      setIsAdding(false)
    }
  }

  const handleViewBook = () => {
    router.push(`/book/${book.bookId}`)
  }

  const displayPrice = book.price || 0
  const originalPrice = book.originalPrice
  const hasDiscount = originalPrice && originalPrice > book.price

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
        borderRadius: 2,
        width: '100%'
      }}
    >
      {/* Book Cover Image */}
      <CardMedia
        component="img"
        sx={{
          pt: '140%',
          position: 'relative',
          cursor: 'pointer',
          backgroundColor: '#f0f0f0',
          backgroundImage: `url(${book.coverImageUrl || ''})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'all 0.3s ease',
          '&:hover': {
            opacity: 0.85,
            transform: 'scale(1.02)',
          },
        }}
        onClick={handleViewBook}
      />

      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
        {/* Title */}
        <Box sx={{ flex: 1, mb: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              mb: 0.5,
              fontSize: '1.1rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              cursor: 'pointer',
              transition: 'color 0.2s ease',
              '&:hover': {
                color: 'primary.main',
              },
            }}
            onClick={handleViewBook}
          >
            {book.title}
          </Typography>
        </Box>

        {/* Price */}
        <Box sx={{ mb: 3 }}>
          <Stack direction="row" alignItems="baseline" spacing={1}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 700,
                fontSize: '1.3rem',
                color: 'primary.main',
              }}
            >
              ${displayPrice.toFixed(2)}
            </Typography>
            {hasDiscount && (
              <Typography
                variant="body2"
                sx={{
                  textDecoration: 'line-through',
                  color: 'text.secondary',
                  fontSize: '0.9rem',
                }}
              >
                ${originalPrice?.toFixed(2)}
              </Typography>
            )}
          </Stack>
        </Box>

        {/* Action Buttons */}
        <Stack direction="row" spacing={1.5}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<ShoppingCartIcon />}
            onClick={handleAddToCart}
            disabled={isAdding}
            sx={{
              fontWeight: 600,
              py: 1.2,
              fontSize: '0.95rem',
              transition: 'all 0.2s ease',
              '&:hover:not(:disabled)': {
                transform: 'translateY(-2px)',
                boxShadow: 3,
              },
            }}
          >
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </Button>
          <Tooltip title="Remove from favorites" arrow>
            <IconButton
              color="error"
              onClick={handleRemove}
              disabled={isRemoving}
              sx={{
                border: '1.5px solid',
                borderColor: 'error.light',
                py: 1.2,
                px: 1.5,
                transition: 'all 0.2s ease',
                '&:hover:not(:disabled)': {
                  backgroundColor: 'error.lighter',
                  borderColor: 'error.main',
                  transform: 'scale(1.05)',
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </CardContent>
    </Card>
  )
}

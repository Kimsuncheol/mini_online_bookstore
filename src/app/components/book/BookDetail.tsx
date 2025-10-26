'use client'

import React, { useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Rating,
  Stack,
  TextField,
  Typography,
  alpha,
} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import SecurityIcon from '@mui/icons-material/Security'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import Link from 'next/link'
import { Book } from '@/interfaces/book'
import { useCart } from '@/contexts/CartContext'

interface BookDetailProps {
  book: Book
}

const metaItems: Array<{ key: keyof Book; label: string }> = [
  { key: 'author', label: 'Author' },
  { key: 'publisher', label: 'Publisher' },
  { key: 'language', label: 'Language' },
  { key: 'pageCount', label: 'Page count' },
  { key: 'isbn', label: 'ISBN' },
]

export default function BookDetail({ book }: BookDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addToCart } = useCart()

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10)
    if (!Number.isNaN(value) && value > 0 && value <= (book.stockQuantity || 1)) {
      setQuantity(value)
    }
  }

  const handleAddToCart = () => {
    addToCart({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      image: book.coverImageUrl || book.coverImage,
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleToggleFavorite = () => {
    setIsFavorite((prev) => !prev)
  }

  const discountPercentage = book.originalPrice
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
    : book.discount || 0

  const formatMetaValue = (value: Book[keyof Book]) => {
    if (!value) return '-'
    if (value instanceof Date) {
      return value.toLocaleDateString()
    }
    return value.toString()
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Stack direction="row" spacing={1} sx={{ mb: 4, color: 'text.secondary', fontSize: 14 }}>
        <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          <Typography sx={{ '&:hover': { color: 'primary.main' } }}>Home</Typography>
        </Link>
        <Typography>/</Typography>
        <Link href="/books" style={{ color: 'inherit', textDecoration: 'none' }}>
          <Typography sx={{ '&:hover': { color: 'primary.main' } }}>Books</Typography>
        </Link>
        <Typography>/</Typography>
        <Typography sx={{ color: 'text.primary' }}>{book.title}</Typography>
      </Stack>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' },
          gap: { xs: 4, md: 6 },
        }}
      >
        <Box>
          <Box
            sx={{
              position: 'sticky',
              top: 96,
              borderRadius: 4,
              p: 4,
              background: 'linear-gradient(135deg, rgba(148,163,184,0.12), rgba(226,232,240,0.3))',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: 320,
                aspectRatio: '3/4',
                borderRadius: 3,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider',
                backgroundColor: alpha('#0f172a', 0.05),
              }}
            >
              {book.coverImageUrl ? (
                <Box
                  component="img"
                  src={book.coverImageUrl}
                  alt={book.title}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <Stack height="100%" alignItems="center" justifyContent="center">
                  <Typography variant="body2" color="text.secondary">
                    Cover unavailable
                  </Typography>
                </Stack>
              )}
            </Box>
          </Box>
        </Box>

        <Box>
          <Stack spacing={4}>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                {book.genre && (
                  <Chip
                    label={book.genre}
                    color="primary"
                    variant="outlined"
                    sx={{ fontWeight: 600 }}
                  />
                )}
                {book.isFeatured && (
                  <Chip
                    label="Featured"
                    sx={{
                      fontWeight: 600,
                      backgroundColor: alpha('#f59e0b', 0.15),
                      color: '#b45309',
                    }}
                  />
                )}
                {book.isNew && (
                  <Chip
                    label="New"
                    sx={{
                      fontWeight: 600,
                      backgroundColor: alpha('#38bdf8', 0.18),
                      color: '#0ea5e9',
                    }}
                  />
                )}
              </Stack>

              <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
                {book.title}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                {book.author}
              </Typography>

              {book.rating && (
                <Stack direction="row" spacing={2} alignItems="center">
                  <Rating value={book.rating} precision={0.5} readOnly />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {book.rating.toFixed(1)} · {book.reviewCount || 0} reviews
                  </Typography>
                </Stack>
              )}
            </Stack>

            <Divider />

            <Stack spacing={2}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main' }}>
                  ${book.price.toFixed(2)}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  {book.originalPrice && book.originalPrice > book.price && (
                    <Typography
                      variant="body1"
                      sx={{ textDecoration: 'line-through', color: 'text.disabled' }}
                    >
                      ${book.originalPrice.toFixed(2)}
                    </Typography>
                  )}
                  {discountPercentage > 0 && (
                    <Chip label={`Save ${discountPercentage}%`} color="error" sx={{ fontWeight: 600 }} />
                  )}
                </Stack>
              </Stack>

              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                {book.description}
              </Typography>
            </Stack>

            <Divider />

            <Stack spacing={1.5}>
              {metaItems.map(({ key, label }) => {
                const value = formatMetaValue(book[key])
                if (!value || value === '-') {
                  return null
                }
                return (
                  <Stack key={key as string} direction="row" spacing={2}>
                    <Typography
                      variant="body2"
                      sx={{ minWidth: 120, color: 'text.secondary', fontWeight: 600 }}
                    >
                      {label}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.primary' }}>
                      {value}
                    </Typography>
                  </Stack>
                )
              })}
            </Stack>

            <Divider />

            <Stack spacing={2}>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {book.inStock ? (
                  <Chip
                    label={`In Stock · ${book.stockQuantity} left`}
                    color="success"
                    variant="outlined"
                  />
                ) : (
                  <Chip label="Out of Stock" color="error" variant="outlined" />
                )}
                {book.publishedDate && (
                  <Chip
                    label={`Published ${book.publishedDate.toLocaleDateString()}`}
                    variant="outlined"
                    sx={{ color: 'text.secondary' }}
                  />
                )}
              </Stack>

              {book.inStock && (
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Quantity
                  </Typography>
                  <TextField
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    inputProps={{ min: 1, max: book.stockQuantity }}
                    size="small"
                    sx={{ width: 120 }}
                  />
                </Box>
              )}

              {addedToCart && <Alert severity="success">Added to cart successfully!</Alert>}

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<ShoppingCartIcon />}
                  onClick={handleAddToCart}
                  disabled={!book.inStock}
                  sx={{
                    py: 1.5,
                    fontWeight: 700,
                    textTransform: 'none',
                    borderRadius: 3,
                  }}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  onClick={handleToggleFavorite}
                  sx={{
                    py: 1.5,
                    fontWeight: 700,
                    textTransform: 'none',
                    borderRadius: 3,
                    color: isFavorite ? 'error.main' : 'text.primary',
                    borderColor: isFavorite ? 'error.main' : 'divider',
                  }}
                >
                  {isFavorite ? 'Liked' : 'Like'}
                </Button>
              </Stack>
            </Stack>

            <Divider />

            <Stack spacing={2}>
              <Stack direction="row" spacing={3} flexWrap="wrap">
                <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ minWidth: 220 }}>
                  <LocalShippingIcon sx={{ color: 'primary.main', mt: 0.5 }} />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      Free Shipping
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Complimentary delivery on orders over $50.
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ minWidth: 220 }}>
                  <RestartAltIcon sx={{ color: 'primary.main', mt: 0.5 }} />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      Easy Returns
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      30-day hassle-free return policy.
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ minWidth: 220 }}>
                  <SecurityIcon sx={{ color: 'primary.main', mt: 0.5 }} />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      Secure Checkout
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      SSL encrypted payment for peace of mind.
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Container>
  )
}

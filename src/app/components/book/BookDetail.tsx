'use client'

import React, { useState } from 'react'
import {
  Box,
  Button,
  Container,
  Grid,
  Rating,
  Stack,
  Typography,
  Chip,
  Divider,
  TextField,
  Alert,
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

export default function BookDetail({ book }: BookDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addToCart } = useCart()

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10)
    if (!isNaN(value) && value > 0 && value <= book.stockQuantity) {
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
    setIsFavorite(!isFavorite)
  }

  const discountPercentage = book.originalPrice
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
    : book.discount || 0

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumb */}
      <Box sx={{ mb: 4 }}>
        <Link href="/" style={{ color: '#667eea', textDecoration: 'none' }}>
          <Typography variant="body2" sx={{ '&:hover': { textDecoration: 'underline' } }}>
            Home
          </Typography>
        </Link>
        <Typography variant="body2" sx={{ display: 'inline', mx: 1, color: 'text.secondary' }}>
          /
        </Typography>
        <Link href="/books" style={{ color: '#667eea', textDecoration: 'none' }}>
          <Typography variant="body2" sx={{ display: 'inline', '&:hover': { textDecoration: 'underline' } }}>
            Books
          </Typography>
        </Link>
        <Typography variant="body2" sx={{ display: 'inline', mx: 1, color: 'text.secondary' }}>
          /
        </Typography>
        <Typography variant="body2" sx={{ display: 'inline' }}>
          {book.title}
        </Typography>
      </Box>

      {/* Main Content Grid */}
      <Grid container spacing={4}>
        {/* Book Image */}
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              position: 'sticky',
              top: 80,
              width: '100%',
              backgroundColor: alpha('#667eea', 0.05),
              borderRadius: 2,
              p: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 500,
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: 300,
                aspectRatio: '3/4',
                backgroundColor: '#f5f5f5',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              {book.coverImageUrl ? (
                <Box
                  component="img"
                  src={book.coverImageUrl}
                  alt={book.title}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: 1,
                  }}
                />
              ) : (
                <Typography variant="caption" color="textSecondary">
                  No Cover Image
                </Typography>
              )}
            </Box>

            {/* Discount Badge */}
            {discountPercentage > 0 && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  backgroundColor: '#ff6b6b',
                  color: 'white',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                }}
              >
                -{discountPercentage}%
              </Box>
            )}
          </Box>
        </Grid>

        {/* Book Details */}
        <Grid item xs={12} md={7}>
          <Stack spacing={3}>
            {/* Genre Chip */}
            <Box>
              <Chip
                label={book.genre}
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  fontWeight: 600,
                }}
              />
            </Box>

            {/* Title and Author */}
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {book.title}
              </Typography>
              <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400 }}>
                by {book.author}
              </Typography>
            </Box>

            {/* Rating */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Rating
                value={book.rating || 0}
                readOnly
                precision={0.5}
              />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                ({book.reviewCount || 0} reviews)
              </Typography>
            </Box>

            <Divider />

            {/* Price Section */}
            <Box>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: 'primary.main',
                  }}
                >
                  ${book.price.toFixed(2)}
                </Typography>
                {book.originalPrice && book.originalPrice > book.price && (
                  <Typography
                    variant="body1"
                    sx={{
                      textDecoration: 'line-through',
                      color: 'text.disabled',
                    }}
                  >
                    ${book.originalPrice.toFixed(2)}
                  </Typography>
                )}
              </Stack>
            </Box>

            {/* Description */}
            {book.description && (
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Description
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                  {book.description}
                </Typography>
              </Box>
            )}

            {/* Book Info */}
            <Stack spacing={1}>
              {book.publisher && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Publisher:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {book.publisher}
                  </Typography>
                </Box>
              )}
              {book.pageCount && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Pages:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {book.pageCount}
                  </Typography>
                </Box>
              )}
              {book.language && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Language:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {book.language}
                  </Typography>
                </Box>
              )}
              {book.publishedDate && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Published:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {new Date(book.publishedDate).toLocaleDateString()}
                  </Typography>
                </Box>
              )}
            </Stack>

            <Divider />

            {/* Stock Status */}
            <Box>
              {book.inStock ? (
                <Chip
                  label={`In Stock (${book.stockQuantity} available)`}
                  color="success"
                  variant="outlined"
                />
              ) : (
                <Chip
                  label="Out of Stock"
                  color="error"
                  variant="outlined"
                />
              )}
            </Box>

            {/* Quantity Selector */}
            {book.inStock && (
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Quantity
                </Typography>
                <TextField
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  inputProps={{
                    min: 1,
                    max: book.stockQuantity,
                  }}
                  size="small"
                  sx={{ width: 100 }}
                />
              </Box>
            )}

            {/* Add to Cart Alert */}
            {addedToCart && (
              <Alert severity="success">
                Added to cart successfully!
              </Alert>
            )}

            {/* Action Buttons */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                variant="contained"
                fullWidth
                startIcon={<ShoppingCartIcon />}
                onClick={handleAddToCart}
                disabled={!book.inStock}
                sx={{
                  py: 1.5,
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '1rem',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                  },
                }}
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                onClick={handleToggleFavorite}
                sx={{
                  py: 1.5,
                  fontWeight: 600,
                  textTransform: 'none',
                  color: isFavorite ? 'error.main' : 'text.primary',
                  borderColor: isFavorite ? 'error.main' : 'divider',
                }}
              >
                {isFavorite ? 'Liked' : 'Like'}
              </Button>
            </Stack>

            <Divider />

            {/* Shipping & Return Info */}
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <LocalShippingIcon sx={{ color: 'primary.main', mt: 0.5 }} />
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Free Shipping
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    On orders over $50
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <RestartAltIcon sx={{ color: 'primary.main', mt: 0.5 }} />
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Easy Returns
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    30-day return policy
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <SecurityIcon sx={{ color: 'primary.main', mt: 0.5 }} />
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Secure Checkout
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    SSL encrypted transactions
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  )
}

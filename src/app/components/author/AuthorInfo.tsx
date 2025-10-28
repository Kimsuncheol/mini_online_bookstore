'use client'

import {
  Box,
  Container,
  Typography,
  Stack,
  Paper,
  Card,
  CardContent,
  Avatar,
  Button,
  Divider,
  Grid,
  Rating,
  Chip,
} from '@mui/material'
import BookIcon from '@mui/icons-material/Book'
import StarIcon from '@mui/icons-material/Star'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import type { Book } from '@/interfaces/book'

interface AuthorInfoProps {
  authorName: string
  authorEmail?: string
  books: Book[]
}

export default function AuthorInfo({ authorName, authorEmail, books }: AuthorInfoProps) {
  const totalBooks = books.length
  const averageRating =
    books.length > 0
      ? books.reduce((sum, book) => sum + (book.rating || 0), 0) / books.length
      : 0
  const totalReviews = books.reduce((sum, book) => sum + (book.reviewCount || 0), 0)

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Author Header */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 3,
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
          border: '1px solid',
          borderColor: 'divider',
          mb: 4,
        }}
      >
        <Stack direction="row" spacing={3} alignItems="flex-start">
          <Avatar
            sx={{
              width: 120,
              height: 120,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              fontSize: '2.5rem',
              fontWeight: 700,
            }}
          >
            {authorName.charAt(0)}
          </Avatar>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
              {authorName}
            </Typography>

            {authorEmail && (
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <EmailIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {authorEmail}
                </Typography>
              </Stack>
            )}

            <Typography variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
              Explore this author's collection of books. Discover unique perspectives and engaging stories crafted with
              passion.
            </Typography>

            {/* Stats */}
            <Stack direction="row" spacing={3}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  {totalBooks}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {totalBooks === 1 ? 'Book' : 'Books'}
                </Typography>
              </Box>

              <Box>
                <Stack direction="row" alignItems="center" gap={0.5}>
                  <Rating value={averageRating} readOnly size="small" />
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {averageRating.toFixed(1)}
                  </Typography>
                </Stack>
                <Typography variant="caption" color="text.secondary">
                  Avg. Rating
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  {totalReviews}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {totalReviews === 1 ? 'Review' : 'Reviews'}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Paper>

      {/* Books Section */}
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <BookIcon />
            <span>Published Books</span>
          </Stack>
        </Typography>

        {books.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 6,
              textAlign: 'center',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <BookIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              No books published yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This author hasn't published any books yet. Check back soon!
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {books.map((book) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 3,
                    },
                  }}
                >
                  {/* Book Cover */}
                  <Box
                    sx={{
                      height: 240,
                      backgroundColor: '#e0e0e0',
                      backgroundImage: book.coverImageUrl
                        ? `url(${book.coverImageUrl})`
                        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative',
                    }}
                  >
                    {book.discount && book.discount > 0 && (
                      <Chip
                        label={`-${book.discount}%`}
                        color="error"
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          fontWeight: 700,
                        }}
                      />
                    )}
                  </Box>

                  <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Title */}
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        mb: 0.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {book.title}
                    </Typography>

                    {/* Genre */}
                    <Chip label={book.genre} size="small" sx={{ mb: 2, alignSelf: 'flex-start' }} />

                    {/* Rating */}
                    {book.rating && (
                      <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 2 }}>
                        <Rating value={book.rating} readOnly size="small" />
                        <Typography variant="caption" color="text.secondary">
                          ({book.reviewCount || 0})
                        </Typography>
                      </Stack>
                    )}

                    {/* Price */}
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 'auto', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                        ${book.price.toFixed(2)}
                      </Typography>
                      {book.originalPrice && book.originalPrice > book.price && (
                        <Typography
                          variant="caption"
                          sx={{
                            textDecoration: 'line-through',
                            color: 'text.disabled',
                          }}
                        >
                          ${book.originalPrice.toFixed(2)}
                        </Typography>
                      )}
                    </Stack>

                    {/* Stock Status */}
                    <Chip
                      label={book.inStock ? 'In Stock' : 'Out of Stock'}
                      color={book.inStock ? 'success' : 'error'}
                      variant="outlined"
                      size="small"
                    />

                    {/* View Button */}
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{ mt: 2, textTransform: 'none', fontWeight: 600 }}
                      href={`/book/${book.id}`}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  )
}

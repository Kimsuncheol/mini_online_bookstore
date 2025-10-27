'use client'

import { Box, Paper, Typography, Card, CardContent, CardMedia, Chip, Stack } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import { useRouter } from 'next/navigation'

interface BookRecommendation {
  bookId: string
  title: string
  author: string
  price: number
  coverImageUrl?: string
  relevanceScore: number
  reason: string
}

interface AIBookRecommendationsProps {
  books: BookRecommendation[]
}

export default function AIBookRecommendations({ books }: AIBookRecommendationsProps) {
  const router = useRouter()

  if (!books || books.length === 0) return null

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
        <StarIcon sx={{ fontSize: 18, color: 'primary.main' }} />
        Recommended Books
      </Typography>
      <Stack spacing={1.5}>
        {books.map((book) => (
          <Card
            key={book.bookId}
            sx={{
              display: 'flex',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              '&:hover': {
                boxShadow: 3,
                transform: 'translateY(-2px)',
              },
            }}
            onClick={() => router.push(`/book/${book.bookId}`)}
          >
            {book.coverImageUrl && (
              <CardMedia
                component="img"
                sx={{ width: 80, objectFit: 'cover' }}
                image={book.coverImageUrl}
                alt={book.title}
              />
            )}
            <CardContent sx={{ flex: 1, p: 2, '&:last-child': { pb: 2 } }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                {book.title}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                by {book.author}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: '0.8rem' }}>
                {book.reason}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="subtitle2" color="primary.main" sx={{ fontWeight: 700 }}>
                  ${book.price.toFixed(2)}
                </Typography>
                <Chip
                  label={`${Math.round(book.relevanceScore * 100)}% match`}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ fontSize: '0.7rem', height: 20 }}
                />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  )
}

import { Box, Rating, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { Book } from '@/interfaces/book'

interface TrendingBooksSectionProps {
  books: Book[]
}

export default function TrendingBooksSection({ books }: TrendingBooksSectionProps) {
  if (books.length === 0) return null

  return (
    <Stack spacing={3}>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        Currently Trending
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
        }}
      >
        {books.map((book, index) => (
          <Box
            key={`${book.id}-${index}`}
            sx={{
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              backgroundColor: 'background.paper',
              display: 'flex',
              gap: 2,
              p: 2,
              alignItems: 'stretch',
              height: '100%',
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 16px rgba(15, 23, 42, 0.1)',
              },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: index < 3 ? 'primary.main' : 'text.secondary',
                lineHeight: 1,
              }}
            >
              {index + 1}
            </Typography>
            <Stack spacing={1} sx={{ flex: 1, minWidth: 0 }}>
              <Link href={`/books/${book.id}`} style={{ textDecoration: 'none' }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    color: 'text.primary',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  {book.title}
                </Typography>
              </Link>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {book.author}
              </Typography>
              {book.rating && (
                <Stack direction="row" spacing={1} alignItems="center">
                  <Rating value={book.rating} precision={0.5} readOnly size="small" />
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {book.reviewCount || 0} reviews
                  </Typography>
                </Stack>
              )}
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  ${book.price.toFixed(2)}
                </Typography>
                {book.originalPrice && book.originalPrice > book.price && (
                  <Typography
                    variant="caption"
                    sx={{ textDecoration: 'line-through', color: 'text.disabled' }}
                  >
                    ${book.originalPrice.toFixed(2)}
                  </Typography>
                )}
              </Stack>
            </Stack>
          </Box>
        ))}
      </Box>
    </Stack>
  )
}

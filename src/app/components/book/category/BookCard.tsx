import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Rating,
  Stack,
  Typography,
  alpha,
} from '@mui/material'
import Link from 'next/link'
import { Book } from '@/interfaces/book'

interface BookCardProps {
  book: Book
}

const FALLBACK_IMAGE_BG = alpha('#0f172a', 0.06)

export default function BookCard({ book }: BookCardProps) {
  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 16px 32px rgba(15, 23, 42, 0.12)',
        },
      }}
    >
      <Link href={`/book/${book.id}`} style={{ textDecoration: 'none' }}>
        <CardMedia
          sx={{
            position: 'relative',
            pt: '140%',
            backgroundColor: FALLBACK_IMAGE_BG,
            overflow: 'hidden',
          }}
        >
          {book.coverImageUrl ? (
            <Box
              component="img"
              src={book.coverImageUrl}
              alt={book.title}
              sx={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'scale(1.05)' },
              }}
            />
          ) : (
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'text.secondary',
                fontSize: 12,
              }}
            >
              No image
            </Box>
          )}

          {book.isNew && (
            <Chip
              size="small"
              label="New"
              sx={{
                position: 'absolute',
                top: 16,
                left: 16,
                fontWeight: 600,
                backgroundColor: '#0ea5e9',
                color: '#fff',
              }}
            />
          )}
          {book.discount && (
            <Chip
              size="small"
              label={`-${book.discount}%`}
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                fontWeight: 600,
                backgroundColor: '#f97316',
                color: '#fff',
              }}
            />
          )}
        </CardMedia>
      </Link>

      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1, pt: 2 }}>
        <Link href={`/book/${book.id}`} style={{ textDecoration: 'none' }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              color: 'text.primary',
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
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
              {book.rating.toFixed(1)}
            </Typography>
          </Stack>
        )}

        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'primary.main' }}>
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
      </CardContent>
    </Card>
  )
}

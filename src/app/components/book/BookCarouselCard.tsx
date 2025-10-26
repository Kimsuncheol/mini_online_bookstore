import { Box, Chip, Typography, alpha } from '@mui/material'
import Link from 'next/link'
import { Book } from '@/interfaces/book'

interface BookCarouselCardProps {
  book: Book
  variant?: 'featured' | 'default'
}

const FALLBACK_IMAGE_BG = alpha('#0f172a', 0.06)

export default function BookCarouselCard({ book, variant = 'default' }: BookCarouselCardProps) {
  return (
    <Box
      sx={{
        borderRadius: 4,
        p: 3,
        background:
          variant === 'featured'
            ? `linear-gradient(135deg, ${alpha('#6366f1', 0.16)}, ${alpha('#8b5cf6', 0.2)})`
            : 'background.paper',
        border: variant === 'default' ? '1px solid' : 'none',
        borderColor: variant === 'default' ? 'divider' : 'transparent',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        height: '100%',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        },
      }}
    >
      {variant === 'featured' && (
        <Chip label="Featured" sx={{ alignSelf: 'flex-start', fontWeight: 600 }} />
      )}

      <Link href={`/books/${book.id}`} style={{ textDecoration: 'none' }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: 'text.primary',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontSize: variant === 'featured' ? '1.25rem' : '1rem',
          }}
        >
          {book.title}
        </Typography>
      </Link>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {book.author}
      </Typography>

      <Box
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          width: '100%',
          pt: '120%',
          position: 'relative',
          backgroundColor: FALLBACK_IMAGE_BG,
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
      </Box>

      {book.price && (
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'primary.main', mt: 'auto' }}>
          ${book.price.toFixed(2)}
        </Typography>
      )}
    </Box>
  )
}

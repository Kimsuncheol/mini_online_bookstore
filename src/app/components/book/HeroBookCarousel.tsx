'use client'

import Link from 'next/link'
import LaunchIcon from '@mui/icons-material/Launch'
import {
  Box,
  Button,
  Chip,
  Stack,
  Typography,
  alpha,
  useMediaQuery,
  Theme,
} from '@mui/material'
import InfiniteCarousel from '../common/InfiniteCarousel'
import { Book } from '@/interfaces/book'

interface HeroBookCarouselProps {
  books: Book[]
}

const FALLBACK_IMAGE_BG = alpha('#0f172a', 0.06)

function HeroBookSlide({ book }: { book: Book }) {
  return (
    <Box
      component="article"
      sx={{
        height: '100%',
        borderRadius: 4,
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(51,65,85,0.85), rgba(15,23,42,0.95))',
        color: '#fff',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 3, md: 5 },
        px: { xs: 4, md: 6 },
        py: { xs: 5, md: 6 },
        // boxShadow: '0 24px 48px rgba(15, 23, 42, 0.35)',
      }}
    >
      <Stack spacing={2} sx={{ flex: 1, maxWidth: { md: 420 } }}>
        <Chip
          label="Recommended"
          sx={{
            alignSelf: 'flex-start',
            backgroundColor: 'rgba(255,255,255,0.16)',
            color: '#fff',
            fontWeight: 600,
          }}
        />
        <Typography variant="h4" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
          {book.title}
        </Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
          {book.author}
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.8 }}>
          {book.description?.slice(0, 180) ||
            'Discover a handpicked title our editors are loving right now.'}
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#38bdf8' }}>
            ${book.price.toFixed(2)}
          </Typography>
          {book.originalPrice && book.originalPrice > book.price && (
            <Typography variant="body2" sx={{ textDecoration: 'line-through', opacity: 0.6 }}>
              ${book.originalPrice.toFixed(2)}
            </Typography>
          )}
        </Stack>
        <Link href={`/books/${book.id}`} style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            endIcon={<LaunchIcon />}
            sx={{
              backgroundColor: '#38bdf8',
              color: '#0f172a',
              fontWeight: 700,
              textTransform: 'none',
              px: 3,
              borderRadius: 999,
              '&:hover': { backgroundColor: '#0ea5e9', color: '#fff' },
            }}
          >
            View details
          </Button>
        </Link>
      </Stack>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: { xs: 260, md: 'auto' },
        }}
      >
        <Box
          sx={{
            width: { xs: 220, sm: 260, md: 320 },
            aspectRatio: '3/4',
            borderRadius: 3,
            overflow: 'hidden',
            border: '1px solid rgba(148,163,184,0.4)',
            boxShadow: '0 20px 40px rgba(15,23,42,0.45)',
            backgroundColor: FALLBACK_IMAGE_BG,
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
            <Stack
              sx={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.6)',
                fontSize: 12,
              }}
            >
              No image
            </Stack>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default function HeroBookCarousel({ books }: HeroBookCarouselProps) {
  const hasBooks = books.length > 0
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  if (!hasBooks) {
    return null
  }

  const carouselItemWidth = isSmall ? 320 : 620

  return (
    <Box sx={{ position: 'relative' }}>
      <InfiniteCarousel
        itemWidth={carouselItemWidth}
        gap={32}
        autoPlay
        autoPlayInterval={4500}
        showArrows={!isSmall}
      >
        {books.map((book) => (
          <HeroBookSlide key={book.id} book={book} />
        ))}
      </InfiniteCarousel>
    </Box>
  )
}

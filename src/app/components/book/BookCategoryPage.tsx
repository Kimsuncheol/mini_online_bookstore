'use client'

import React, { useMemo } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Rating,
  Stack,
  Typography,
  alpha,
  useMediaQuery,
} from '@mui/material'
import Link from 'next/link'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark'
import { Book } from '@/interfaces/book'
import InfiniteCarousel from '../common/InfiniteCarousel'
import BookCarouselCard from './BookCarouselCard'
import HeroBookCarousel from './HeroBookCarousel'

interface BookCategoryPageProps {
  category: string
  title: string
  description: string
  books: Book[]
}

type LayoutVariant = 'recommended' | 'featured' | 'grid'

const FALLBACK_IMAGE_BG = alpha('#0f172a', 0.06)

const quickActions = [
  { label: 'Prime Picks', icon: RocketLaunchIcon },
  { label: 'Deals', icon: LocalOfferIcon },
  { label: 'Curated Lists', icon: AutoAwesomeIcon },
  { label: 'Collections', icon: CollectionsBookmarkIcon },
]

export default function BookCategoryPage({
  category,
  title,
  description,
  books,
}: BookCategoryPageProps) {
  const isMax440 = useMediaQuery('(max-width:440px)')
  const isMax660 = useMediaQuery('(max-width:660px)')
  const isMax880 = useMediaQuery('(max-width:880px)')

  const gridColumns = useMemo(() => {
    if (isMax440) return 2
    if (isMax660) return 3
    if (isMax880) return 4
    return 5
  }, [isMax440, isMax660, isMax880])

  const layoutVariant: LayoutVariant = useMemo(() => {
    if (category === 'recommended') return 'recommended'
    if (category === 'featured-collection') return 'featured'
    return 'grid'
  }, [category])

  const heroBook = books[0]
  const heroCarouselBooks = books.slice(0, 5)

  const renderBookCard = (book: Book) => (
    <Card
      key={book.id}
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
      <Link href={`/books/${book.id}`} style={{ textDecoration: 'none' }}>
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
        <Link href={`/books/${book.id}`} style={{ textDecoration: 'none' }}>
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

  const renderStandardGrid = (subset: Book[]) => (
    <Box
      sx={{
        display: 'grid',
        gap: 3,
        gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
      }}
    >
      {subset.map((book) => (
        <Box key={book.id}>{renderBookCard(book)}</Box>
      ))}
    </Box>
  )

  const renderRecommendedLayout = () => {
    if (!heroBook) return renderEmptyState()

    const ranking = books.slice(0, 8)
    const remainder = books.slice(8)

    return (
      <Stack spacing={6}>
        <HeroBookCarousel books={heroCarouselBooks} />

        <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', pb: 1 }}>
          {quickActions.map(({ label, icon: Icon }) => (
            <Button
              key={label}
              variant="outlined"
              startIcon={<Icon />}
              sx={{ flexShrink: 0, borderRadius: 999, px: 3, textTransform: 'none', fontWeight: 600 }}
            >
              {label}
            </Button>
          ))}
        </Stack>

        {ranking.length > 0 && (
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
              {ranking.map((book, index) => (
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
        )}

        {remainder.length > 0 && (
          <Stack spacing={2}>
            <Divider textAlign="left">
              <Typography variant="overline" sx={{ letterSpacing: 2, color: 'text.secondary' }}>
                Explore More
              </Typography>
            </Divider>
            {renderStandardGrid(remainder)}
          </Stack>
        )}
      </Stack>
    )
  }

  const renderFeaturedLayout = () => {
    if (!heroBook) return renderEmptyState()

    const showcase = books.slice(0, 8)
    const remainder = books.slice(8)

    return (
      <Stack spacing={6}>
        <Stack spacing={2}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Spotlight Collection
          </Typography>
          <InfiniteCarousel itemWidth={260} gap={24} autoPlay autoPlayInterval={4000}>
            {showcase.map((book) => (
              <BookCarouselCard key={book.id} book={book} variant="featured" />
            ))}
          </InfiniteCarousel>
        </Stack>

        {remainder.length > 0 && (
          <Stack spacing={2}>
            <Divider textAlign="left">
              <Typography variant="overline" sx={{ letterSpacing: 2, color: 'text.secondary' }}>
                Browse Collection
              </Typography>
            </Divider>
            {renderStandardGrid(remainder)}
          </Stack>
        )}
      </Stack>
    )
  }

  const renderEmptyState = () => (
    <Box
      sx={{
        textAlign: 'center',
        py: 10,
        borderRadius: 4,
        border: '1px dashed',
        borderColor: 'divider',
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        We couldn&apos;t find any books for this collection.
      </Typography>
      <Link href="/">
        <Button variant="contained">Back to Home</Button>
      </Link>
    </Box>
  )

  const renderContent = () => {
    if (!books.length) {
      return renderEmptyState()
    }

    if (layoutVariant === 'recommended') {
      return renderRecommendedLayout()
    }

    if (layoutVariant === 'featured') {
      return renderFeaturedLayout()
    }

    return renderStandardGrid(books)
  }

  return (
    <Container maxWidth={false} sx={{ py: { xs: 4, md: 6 } }}>
      <Stack spacing={1.5} sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 800, letterSpacing: -0.5 }}>
          {title}
        </Typography>
        {description && (
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 680 }}>
            {description}
          </Typography>
        )}
        <Typography variant="body2" sx={{ color: 'text.disabled' }}>
          {books.length} book{books.length !== 1 ? 's' : ''} available
        </Typography>
      </Stack>

      {renderContent()}
    </Container>
  )
}

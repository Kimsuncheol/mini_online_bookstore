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
import LaunchIcon from '@mui/icons-material/Launch'
import { Book } from '@/interfaces/book'

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
        <Box
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            position: 'relative',
            background: 'linear-gradient(135deg, rgba(51,65,85,0.85), rgba(15,23,42,0.95))',
            color: '#fff',
            px: { xs: 4, md: 6 },
            py: { xs: 5, md: 6 },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 4, md: 6 },
          }}
        >
          <Stack spacing={2} sx={{ flex: 1, maxWidth: { md: 440 } }}>
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
              {heroBook.title}
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.8 }}>
              {heroBook.description?.slice(0, 180) ||
                'Discover a handpicked title our editors are loving right now.'}
            </Typography>
            <Link href={`/books/${heroBook.id}`} style={{ textDecoration: 'none' }}>
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
              {heroBook.coverImageUrl && (
                <Box
                  component="img"
                  src={heroBook.coverImageUrl}
                  alt={heroBook.title}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
            </Box>
          </Box>
        </Box>

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

    const showcase = books.slice(0, 5)
    const remainder = books.slice(5)

    return (
      <Stack spacing={6}>
        <Stack spacing={2}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Spotlight Collection
          </Typography>
          <Stack
            direction="row"
            spacing={3}
            sx={{
              overflowX: 'auto',
              pb: 2,
              '&::-webkit-scrollbar': { height: 6 },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: alpha('#0f172a', 0.2),
                borderRadius: 999,
              },
            }}
          >
            {showcase.map((book) => (
              <Box
                key={book.id}
                sx={{
                  flexShrink: 0,
                  width: 260,
                  borderRadius: 4,
                  p: 3,
                  background: `linear-gradient(135deg, ${alpha('#6366f1', 0.16)}, ${alpha('#8b5cf6', 0.2)})`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                <Chip label="Featured" sx={{ alignSelf: 'flex-start', fontWeight: 600 }} />
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
                  {book.coverImageUrl && (
                    <Box
                      component="img"
                      src={book.coverImageUrl}
                      alt={book.title}
                      sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )}
                </Box>
              </Box>
            ))}
          </Stack>
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

'use client'

import React, { useMemo, useState } from 'react'
import { Box, Button, Container, Divider, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark'
import { Book, HeroCarouselBook } from '@/interfaces/book'
import HeroBookCarousel from './HeroBookCarousel'
import QuickActionChips, { QuickAction } from './category/QuickActionsGrid'
import TrendingBooksSection from './category/TrendingBooksSection'
import BookCardGrid from './category/BookCardGrid'
import QuickAccessGrid from '../common/QuickAccessGrid'

interface BookCategoryPageProps {
  category: string
  title: string
  description: string
  books: Book[]
}

type LayoutVariant = 'recommended' | 'featured' | 'grid'

const quickActions: QuickAction[] = [
  { label: 'Prime Picks', icon: RocketLaunchIcon, value: 'prime' },
  { label: 'Deals', icon: LocalOfferIcon, value: 'deals' },
  { label: 'Curated Lists', icon: AutoAwesomeIcon, value: 'curated' },
  { label: 'Collections', icon: CollectionsBookmarkIcon, value: 'collections' },
]

export default function BookCategoryPage({
  category,
  title,
  description,
  books,
}: BookCategoryPageProps) {
  const [activeQuickAction, setActiveQuickAction] = useState('prime')

  const layoutVariant: LayoutVariant = useMemo(() => {
    if (category === 'recommended') return 'recommended'
    if (category === 'featured-collection') return 'featured'
    return 'grid'
  }, [category])

  const heroCarouselBooks: HeroCarouselBook[] = books.slice(0, 5).map((book) => ({
    id: book.id,
    title: book.title,
    author: book.author,
    description:
      book.description ?? 'Discover a handpicked title our editors are loving right now.',
    price: book.price,
    pageCount: book.pageCount,
    originalPrice: book.originalPrice,
    coverImageUrl: book.coverImageUrl,
  }))

  // Filter books based on active quick action
  const filteredBooks = useMemo(() => {
    switch (activeQuickAction) {
      case 'prime':
        // Prime Picks: Featured books or high-rated books
        return books.filter((book) => book.isFeatured || (book.rating && book.rating >= 4.5))
      case 'deals':
        // Deals: Books with discounts
        return books.filter((book) => book.discount && book.discount > 0)
      case 'curated':
        // Curated Lists: New releases or recently added
        return books.filter((book) => book.isNew)
      case 'collections':
        // Collections: All books grouped (for now just return all)
        return books
      default:
        return books
    }
  }, [books, activeQuickAction])

  const getActiveTagLabel = () => {
    const action = quickActions.find((a) => a.value === activeQuickAction)
    return action?.label || ''
  }

  const renderRecommendedLayout = () => {
    if (books.length === 0) return renderEmptyState()

    const ranking = books.slice(0, 8)

    return (
      <Stack spacing={6}>
        <HeroBookCarousel books={heroCarouselBooks} />

        {/* Quick Access Section */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2.5 }}>
            Quick Access
          </Typography>
          <QuickAccessGrid />
        </Box>

        <Stack spacing={3}>
          <QuickActionChips
            actions={quickActions}
            activeAction={activeQuickAction}
            onActionClick={setActiveQuickAction}
          />

          <Stack spacing={2}>
            <BookCardGrid
              books={filteredBooks}
              activeTag={activeQuickAction}
              tagLabel={getActiveTagLabel()}
            />
          </Stack>
        </Stack>

        <TrendingBooksSection books={ranking} />
      </Stack>
    )
  }

  const renderFeaturedLayout = () => {
    if (books.length === 0) return renderEmptyState()

    return (
      <Stack spacing={6}>
        <HeroBookCarousel books={heroCarouselBooks} />

        <QuickActionChips
          actions={quickActions}
          activeAction={activeQuickAction}
          onActionClick={setActiveQuickAction}
        />

        <Stack spacing={2}>
          <Divider textAlign="left">
            <Typography variant="overline" sx={{ letterSpacing: 2, color: 'text.secondary' }}>
              {getActiveTagLabel()}
            </Typography>
          </Divider>
          <BookCardGrid
            books={filteredBooks}
            activeTag={activeQuickAction}
            tagLabel={getActiveTagLabel()}
          />
        </Stack>
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

    // Default grid layout with quick actions
    return (
      <Stack spacing={6}>
        <QuickActionChips
          actions={quickActions}
          activeAction={activeQuickAction}
          onActionClick={setActiveQuickAction}
        />
        <Stack spacing={2}>
          <Divider textAlign="left">
            <Typography variant="overline" sx={{ letterSpacing: 2, color: 'text.secondary' }}>
              {getActiveTagLabel()}
            </Typography>
          </Divider>
          <BookCardGrid
            books={filteredBooks}
            activeTag={activeQuickAction}
            tagLabel={getActiveTagLabel()}
          />
        </Stack>
      </Stack>
    )
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

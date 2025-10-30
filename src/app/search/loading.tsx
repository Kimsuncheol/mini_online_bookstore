'use client'

import React, { useState, useEffect } from 'react'
import { Container, Box } from '@mui/material'
import SearchPageHeaderSearchField from '@/app/components/search/SearchPageHeaderSearchField'
import SearchLoadingSkeleton from '@/app/components/search/SearchLoadingSkeleton'
import type { LayoutType } from '@/app/components/search/GridListToggle'

const RESULTS_PER_PAGE = 12

export default function SearchLoading() {
  const [layout] = useState<LayoutType>('grid')

  // Prevent hydration mismatch by using useEffect
  useEffect(() => {
    // This ensures the component only renders on the client side
  }, [])

  const handleDummySearch = () => {
    // Dummy handler for the header
  }

  return (
    <>
      {/* Search Page Header */}
      <SearchPageHeaderSearchField
        onSearch={handleDummySearch}
        currentQuery=""
      />

      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 2, md: 3 },
          minHeight: 'calc(100vh - 200px)',
          backgroundColor: 'background.default',
        }}
      >
        <Box sx={{ mb: 3 }}>
          {/* Loading Skeleton */}
          <SearchLoadingSkeleton layout={layout} count={RESULTS_PER_PAGE} />
        </Box>
      </Container>
    </>
  )
}

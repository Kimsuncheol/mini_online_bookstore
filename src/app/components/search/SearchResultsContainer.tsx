'use client'

import { Grid, Box, Typography, CircularProgress } from '@mui/material'
import SearchResultCard from './SearchResultCard'
import type { SearchResultItem } from '@/interfaces/search'
import type { LayoutType } from './GridListToggle'

interface SearchResultsContainerProps {
  items: SearchResultItem[]
  layout: LayoutType
  isLoading?: boolean
  error?: string | null
}

export default function SearchResultsContainer({
  items,
  layout,
  isLoading = false,
  error = null,
}: SearchResultsContainerProps) {
  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" color="error" sx={{ mb: 1 }}>
          Error loading results
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {error}
        </Typography>
      </Box>
    )
  }

  if (items.length === 0 && !isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" color="textSecondary" sx={{ mb: 1 }}>
          No results found
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Try adjusting your search query
        </Typography>
      </Box>
    )
  }

  if (layout === 'list') {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {items.map((item) => (
          <SearchResultCard key={item.id} item={item} layout="list" />
        ))}
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        )}
      </Box>
    )
  }

  // Grid layout
  return (
    <Box>
      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <SearchResultCard item={item} layout="grid" />
          </Grid>
        ))}
      </Grid>
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  )
}

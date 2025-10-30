'use client'

import { Grid, Skeleton, Card, CardContent, Box, Stack } from '@mui/material'
import type { LayoutType } from './GridListToggle'

interface SearchLoadingSkeletonProps {
  layout?: LayoutType
  count?: number
}

export default function SearchLoadingSkeleton({
  layout = 'grid',
  count = 8,
}: SearchLoadingSkeletonProps) {
  if (layout === 'list') {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {Array.from({ length: count }).map((_, index) => (
          <Card
            key={index}
            sx={{
              display: 'flex',
              borderRadius: 2,
            }}
          >
            <Skeleton
              variant="rectangular"
              width={120}
              height={160}
              sx={{ flexShrink: 0 }}
            />
            <CardContent
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              <Stack direction="row" spacing={1}>
                <Skeleton variant="text" width="80px" height={24} />
                <Skeleton variant="text" width="100px" height={24} />
              </Stack>
              <Skeleton variant="text" width="80%" height={28} />
              <Skeleton variant="text" width="60%" height={20} />
              <Skeleton variant="text" width="100%" height={16} />
              <Skeleton variant="text" width="90%" height={16} />
            </CardContent>
          </Card>
        ))}
      </Box>
    )
  }

  // Grid layout
  return (
    <Grid container spacing={2}>
      {Array.from({ length: count }).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 2,
            }}
          >
            <Skeleton
              variant="rectangular"
              width="100%"
              height={180}
              sx={{ flexShrink: 0 }}
            />
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Skeleton variant="text" width="100%" height={24} />
              <Skeleton variant="text" width="80%" height={24} />
              <Skeleton variant="text" width="60%" height={16} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

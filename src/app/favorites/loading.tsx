import { Container, Grid, Skeleton, Box, Stack } from '@mui/material'

export default function FavoritesLoading() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Skeleton */}
      <Stack spacing={1} sx={{ mb: 4 }}>
        <Skeleton variant="text" width="40%" height={40} />
        <Skeleton variant="text" width="60%" height={20} />
      </Stack>

      {/* Grid Skeleton */}
      <Grid container spacing={3}>
        {Array.from({ length: 12 }).map((_, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Box>
              {/* Cover Image Skeleton */}
              <Skeleton
                variant="rectangular"
                height={300}
                sx={{ borderRadius: 2, mb: 2 }}
              />
              {/* Title Skeleton */}
              <Skeleton variant="text" width="90%" height={24} sx={{ mb: 1 }} />
              {/* Author Skeleton */}
              <Skeleton variant="text" width="70%" height={16} sx={{ mb: 1 }} />
              {/* Rating Skeleton */}
              <Skeleton variant="text" width="50%" height={16} sx={{ mb: 2 }} />
              {/* Buttons Skeleton */}
              <Stack direction="row" spacing={1}>
                <Skeleton variant="rectangular" height={36} sx={{ flex: 1, borderRadius: 1 }} />
                <Skeleton variant="rectangular" height={36} width={40} sx={{ borderRadius: 1 }} />
              </Stack>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

'use client'

import { Container, Box, Skeleton, Stack, Paper, Grid } from '@mui/material'

export default function DashboardPageSkeleton() {
  return (
    <Container maxWidth="lg" sx={{ py: 4, pb: 6 }}>
      {/* Welcome Section Skeleton */}
      <Stack spacing={1} sx={{ mb: 5 }}>
        <Skeleton width={300} height={48} />
        <Skeleton width="60%" height={24} />
      </Stack>

      {/* Quick Access Section Skeleton */}
      <Box sx={{ mb: 6 }}>
        <Skeleton width={150} height={28} sx={{ mb: 2.5 }} />
        <Grid container spacing={2}>
          {[...Array(4)].map((_, i) => (
            <Grid item xs={6} sm={6} md={3} key={i}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  p: 3,
                  minHeight: 140,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Skeleton variant="circular" width={40} height={40} sx={{ mb: 1.5 }} />
                <Skeleton width="80%" height={20} sx={{ mb: 0.5 }} />
                <Skeleton width="60%" height={16} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Featured Books Section Skeleton */}
      <Box sx={{ mb: 6 }}>
        <Skeleton width={200} height={28} sx={{ mb: 2.5 }} />
        <Skeleton variant="rounded" width="100%" height={300} sx={{ borderRadius: 2 }} />
      </Box>
    </Container>
  )
}

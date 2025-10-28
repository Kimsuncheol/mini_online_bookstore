import { Container, Box, Skeleton, Stack, Paper } from '@mui/material'

export default function AuthorPageSkeleton() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Author Header Skeleton */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
          borderRadius: 3,
          p: 4,
          mb: 4,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={3} sx={{ mb: 3 }}>
          <Skeleton variant="circular" width={120} height={120} />
          <Box sx={{ flex: 1 }}>
            <Skeleton width="40%" height={40} sx={{ mb: 1 }} />
            <Skeleton width="60%" height={20} sx={{ mb: 2 }} />
            <Stack direction="row" spacing={3}>
              <Box>
                <Skeleton width={100} height={20} sx={{ mb: 0.5 }} />
                <Skeleton width={60} height={28} />
              </Box>
              <Box>
                <Skeleton width={100} height={20} sx={{ mb: 0.5 }} />
                <Skeleton width={60} height={28} />
              </Box>
              <Box>
                <Skeleton width={100} height={20} sx={{ mb: 0.5 }} />
                <Skeleton width={60} height={28} />
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Box>

      {/* Books Grid Skeleton */}
      <Box sx={{ mb: 4 }}>
        <Skeleton width={200} height={32} sx={{ mb: 3 }} />
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
          }}
        >
          {[...Array(8)].map((_, i) => (
            <Paper
              key={i}
              elevation={0}
              sx={{
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                overflow: 'hidden',
              }}
            >
              {/* Book Cover Skeleton */}
              <Skeleton
                variant="rectangular"
                width="100%"
                height={240}
                sx={{ mb: 0 }}
              />

              {/* Book Info Skeleton */}
              <Box sx={{ p: 2 }}>
                <Skeleton width="90%" height={24} sx={{ mb: 1 }} />
                <Skeleton width="70%" height={20} sx={{ mb: 2 }} />
                <Skeleton width={80} height={24} sx={{ mb: 2 }} />

                {/* Price Skeleton */}
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <Skeleton width={80} height={28} />
                  <Skeleton width={80} height={20} />
                </Stack>

                {/* Rating Skeleton */}
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <Skeleton width={120} height={20} />
                  <Skeleton width={60} height={20} />
                </Stack>

                {/* Button Skeleton */}
                <Skeleton variant="rounded" width="100%" height={36} />
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>
    </Container>
  )
}

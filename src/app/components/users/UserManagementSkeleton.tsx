import { Container, Box, Skeleton, Stack, Paper } from '@mui/material'

export default function UserManagementSkeleton() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Skeleton */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Skeleton variant="rounded" width={48} height={48} />
          <Box>
            <Skeleton width={200} height={36} />
            <Skeleton width={300} height={20} sx={{ mt: 0.5 }} />
          </Box>
        </Stack>

        {/* Stats Skeleton */}
        <Stack direction="row" spacing={2} sx={{ mt: 3, overflowX: 'auto', pb: 1 }}>
          {[...Array(4)].map((_, i) => (
            <Paper
              key={i}
              elevation={0}
              sx={{
                minWidth: 200,
                p: 2.5,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Skeleton width={100} height={20} sx={{ mb: 1 }} />
              <Skeleton width={60} height={40} />
            </Paper>
          ))}
        </Stack>
      </Box>

      {/* Search Bar Skeleton */}
      <Box sx={{ mb: 4 }}>
        <Skeleton variant="rounded" width="100%" height={56} sx={{ mb: 2, borderRadius: 3 }} />
        <Stack direction="row" spacing={1}>
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} variant="rounded" width={120} height={36} sx={{ borderRadius: 2 }} />
          ))}
        </Stack>
      </Box>

      {/* User Cards Grid Skeleton */}
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
          <Box
            key={i}
            sx={{
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              p: 2,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Skeleton variant="circular" width={56} height={56} />
              <Skeleton variant="circular" width={24} height={24} />
            </Box>
            <Skeleton width="80%" height={24} sx={{ mb: 1 }} />
            <Skeleton width="100%" height={20} sx={{ mb: 2 }} />
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              <Skeleton variant="rounded" width={80} height={24} />
              <Skeleton variant="rounded" width={70} height={24} />
            </Stack>
            <Skeleton width="60%" height={16} />
          </Box>
        ))}
      </Box>
    </Container>
  )
}

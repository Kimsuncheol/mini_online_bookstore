import { Container, Box, Skeleton, Stack, Paper } from '@mui/material'

export default function CheckInPageSkeleton() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Skeleton */}
      <Stack spacing={3} sx={{ mb: 4 }}>
        <Box>
          <Skeleton width={250} height={40} sx={{ mb: 1 }} />
          <Skeleton width="60%" height={24} />
        </Box>
        <Skeleton variant="rounded" width={150} height={48} />
      </Stack>

      {/* Stats Skeleton */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
          gap: 2,
          mb: 4,
        }}
      >
        {[...Array(3)].map((_, i) => (
          <Paper key={i} elevation={0} sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider', p: 2 }}>
            <Skeleton width={32} height={32} sx={{ mb: 1 }} />
            <Skeleton width="80%" height={20} sx={{ mb: 1 }} />
            <Skeleton width={60} height={36} />
          </Paper>
        ))}
      </Box>

      {/* Attendance Grid Skeleton */}
      <Box sx={{ mb: 4 }}>
        <Skeleton width={200} height={28} sx={{ mb: 2 }} />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '12px',
            p: 3,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          {[...Array(90)].map((_, i) => (
            <Skeleton key={i} variant="rounded" width="100%" height={50} />
          ))}
        </Box>
      </Box>

      {/* Spin Wheel Skeleton */}
      <Box sx={{ mb: 4 }}>
        <Skeleton width={180} height={28} sx={{ mb: 2 }} />
        <Skeleton width="100%" height={400} variant="rounded" sx={{ borderRadius: 2 }} />
      </Box>

      {/* Coupons Skeleton */}
      <Box>
        <Skeleton width={150} height={28} sx={{ mb: 2 }} />
        <Stack spacing={2}>
          {[...Array(3)].map((_, i) => (
            <Paper key={i} elevation={0} sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider', p: 2 }}>
              <Skeleton width="30%" height={32} sx={{ mb: 1 }} />
              <Skeleton width="60%" height={20} sx={{ mb: 2 }} />
              <Skeleton width="100%" height={60} variant="rounded" />
            </Paper>
          ))}
        </Stack>
      </Box>
    </Container>
  )
}

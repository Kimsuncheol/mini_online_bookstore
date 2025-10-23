'use client'

import React from 'react'
import {
  Box,
  Container,
  Grid,
  Skeleton,
  Stack,
  alpha,
} from '@mui/material'

export default function BookDetailSkeleton() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
        <Skeleton width={64} height={20} />
        <Skeleton width={12} height={20} />
        <Skeleton width={64} height={20} />
        <Skeleton width={12} height={20} />
        <Skeleton width={180} height={20} />
      </Stack>

      <Grid container spacing={{ xs: 4, md: 6 }}>
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              position: 'sticky',
              top: 96,
              borderRadius: 4,
              p: 4,
              background: 'linear-gradient(135deg, rgba(148,163,184,0.12), rgba(226,232,240,0.3))',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Skeleton
              variant="rectangular"
              width={320}
              height={420}
              sx={{ borderRadius: 3 }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={7}>
          <Stack spacing={4}>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1.5}>
                <Skeleton variant="rounded" width={100} height={32} />
                <Skeleton variant="rounded" width={100} height={32} />
              </Stack>
              <Skeleton width="90%" height={44} />
              <Skeleton width="50%" height={28} />
              <Stack direction="row" spacing={2} alignItems="center">
                <Skeleton variant="rounded" width={160} height={24} />
                <Skeleton width={140} height={20} />
              </Stack>
            </Stack>

            <Box sx={{ height: 1, backgroundColor: alpha('#0f172a', 0.08) }} />

            <Stack spacing={1.5}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Skeleton width={140} height={40} />
                <Skeleton variant="rounded" width={120} height={24} />
                <Skeleton variant="rounded" width={110} height={24} />
              </Stack>
              <Skeleton width="100%" height={20} />
              <Skeleton width="95%" height={20} />
              <Skeleton width="80%" height={20} />
            </Stack>

            <Box sx={{ height: 1, backgroundColor: alpha('#0f172a', 0.08) }} />

            <Stack spacing={1.5}>
              {Array.from({ length: 4 }).map((_, index) => (
                <Stack direction="row" spacing={2} key={index}>
                  <Skeleton width={120} height={20} />
                  <Skeleton width="50%" height={20} />
                </Stack>
              ))}
            </Stack>

            <Box sx={{ height: 1, backgroundColor: alpha('#0f172a', 0.08) }} />

            <Stack spacing={2}>
              <Skeleton variant="rounded" width={200} height={32} />
              <Skeleton width={100} height={20} />
              <Skeleton variant="rounded" width={120} height={44} />
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Skeleton variant="rounded" width="100%" height={52} />
                <Skeleton variant="rounded" width="100%" height={52} />
              </Stack>
            </Stack>

            <Box sx={{ height: 1, backgroundColor: alpha('#0f172a', 0.08) }} />

            <Stack spacing={2}>
              {Array.from({ length: 3 }).map((_, index) => (
                <Stack key={index} direction="row" spacing={2} alignItems="flex-start">
                  <Skeleton variant="circular" width={36} height={36} />
                  <Stack spacing={1}>
                    <Skeleton width={160} height={20} />
                    <Skeleton width={220} height={16} />
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  )
}

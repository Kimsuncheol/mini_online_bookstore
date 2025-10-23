'use client'

import React from 'react'
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Skeleton,
  Stack,
  alpha,
} from '@mui/material'

export default function BookCategoryLoading() {
  const skeletonCount = 8

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Stack spacing={4}>
        <Box>
          <Skeleton width="45%" height={48} sx={{ mb: 1 }} />
          <Skeleton width="70%" height={24} sx={{ mb: 0.5 }} />
          <Skeleton width="30%" height={18} />
        </Box>

        <Box
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            p: { xs: 4, md: 6 },
            backgroundColor: alpha('#0f172a', 0.05),
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                <Skeleton width={120} height={32} variant="rounded" />
                <Skeleton width="80%" height={40} />
                <Skeleton width="90%" height={20} />
                <Skeleton width="85%" height={20} />
                <Stack direction="row" spacing={2}>
                  <Skeleton width={140} height={44} variant="rounded" />
                  <Skeleton width={120} height={44} variant="rounded" />
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Skeleton
                  variant="rectangular"
                  width={280}
                  height={360}
                  sx={{ borderRadius: 3 }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', pb: 1 }}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              width={160}
              height={44}
              sx={{ flexShrink: 0, borderRadius: 999 }}
            />
          ))}
        </Stack>

        <Grid container spacing={3}>
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Skeleton variant="rectangular" sx={{ width: '100%', pt: '140%' }} />
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, pt: 2 }}>
                  <Skeleton width="90%" height={24} />
                  <Skeleton width="60%" height={18} />
                  <Skeleton width={120} height={20} />
                  <Stack direction="row" spacing={1}>
                    <Skeleton width={80} height={24} />
                    <Skeleton width={60} height={24} />
                  </Stack>
                  <Skeleton variant="rounded" width="100%" height={40} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  )
}

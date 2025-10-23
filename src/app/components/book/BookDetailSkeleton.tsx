'use client'

import React from 'react'
import {
  Box,
  Container,
  Grid,
  Skeleton,
  Stack,
} from '@mui/material'
import { alpha } from '@mui/material/styles'

export default function BookDetailSkeleton() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumb */}
      <Box sx={{ mb: 4 }}>
        <Skeleton width={300} height={24} />
      </Box>

      {/* Main Content Grid */}
      <Grid container spacing={4}>
        {/* Book Image Skeleton */}
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              position: 'sticky',
              top: 80,
              width: '100%',
              backgroundColor: alpha('#667eea', 0.05),
              borderRadius: 2,
              p: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 500,
            }}
          >
            <Skeleton
              variant="rectangular"
              width={300}
              height={400}
              sx={{ borderRadius: 2 }}
            />
          </Box>
        </Grid>

        {/* Book Details Skeleton */}
        <Grid item xs={12} md={7}>
          <Stack spacing={3}>
            {/* Genre Chip */}
            <Skeleton width={100} height={40} variant="rounded" />

            {/* Title */}
            <Stack spacing={1}>
              <Skeleton width="80%" height={40} />
              <Skeleton width="60%" height={28} />
            </Stack>

            {/* Rating */}
            <Stack direction="row" spacing={2}>
              <Skeleton width={150} height={24} variant="rounded" />
              <Skeleton width={120} height={24} />
            </Stack>

            {/* Divider */}
            <Box sx={{ height: 1, backgroundColor: 'divider' }} />

            {/* Price */}
            <Stack direction="row" spacing={2}>
              <Skeleton width={120} height={32} />
              <Skeleton width={100} height={32} />
            </Stack>

            {/* Description */}
            <Stack spacing={1}>
              <Skeleton width={120} height={24} />
              <Skeleton width="100%" height={20} />
              <Skeleton width="100%" height={20} />
              <Skeleton width="80%" height={20} />
            </Stack>

            {/* Book Info */}
            <Stack spacing={1}>
              <Skeleton width="100%" height={24} />
              <Skeleton width="100%" height={24} />
              <Skeleton width="100%" height={24} />
              <Skeleton width="100%" height={24} />
            </Stack>

            {/* Divider */}
            <Box sx={{ height: 1, backgroundColor: 'divider' }} />

            {/* Stock Status */}
            <Skeleton width={200} height={40} variant="rounded" />

            {/* Quantity Selector */}
            <Stack spacing={1}>
              <Skeleton width={100} height={24} />
              <Skeleton width={100} height={40} variant="rounded" />
            </Stack>

            {/* Action Buttons */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Skeleton variant="rounded" width="100%" height={48} />
              <Skeleton variant="rounded" width={150} height={48} />
            </Stack>

            {/* Divider */}
            <Box sx={{ height: 1, backgroundColor: 'divider' }} />

            {/* Shipping & Return Info */}
            <Stack spacing={2}>
              <Skeleton width="100%" height={60} variant="rounded" />
              <Skeleton width="100%" height={60} variant="rounded" />
              <Skeleton width="100%" height={60} variant="rounded" />
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  )
}

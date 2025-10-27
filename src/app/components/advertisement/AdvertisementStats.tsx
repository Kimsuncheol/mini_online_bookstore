import { useMemo } from 'react'
import { Stack, Paper, Typography } from '@mui/material'
import { Advertisement } from '@/interfaces/advertisement'

interface AdvertisementStatsProps {
  advertisements: Advertisement[]
}

export default function AdvertisementStats({ advertisements }: AdvertisementStatsProps) {
  const stats = useMemo(() => {
    return {
      total: advertisements.length,
      active: advertisements.filter((ad) => ad.isActive).length,
      inactive: advertisements.filter((ad) => !ad.isActive).length,
    }
  }, [advertisements])

  return (
    <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
      <Paper
        sx={{
          flex: 1,
          p: 3,
          borderRadius: 2,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
        }}
      >
        <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
          Total Advertisements
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          {stats.total}
        </Typography>
      </Paper>
      <Paper
        sx={{
          flex: 1,
          p: 3,
          borderRadius: 2,
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
        }}
      >
        <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
          Active
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          {stats.active}
        </Typography>
      </Paper>
      <Paper
        sx={{
          flex: 1,
          p: 3,
          borderRadius: 2,
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          color: 'white',
        }}
      >
        <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
          Inactive
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          {stats.inactive}
        </Typography>
      </Paper>
    </Stack>
  )
}

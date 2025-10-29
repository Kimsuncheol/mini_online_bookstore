'use client'

import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import CalendarCheckIcon from '@mui/icons-material/CalendarCheck'
import type { CheckInStats as CheckInStatsType } from '@/interfaces/checkIn'

interface CheckInStatsProps {
  stats: CheckInStatsType
}

export default function CheckInStats({ stats }: CheckInStatsProps) {
  const statCards = [
    {
      label: 'Current Streak',
      value: stats.currentStreak,
      icon: <LocalFireDepartmentIcon sx={{ fontSize: 32 }} />,
      color: 'error.main',
      bgColor: 'rgba(244, 67, 54, 0.1)',
    },
    {
      label: 'Longest Streak',
      value: stats.longestStreak,
      icon: <TrendingUpIcon sx={{ fontSize: 32 }} />,
      color: 'success.main',
      bgColor: 'rgba(76, 175, 80, 0.1)',
    },
    {
      label: 'Total Check-ins',
      value: stats.totalCheckIns,
      icon: <CalendarCheckIcon sx={{ fontSize: 32 }} />,
      color: 'primary.main',
      bgColor: 'rgba(63, 81, 181, 0.1)',
    },
  ]

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(3, 1fr)',
        },
        gap: 2,
      }}
    >
      {statCards.map((card) => (
        <Card
          key={card.label}
          sx={{
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            backgroundColor: card.bgColor,
          }}
        >
          <CardContent>
            <Stack spacing={1.5}>
              <Box sx={{ color: card.color }}>
                {card.icon}
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  {card.label}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: card.color,
                  }}
                >
                  {card.value}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}

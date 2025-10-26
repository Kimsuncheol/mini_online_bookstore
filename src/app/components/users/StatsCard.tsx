import { Paper, Box, Typography } from '@mui/material'

interface StatsCardProps {
  label: string
  value: number
  icon: React.ReactNode
  color: string
}

export default function StatsCard({ label, value, icon, color }: StatsCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: color,
          boxShadow: 2,
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
          {label}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 36,
            height: 36,
            borderRadius: 2,
            backgroundColor: color + '15',
            color: color,
          }}
        >
          {icon}
        </Box>
      </Box>
      <Typography variant="h4" sx={{ fontWeight: 700, color: color }}>
        {value}
      </Typography>
    </Paper>
  )
}

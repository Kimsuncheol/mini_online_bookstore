import { Box, Card, CardContent, Typography, alpha } from '@mui/material'
import PeopleIcon from '@mui/icons-material/People'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import CreateIcon from '@mui/icons-material/Create'
import PersonIcon from '@mui/icons-material/Person'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import BlockIcon from '@mui/icons-material/Block'
import type { UserStats as UserStatsType } from '@/lib/user-api'

interface UserStatsProps {
  stats: UserStatsType
  loading?: boolean
}

interface StatCardProps {
  title: string
  value: number
  icon: React.ReactNode
  color: string
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 2,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: 2,
              backgroundColor: alpha(color, 0.1),
              color: color,
            }}
          >
            {icon}
          </Box>
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 700, color: color }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default function UserStats({ stats, loading = false }: UserStatsProps) {
  if (loading) {
    return (
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(6, 1fr)',
          },
          mb: 3,
        }}
      >
        {[...Array(6)].map((_, i) => (
          <Card key={i} sx={{ height: 120, borderRadius: 2 }}>
            <CardContent>
              <Box sx={{ animation: 'pulse 1.5s ease-in-out infinite' }}>
                <Box sx={{ height: 20, bgcolor: 'action.hover', borderRadius: 1, mb: 2 }} />
                <Box sx={{ height: 40, bgcolor: 'action.hover', borderRadius: 1 }} />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(6, 1fr)',
        },
        mb: 3,
      }}
    >
      <StatCard
        title="Total Users"
        value={stats.totalUsers}
        icon={<PeopleIcon />}
        color="#667eea"
      />
      <StatCard
        title="Admins"
        value={stats.adminCount}
        icon={<AdminPanelSettingsIcon />}
        color="#f43f5e"
      />
      <StatCard
        title="Authors"
        value={stats.authorCount}
        icon={<CreateIcon />}
        color="#3b82f6"
      />
      <StatCard
        title="Regular Users"
        value={stats.userCount}
        icon={<PersonIcon />}
        color="#6b7280"
      />
      <StatCard
        title="Active"
        value={stats.activeUsers}
        icon={<CheckCircleIcon />}
        color="#10b981"
      />
      <StatCard
        title="Suspended"
        value={stats.suspendedUsers}
        icon={<BlockIcon />}
        color="#f59e0b"
      />
    </Box>
  )
}

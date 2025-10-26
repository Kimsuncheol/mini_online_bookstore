import { Chip } from '@mui/material'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import CreateIcon from '@mui/icons-material/Create'
import PersonIcon from '@mui/icons-material/Person'

interface RoleBadgeProps {
  role: 'admin' | 'author' | 'user'
}

export default function RoleBadge({ role }: RoleBadgeProps) {
  const config = {
    admin: {
      label: 'Admin',
      icon: <AdminPanelSettingsIcon sx={{ fontSize: 16 }} />,
      color: '#dc2626',
    },
    author: {
      label: 'Author',
      icon: <CreateIcon sx={{ fontSize: 16 }} />,
      color: '#2563eb',
    },
    user: {
      label: 'User',
      icon: <PersonIcon sx={{ fontSize: 16 }} />,
      color: '#64748b',
    },
  }

  const { label, icon, color } = config[role]

  return (
    <Chip
      icon={icon}
      label={label}
      size="small"
      sx={{
        backgroundColor: color,
        color: 'white',
        fontWeight: 600,
        fontSize: '0.75rem',
        height: 24,
      }}
    />
  )
}

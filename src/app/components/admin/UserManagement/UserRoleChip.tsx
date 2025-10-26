import { Chip } from '@mui/material'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import CreateIcon from '@mui/icons-material/Create'
import PersonIcon from '@mui/icons-material/Person'

type UserRole = 'admin' | 'author' | 'user'

interface UserRoleChipProps {
  role: UserRole
  size?: 'small' | 'medium'
}

const roleConfig = {
  admin: {
    label: 'Admin',
    color: 'error' as const,
    icon: <AdminPanelSettingsIcon />,
  },
  author: {
    label: 'Author',
    color: 'primary' as const,
    icon: <CreateIcon />,
  },
  user: {
    label: 'User',
    color: 'default' as const,
    icon: <PersonIcon />,
  },
}

export default function UserRoleChip({ role, size = 'small' }: UserRoleChipProps) {
  const config = roleConfig[role]

  return (
    <Chip
      icon={config.icon}
      label={config.label}
      color={config.color}
      size={size}
      sx={{
        fontWeight: 600,
        textTransform: 'capitalize',
      }}
    />
  )
}

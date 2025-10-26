import {
  Card,
  CardContent,
  Avatar,
  Box,
  Typography,
  IconButton,
  Stack,
  Tooltip,
  Menu,
  MenuItem,
  Chip,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import VerifiedIcon from '@mui/icons-material/Verified'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import CreateIcon from '@mui/icons-material/Create'
import PersonIcon from '@mui/icons-material/Person'
import { useState } from 'react'
import type { AppUser } from '@/lib/users'
import UserStatusBadge from './UserStatusBadge'

interface UserCardProps {
  user: AppUser
  onUpdateRole?: (userId: string, role: 'admin' | 'author' | 'user') => void
  onUpdateStatus?: (userId: string, status: 'active' | 'inactive') => void
}

const getRoleIcon = (role: 'admin' | 'author' | 'user') => {
  switch (role) {
    case 'admin':
      return <AdminPanelSettingsIcon fontSize="small" />
    case 'author':
      return <CreateIcon fontSize="small" />
    case 'user':
      return <PersonIcon fontSize="small" />
  }
}

const getRoleColor = (role: 'admin' | 'author' | 'user') => {
  switch (role) {
    case 'admin':
      return '#f43f5e'
    case 'author':
      return '#3b82f6'
    case 'user':
      return '#6b7280'
  }
}

export default function UserCard({ user, onUpdateRole, onUpdateStatus }: UserCardProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleRoleChange = (role: 'admin' | 'author' | 'user') => {
    onUpdateRole?.(user.id, role)
    handleMenuClose()
  }

  const handleStatusToggle = () => {
    const newStatus = user.status === 'active' ? 'inactive' : 'active'
    onUpdateStatus?.(user.id, newStatus)
    handleMenuClose()
  }

  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 3,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              fontSize: '1.25rem',
              fontWeight: 700,
            }}
          >
            {getInitials(user.displayName)}
          </Avatar>

          <IconButton size="small" onClick={handleMenuOpen}>
            <MoreVertIcon fontSize="small" />
          </IconButton>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem disabled>
              <Typography variant="caption" color="text.secondary">
                Change Role
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => handleRoleChange('admin')}>Admin</MenuItem>
            <MenuItem onClick={() => handleRoleChange('author')}>Author</MenuItem>
            <MenuItem onClick={() => handleRoleChange('user')}>User</MenuItem>
            <MenuItem onClick={handleStatusToggle} sx={{ mt: 1, borderTop: 1, borderColor: 'divider' }}>
              {user.status === 'active' ? 'Deactivate' : 'Activate'}
            </MenuItem>
          </Menu>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem' }}>
              {user.displayName}
            </Typography>
            {user.isVerified && (
              <Tooltip title="Verified">
                <VerifiedIcon sx={{ fontSize: 16, color: 'success.main' }} />
              </Tooltip>
            )}
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
            {user.email}
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <Chip
            icon={getRoleIcon(user.role)}
            label={user.role}
            size="small"
            sx={{
              backgroundColor: getRoleColor(user.role),
              color: 'white',
              fontWeight: 600,
              textTransform: 'capitalize',
              fontSize: '0.75rem',
            }}
          />
          <UserStatusBadge status={user.status} />
        </Stack>

        <Typography variant="caption" color="text.secondary">
          Joined {new Date(user.joinedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
        </Typography>
      </CardContent>
    </Card>
  )
}

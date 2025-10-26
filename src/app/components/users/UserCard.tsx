import { Card, CardContent, Box, Typography, Stack, IconButton, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useState } from 'react'
import type { UserData } from '@/services/userService'
import UserAvatar from './UserAvatar'
import RoleBadge from './RoleBadge'
import StatusBadge from './StatusBadge'

interface UserCardProps {
  user: UserData
  onRoleChange?: (userId: string, role: 'admin' | 'author' | 'user') => void
  onStatusChange?: (userId: string, status: 'active' | 'inactive') => void
}

export default function UserCard({ user, onRoleChange, onStatusChange }: UserCardProps) {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget)
  }

  const handleMenuClose = () => {
    setMenuAnchor(null)
  }

  const handleRoleChange = (role: 'admin' | 'author' | 'user') => {
    onRoleChange?.(user.id, role)
    handleMenuClose()
  }

  const handleStatusToggle = () => {
    const newStatus = user.status === 'active' ? 'inactive' : 'active'
    onStatusChange?.(user.id, newStatus)
    handleMenuClose()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 3,
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        {/* Header with Avatar and Menu */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <UserAvatar name={user.name} avatar={user.avatar} verified={user.verified} size={56} />

          <IconButton size="small" onClick={handleMenuOpen} sx={{ mt: -0.5 }}>
            <MoreVertIcon fontSize="small" />
          </IconButton>

          <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
            <MenuItem disabled sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
              Change Role
            </MenuItem>
            <MenuItem onClick={() => handleRoleChange('admin')}>Admin</MenuItem>
            <MenuItem onClick={() => handleRoleChange('author')}>Author</MenuItem>
            <MenuItem onClick={() => handleRoleChange('user')}>User</MenuItem>
            <MenuItem
              onClick={handleStatusToggle}
              sx={{ mt: 1, pt: 1, borderTop: 1, borderColor: 'divider' }}
            >
              {user.status === 'active' ? 'Deactivate' : 'Activate'}
            </MenuItem>
          </Menu>
        </Box>

        {/* User Info */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem', mb: 0.5 }}>
            {user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
            {user.email}
          </Typography>
        </Box>

        {/* Badges */}
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <RoleBadge role={user.role} />
          <StatusBadge status={user.status} />
        </Stack>

        {/* Join Date */}
        <Typography variant="caption" color="text.secondary">
          Joined {formatDate(user.joinedDate)}
        </Typography>
      </CardContent>
    </Card>
  )
}

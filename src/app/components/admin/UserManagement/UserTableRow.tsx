import {
  TableRow,
  TableCell,
  Avatar,
  Box,
  Typography,
  IconButton,
  Chip,
  Tooltip,
  Stack,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import VerifiedIcon from '@mui/icons-material/Verified'
import UnverifiedIcon from '@mui/icons-material/Cancel'
import type { ManagementUser } from '@/lib/user-api'
import UserRoleChip from './UserRoleChip'

interface UserTableRowProps {
  user: ManagementUser
  onEdit: (user: ManagementUser) => void
}

const getInitials = (name?: string, email?: string): string => {
  if (name) {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }
  return email?.[0]?.toUpperCase() || 'U'
}

const getStatusColor = (
  status: 'active' | 'suspended' | 'pending'
): 'success' | 'error' | 'warning' => {
  switch (status) {
    case 'active':
      return 'success'
    case 'suspended':
      return 'error'
    case 'pending':
      return 'warning'
  }
}

export default function UserTableRow({ user, onEdit }: UserTableRowProps) {
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Never'
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return 'Yesterday'
    if (diffInHours < 24 * 7) return `${Math.floor(diffInHours / 24)}d ago`

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    })
  }

  return (
    <TableRow
      hover
      sx={{
        '&:hover': {
          backgroundColor: 'action.hover',
        },
      }}
    >
      {/* User */}
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={user.photoURL}
            sx={{
              width: 40,
              height: 40,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            {getInitials(user.displayName, user.email)}
          </Avatar>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {user.displayName || 'No name'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user.email}
            </Typography>
          </Box>
        </Box>
      </TableCell>

      {/* Role */}
      <TableCell>
        <UserRoleChip role={user.role} />
      </TableCell>

      {/* Status */}
      <TableCell>
        <Chip
          label={user.status.charAt(0).toUpperCase() + user.status.slice(1)}
          color={getStatusColor(user.status)}
          size="small"
          sx={{ fontWeight: 600, textTransform: 'capitalize' }}
        />
      </TableCell>

      {/* Email Verified */}
      <TableCell align="center">
        <Tooltip title={user.isEmailVerified ? 'Email verified' : 'Email not verified'}>
          {user.isEmailVerified ? (
            <VerifiedIcon sx={{ color: 'success.main', fontSize: 20 }} />
          ) : (
            <UnverifiedIcon sx={{ color: 'error.main', fontSize: 20 }} />
          )}
        </Tooltip>
      </TableCell>

      {/* Created */}
      <TableCell>
        <Typography variant="body2">{formatDate(user.createdAt)}</Typography>
      </TableCell>

      {/* Last Sign In */}
      <TableCell>
        <Typography variant="body2">{formatDate(user.lastSignInAt)}</Typography>
      </TableCell>

      {/* Actions */}
      <TableCell align="right">
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Tooltip title="Edit user">
            <IconButton
              size="small"
              onClick={() => onEdit(user)}
              sx={{
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                },
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </TableCell>
    </TableRow>
  )
}

import { Box, Typography } from '@mui/material'
import type { UserData } from '@/services/userService'
import UserCard from './UserCard'

interface UserGridProps {
  users: UserData[]
  onRoleChange?: (userId: string, role: 'admin' | 'author' | 'user') => void
  onStatusChange?: (userId: string, status: 'active' | 'inactive') => void
}

export default function UserGrid({ users, onRoleChange, onStatusChange }: UserGridProps) {
  if (users.length === 0) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 10,
        }}
      >
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No users found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Try adjusting your filters
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 3,
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        },
      }}
    >
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onRoleChange={onRoleChange}
          onStatusChange={onStatusChange}
        />
      ))}
    </Box>
  )
}

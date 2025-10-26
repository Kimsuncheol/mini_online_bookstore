import { Box, Typography } from '@mui/material'
import type { AppUser } from '@/lib/users'
import UserCard from './UserCard'

interface UserListProps {
  users: AppUser[]
  onUpdateRole?: (userId: string, role: 'admin' | 'author' | 'user') => void
  onUpdateStatus?: (userId: string, status: 'active' | 'inactive') => void
}

export default function UserList({ users, onUpdateRole, onUpdateStatus }: UserListProps) {
  if (users.length === 0) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
        }}
      >
        <Typography variant="h6" color="text.secondary">
          No users found
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Try adjusting your search or filters
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
          onUpdateRole={onUpdateRole}
          onUpdateStatus={onUpdateStatus}
        />
      ))}
    </Box>
  )
}

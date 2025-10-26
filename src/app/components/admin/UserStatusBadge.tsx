import { Chip } from '@mui/material'

interface UserStatusBadgeProps {
  status: 'active' | 'inactive'
}

export default function UserStatusBadge({ status }: UserStatusBadgeProps) {
  return (
    <Chip
      label={status}
      size="small"
      color={status === 'active' ? 'success' : 'default'}
      sx={{
        textTransform: 'capitalize',
        fontWeight: 600,
        fontSize: '0.75rem',
      }}
    />
  )
}

import { Chip } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import BlockIcon from '@mui/icons-material/Block'

interface StatusBadgeProps {
  status: 'active' | 'inactive'
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Chip
      icon={
        status === 'active' ? (
          <CheckCircleIcon sx={{ fontSize: 16 }} />
        ) : (
          <BlockIcon sx={{ fontSize: 16 }} />
        )
      }
      label={status === 'active' ? 'Active' : 'Inactive'}
      size="small"
      color={status === 'active' ? 'success' : 'default'}
      sx={{
        fontWeight: 600,
        fontSize: '0.75rem',
        height: 24,
      }}
    />
  )
}

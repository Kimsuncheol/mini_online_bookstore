import { Box, IconButton, Typography } from '@mui/material'
import HistoryIcon from '@mui/icons-material/History'
import CloseIcon from '@mui/icons-material/Close'
import type { SearchHistoryItem } from '@/interfaces/search'

interface RecentSearchItemProps {
  item: SearchHistoryItem
  onClick: (query: string) => void
  onRemove: (id: string) => void
}

export default function RecentSearchItem({ item, onClick, onRemove }: RecentSearchItemProps) {
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    onRemove(item.id)
  }

  return (
    <Box
      onClick={() => onClick(item.query)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 1.5,
        borderRadius: 2,
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        '&:hover': {
          backgroundColor: 'action.hover',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1, minWidth: 0 }}>
        <HistoryIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
        <Typography
          variant="body2"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {item.query}
        </Typography>
      </Box>
      <IconButton
        size="small"
        onClick={handleRemove}
        sx={{
          opacity: 0.6,
          '&:hover': {
            opacity: 1,
            backgroundColor: 'error.light',
            color: 'error.dark',
          },
        }}
      >
        <CloseIcon sx={{ fontSize: 18 }} />
      </IconButton>
    </Box>
  )
}

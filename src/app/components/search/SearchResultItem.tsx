import { Box, Typography, Avatar, Chip } from '@mui/material'
import BookIcon from '@mui/icons-material/Book'
import PersonIcon from '@mui/icons-material/Person'
import CategoryIcon from '@mui/icons-material/Category'
import type { SearchResult } from '@/interfaces/search'

interface SearchResultItemProps {
  result: SearchResult
  onClick: (url: string) => void
}

const typeConfig = {
  book: {
    icon: <BookIcon sx={{ fontSize: 20 }} />,
    color: '#667eea',
  },
  author: {
    icon: <PersonIcon sx={{ fontSize: 20 }} />,
    color: '#764ba2',
  },
  category: {
    icon: <CategoryIcon sx={{ fontSize: 20 }} />,
    color: '#f59e0b',
  },
}

export default function SearchResultItem({ result, onClick }: SearchResultItemProps) {
  const config = typeConfig[result.type]

  return (
    <Box
      onClick={() => onClick(result.url)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 1.5,
        borderRadius: 2,
        cursor: 'pointer',
        transition: 'all 0.2s',
        '&:hover': {
          backgroundColor: 'action.hover',
          transform: 'translateX(4px)',
        },
      }}
    >
      <Avatar
        src={result.imageUrl}
        sx={{
          width: 48,
          height: 48,
          backgroundColor: config.color + '20',
          color: config.color,
        }}
      >
        {!result.imageUrl && config.icon}
      </Avatar>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {result.title}
        </Typography>
        {result.subtitle && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {result.subtitle}
          </Typography>
        )}
      </Box>
      <Chip
        label={result.type}
        size="small"
        sx={{
          backgroundColor: config.color + '20',
          color: config.color,
          fontWeight: 600,
          textTransform: 'capitalize',
        }}
      />
    </Box>
  )
}

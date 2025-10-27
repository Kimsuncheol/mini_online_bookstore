import { Box, Typography } from '@mui/material'
import { Book } from '@/interfaces/book'
import BookGrid from './BookGrid'

interface BookCardGridProps {
  books: Book[]
  activeTag: string
  tagLabel: string
}

export default function BookCardGrid({ books, activeTag, tagLabel }: BookCardGridProps) {
  if (books.length === 0) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          borderRadius: 3,
          border: '1px dashed',
          borderColor: 'divider',
        }}
      >
        <Typography variant="h6" color="text.secondary">
          No books found for {tagLabel}
        </Typography>
        <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
          Check back soon for new additions!
        </Typography>
      </Box>
    )
  }

  return <BookGrid books={books} />
}

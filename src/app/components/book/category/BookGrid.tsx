import { Box, useMediaQuery } from '@mui/material'
import { useMemo } from 'react'
import { Book } from '@/interfaces/book'
import BookCard from './BookCard'

interface BookGridProps {
  books: Book[]
}

export default function BookGrid({ books }: BookGridProps) {
  const isMax440 = useMediaQuery('(max-width:440px)')
  const isMax660 = useMediaQuery('(max-width:660px)')
  const isMax880 = useMediaQuery('(max-width:880px)')

  const gridColumns = useMemo(() => {
    if (isMax440) return 2
    if (isMax660) return 3
    if (isMax880) return 4
    return 5
  }, [isMax440, isMax660, isMax880])

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 3,
        gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
      }}
    >
      {books.map((book) => (
        <Box key={book.id}>
          <BookCard book={book} />
        </Box>
      ))}
    </Box>
  )
}

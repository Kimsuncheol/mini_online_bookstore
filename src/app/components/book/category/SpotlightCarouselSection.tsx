import { Stack, Typography } from '@mui/material'
import { Book } from '@/interfaces/book'
import InfiniteCarousel from '../../common/InfiniteCarousel'
import BookCarouselCard from '../BookCarouselCard'

interface SpotlightCarouselSectionProps {
  books: Book[]
}

export default function SpotlightCarouselSection({ books }: SpotlightCarouselSectionProps) {
  if (books.length === 0) return null

  return (
    <Stack spacing={2}>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        Spotlight Collection
      </Typography>
      <InfiniteCarousel itemWidth={260} gap={24} autoPlay autoPlayInterval={4000}>
        {books.map((book) => (
          <BookCarouselCard key={book.id} book={book} variant="featured" />
        ))}
      </InfiniteCarousel>
    </Stack>
  )
}

import { Container } from '@mui/material'
import BookDetail from '@/app/components/book/BookDetail'
import BookSummarySection from '@/app/components/book/BookSummarySection'
import BookReviewWrapper from '@/app/components/book/BookReviewWrapper'
import BookCouponSection from '@/app/components/book/BookCouponSection'
import { getBookById } from './bookData'

interface BookPageRouteParams {
  id: string
}

interface BookPageProps {
  params: Promise<BookPageRouteParams>
}

export async function generateMetadata({ params }: BookPageProps) {
  const { id } = await params
  const book = await getBookById(id)

  return {
    title: `${book.title} | BookNest`,
    description: book.description,
    openGraph: {
      title: book.title,
      description: book.description,
      images: book.coverImageUrl ? [book.coverImageUrl] : undefined,
    },
  }
}

export default async function BookPage({ params }: BookPageProps) {
  const { id } = await params
  const book = await getBookById(id)

  return (
    <>
      <BookDetail book={book} />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <BookSummarySection book={book} />
      </Container>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <BookCouponSection />
      </Container>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <BookReviewWrapper book={book} />
      </Container>
    </>
  )
}

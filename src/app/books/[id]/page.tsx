import { Book } from '@/interfaces/book'
import BookDetail from '@/app/components/book/BookDetail'

interface BookPageProps {
  params: {
    id: string
  }
}

// Mock function to fetch book data - replace with actual API call
async function getBook(id: string): Promise<Book> {
  // This is a mock implementation - in production, fetch from your database/API
  const mockBooks: Record<string, Book> = {
    '1': {
      id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      description:
        'A classic American novel set in the Jazz Age. This masterpiece explores themes of wealth, love, and the American Dream through the eyes of Nick Carraway.',
      genre: 'Fiction',
      price: 12.99,
      originalPrice: 19.99,
      inStock: true,
      stockQuantity: 45,
      rating: 4.5,
      reviewCount: 2341,
      publisher: 'Scribner',
      pageCount: 180,
      language: 'English',
      publishedDate: new Date('1925-04-10'),
      isbn: '978-0743273565',
      coverImageUrl: 'https://images.unsplash.com/photo-1543257869-edf686ea8bcc?w=400&h=600&fit=crop',
      isNew: false,
      isFeatured: true,
    },
    '2': {
      id: '2',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      description:
        'A gripping tale of racial injustice and childhood innocence in the American South. Through Scout Finch\'s eyes, we witness her father\'s courageous stand against prejudice.',
      genre: 'Drama',
      price: 14.99,
      originalPrice: 18.99,
      inStock: true,
      stockQuantity: 32,
      rating: 4.8,
      reviewCount: 3102,
      publisher: 'J.B. Lippincott',
      pageCount: 324,
      language: 'English',
      publishedDate: new Date('1960-07-11'),
      isbn: '978-0061120084',
      coverImageUrl: 'https://images.unsplash.com/photo-1507842217343-583f7270bfda?w=400&h=600&fit=crop',
      isNew: false,
      isFeatured: true,
    },
  }

  return mockBooks[id] || mockBooks['1']
}

export async function generateMetadata({ params }: BookPageProps) {
  const book = await getBook(params.id)

  return {
    title: `${book.title} | BookNest`,
    description: book.description,
    openGraph: {
      title: book.title,
      description: book.description,
      images: [book.coverImageUrl],
    },
  }
}

export default async function BookPage({ params }: BookPageProps) {
  const book = await getBook(params.id)

  return <BookDetail book={book} />
}

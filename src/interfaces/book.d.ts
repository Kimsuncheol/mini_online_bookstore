/**
 * Book Interface
 * Represents a book in the BookNest online bookstore
 */
export interface Book {
  // Basic Information
  id: string
  title: string
  author: string
  isbn?: string

  // Description and Content
  description?: string
  genre: string
  language?: string
  publishedDate?: string | Date
  pageCount?: number

  // Pricing and Availability
  price: number
  originalPrice?: number
  currency?: string
  inStock?: boolean
  stockQuantity?: number

  // Media
  coverImage?: string
  coverImageUrl?: string
  pdfUrl?: string
  pdfFileName?: string

  // Ratings and Reviews
  rating?: number
  reviewCount?: number

  // Publishing Information
  publisher?: string
  edition?: string

  // Additional Metadata
  createdAt?: string | Date
  updatedAt?: string | Date
  isNew?: boolean
  isFeatured?: boolean
  discount?: number
}

/**
 * Hero Carousel Book Interface
 * Represents the data needed by the hero carousel
 */
export interface HeroCarouselBook {
  id: string
  title: string
  author: string
  description: string
  price: number
  pageCount?: number
  originalPrice?: number
  coverImageUrl?: string
}

/**
 * Book Filter Options Interface
 * Used for filtering books in search and browse
 */
export interface BookFilterOptions {
  genres?: string[]
  minPrice?: number
  maxPrice?: number
  rating?: number
  inStockOnly?: boolean
  searchTerm?: string
  sortBy?: 'price-low-to-high' | 'price-high-to-low' | 'newest' | 'rating' | 'title'
  page?: number
  limit?: number
}

/**
 * Book Category Interface
 * Represents book categories/genres
 */
export interface BookCategory {
  id: string
  name: string
  description?: string
  icon?: string
  bookCount?: number
}

/**
 * Book Summary Interface
 * Represents an AI-generated summary associated with a book
 */
export interface BookSummary {
  id: string
  bookId: string
  shortSummary: string
  detailedSummary: string
  keyThemes: string[]
  targetAudience: string
  readingLevel?: string
  moodTags?: string[]
  contentWarnings?: string[]
  similarBooksTags?: string[]
  whyReadThis?: string
  aiConfidenceScore: number
  generatedByModel: string
  createdAt: string
  updatedAt: string
}

/**
 * Book Summary Generation Response
 * Represents the payload returned when generating summaries
 */
export interface SummaryGenerationResponse {
  success: boolean
  summary?: BookSummary
  message?: string
  error?: string
}

/**
 * PDF metadata for the book viewer
 */
export interface BookPdfMetadata {
  bookId: string
  filename: string
  pageCount: number
  fileSize: number
  mimeType: string
  lastModified: string
  source?: string
}

/**
 * Viewer payload for rendering book PDFs
 */
export interface BookViewerPayload {
  book: Book
  pdf: BookPdfMetadata
  streamUrl: string
}

/**
 * Book Review Interface
 * Represents a user review for a book
 */
export interface BookReview {
  id: string
  bookId: string
  userId: string
  userName: string
  rating: number
  title: string
  content: string
  helpful: number
  createdAt: string | Date
  updatedAt?: string | Date
}

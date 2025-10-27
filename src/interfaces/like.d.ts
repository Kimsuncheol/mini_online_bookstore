/**
 * Like Interface
 * Represents a user's liked book in the BookNest online bookstore
 */
export interface Like {
  // Book Information
  bookId: string // The ID of the liked book
  title: string

  // User Information
  userEmail: string

  // Pricing Information
  price: number
  originalPrice?: number

  // Media
  coverImageUrl?: string

  // Metadata
  createdAt?: Date
}

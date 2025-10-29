/**
 * Author Interface
 * Represents an author in the BookNest application
 * Extends User with author-specific fields
 */
export interface Author {
  // Authentication (inherited from User)
  id: string
  email: string
  displayName?: string
  photoURL?: string
  role: 'author'

  // Account Status
  isEmailVerified: boolean
  createdAt: Date
  lastSignInAt?: Date

  // Author-Specific Profile Info
  bio?: string
  website?: string
  socialLinks?: {
    twitter?: string
    facebook?: string
    instagram?: string
    linkedin?: string
  }

  // Author Statistics
  totalBooksPublished?: number
  totalReadersReached?: number
  averageRating?: number

  // Author Verification
  isVerified?: boolean
  verificationDate?: Date
  verificationBadge?: boolean

  // Author Preferences
  preferences?: {
    emailNotifications: boolean
    marketingEmails: boolean
  }

  // Additional Profile Info
  phone?: string
  address?: string
}

/**
 * Author Profile Data Interface
 * Represents author profile information
 */
export interface AuthorProfile {
  id: string
  displayName: string
  email: string
  photoURL?: string
  bio?: string
  website?: string
  isVerified: boolean
  totalBooksPublished: number
  averageRating: number
  createdAt: Date
}

/**
 * Author Statistics Interface
 * Represents author-specific statistics
 */
export interface AuthorStatistics {
  totalBooksPublished: number
  totalReadersReached: number
  averageRating: number
  totalReviews: number
  totalFollowers?: number
}

/**
 * Author Page Props Interface
 * Props for the author page component
 */
export interface AuthorPageProps {
  authorId: string
  authorName: string
  authorEmail: string
  author?: Author
}

/**
 * Author Metadata Interface
 * For SEO and page metadata
 */
export interface AuthorMetadata {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  twitterHandle?: string
}

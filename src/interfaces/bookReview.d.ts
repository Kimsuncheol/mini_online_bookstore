/**
 * Book Review Interfaces
 * Comprehensive review system for readers and books
 */

/**
 * User Review for a Book
 * Represents a complete review written by a user
 */
export interface BookReview {
  id: string
  bookId: string
  userId: string
  userEmail: string
  userName: string
  userAvatar?: string

  // Review Content
  rating: number // 1-5 stars
  title: string
  content: string

  // Engagement
  helpful: number // Count of helpful votes
  unhelpful: number // Count of unhelpful votes

  // Status
  verified: boolean // Is this a verified purchase?
  status: 'pending' | 'approved' | 'rejected' // Moderation status

  // Timestamps
  createdAt: Date
  updatedAt?: Date
}

/**
 * Review Summary Statistics
 * Aggregate data about reviews for a book
 */
export interface ReviewSummary {
  totalReviews: number
  averageRating: number
  ratingDistribution: {
    5: number // Count of 5-star reviews
    4: number // Count of 4-star reviews
    3: number // Count of 3-star reviews
    2: number // Count of 2-star reviews
    1: number // Count of 1-star reviews
  }
  verifiedPurchaseCount: number
}

/**
 * Review Request DTO
 * Sent by users to create/update a review
 */
export interface CreateReviewRequest {
  bookId: string
  rating: number
  title: string
  content: string
  userEmail: string
  userName: string
}

/**
 * Update Review Request DTO
 */
export interface UpdateReviewRequest {
  rating?: number
  title?: string
  content?: string
}

/**
 * Review Response DTO
 * Response from review API endpoints
 */
export interface ReviewResponse {
  success: boolean
  data?: BookReview
  summary?: ReviewSummary
  error?: {
    code: string
    message: string
  }
}

/**
 * Review List Response
 */
export interface ReviewListResponse {
  reviews: BookReview[]
  summary: ReviewSummary
  total: number
  page: number
  limit: number
  hasMore: boolean
}

/**
 * Review Filter Options
 */
export interface ReviewFilterOptions {
  rating?: number // Filter by specific rating
  sortBy?: 'helpful' | 'recent' | 'rating'
  sortOrder?: 'asc' | 'desc'
  verifiedOnly?: boolean
  page?: number
  limit?: number
}

/**
 * Review Action (helpful/unhelpful vote)
 */
export interface ReviewAction {
  reviewId: string
  userId: string
  action: 'helpful' | 'unhelpful'
  timestamp: Date
}

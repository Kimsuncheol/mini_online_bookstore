import type {
  BookReview,
  ReviewSummary,
  UpdateReviewRequest,
  ReviewListResponse,
  ReviewFilterOptions,
  ReviewAction,
} from '@/interfaces/bookReview'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

/**
 * Get all reviews for a specific book with optional filters
 */
export async function getBookReviews(
  bookId: string,
  filters?: ReviewFilterOptions
): Promise<ReviewListResponse> {
  const params = new URLSearchParams()

  if (filters?.page) params.append('page', filters.page.toString())
  if (filters?.limit) params.append('limit', filters.limit.toString())
  if (filters?.sortBy) params.append('sortBy', filters.sortBy)
  if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder)
  if (filters?.rating) params.append('rating', filters.rating.toString())
  if (filters?.verifiedOnly) params.append('verifiedOnly', 'true')

  const response = await fetch(`${API_BASE_URL}/api/books/${bookId}/reviews?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch reviews: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Get review summary statistics for a book
 */
export async function getReviewSummary(bookId: string): Promise<ReviewSummary> {
  const response = await fetch(`${API_BASE_URL}/api/books/${bookId}/reviews/summary`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch review summary: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Create a new review for a book
 */
export async function createReview(
  bookId: string,
  request: { title: string; content: string; rating: number },
  userEmail: string
): Promise<BookReview> {
  const response = await fetch(`${API_BASE_URL}/api/books/${bookId}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userEmail}`,
    },
    body: JSON.stringify({
      title: request.title,
      content: request.content,
      rating: request.rating,
      user_email: userEmail,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || `Failed to create review: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Update an existing review
 */
export async function updateReview(
  bookId: string,
  reviewId: string,
  request: UpdateReviewRequest,
  userEmail: string
): Promise<BookReview> {
  const response = await fetch(`${API_BASE_URL}/api/books/${bookId}/reviews/${reviewId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userEmail}`,
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || `Failed to update review: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Delete a review
 */
export async function deleteReview(
  bookId: string,
  reviewId: string,
  userEmail: string
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/books/${bookId}/reviews/${reviewId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userEmail}`,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || `Failed to delete review: ${response.statusText}`)
  }
}

/**
 * Mark a review as helpful
 */
export async function markReviewAsHelpful(
  bookId: string,
  reviewId: string,
  userEmail: string
): Promise<ReviewAction> {
  const response = await fetch(
    `${API_BASE_URL}/api/books/${bookId}/reviews/${reviewId}/helpful`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userEmail}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error(`Failed to mark review as helpful: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Mark a review as unhelpful
 */
export async function markReviewAsUnhelpful(
  bookId: string,
  reviewId: string,
  userEmail: string
): Promise<ReviewAction> {
  const response = await fetch(
    `${API_BASE_URL}/api/books/${bookId}/reviews/${reviewId}/unhelpful`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userEmail}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error(`Failed to mark review as unhelpful: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Get user's review for a specific book
 */
export async function getUserReview(bookId: string, userEmail: string): Promise<BookReview | null> {
  const response = await fetch(`${API_BASE_URL}/api/books/${bookId}/reviews/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userEmail}`,
    },
  })

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch user review: ${response.statusText}`)
  }

  return response.json()
}

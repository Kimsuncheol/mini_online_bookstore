import { Like } from '@/interfaces/like'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

// Helper function to convert camelCase to snake_case
function toSnakeCase<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj
  if (Array.isArray(obj)) return obj.map(toSnakeCase) as T
  if (typeof obj !== 'object') return obj

  const snakeCased: Record<string, unknown> = {}
  for (const key in obj) {
    const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
    snakeCased[snakeKey] = toSnakeCase(obj[key])
  }
  return snakeCased as T
}

// Helper function to convert snake_case to camelCase
function toCamelCase<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj
  if (Array.isArray(obj)) return obj.map(toCamelCase) as T
  if (typeof obj !== 'object') return obj

  const camelCased: Record<string, unknown> = {}
  for (const key in obj) {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
    camelCased[camelKey] = toCamelCase(obj[key])
  }
  return camelCased as T
}

/**
 * Toggle like status (add if not liked, remove if liked)
 * POST /api/likes/toggle
 */
export async function toggleLike(likeData: Omit<Like, 'createdAt'>): Promise<{
  action: 'added' | 'removed'
  message: string
  isLiked: boolean
}> {
  try {
    const snakeCaseData = toSnakeCase(likeData)

    const response = await fetch(`${API_BASE_URL}/api/likes/toggle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(snakeCaseData),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Failed to toggle like' }))
      throw new Error(error.detail || 'Failed to toggle like')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error toggling like:', error)
    throw error
  }
}

/**
 * Check if a book is liked by a user
 * GET /api/likes/book/{book_id}/user/{user_email}/status
 */
export async function checkLikeStatus(bookId: string, userEmail: string): Promise<{
  isLiked: boolean
  likeId: string | null
}> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/likes/book/${encodeURIComponent(bookId)}/user/${encodeURIComponent(userEmail)}/status`,
      {
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      throw new Error('Failed to check like status')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error checking like status:', error)
    throw error
  }
}

/**
 * Get all liked books for a user
 * GET /api/likes/user/{user_email}
 */
export async function getUserLikes(userEmail: string, limit?: number): Promise<Like[]> {
  try {
    const url = new URL(`${API_BASE_URL}/api/likes/user/${encodeURIComponent(userEmail)}`)
    if (limit) {
      url.searchParams.append('limit', limit.toString())
    }

    const response = await fetch(url.toString(), {
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch user likes')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error fetching user likes:', error)
    throw error
  }
}

/**
 * Get the total number of books liked by a user
 * GET /api/likes/user/{user_email}/count
 */
export async function getUserLikeCount(userEmail: string): Promise<{
  userEmail: string
  count: number
}> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/likes/user/${encodeURIComponent(userEmail)}/count`,
      {
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch user like count')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error fetching user like count:', error)
    throw error
  }
}

/**
 * Get the total number of likes for a book
 * GET /api/likes/book/{book_id}/count
 */
export async function getBookLikeCount(bookId: string): Promise<{
  bookId: string
  count: number
}> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/likes/book/${encodeURIComponent(bookId)}/count`,
      {
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch book like count')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error fetching book like count:', error)
    throw error
  }
}

/**
 * Get all likes for a specific book
 * GET /api/likes/book/{book_id}
 */
export async function getBookLikes(bookId: string, limit?: number): Promise<Like[]> {
  try {
    const url = new URL(`${API_BASE_URL}/api/likes/book/${encodeURIComponent(bookId)}`)
    if (limit) {
      url.searchParams.append('limit', limit.toString())
    }

    const response = await fetch(url.toString(), {
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch book likes')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error fetching book likes:', error)
    throw error
  }
}

/**
 * Remove a like by book ID and user email
 * DELETE /api/likes/book/{book_id}/user/{user_email}
 */
export async function removeLikeByBookAndUser(
  bookId: string,
  userEmail: string
): Promise<{ message: string }> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/likes/book/${encodeURIComponent(bookId)}/user/${encodeURIComponent(userEmail)}`,
      {
        method: 'DELETE',
      }
    )

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Like not found')
      }
      throw new Error('Failed to remove like')
    }

    return await response.json()
  } catch (error) {
    console.error('Error removing like:', error)
    throw error
  }
}

/**
 * Get a like by its ID
 * GET /api/likes/{like_id}
 */
export async function getLike(likeId: string): Promise<Like> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/likes/${encodeURIComponent(likeId)}`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Like not found')
      }
      throw new Error('Failed to fetch like')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error fetching like:', error)
    throw error
  }
}

/**
 * Remove a like by its ID
 * DELETE /api/likes/{like_id}
 */
export async function removeLike(likeId: string): Promise<{ message: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/likes/${encodeURIComponent(likeId)}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Like not found')
      }
      throw new Error('Failed to remove like')
    }

    return await response.json()
  } catch (error) {
    console.error('Error removing like:', error)
    throw error
  }
}

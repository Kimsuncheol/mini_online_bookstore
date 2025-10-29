const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

/**
 * Author Update Request Interface
 */
export interface AuthorUpdateRequest {
  display_name?: string
  bio?: string
  website?: string
  social_links?: {
    twitter?: string
    facebook?: string
    instagram?: string
    linkedin?: string
  }
  phone?: string
  address?: string
  photo_url?: string
  email?: string
  preferences?: {
    email_notifications: boolean
    marketing_emails: boolean
  }
}

/**
 * Author Statistics Update Request Interface
 */
export interface AuthorStatisticsUpdateRequest {
  books_published?: number
  readers_reached?: number
  average_rating?: number
}

/**
 * Get author profile by ID
 * GET /api/authors/{author_id}
 *
 * @param authorId - The unique identifier of the author
 * @returns Author profile data
 * @throws Error if author not found or database error occurs
 */
export async function getAuthorProfile(authorId: string): Promise<Record<string, unknown> | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/authors/${encodeURIComponent(authorId)}`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error('Failed to fetch author profile')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching author profile:', error)
    throw error
  }
}

/**
 * Get author profile by email
 * GET /api/authors/email/{email}
 *
 * @param email - The email address of the author
 * @returns Author profile data
 * @throws Error if author not found or database error occurs
 */
export async function getAuthorByEmail(email: string): Promise<Record<string, unknown> | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/authors/email/${encodeURIComponent(email)}`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error('Failed to fetch author by email')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching author by email:', error)
    throw error
  }
}

/**
 * Get all authors
 * GET /api/authors
 *
 * @param limit - Maximum number of authors to return (1-100)
 * @returns Array of author profiles
 * @throws Error if database error occurs
 */
export async function getAllAuthors(limit?: number): Promise<Record<string, unknown>[]> {
  try {
    const params = new URLSearchParams()
    if (limit !== undefined) {
      params.append('limit', Math.min(limit, 100).toString())
    }

    const url = params.toString() ? `${API_BASE_URL}/api/authors?${params.toString()}` : `${API_BASE_URL}/api/authors`

    const response = await fetch(url, {
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch authors')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching authors:', error)
    throw error
  }
}

/**
 * Get verified authors
 * GET /api/authors/verified/list
 *
 * @param limit - Maximum number of verified authors to return (1-100)
 * @returns Array of verified author profiles
 * @throws Error if database error occurs
 */
export async function getVerifiedAuthors(limit?: number): Promise<Record<string, unknown>[]> {
  try {
    const params = new URLSearchParams()
    if (limit !== undefined) {
      params.append('limit', Math.min(limit, 100).toString())
    }

    const url = params.toString()
      ? `${API_BASE_URL}/api/authors/verified/list?${params.toString()}`
      : `${API_BASE_URL}/api/authors/verified/list`

    const response = await fetch(url, {
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch verified authors')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching verified authors:', error)
    throw error
  }
}

/**
 * Update author profile
 * PATCH /api/authors/{author_id}
 *
 * Allows updating:
 * - Display name, bio, website
 * - Social media links
 * - Phone and address
 * - Photo URL and email
 * - Preferences
 *
 * @param authorId - The unique identifier of the author
 * @param updateData - The fields to update
 * @returns Updated author profile data
 * @throws Error if no update data provided, author not found, or database error occurs
 */
export async function updateAuthorProfile(
  authorId: string,
  updateData: AuthorUpdateRequest
): Promise<Record<string, unknown>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/authors/${encodeURIComponent(authorId)}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        detail: 'Failed to update author profile',
      }))
      throw new Error(error.detail || 'Failed to update author profile')
    }

    return await response.json()
  } catch (error) {
    console.error('Error updating author profile:', error)
    throw error
  }
}

/**
 * Verify an author
 * POST /api/authors/{author_id}/verify
 *
 * Verifies an author and adds verification badge.
 *
 * @param authorId - The unique identifier of the author
 * @returns Updated author profile data with verification
 * @throws Error if author not found or database error occurs
 */
export async function verifyAuthor(authorId: string): Promise<Record<string, unknown>> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/authors/${encodeURIComponent(authorId)}/verify`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        detail: 'Failed to verify author',
      }))
      throw new Error(error.detail || 'Failed to verify author')
    }

    return await response.json()
  } catch (error) {
    console.error('Error verifying author:', error)
    throw error
  }
}

/**
 * Get author statistics
 * GET /api/authors/{author_id}/statistics
 *
 * Returns:
 * - Total books published
 * - Total readers reached
 * - Average rating
 * - Total reviews
 * - Total followers
 *
 * @param authorId - The unique identifier of the author
 * @returns Author statistics
 * @throws Error if author not found or database error occurs
 */
export async function getAuthorStatistics(authorId: string): Promise<Record<string, unknown> | null> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/authors/${encodeURIComponent(authorId)}/statistics`,
      {
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error('Failed to fetch author statistics')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching author statistics:', error)
    throw error
  }
}

/**
 * Update author statistics
 * PUT /api/authors/{author_id}/statistics
 *
 * Allows updating:
 * - Total books published
 * - Total readers reached
 * - Average rating (0-5)
 *
 * @param authorId - The unique identifier of the author
 * @param updateData - Statistics fields to update
 * @returns Updated author profile data with new statistics
 * @throws Error if author not found or database error occurs
 */
export async function updateAuthorStatistics(
  authorId: string,
  updateData: AuthorStatisticsUpdateRequest
): Promise<Record<string, unknown>> {
  try {
    const params = new URLSearchParams()
    if (updateData.books_published !== undefined) {
      params.append('books_published', updateData.books_published.toString())
    }
    if (updateData.readers_reached !== undefined) {
      params.append('readers_reached', updateData.readers_reached.toString())
    }
    if (updateData.average_rating !== undefined) {
      params.append('average_rating', updateData.average_rating.toString())
    }

    const response = await fetch(
      `${API_BASE_URL}/api/authors/${encodeURIComponent(authorId)}/statistics?${params.toString()}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        detail: 'Failed to update author statistics',
      }))
      throw new Error(error.detail || 'Failed to update author statistics')
    }

    return await response.json()
  } catch (error) {
    console.error('Error updating author statistics:', error)
    throw error
  }
}

/**
 * Get author public profile
 * GET /api/authors/{author_id}/public-profile
 *
 * Returns profile information suitable for public display:
 * - Basic info (name, email, bio, website)
 * - Verification status
 * - Publishing statistics
 * - Average rating
 *
 * @param authorId - The unique identifier of the author
 * @returns Author public profile data
 * @throws Error if author not found or database error occurs
 */
export async function getAuthorPublicProfile(authorId: string): Promise<Record<string, unknown> | null> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/authors/${encodeURIComponent(authorId)}/public-profile`,
      {
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error('Failed to fetch author public profile')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching author public profile:', error)
    throw error
  }
}

/**
 * Delete author account
 * DELETE /api/authors/{author_id}/account
 *
 * WARNING: This action is irreversible!
 * This will delete the author from the authors collection and remove all associated author data.
 *
 * @param authorId - The unique identifier of the author to delete
 * @returns Confirmation message
 * @throws Error if author not found or database error occurs
 */
export async function deleteAuthorAccount(authorId: string): Promise<Record<string, unknown>> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/authors/${encodeURIComponent(authorId)}/account`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        detail: 'Failed to delete author account',
      }))
      throw new Error(error.detail || 'Failed to delete author account')
    }

    return await response.json()
  } catch (error) {
    console.error('Error deleting author account:', error)
    throw error
  }
}

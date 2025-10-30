/**
 * Members API Service
 * Handles all member-related API calls
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

export interface MemberProfile {
  id?: string
  email: string
  name?: string
  displayName?: string
  phoneNumber?: string
  address?: string
  createdAt?: string
  updatedAt?: string
  [key: string]: unknown
}

/**
 * Get member profile by email
 * GET /api/members/email/{email}
 */
export async function getUserInfo(email: string): Promise<MemberProfile | null> {
  try {
    if (!email || !email.trim()) {
      return null
    }

    const response = await fetch(
      `${API_BASE_URL}/api/members/email/${encodeURIComponent(email)}`,
      {
        method: 'GET',
      }
    )

    if (!response.ok) {
      if (response.status === 404) {
        // Member not found - return null instead of throwing
        return null
      }
      const error = await response.json().catch(() => ({ detail: 'Failed to fetch user info' }))
      throw new Error(error.detail || 'Failed to fetch user info')
    }

    const data = await response.json()
    return data as MemberProfile
  } catch (error) {
    console.error('Error fetching user info:', error)
    // Return null on error instead of throwing to prevent breaking the auth flow
    return null
  }
}

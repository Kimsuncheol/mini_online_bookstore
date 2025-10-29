const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

/**
 * Check in a user for today
 * POST /api/check-in/check-in
 *
 * Updates streak count, total check-ins, and determines earned coupons.
 *
 * @param userId - The unique identifier of the user
 * @param userEmail - The user's email address
 * @param userName - The user's name
 * @returns Check-in response with updated statistics and earned coupons
 * @throws Error if the check-in fails
 */
export async function checkIn(
  userId: string,
  userEmail: string,
  userName: string
): Promise<Record<string, unknown>> {
  try {
    const params = new URLSearchParams({
      user_id: userId,
      user_email: userEmail,
      user_name: userName,
    })

    const response = await fetch(
      `${API_BASE_URL}/api/check-in/check-in?${params.toString()}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        detail: 'Failed to check in',
      }))
      throw new Error(error.detail || 'Failed to check in')
    }

    return await response.json()
  } catch (error) {
    console.error('Error during check-in:', error)
    throw error
  }
}

/**
 * Get check-in statistics for a user
 * GET /api/check-in/stats/{user_email}
 *
 * Returns current streak, longest streak, total check-ins, and last check-in date.
 *
 * @param userEmail - The user's email address
 * @returns User's check-in statistics
 * @throws Error if user has no check-in data or database error occurs
 */
export async function getCheckInStats(userEmail: string): Promise<Record<string, unknown> | null> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/check-in/stats/${encodeURIComponent(userEmail)}`,
      {
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error('Failed to fetch check-in stats')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching check-in stats:', error)
    throw error
  }
}

/**
 * Get user check-in profile
 * GET /api/check-in/profile/{user_id}
 *
 * Returns comprehensive check-in data including statistics, recent records, and coupons.
 *
 * @param userId - The unique identifier of the user
 * @param userEmail - The user's email address
 * @param userName - The user's name
 * @returns User's complete check-in profile
 * @throws Error if user has no check-in data or database error occurs
 */
export async function getUserCheckInProfile(
  userId: string,
  userEmail: string,
  userName: string
): Promise<Record<string, unknown> | null> {
  try {
    const params = new URLSearchParams({
      user_email: userEmail,
      user_name: userName,
    })

    const response = await fetch(
      `${API_BASE_URL}/api/check-in/profile/${userId}?${params.toString()}`,
      {
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error('Failed to fetch check-in profile')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching check-in profile:', error)
    throw error
  }
}

/**
 * Get check-in records for a user
 * GET /api/check-in/records/{user_email}
 *
 * Returns daily check-in records for the specified number of days.
 *
 * @param userEmail - The user's email address
 * @param days - Number of days to retrieve (default: 90, max: 365)
 * @returns List of check-in records
 * @throws Error if database error occurs
 */
export async function getCheckInRecords(
  userEmail: string,
  days: number = 90
): Promise<Record<string, unknown>> {
  try {
    const params = new URLSearchParams({
      days: Math.min(days, 365).toString(),
    })

    const response = await fetch(
      `${API_BASE_URL}/api/check-in/records/${encodeURIComponent(userEmail)}?${params.toString()}`,
      {
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch check-in records')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching check-in records:', error)
    throw error
  }
}

/**
 * Reset daily check-in flags for all users
 * POST /api/check-in/reset-daily-flags
 *
 * This endpoint should be called once per day via a scheduled task/cron job
 * to reset the daily check-in flag for all users.
 *
 * @returns Confirmation message
 * @throws Error if database error occurs
 */
export async function resetDailyCheckInFlags(): Promise<Record<string, unknown>> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/check-in/reset-daily-flags`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to reset daily flags')
    }

    return await response.json()
  } catch (error) {
    console.error('Error resetting daily flags:', error)
    throw error
  }
}

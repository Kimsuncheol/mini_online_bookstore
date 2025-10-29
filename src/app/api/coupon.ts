const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

/**
 * Coupon Create Request Interface
 */
export interface CouponCreateRequest {
  code: string
  discount_value: number
  source: 'streak' | 'promotion' | 'spin_wheel'
  description: string
  expiry_date?: string
}

/**
 * Coupon Update Request Interface
 */
export interface CouponUpdateRequest {
  code?: string
  discount_value?: number
  source?: 'streak' | 'promotion' | 'spin_wheel'
  description?: string
  used?: boolean
  used_at?: string
  expiry_date?: string
}

/**
 * Create a new coupon for a user
 * POST /api/coupons
 *
 * @param userId - The unique identifier of the user
 * @param userEmail - The user's email address
 * @param couponData - Coupon data (code, discount_value, source, description)
 * @returns Created coupon details
 * @throws Error if no coupon data provided or database error occurs
 */
export async function createCoupon(
  userId: string,
  userEmail: string,
  couponData: CouponCreateRequest
): Promise<Record<string, unknown>> {
  try {
    const params = new URLSearchParams({
      user_id: userId,
      user_email: userEmail,
    })

    const response = await fetch(`${API_BASE_URL}/api/coupons?${params.toString()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(couponData),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        detail: 'Failed to create coupon',
      }))
      throw new Error(error.detail || 'Failed to create coupon')
    }

    return await response.json()
  } catch (error) {
    console.error('Error creating coupon:', error)
    throw error
  }
}

/**
 * Get all coupons for a user
 * GET /api/coupons
 *
 * @param userEmail - The user's email address
 * @param activeOnly - If true, return only active coupons (default: false)
 * @returns List of user's coupons and count
 * @throws Error if database error occurs
 */
export async function getUserCoupons(
  userEmail: string,
  activeOnly: boolean = false
): Promise<Record<string, unknown>> {
  try {
    const params = new URLSearchParams({
      user_email: userEmail,
      active_only: activeOnly.toString(),
    })

    const response = await fetch(
      `${API_BASE_URL}/api/coupons?${params.toString()}`,
      {
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch coupons')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching coupons:', error)
    throw error
  }
}

/**
 * Get a coupon by ID
 * GET /api/coupons/{coupon_id}
 *
 * @param couponId - The unique identifier of the coupon
 * @param userEmail - The user's email address
 * @returns Coupon details
 * @throws Error if coupon not found or database error occurs
 */
export async function getCoupon(couponId: string, userEmail: string): Promise<Record<string, unknown> | null> {
  try {
    const params = new URLSearchParams({
      user_email: userEmail,
    })

    const response = await fetch(
      `${API_BASE_URL}/api/coupons/${couponId}?${params.toString()}`,
      {
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error('Failed to fetch coupon')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching coupon:', error)
    throw error
  }
}

/**
 * Update a coupon
 * PATCH /api/coupons/{coupon_id}
 *
 * @param couponId - The unique identifier of the coupon
 * @param userEmail - The user's email address
 * @param updateData - Fields to update
 * @returns Updated coupon details
 * @throws Error if no update data provided, coupon not found, or database error occurs
 */
export async function updateCoupon(
  couponId: string,
  userEmail: string,
  updateData: CouponUpdateRequest
): Promise<Record<string, unknown>> {
  try {
    const params = new URLSearchParams({
      user_email: userEmail,
    })

    const response = await fetch(
      `${API_BASE_URL}/api/coupons/${couponId}?${params.toString()}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      }
    )

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        detail: 'Failed to update coupon',
      }))
      throw new Error(error.detail || 'Failed to update coupon')
    }

    return await response.json()
  } catch (error) {
    console.error('Error updating coupon:', error)
    throw error
  }
}

/**
 * Delete a coupon
 * DELETE /api/coupons/{coupon_id}
 *
 * @param couponId - The unique identifier of the coupon
 * @param userEmail - The user's email address
 * @returns Confirmation message
 * @throws Error if database error occurs
 */
export async function deleteCoupon(couponId: string, userEmail: string): Promise<Record<string, unknown>> {
  try {
    const params = new URLSearchParams({
      user_email: userEmail,
    })

    const response = await fetch(
      `${API_BASE_URL}/api/coupons/${couponId}?${params.toString()}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to delete coupon')
    }

    return await response.json()
  } catch (error) {
    console.error('Error deleting coupon:', error)
    throw error
  }
}

/**
 * Mark a coupon as used
 * POST /api/coupons/{coupon_id}/use
 *
 * @param couponId - The unique identifier of the coupon
 * @param userEmail - The user's email address
 * @returns Updated coupon with used status
 * @throws Error if coupon not found, already used, expired, or database error occurs
 */
export async function useCoupon(couponId: string, userEmail: string): Promise<Record<string, unknown>> {
  try {
    const params = new URLSearchParams({
      user_email: userEmail,
    })

    const response = await fetch(
      `${API_BASE_URL}/api/coupons/${couponId}/use?${params.toString()}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        detail: 'Failed to use coupon',
      }))
      throw new Error(error.detail || 'Failed to use coupon')
    }

    return await response.json()
  } catch (error) {
    console.error('Error using coupon:', error)
    throw error
  }
}

/**
 * Mark a coupon as issued
 * POST /api/coupons/{coupon_id}/issue
 *
 * @param couponId - The unique identifier of the coupon
 * @param userId - The unique identifier of the user
 * @param userEmail - The user's email address
 * @returns Updated coupon with issued status
 * @throws Error if coupon not found or database error occurs
 */
export async function issueCoupon(
  couponId: string,
  userId: string,
  userEmail: string
): Promise<Record<string, unknown>> {
  try {
    const params = new URLSearchParams({
      user_id: userId,
      user_email: userEmail,
    })

    const response = await fetch(
      `${API_BASE_URL}/api/coupons/${couponId}/issue?${params.toString()}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        detail: 'Failed to issue coupon',
      }))
      throw new Error(error.detail || 'Failed to issue coupon')
    }

    return await response.json()
  } catch (error) {
    console.error('Error issuing coupon:', error)
    throw error
  }
}

/**
 * Create a coupon issue record for a streak milestone
 * POST /api/coupons/issue-records
 *
 * Called when a user reaches a streak milestone (7, 14, 30 days, etc).
 *
 * @param userId - The unique identifier of the user
 * @param userEmail - The user's email address
 * @param streakDays - Number of consecutive days (e.g., 7, 14, 30)
 * @param couponValue - Dollar value of the coupon
 * @returns Created coupon issue record
 * @throws Error if database error occurs or coupon already issued
 */
export async function createCouponIssueRecord(
  userId: string,
  userEmail: string,
  streakDays: number,
  couponValue: number
): Promise<Record<string, unknown>> {
  try {
    const params = new URLSearchParams({
      user_id: userId,
      user_email: userEmail,
      streak_days: streakDays.toString(),
      coupon_value: couponValue.toString(),
    })

    const response = await fetch(
      `${API_BASE_URL}/api/coupons/issue-records?${params.toString()}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        detail: 'Failed to create coupon issue record',
      }))
      throw new Error(error.detail || 'Failed to create coupon issue record')
    }

    return await response.json()
  } catch (error) {
    console.error('Error creating coupon issue record:', error)
    throw error
  }
}

/**
 * Get all coupon issue records for a user
 * GET /api/coupons/issue-records/{user_email}
 *
 * Shows which streak milestones have had coupons issued.
 *
 * @param userEmail - The user's email address
 * @returns List of coupon issue records
 * @throws Error if database error occurs
 */
export async function getCouponIssueRecords(userEmail: string): Promise<Record<string, unknown>> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/coupons/issue-records/${encodeURIComponent(userEmail)}`,
      {
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch coupon issue records')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching coupon issue records:', error)
    throw error
  }
}

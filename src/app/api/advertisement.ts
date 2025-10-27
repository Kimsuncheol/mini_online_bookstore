import { Advertisement, AdvertisementCreate, AdvertisementUpdate } from '@/interfaces/advertisement'
import { HeroCarouselBook } from '@/interfaces/book'

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
 * Create a new advertisement
 * POST /api/advertisements
 */
export async function createAdvertisement(adData: AdvertisementCreate): Promise<Advertisement> {
  try {
    const snakeCaseData = toSnakeCase(adData)

    const response = await fetch(`${API_BASE_URL}/api/advertisements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(snakeCaseData),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Failed to create advertisement' }))
      throw new Error(error.detail || 'Failed to create advertisement')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error creating advertisement:', error)
    throw error
  }
}

/**
 * Get all advertisements
 * GET /api/advertisements
 */
export async function getAllAdvertisements(limit?: number): Promise<Advertisement[]> {
  try {
    const url = new URL(`${API_BASE_URL}/api/advertisements`)
    if (limit) {
      url.searchParams.append('limit', limit.toString())
    }

    const response = await fetch(url.toString(), {
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch advertisements')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error fetching advertisements:', error)
    throw error
  }
}

/**
 * Get a single advertisement by ID
 * GET /api/advertisements/{ad_id}
 */
export async function getAdvertisement(adId: string): Promise<Advertisement> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/advertisements/${adId}`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Advertisement not found')
      }
      throw new Error('Failed to fetch advertisement')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error fetching advertisement:', error)
    throw error
  }
}

/**
 * Update an advertisement
 * PATCH /api/advertisements/{ad_id}
 */
export async function updateAdvertisement(adId: string, updateData: AdvertisementUpdate): Promise<Advertisement> {
  try {
    const snakeCaseData = toSnakeCase(updateData)

    const response = await fetch(`${API_BASE_URL}/api/advertisements/${adId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(snakeCaseData),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Failed to update advertisement' }))
      if (response.status === 404) {
        throw new Error('Advertisement not found')
      }
      throw new Error(error.detail || 'Failed to update advertisement')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error updating advertisement:', error)
    throw error
  }
}

/**
 * Delete an advertisement
 * DELETE /api/advertisements/{ad_id}
 */
export async function deleteAdvertisement(adId: string): Promise<{ message: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/advertisements/${adId}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Advertisement not found')
      }
      throw new Error('Failed to delete advertisement')
    }

    return await response.json()
  } catch (error) {
    console.error('Error deleting advertisement:', error)
    throw error
  }
}

/**
 * Get active advertisements
 * GET /api/advertisements/active/list
 */
export async function getActiveAdvertisements(limit: number = 10): Promise<Advertisement[]> {
  try {
    const url = new URL(`${API_BASE_URL}/api/advertisements/active/list`)
    url.searchParams.append('limit', limit.toString())

    const response = await fetch(url.toString(), {
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch active advertisements')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error fetching active advertisements:', error)
    throw error
  }
}

/**
 * Get hero carousel books (client-facing endpoint)
 * GET /api/advertisements/hero-carousel/books
 */
export async function getHeroCarouselBooks(limit: number = 10): Promise<HeroCarouselBook[]> {
  try {
    const url = new URL(`${API_BASE_URL}/api/advertisements/hero-carousel/books`)
    url.searchParams.append('limit', limit.toString())

    const response = await fetch(url.toString(), {
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch hero carousel books')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error fetching hero carousel books:', error)
    throw error
  }
}

/**
 * Toggle advertisement active status
 * PATCH /api/advertisements/{ad_id}/toggle-active
 */
export async function toggleAdvertisementStatus(adId: string): Promise<Advertisement> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/advertisements/${adId}/toggle-active`, {
      method: 'PATCH',
    })

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Advertisement not found')
      }
      throw new Error('Failed to toggle advertisement status')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error toggling advertisement status:', error)
    throw error
  }
}

/**
 * Reorder advertisement
 * PATCH /api/advertisements/{ad_id}/reorder
 */
export async function reorderAdvertisement(adId: string, newOrder: number): Promise<Advertisement> {
  try {
    const url = new URL(`${API_BASE_URL}/api/advertisements/${adId}/reorder`)
    url.searchParams.append('new_order', newOrder.toString())

    const response = await fetch(url.toString(), {
      method: 'PATCH',
    })

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Advertisement not found')
      }
      throw new Error('Failed to reorder advertisement')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error reordering advertisement:', error)
    throw error
  }
}

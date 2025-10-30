/**
 * Search API Service
 * Handles all search-related API calls
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

/**
 * Search request payload
 */
export interface SearchRequest {
  query: string
  search_type?: 'all' | 'books' | 'authors' | 'categories'
  page?: number
  page_size?: number
  user_id?: string
}

/**
 * Search result item
 */
export interface SearchResultItem {
  id: string
  title: string
  type: 'book' | 'author' | 'category'
  subtitle?: string
  description?: string
  image?: string
  url?: string
  score?: number
}

/**
 * Search response
 */
export interface SearchResponse {
  query: string
  results: SearchResultItem[]
  suggestions?: string[]
  total: number
  page: number
  page_size: number
  has_more: boolean
}

/**
 * Search history item
 */
export interface SearchHistoryItem {
  id: string
  query: string
  search_type?: string
  timestamp: string
  result_count?: number
}

/**
 * Popular search item
 */
export interface PopularSearch {
  query: string
  count: number
}

/**
 * Utility function to convert snake_case to camelCase
 */
function toCamelCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(toCamelCase)
  }

  if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((result, key) => {
      const camelKey = key.replace(/_([a-z])/g, (_, char) => char.toUpperCase())
      result[camelKey] = toCamelCase(obj[key])
      return result
    }, {} as any)
  }

  return obj
}

/**
 * Search books with fuzzy matching and AI suggestions
 * POST /api/search
 */
export async function searchBooks(request: SearchRequest): Promise<SearchResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Search failed' }))
      throw new Error(error.detail || 'Search failed')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error searching books:', error)
    throw error
  }
}

/**
 * Get search history for a user
 * GET /api/search/history/{user_id}
 */
export async function getSearchHistory(
  userId: string,
  limit?: number
): Promise<SearchHistoryItem[]> {
  try {
    const params = new URLSearchParams()
    if (limit) params.append('limit', limit.toString())

    const response = await fetch(
      `${API_BASE_URL}/api/search/history/${userId}?${params.toString()}`,
      {
        method: 'GET',
      }
    )

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Failed to get history' }))
      throw new Error(error.detail || 'Failed to get history')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error getting search history:', error)
    throw error
  }
}

/**
 * Clear search history for a user
 * DELETE /api/search/history/{user_id}
 */
export async function clearSearchHistory(userId: string): Promise<{ message: string }> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/search/history/${userId}`,
      {
        method: 'DELETE',
      }
    )

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Failed to clear history' }))
      throw new Error(error.detail || 'Failed to clear history')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error clearing search history:', error)
    throw error
  }
}

/**
 * Get popular searches
 * GET /api/search/popular
 */
export async function getPopularSearches(limit?: number): Promise<PopularSearch[]> {
  try {
    const params = new URLSearchParams()
    if (limit) params.append('limit', limit.toString())

    const response = await fetch(
      `${API_BASE_URL}/api/search/popular?${params.toString()}`,
      {
        method: 'GET',
      }
    )

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Failed to get popular searches' }))
      throw new Error(error.detail || 'Failed to get popular searches')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error getting popular searches:', error)
    throw error
  }
}

/**
 * Get related search suggestions for a book
 * GET /api/search/suggestions/related/{book_id}
 */
export async function getRelatedSearches(bookId: string): Promise<string[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/search/suggestions/related/${bookId}`,
      {
        method: 'GET',
      }
    )

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Failed to get related searches' }))
      throw new Error(error.detail || 'Failed to get related searches')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error getting related searches:', error)
    throw error
  }
}

/**
 * Expand search query with related terms and synonyms
 * POST /api/search/expand
 */
export async function expandSearchQuery(query: string): Promise<{ [key: string]: string[] }> {
  try {
    const params = new URLSearchParams()
    params.append('query', query)

    const response = await fetch(
      `${API_BASE_URL}/api/search/expand?${params.toString()}`,
      {
        method: 'POST',
      }
    )

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Failed to expand query' }))
      throw new Error(error.detail || 'Failed to expand query')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error expanding search query:', error)
    throw error
  }
}

/**
 * Analyze content similarity between query and books
 * POST /api/search/analyze-similarity
 */
export async function analyzeSimilarity(
  query: string,
  limit?: number
): Promise<SearchResultItem[]> {
  try {
    const params = new URLSearchParams()
    params.append('query', query)
    if (limit) params.append('limit', limit.toString())

    const response = await fetch(
      `${API_BASE_URL}/api/search/analyze-similarity?${params.toString()}`,
      {
        method: 'POST',
      }
    )

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Failed to analyze similarity' }))
      throw new Error(error.detail || 'Failed to analyze similarity')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error analyzing similarity:', error)
    throw error
  }
}

/**
 * Search Interfaces
 * Types for search functionality
 */

/**
 * Search request payload
 */
export interface SearchRequest {
  query: string
  search_type?: 'all' | 'books' | 'authors' | 'categories'
  page?: number
  page_size?: number
  user_email?: string
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
  timestamp: number | string
  user_email?: string
  search_type?: string
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
 * Search result (for UI display)
 */
export interface SearchResult {
  id: string
  title: string
  type: 'book' | 'author' | 'category'
  subtitle?: string
  imageUrl?: string
  url: string
}

/**
 * Search settings
 */
export interface SearchSettings {
  historyEnabled: boolean
}

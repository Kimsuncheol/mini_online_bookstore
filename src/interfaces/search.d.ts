/**
 * Search Interfaces
 * Types for search functionality
 */

/**
 * Search history item
 */
export interface SearchHistoryItem {
  id: string
  query: string
  timestamp: number
}

/**
 * Search result
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

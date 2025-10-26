/**
 * Search History Service
 * Manages search history in localStorage
 */

import type { SearchHistoryItem, SearchSettings } from '@/interfaces/search'

const HISTORY_KEY = 'booknest_search_history'
const SETTINGS_KEY = 'booknest_search_settings'
const MAX_HISTORY_ITEMS = 10

/**
 * Get search settings
 */
export function getSearchSettings(): SearchSettings {
  if (typeof window === 'undefined') {
    return { historyEnabled: true }
  }

  try {
    const stored = localStorage.getItem(SETTINGS_KEY)
    return stored ? JSON.parse(stored) : { historyEnabled: true }
  } catch {
    return { historyEnabled: true }
  }
}

/**
 * Save search settings
 */
export function saveSearchSettings(settings: SearchSettings): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
  } catch (error) {
    console.error('Failed to save search settings:', error)
  }
}

/**
 * Get search history
 */
export function getSearchHistory(): SearchHistoryItem[] {
  if (typeof window === 'undefined') return []

  try {
    const stored = localStorage.getItem(HISTORY_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

/**
 * Add search to history
 */
export function addToSearchHistory(query: string): void {
  if (typeof window === 'undefined') return
  if (!query.trim()) return

  const settings = getSearchSettings()
  if (!settings.historyEnabled) return

  try {
    const history = getSearchHistory()

    // Remove duplicate if exists
    const filtered = history.filter((item) => item.query.toLowerCase() !== query.toLowerCase())

    // Add new item at the beginning
    const newItem: SearchHistoryItem = {
      id: Date.now().toString(),
      query: query.trim(),
      timestamp: Date.now(),
    }

    const updated = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS)
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
  } catch (error) {
    console.error('Failed to save search history:', error)
  }
}

/**
 * Remove item from search history
 */
export function removeFromSearchHistory(id: string): void {
  if (typeof window === 'undefined') return

  try {
    const history = getSearchHistory()
    const updated = history.filter((item) => item.id !== id)
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
  } catch (error) {
    console.error('Failed to remove from search history:', error)
  }
}

/**
 * Clear all search history
 */
export function clearSearchHistory(): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.removeItem(HISTORY_KEY)
  } catch (error) {
    console.error('Failed to clear search history:', error)
  }
}

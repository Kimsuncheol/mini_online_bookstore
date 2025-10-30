'use client'

import { useState, useEffect } from 'react'
import {
  Popover,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import type { SearchHistoryItem, SearchResult } from '@/interfaces/search'
import {
  getSearchHistory as getLocalSearchHistory,
  addToSearchHistory as addToLocalSearchHistory,
  removeFromSearchHistory as removeFromLocalSearchHistory,
  clearSearchHistory as clearLocalSearchHistory,
  getSearchSettings,
  saveSearchSettings,
} from '@/services/searchHistoryService'
import {
  searchBooks as apiSearchBooks,
  getSearchHistory as apiGetSearchHistory,
  clearSearchHistory as apiClearSearchHistory,
  type SearchResultItem,
  type SearchResponse,
} from '@/app/api/search'
import { useAuth } from '@/contexts/AuthContext'
import ConfirmDialog from '../common/dialogs/ConfirmDialog'
import SearchModeContent from './SearchModeContent'
import SearchPageAIModal from './SearchPageAIModal'

type SearchPageSearchModalMode = 'search' | 'ai'

interface SearchPageSearchModalProps {
  open: boolean
  onClose: () => void
  anchorEl: HTMLElement | null
  onSearch: (query: string) => void
}

/**
 * Search books using the API
 */
async function searchBooksAPI(query: string, userEmail?: string): Promise<SearchResult[]> {
  if (!query.trim()) return []

  try {
    const response: SearchResponse = await apiSearchBooks({
      query,
      search_type: 'all',
      page_size: 10,
      user_email: userEmail,
    })

    return response.results.map((item: SearchResultItem) => ({
      id: item.id,
      title: item.title,
      type: item.type,
      subtitle: item.subtitle || item.description,
      url: item.url || `/${item.type}s/${item.id}`,
    }))
  } catch (error) {
    console.error('API search failed:', error)
    return []
  }
}

export default function SearchPageSearchModal({
  open,
  onClose,
  anchorEl,
  onSearch,
}: SearchPageSearchModalProps) {
  const router = useRouter()
  const { user } = useAuth()
  const [mode, setMode] = useState<SearchPageSearchModalMode>('search')
  const [query, setQuery] = useState('')
  const [history, setHistory] = useState<SearchHistoryItem[]>([])
  const [historyEnabled, setHistoryEnabled] = useState(true)
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [aiKeywordsEnabled, setAIKeywordsEnabled] = useState(true)

  // Load history and settings on mount
  useEffect(() => {
    const loadHistory = async () => {
      if (open) {
        if (user?.email) {
          try {
            const apiHistory = await apiGetSearchHistory(user.email)
            const formattedHistory: SearchHistoryItem[] = apiHistory.map((item) => ({
              id: item.id,
              query: item.query,
              timestamp: new Date(item.timestamp).getTime(),
            }))
            setHistory(formattedHistory)
          } catch (error) {
            console.error('Failed to fetch search history from API:', error)
            setHistory(getLocalSearchHistory())
          }
        } else {
          setHistory(getLocalSearchHistory())
        }
        const settings = getSearchSettings()
        setHistoryEnabled(settings.historyEnabled)
      }
    }
    loadHistory()
  }, [open, user])

  // Reset mode and query when modal opens
  useEffect(() => {
    if (open) {
      setMode('search')
      setQuery('')
      setSearchResults([])
    }
  }, [open])

  // Fetch search results when query changes
  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setSearchResults([])
        return
      }

      try {
        const results = await searchBooksAPI(query, user?.email || undefined)
        setSearchResults(results)
      } catch (error) {
        console.error('Error fetching search results:', error)
        setSearchResults([])
      }
    }

    const timer = setTimeout(fetchResults, 300)
    return () => clearTimeout(timer)
  }, [query, user])

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return

    addToLocalSearchHistory(searchQuery)

    const params = new URLSearchParams({
      SearchTarget: 'all',
      SearchWord: searchQuery,
    })
    router.push(`/search?${params.toString()}`)

    onSearch(searchQuery)
    onClose()
  }

  const handleResultClick = (url: string) => {
    addToLocalSearchHistory(query)
    router.push(url)
    onClose()
  }

  const handleRemoveHistoryItem = (id: string) => {
    removeFromLocalSearchHistory(id)
    setHistory(getLocalSearchHistory())
    setSnackbarMessage('Search removed from history')
    setSnackbarOpen(true)
  }

  const handleClearHistory = () => {
    setConfirmDeleteOpen(true)
  }

  const handleConfirmClearHistory = async () => {
    try {
      if (user?.email) {
        await apiClearSearchHistory(user.email)
      } else {
        clearLocalSearchHistory()
      }
      setHistory([])
      setConfirmDeleteOpen(false)
      setSnackbarMessage('All search history cleared')
      setSnackbarOpen(true)
    } catch (error) {
      console.error('Failed to clear search history:', error)
      setSnackbarMessage('Failed to clear search history')
      setSnackbarOpen(true)
    }
  }

  const handleHistoryToggle = async (enabled: boolean) => {
    setHistoryEnabled(enabled)
    saveSearchSettings({ historyEnabled: enabled })
    if (!enabled) {
      try {
        if (user?.email) {
          await apiClearSearchHistory(user.email)
        } else {
          clearLocalSearchHistory()
        }
        setHistory([])
      } catch (error) {
        console.error('Failed to clear search history:', error)
      }
    }
  }

  const handleSwitchToAIMode = () => {
    setMode('ai')
  }

  const handleBackToSearch = () => {
    setMode('search')
  }

  const syncSearchBooks = (q: string): SearchResult[] => {
    if (!q.trim()) return []
    return searchResults
  }

  const popoverStyles = mode === 'ai'
    ? {
        borderRadius: 3,
        mt: 1,
        width: 900,
        maxWidth: '90vw',
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
      }
    : {
        borderRadius: 3,
        mt: 1,
        width: anchorEl?.offsetWidth || 600,
        maxWidth: 800,
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
      }

  return (
    <>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        slotProps={{
          paper: {
            sx: popoverStyles,
          },
        }}
      >
        <Paper sx={{ p: 0 }}>
          {mode === 'search' ? (
            <SearchModeContent
              query={query}
              onQueryChange={setQuery}
              onSearch={handleSearch}
              onResultClick={handleResultClick}
              onRemoveHistoryItem={handleRemoveHistoryItem}
              onClearHistory={handleClearHistory}
              onHistoryToggle={handleHistoryToggle}
              onAIKeywordsToggle={setAIKeywordsEnabled}
              onSwitchToAIMode={handleSwitchToAIMode}
              history={history}
              historyEnabled={historyEnabled}
              aiKeywordsEnabled={aiKeywordsEnabled}
              searchBooks={syncSearchBooks}
            />
          ) : (
            <SearchPageAIModal
              onBackToSearch={handleBackToSearch}
              isOpen={open && mode === 'ai'}
            />
          )}
        </Paper>
      </Popover>

      <ConfirmDialog
        open={confirmDeleteOpen}
        title="Clear Search History"
        message="Are you sure you want to delete all search history? This action cannot be undone."
        confirmText="Delete All"
        cancelText="Cancel"
        onConfirm={handleConfirmClearHistory}
        onCancel={() => setConfirmDeleteOpen(false)}
        danger
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: '100%', borderRadius: 2 }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

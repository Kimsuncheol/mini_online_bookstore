'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Popover,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import type { SearchHistoryItem, SearchResult } from '@/interfaces/search'
import {
  getSearchHistory,
  addToSearchHistory,
  removeFromSearchHistory,
  clearSearchHistory,
  getSearchSettings,
  saveSearchSettings,
} from '@/services/searchHistoryService'
import ConfirmDialog from '../common/dialogs/ConfirmDialog'
import SearchModeContent from './SearchModeContent'
import AIModeContent from './AIModeContent'

type SearchModalMode = 'search' | 'ai'

interface SearchModalProps {
  open: boolean
  onClose: () => void
  anchorEl: HTMLElement | null
}

// Mock search function - replace with real API call
function searchBooks(query: string): SearchResult[] {
  if (!query.trim()) return []

  // Mock data
  const mockResults: SearchResult[] = [
    {
      id: '1',
      title: 'The Great Gatsby',
      type: 'book',
      subtitle: 'F. Scott Fitzgerald',
      url: '/books/1',
    },
    {
      id: '2',
      title: 'F. Scott Fitzgerald',
      type: 'author',
      subtitle: '12 books',
      url: '/authors/fitzgerald',
    },
    {
      id: '3',
      title: 'Classic Fiction',
      type: 'category',
      subtitle: '234 books',
      url: '/books/fiction',
    },
  ]

  return mockResults.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle?.toLowerCase().includes(query.toLowerCase())
  )
}

export default function SearchModal({ open, onClose, anchorEl }: SearchModalProps) {
  const router = useRouter()
  const [mode, setMode] = useState<SearchModalMode>('search')
  const [query, setQuery] = useState('')
  const [history, setHistory] = useState<SearchHistoryItem[]>([])
  const [historyEnabled, setHistoryEnabled] = useState(true)
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  // Load history and settings on mount
  useEffect(() => {
    if (open) {
      setHistory(getSearchHistory())
      const settings = getSearchSettings()
      setHistoryEnabled(settings.historyEnabled)
    }
  }, [open])

  // Reset mode and query when modal opens (not during close to avoid width jump)
  useEffect(() => {
    if (open) {
      setMode('search')
      setQuery('')
    }
  }, [open])

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return

    addToSearchHistory(searchQuery)
    setQuery(searchQuery)
    // In a real app, you might want to navigate or trigger a search here
  }

  const handleResultClick = (url: string) => {
    addToSearchHistory(query)
    router.push(url)
    onClose()
  }

  const handleRemoveHistoryItem = (id: string) => {
    removeFromSearchHistory(id)
    setHistory(getSearchHistory())
    setSnackbarMessage('Search removed from history')
    setSnackbarOpen(true)
  }

  const handleClearHistory = () => {
    setConfirmDeleteOpen(true)
  }

  const handleConfirmClearHistory = () => {
    clearSearchHistory()
    setHistory([])
    setConfirmDeleteOpen(false)
    setSnackbarMessage('All search history cleared')
    setSnackbarOpen(true)
  }

  const handleHistoryToggle = (enabled: boolean) => {
    setHistoryEnabled(enabled)
    saveSearchSettings({ historyEnabled: enabled })
    if (!enabled) {
      clearSearchHistory()
      setHistory([])
    }
  }

  const handleSwitchToAIMode = () => {
    setMode('ai')
  }

  const handleBackToSearch = () => {
    setMode('search')
  }

  const handleClose = () => {
    // Don't reset mode here to avoid width jump during closing animation
    // Mode will be reset when modal opens again
    onClose()
  }

  // Memoize searchBooks to prevent recreating on each render
  const memoizedSearchBooks = useCallback(searchBooks, [])

  // Dynamic styling based on mode
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
        onClose={handleClose}
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
              onSwitchToAIMode={handleSwitchToAIMode}
              history={history}
              historyEnabled={historyEnabled}
              searchBooks={memoizedSearchBooks}
            />
          ) : (
            <AIModeContent
              onBackToSearch={handleBackToSearch}
              isOpen={open && mode === 'ai'}
            />
          )}
        </Paper>
      </Popover>

      {/* Confirm Delete Dialog */}
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

      {/* Success Snackbar */}
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

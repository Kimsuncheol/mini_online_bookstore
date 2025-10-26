'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  Popover,
  TextField,
  InputAdornment,
  Box,
  Typography,
  IconButton,
  Divider,
  Stack,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
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
import RecentSearchItem from './RecentSearchItem'
import SearchResultItem from './SearchResultItem'
import SearchHistoryToggle from './SearchHistoryToggle'
import DeleteSearchHistoryToggle from './DeleteSearchHistoryToggle'
import ConfirmDialog from '../common/dialogs/ConfirmDialog'

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

  // Search results
  const results = useMemo(() => searchBooks(query), [query])

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

  const handleClose = () => {
    setQuery('')
    onClose()
  }

  return (
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
          sx: {
            borderRadius: 3,
            mt: 1,
            width: anchorEl?.offsetWidth || 400,
            maxWidth: 600,
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          },
        },
      }}
    >
      <Paper sx={{ p: 0 }}>
        {/* Search Input */}
        <Box sx={{ p: 2, pb: 1 }}>
          <TextField
            fullWidth
            autoFocus
            placeholder="Search for books, authors..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && query.trim()) {
                handleSearch(query)
              }
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: query && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setQuery('')}>
                      <CloseIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
              },
            }}
          />
        </Box>

        <Divider />

        {/* Content Area */}
        <Box sx={{ maxHeight: '60vh', overflowY: 'auto', p: 2 }}>
          {query.trim() ? (
            // Show search results
            results.length > 0 ? (
              <Stack spacing={0.5}>
                {results.map((result) => (
                  <SearchResultItem
                    key={result.id}
                    result={result}
                    onClick={handleResultClick}
                  />
                ))}
              </Stack>
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body2" color="text.secondary">
                  No results found for &quot;{query}&quot;
                </Typography>
              </Box>
            )
          ) : (
            // Show recent searches
            historyEnabled && history.length > 0 ? (
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Recent Searches
                </Typography>
                <Stack spacing={0.5}>
                  {history.map((item) => (
                    <RecentSearchItem
                      key={item.id}
                      item={item}
                      onClick={handleSearch}
                      onRemove={handleRemoveHistoryItem}
                    />
                  ))}
                </Stack>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <SearchIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
                <Typography variant="body2" color="text.secondary">
                  {historyEnabled ? 'Start typing to search' : 'Search history is disabled'}
                </Typography>
              </Box>
            )
          )}
        </Box>

        <Divider />

        {/* Settings at Bottom */}
        <Box sx={{ p: 2 }}>
          <Stack spacing={1.5}>
            <SearchHistoryToggle enabled={historyEnabled} onChange={handleHistoryToggle} />
            {historyEnabled && (
              <DeleteSearchHistoryToggle
                onDelete={handleClearHistory}
                hasHistory={history.length > 0}
              />
            )}
          </Stack>
        </Box>
      </Paper>

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
    </Popover>
  )
}

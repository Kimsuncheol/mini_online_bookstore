'use client'

import { useMemo } from 'react'
import {
  TextField,
  InputAdornment,
  Box,
  Typography,
  IconButton,
  Divider,
  Stack,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import type { SearchHistoryItem, SearchResult } from '@/interfaces/search'
import RecentSearchItem from './RecentSearchItem'
import SearchResultItem from './SearchResultItem'
import SearchHistoryToggle from './SearchHistoryToggle'
import DeleteSearchHistoryToggle from './DeleteSearchHistoryToggle'
import AIKeywordToggle from './AIKeywordToggle'
import AIKeywordSuggestions from './ai/AIKeywordSuggestions'

interface SearchModeContentProps {
  query: string
  onQueryChange: (query: string) => void
  onSearch: (query: string) => void
  onResultClick: (url: string) => void
  onRemoveHistoryItem: (id: string) => void
  onClearHistory: () => void
  onHistoryToggle: (enabled: boolean) => void
  onSwitchToAIMode: () => void
  onAIKeywordsToggle: (enabled: boolean) => void
  history: SearchHistoryItem[]
  historyEnabled: boolean
  aiKeywordsEnabled: boolean
  searchBooks: (query: string) => SearchResult[]
}

export default function SearchModeContent({
  query,
  onQueryChange,
  onSearch,
  onResultClick,
  onRemoveHistoryItem,
  onClearHistory,
  onHistoryToggle,
  onAIKeywordsToggle,
  onSwitchToAIMode,
  history,
  historyEnabled,
  aiKeywordsEnabled,
  searchBooks,
}: SearchModeContentProps) {
  const results = useMemo(() => searchBooks(query), [query, searchBooks])

  return (
    <>
      {/* Search Input */}
      <Box sx={{ p: 2, pb: 1 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <TextField
            fullWidth
            autoFocus
            placeholder="Search for books, authors..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && query.trim()) {
                onSearch(query)
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
                    <IconButton size="small" onClick={() => onQueryChange('')}>
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
          <IconButton
            onClick={onSwitchToAIMode}
            sx={{
              width: 48,
              height: 48,
              borderRadius: 3,
              border: '2px solid',
              borderColor: 'divider',
              bgcolor: 'transparent',
              color: 'text.secondary',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'action.hover',
                borderColor: 'primary.main',
                color: 'primary.main',
              },
            }}
          >
            <AutoAwesomeIcon />
          </IconButton>
        </Stack>
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
                  onClick={onResultClick}
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
          // Show recent searches or suggestions
          <>
            {historyEnabled && history.length > 0 ? (
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Recent Searches
                </Typography>
                <Stack spacing={0.5}>
                  {history.map((item) => (
                    <RecentSearchItem
                      key={item.id}
                      item={item}
                      onClick={onSearch}
                      onRemove={onRemoveHistoryItem}
                    />
                  ))}
                </Stack>
              </Box>
            ) : null}
            {/* AI Keyword Suggestions */}
            {aiKeywordsEnabled && (
              <AIKeywordSuggestions onSuggestionClick={onSearch} />
            )}
          </>
        )}
      </Box>

      <Divider />

      {/* Settings at Bottom */}
      <Box sx={{ p: 2 }}>
        <Stack spacing={1.5}>
          <SearchHistoryToggle enabled={historyEnabled} onChange={onHistoryToggle} />
          {historyEnabled && (
            <DeleteSearchHistoryToggle
              onDelete={onClearHistory}
              hasHistory={history.length > 0}
            />
          )}
          <AIKeywordToggle enabled={aiKeywordsEnabled} onChange={onAIKeywordsToggle} />
        </Stack>
      </Box>
    </>
  )
}

'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  Container,
  Box,
  Typography,
  Pagination,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import GridListToggle, { type LayoutType } from '@/app/components/search/GridListToggle'
import SearchResultsContainer from '@/app/components/search/SearchResultsContainer'
import SearchLoadingSkeleton from '@/app/components/search/SearchLoadingSkeleton'
import SearchPageHeaderSearchField from '@/app/components/search/SearchPageHeaderSearchField'
import { searchBooks } from '@/app/api/search'
import { useAuth } from '@/contexts/AuthContext'
import type { SearchResultItem, SearchResponse } from '@/interfaces/search'

const RESULTS_PER_PAGE = 12

export default function SearchPage() {
  const searchParams = useSearchParams()
  const { user } = useAuth()

  // Support both old format (q) and new format (SearchTarget and SearchWord)
  const searchTarget = searchParams.get('SearchTarget') || 'all'
  const searchWord = searchParams.get('SearchWord') || ''
  const legacyQuery = searchParams.get('q') || ''
  const initialQuery = searchWord || legacyQuery

  const [query, setQuery] = useState(initialQuery)
  const [layout, setLayout] = useState<LayoutType>('grid')
  const [results, setResults] = useState<SearchResultItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const totalPages = Math.ceil(totalResults / RESULTS_PER_PAGE)

  const performSearch = useCallback(
    async (searchQuery: string, page: number = 1) => {
      if (!searchQuery.trim()) {
        setResults([])
        setError(null)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const response: SearchResponse = await searchBooks({
          query: searchQuery,
          search_type: (searchTarget as 'all' | 'books' | 'authors' | 'categories') || 'all',
          page,
          page_size: RESULTS_PER_PAGE,
          user_email: user?.email || undefined,
        })

        setResults(response.results)
        setTotalResults(response.total)
        setCurrentPage(page)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Search failed'
        setError(errorMessage)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    },
    [searchTarget, user?.email]
  )

  // Perform search when query changes
  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery, 1)
    }
  }, [initialQuery, performSearch])

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    performSearch(query, page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleHeaderSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    setCurrentPage(1)
    performSearch(searchQuery, 1)
  }

  return (
    <>
      {/* Search Page Header */}
      <SearchPageHeaderSearchField
        onSearch={handleHeaderSearch}
        currentQuery={query}
      />

      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 2, md: 3 },
          minHeight: 'calc(100vh - 200px)',
          backgroundColor: 'background.default',
        }}
      >

      {/* Results Section */}
      {query && (
        <Box>
          {/* Results Header with Layout Toggle */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Typography variant="body2" color="textSecondary">
              {isLoading
                ? 'Loading...'
                : `${totalResults > 0 ? totalResults : 'No'} results found${
                    query ? ` for "${query}"` : ''
                  }`}
            </Typography>
            {!isLoading && results.length > 0 && (
              <GridListToggle layout={layout} onLayoutChange={setLayout} />
            )}
          </Box>

          {/* Loading State */}
          {isLoading && !results.length ? (
            <SearchLoadingSkeleton layout={layout} count={RESULTS_PER_PAGE} />
          ) : (
            <>
              {/* Results Container */}
              <SearchResultsContainer
                items={results}
                layout={layout}
                isLoading={isLoading && results.length > 0}
                error={error}
              />

              {/* Pagination */}
              {totalPages > 1 && !isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    size={window.innerWidth < 600 ? 'small' : 'medium'}
                    siblingCount={1}
                  />
                </Box>
              )}
            </>
          )}
        </Box>
      )}

      {/* Empty State */}
      {!query && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 12,
            textAlign: 'center',
          }}
        >
          <SearchIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
          <Typography variant="h6" color="textSecondary" sx={{ mb: 1 }}>
            Start searching to find books
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Enter a book title, author name, or category to begin
          </Typography>
        </Box>
      )}
      </Container>
    </>
  )
}

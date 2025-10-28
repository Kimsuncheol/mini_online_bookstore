'use client'

import { Box, Paper, Typography, Skeleton, Chip, Stack } from '@mui/material'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import type { Book } from '@/interfaces/book'

interface BookSummarySectionProps {
  book: Book
  summary?: string
  isLoading?: boolean
}

export default function BookSummarySection({ book, summary, isLoading = false }: BookSummarySectionProps) {
  // Generate a default summary if none provided
  const displaySummary = summary || generateDefaultSummary(book)

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      {/* Header */}
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2.5 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
        >
          <MenuBookIcon sx={{ color: 'white', fontSize: 24 }} />
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
            Book Summary
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Quick overview of this book
          </Typography>
        </Box>
      </Stack>

      {/* Summary Content */}
      {isLoading ? (
        <Box>
          <Skeleton variant="text" width="100%" height={30} />
          <Skeleton variant="text" width="95%" height={30} />
          <Skeleton variant="text" width="90%" height={30} />
        </Box>
      ) : (
        <>
          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.8,
              color: 'text.primary',
              mb: 2.5,
            }}
          >
            {displaySummary}
          </Typography>

          {/* Key Info Chips */}
          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
            {book.genre && (
              <Chip
                label={book.genre}
                size="small"
                sx={{
                  fontWeight: 600,
                  bgcolor: 'primary.main',
                  color: 'white',
                }}
              />
            )}
            {book.pageCount && (
              <Chip
                label={`${book.pageCount} pages`}
                size="small"
                variant="outlined"
                sx={{ fontWeight: 500 }}
              />
            )}
            {book.language && (
              <Chip
                label={book.language}
                size="small"
                variant="outlined"
                sx={{ fontWeight: 500 }}
              />
            )}
            {book.publishedDate && (
              <Chip
                label={new Date(book.publishedDate).getFullYear()}
                size="small"
                variant="outlined"
                sx={{ fontWeight: 500 }}
              />
            )}
          </Stack>
        </>
      )}

      {/* AI Badge */}
      {summary && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            mt: 2,
            pt: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <AutoAwesomeIcon sx={{ fontSize: 16, color: 'primary.main' }} />
          <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            AI-generated summary
          </Typography>
        </Box>
      )}
    </Paper>
  )
}

/**
 * Generates a default summary based on book metadata
 */
function generateDefaultSummary(book: Book): string {
  const parts: string[] = []

  // Add description if available
  if (book.description) {
    return book.description
  }

  // Otherwise, generate from metadata
  parts.push(`"${book.title}" by ${book.author}`)

  if (book.genre) {
    parts.push(`is a ${book.genre.toLowerCase()} book`)
  }

  if (book.pageCount) {
    parts.push(`spanning ${book.pageCount} pages`)
  }

  if (book.publisher) {
    parts.push(`published by ${book.publisher}`)
  }

  if (book.publishedDate) {
    const year = new Date(book.publishedDate).getFullYear()
    parts.push(`in ${year}`)
  }

  if (book.rating && book.reviewCount) {
    parts.push(
      `This book has received an average rating of ${book.rating.toFixed(1)} stars from ${book.reviewCount} readers`
    )
  }

  return parts.join(' ') + '.'
}

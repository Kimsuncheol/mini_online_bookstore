'use client'

import { useEffect, useMemo, useState } from 'react'
import { Box, Paper, Typography, Skeleton, Chip, Stack, Divider } from '@mui/material'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import type { Book, BookSummary } from '@/interfaces/book'
import { getBookSummary } from '@/app/api/books'

interface BookSummarySectionProps {
  book: Book
  summary?: string
  isLoading?: boolean
}

export default function BookSummarySection({ book, summary, isLoading = false }: BookSummarySectionProps) {
  const [aiSummary, setAiSummary] = useState<BookSummary | null>(null)
  const [loadingSummary, setLoadingSummary] = useState<boolean>(!summary)

  useEffect(() => {
    let isActive = true

    if (!book?.id || summary) {
      setAiSummary(null)
      setLoadingSummary(false)
      return
    }

    setLoadingSummary(true)

    void getBookSummary(book.id)
      .then((data) => {
        if (!isActive) return
        setAiSummary(data)
      })
      .catch((err) => {
        if (!isActive) return
        console.error('Failed to load AI book summary:', err)
        setAiSummary(null)
      })
      .finally(() => {
        if (!isActive) return
        setLoadingSummary(false)
      })

    return () => {
      isActive = false
    }
  }, [book?.id, summary])

  const primarySummary = useMemo(() => {
    if (summary) return summary
    if (aiSummary?.shortSummary) return aiSummary.shortSummary
    if (aiSummary?.detailedSummary) return aiSummary.detailedSummary
    return generateDefaultSummary(book)
  }, [aiSummary, book, summary])

  const detailedSummary = useMemo(() => {
    if (summary) return null
    if (!aiSummary?.detailedSummary) return null
    if (aiSummary.shortSummary && aiSummary.shortSummary === aiSummary.detailedSummary) {
      return null
    }
    return aiSummary.detailedSummary
  }, [aiSummary, summary])

  const targetAudienceChips = useMemo(() => {
    if (!aiSummary?.targetAudience) return []
    const segments = aiSummary.targetAudience
      .split(/[,;•]|(?:\band\b)/i)
      .map((segment) => segment.trim())
      .filter(Boolean)

    return segments.length > 1 ? segments : []
  }, [aiSummary?.targetAudience])

  const showAiBadge = Boolean(summary || aiSummary)
  const isSummaryLoading = isLoading || loadingSummary

  const chipGroups = useMemo(
    () =>
      [
        { label: 'Key Themes', items: aiSummary?.keyThemes },
        { label: 'Mood & Tone', items: aiSummary?.moodTags },
        { label: 'Content Warnings', items: aiSummary?.contentWarnings },
        { label: 'Similar Book Tags', items: aiSummary?.similarBooksTags },
      ].filter((group) => (group.items?.length ?? 0) > 0),
    [aiSummary]
  )

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
      {isSummaryLoading ? (
        <Box>
          <Skeleton variant="text" width="100%" height={30} />
          <Skeleton variant="text" width="95%" height={30} />
          <Skeleton variant="text" width="90%" height={30} />
        </Box>
      ) : (
        <Stack spacing={2.5}>
          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.8,
              color: 'text.primary',
            }}
          >
            {primarySummary}
          </Typography>

          {detailedSummary && (
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              {detailedSummary}
            </Typography>
          )}

          {aiSummary?.whyReadThis && (
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                Why you&apos;ll love it
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {aiSummary.whyReadThis}
              </Typography>
            </Box>
          )}

          {aiSummary?.targetAudience && (
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                Ideal for
              </Typography>
              {targetAudienceChips.length > 1 ? (
                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                  {targetAudienceChips.map((item) => (
                    <Chip key={item} label={item} size="small" variant="outlined" sx={{ fontWeight: 500 }} />
                  ))}
                </Stack>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  {aiSummary.targetAudience}
                </Typography>
              )}
            </Box>
          )}

          {chipGroups.map((group) => (
            <Box key={group.label}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                {group.label}
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                {group.items?.map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    size="small"
                    variant={group.label === 'Content Warnings' ? 'outlined' : 'filled'}
                    color={group.label === 'Content Warnings' ? 'warning' : 'default'}
                    sx={{ fontWeight: 500 }}
                  />
                ))}
              </Stack>
            </Box>
          ))}

          {(aiSummary?.readingLevel ||
            typeof aiSummary?.aiConfidenceScore === 'number' ||
            aiSummary?.generatedByModel) && (
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {aiSummary?.readingLevel && (
                <Chip label={`Reading Level: ${aiSummary.readingLevel}`} size="small" variant="outlined" />
              )}
              {typeof aiSummary?.aiConfidenceScore === 'number' && (
                <Chip
                  label={`AI Confidence ${(aiSummary.aiConfidenceScore * 100).toFixed(0)}%`}
                  size="small"
                  variant="outlined"
                  color="success"
                />
              )}
              {aiSummary?.generatedByModel && (
                <Chip
                  label={`Model: ${aiSummary.generatedByModel}`}
                  size="small"
                  variant="outlined"
                  sx={{ fontWeight: 500 }}
                />
              )}
            </Stack>
          )}

          <Divider sx={{ borderStyle: 'dashed', borderColor: 'divider' }} />

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
        </Stack>
      )}

      {/* AI Badge */}
      {showAiBadge && (
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

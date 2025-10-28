'use client'

import { useMemo, useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  Stack,
  Rating,
  Avatar,
  LinearProgress,
  Button,
  Divider,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import VerifiedIcon from '@mui/icons-material/Verified'
import type { BookReview, ReviewSummary } from '@/interfaces/bookReview'

interface ReviewSectionProps {
  bookId: string
  reviews: BookReview[]
  summary?: ReviewSummary
  loading?: boolean
  onLeaveReview?: () => void
}

export default function ReviewSection({
  bookId,
  reviews,
  summary,
  loading = false,
  onLeaveReview,
}: ReviewSectionProps) {
  const [sortBy, setSortBy] = useState<'helpful' | 'recent' | 'rating'>('helpful')

  const sortedReviews = useMemo(() => {
    const sorted = [...reviews]
    switch (sortBy) {
      case 'helpful':
        return sorted.sort((a, b) => b.helpful - a.helpful)
      case 'recent':
        return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating)
      default:
        return sorted
    }
  }, [reviews, sortBy])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
            Reader Reviews
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
          </Typography>
        </Box>
        <Button variant="contained" onClick={onLeaveReview} sx={{ fontWeight: 600 }}>
          Leave a Review
        </Button>
      </Stack>

      {reviews.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <StarIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            No reviews yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Be the first to share your thoughts about this book
          </Typography>
          <Button variant="contained" onClick={onLeaveReview}>
            Write the First Review
          </Button>
        </Box>
      ) : (
        <>
          {/* Summary Stats */}
          {summary && (
            <Box sx={{ mb: 3, p: 2.5, bgcolor: 'action.hover', borderRadius: 2 }}>
              <Stack spacing={2}>
                {/* Average Rating */}
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ fontWeight: 700, lineHeight: 1 }}>
                      {summary.averageRating.toFixed(1)}
                    </Typography>
                    <Rating value={summary.averageRating} readOnly size="small" />
                  </Box>

                  {/* Rating Distribution */}
                  <Stack spacing={1} sx={{ flex: 1 }}>
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <Stack key={rating} direction="row" alignItems="center" spacing={1}>
                        <Typography variant="body2" sx={{ width: 30 }}>
                          {rating}★
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={
                            summary.ratingDistribution[rating as keyof typeof summary.ratingDistribution]
                              ? (summary.ratingDistribution[rating as keyof typeof summary.ratingDistribution] /
                                  summary.totalReviews) *
                                100
                              : 0
                          }
                          sx={{ flex: 1 }}
                        />
                        <Typography variant="caption" color="text.secondary" sx={{ width: 35 }}>
                          {summary.ratingDistribution[rating as keyof typeof summary.ratingDistribution]}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Stack>

                {/* Verified Purchases */}
                {summary.verifiedPurchaseCount > 0 && (
                  <Chip
                    icon={<VerifiedIcon />}
                    label={`${summary.verifiedPurchaseCount} Verified Purchases`}
                    size="small"
                    color="success"
                    variant="outlined"
                  />
                )}
              </Stack>
            </Box>
          )}

          <Divider sx={{ my: 3 }} />

          {/* Sort Options */}
          <Stack direction="row" spacing={1} sx={{ mb: 2.5 }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
              Sort by:
            </Typography>
            {(['helpful', 'recent', 'rating'] as const).map((option) => (
              <Button
                key={option}
                size="small"
                variant={sortBy === option ? 'contained' : 'outlined'}
                onClick={() => setSortBy(option)}
                sx={{ textTransform: 'capitalize', fontWeight: 500 }}
              >
                {option}
              </Button>
            ))}
          </Stack>

          {/* Reviews List */}
          <Stack spacing={2.5}>
            {sortedReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </Stack>
        </>
      )}
    </Paper>
  )
}

interface ReviewCardProps {
  review: BookReview
}

function ReviewCard({ review }: ReviewCardProps) {
  const [helpfulVoted, setHelpfulVoted] = useState(false)
  const [unhelpfulVoted, setUnhelpfulVoted] = useState(false)

  return (
    <Box
      sx={{
        p: 2.5,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        '&:hover': {
          bgcolor: 'action.hover',
        },
        transition: 'all 0.2s ease',
      }}
    >
      {/* Header */}
      <Stack direction="row" alignItems="flex-start" spacing={2} sx={{ mb: 2 }}>
        <Avatar src={review.userAvatar} sx={{ width: 40, height: 40 }}>
          {review.userName.charAt(0)}
        </Avatar>

        <Box sx={{ flex: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {review.userName}
            </Typography>
            {review.verified && (
              <Chip
                icon={<VerifiedIcon />}
                label="Verified Purchase"
                size="small"
                color="success"
                variant="outlined"
                sx={{ height: 22 }}
              />
            )}
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Rating value={review.rating} readOnly size="small" />
            <Typography variant="caption" color="text.secondary">
              {new Date(review.createdAt).toLocaleDateString()}
            </Typography>
          </Stack>
        </Box>
      </Stack>

      {/* Review Content */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
          {review.title}
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ lineHeight: 1.6 }}>
          {review.content}
        </Typography>
      </Box>

      {/* Helpful Actions */}
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="caption" color="text.secondary">
          Was this helpful?
        </Typography>
        <Button
          size="small"
          startIcon={<ThumbUpIcon />}
          onClick={() => setHelpfulVoted(!helpfulVoted)}
          color={helpfulVoted ? 'success' : 'inherit'}
          variant={helpfulVoted ? 'contained' : 'text'}
          sx={{
            textTransform: 'none',
            fontWeight: 500,
          }}
        >
          {review.helpful}
        </Button>
        <Button
          size="small"
          startIcon={<ThumbDownIcon />}
          onClick={() => setUnhelpfulVoted(!unhelpfulVoted)}
          color={unhelpfulVoted ? 'error' : 'inherit'}
          variant={unhelpfulVoted ? 'contained' : 'text'}
          sx={{
            textTransform: 'none',
            fontWeight: 500,
          }}
        >
          {review.unhelpful}
        </Button>
      </Stack>
    </Box>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { Alert } from '@mui/material'
import { useAuth } from '@/contexts/AuthContext'
import { getBookReviews, getReviewSummary, createReview } from '@/services/reviewService'
import ReviewSection from './ReviewSection'
import LeaveReviewDialog from './LeaveReviewDialog'
import type { BookReview, ReviewSummary } from '@/interfaces/bookReview'
import type { Book } from '@/interfaces/book'

interface BookReviewWrapperProps {
  book: Book
}

export default function BookReviewWrapper({ book }: BookReviewWrapperProps) {
  const { user } = useAuth()
  const [reviews, setReviews] = useState<BookReview[]>([])
  const [summary, setSummary] = useState<ReviewSummary | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchReviews()
  }, [book.id])

  const fetchReviews = async () => {
    try {
      setLoading(true)
      setError(null)

      const [reviewsData, summaryData] = await Promise.all([
        getBookReviews(book.id, { limit: 50, sortBy: 'recent' }),
        getReviewSummary(book.id),
      ])

      setReviews(reviewsData.reviews)
      setSummary(summaryData)
    } catch (err) {
      console.error('Error fetching reviews:', err)
      setError(err instanceof Error ? err.message : 'Failed to load reviews')
    } finally {
      setLoading(false)
    }
  }

  const handleLeaveReview = () => {
    if (!user) {
      setError('Please sign in to leave a review')
      return
    }
    setDialogOpen(true)
  }

  const handleSubmitReview = async (title: string, content: string, rating: number) => {
    if (!user?.email) {
      setError('Please sign in to leave a review')
      return
    }

    try {
      setSubmitting(true)
      setError(null)

      const newReview = await createReview(book.id, { title, content, rating }, user.email)

      // Add the new review to the list
      setReviews([newReview, ...reviews])

      // Refresh summary
      const updatedSummary = await getReviewSummary(book.id)
      setSummary(updatedSummary)

      setDialogOpen(false)
    } catch (err) {
      console.error('Error submitting review:', err)
      setError(err instanceof Error ? err.message : 'Failed to submit review')
    } finally {
      setSubmitting(false)
    }
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>
  }

  return (
    <>
      <ReviewSection
        bookId={book.id}
        reviews={reviews}
        summary={summary}
        loading={loading}
        onLeaveReview={handleLeaveReview}
      />

      <LeaveReviewDialog
        open={dialogOpen}
        bookId={book.id}
        bookTitle={book.title}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmitReview}
        userEmail={user?.email || undefined}
        userName={user?.displayName || undefined}
        submitting={submitting}
      />
    </>
  )
}

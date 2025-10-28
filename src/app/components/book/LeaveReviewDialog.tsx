'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating,
  Stack,
  Typography,
  Button,
  Box,
  Alert,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import CancelIcon from '@mui/icons-material/Cancel'

interface LeaveReviewDialogProps {
  open: boolean
  bookId: string
  bookTitle: string
  onClose: () => void
  onSubmit: (title: string, content: string, rating: number) => Promise<void>
  userEmail?: string
  userName?: string
  submitting?: boolean
}

export default function LeaveReviewDialog({
  open,
  bookId,
  bookTitle,
  onClose,
  onSubmit,
  userEmail,
  userName,
}: LeaveReviewDialogProps) {
  const [rating, setRating] = useState(5)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      setError('Please fill in all fields')
      return
    }

    try {
      setLoading(true)
      setError(null)

      await onSubmit(title.trim(), content.trim(), rating)

      // Reset form
      setRating(5)
      setTitle('')
      setContent('')
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit review')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (!loading) {
      setRating(5)
      setTitle('')
      setContent('')
      setError(null)
      onClose()
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, fontSize: '1.3rem', pb: 1 }}>
        Leave a Review
      </DialogTitle>

      <DialogContent>
        <Box sx={{ pt: 2 }}>
          {/* Book Title */}
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Reviewing: <strong>{bookTitle}</strong>
          </Typography>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Stack spacing={3}>
            {/* Rating */}
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Rating *
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Rating
                  value={rating}
                  onChange={(_, value) => setRating(value || 5)}
                  size="large"
                />
                <Typography variant="body2" color="text.secondary">
                  {rating} star{rating !== 1 ? 's' : ''}
                </Typography>
              </Box>
            </Box>

            {/* Review Title */}
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Review Title *
              </Typography>
              <TextField
                fullWidth
                placeholder="Summarize your review"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading}
                maxRows={1}
              />
            </Box>

            {/* Review Content */}
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Your Review *
              </Typography>
              <TextField
                fullWidth
                multiline
                minRows={4}
                maxRows={6}
                placeholder="Share your detailed thoughts about this book..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={loading}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                {content.length}/500 characters
              </Typography>
            </Box>

            {/* Help Text */}
            <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              ✓ Be specific and honest • ✓ Share what you liked and disliked • ✓ Help other readers make decisions
            </Typography>
          </Stack>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} startIcon={<CancelIcon />} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          startIcon={<SendIcon />}
          disabled={loading || !title.trim() || !content.trim()}
        >
          {loading ? 'Submitting...' : 'Post Review'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

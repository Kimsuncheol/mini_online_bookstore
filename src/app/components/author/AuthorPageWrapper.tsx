'use client'

import { useEffect, useState, useCallback } from 'react'
import { CircularProgress, Box } from '@mui/material'
import { useAuth } from '@/contexts/AuthContext'
import AuthorDashboard from './AuthorDashboard'
import AuthorInfo from './AuthorInfo'
import type { Book } from '@/interfaces/book'

interface AuthorPageWrapperProps {
  authorId: string
  authorName?: string
  authorEmail?: string
}

export default function AuthorPageWrapper({
  authorId,
  authorName,
  authorEmail,
}: AuthorPageWrapperProps) {
  const { user, loading: authLoading } = useAuth()
  const [books, setBooks] = useState<Book[]>([])
  const [booksLoading, setBooksLoading] = useState(true)

  const isCurrentUser = user && user.uid === authorId

  const fetchAuthorBooks = useCallback(async () => {
    try {
      setBooksLoading(true)
      // Fetch all books and filter by author name
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'}/api/books`)
      const data = await response.json()

      // Filter books by author name
      const authorBooks = authorName
        ? data.filter((book: Book) => book.author === authorName)
        : []

      setBooks(authorBooks)
    } catch (error) {
      console.error('Error fetching author books:', error)
      setBooks([])
    } finally {
      setBooksLoading(false)
    }
  }, [authorName])

  useEffect(() => {
    if (!isCurrentUser && authorId) {
      // Fetch books for the author profile
      fetchAuthorBooks()
    } else {
      setBooksLoading(false)
    }
  }, [authorId, isCurrentUser, fetchAuthorBooks])

  if (authLoading || (booksLoading && !isCurrentUser)) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <CircularProgress size={60} />
      </Box>
    )
  }

  // If current user is viewing their own author profile, show dashboard
  if (isCurrentUser) {
    return <AuthorDashboard />
  }

  // Otherwise, show public author profile
  return (
    <AuthorInfo
      authorName={authorName || 'Unknown Author'}
      authorEmail={authorEmail}
      books={books}
    />
  )
}

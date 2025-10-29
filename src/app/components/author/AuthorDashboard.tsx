'use client'

import React, { useEffect, useMemo, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  alpha,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import { Book } from '@/interfaces/book'
import { useAuth } from '@/contexts/AuthContext'
import { createBook, deleteBook, getAllBooks, updateBook } from '@/app/api/books'
import BookDialog from './BookDialog'

interface DashboardHeaderProps {
  onAddBook: () => void
}

function DashboardHeader({ onAddBook }: DashboardHeaderProps) {
  return (
    <Box
      sx={{
        background: (theme) =>
          `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        borderRadius: 3,
        p: 4,
        mb: 4,
        color: 'white',
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={2}>
          <AutoStoriesIcon sx={{ fontSize: 48 }} />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Author Dashboard
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Manage your books and publications
            </Typography>
          </Box>
        </Stack>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddBook}
          sx={{
            backgroundColor: 'white',
            color: 'primary.main',
            fontWeight: 600,
            px: 3,
            '&:hover': {
              backgroundColor: alpha('#ffffff', 0.9),
            },
          }}
        >
          Add New Book
        </Button>
      </Stack>
    </Box>
  )
}

interface DashboardStatsProps {
  books: Book[]
}

function DashboardStats({ books }: DashboardStatsProps) {
  const stats = useMemo(
    () => [
      {
        label: 'Total Books',
        value: books.length,
        color: 'primary.main',
      },
      {
        label: 'In Stock',
        value: books.filter((b) => b.inStock).length,
        color: 'success.main',
      },
      {
        label: 'Featured',
        value: books.filter((b) => b.isFeatured).length,
        color: 'secondary.main',
      },
    ],
    [books]
  )

  return (
    <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
      {stats.map((stat) => (
        <Card key={stat.label} sx={{ flex: 1, borderRadius: 2 }}>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              {stat.label}
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, color: stat.color }}>
              {stat.value}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  )
}

interface BooksGridProps {
  books: Book[]
  onEdit: (book: Book) => void
  onDelete: (book: Book) => void
}

function BooksGrid({ books, onEdit, onDelete }: BooksGridProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 3,
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        },
      }}
    >
      {books.map((book) => (
        <Card
          key={book.id}
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 2,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: 6,
            },
          }}
        >
          <CardMedia
            component="div"
            sx={{
              height: 240,
              backgroundColor: '#e0e0e0',
              backgroundImage: book.coverImageUrl
                ? `url(${book.coverImageUrl})`
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                display: 'flex',
                gap: 1,
              }}
            >
              {book.isNew && (
                <Chip label="New" color="success" size="small" sx={{ fontWeight: 600 }} />
              )}
              {book.isFeatured && (
                <Chip label="Featured" color="secondary" size="small" sx={{ fontWeight: 600 }} />
              )}
            </Box>
          </CardMedia>
          <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 1,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {book.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {book.author}
            </Typography>
            <Chip label={book.genre} size="small" sx={{ mb: 2, alignSelf: 'flex-start' }} />
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                ${book.price.toFixed(2)}
              </Typography>
              {book.originalPrice && book.originalPrice > book.price && (
                <Typography
                  variant="caption"
                  sx={{ textDecoration: 'line-through', color: 'text.disabled' }}
                >
                  ${book.originalPrice.toFixed(2)}
                </Typography>
              )}
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Stock: {book.stockQuantity} • {book.inStock ? 'In Stock' : 'Out of Stock'}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 'auto' }}>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => onEdit(book)}
                sx={{ flex: 1, textTransform: 'none', fontWeight: 600 }}
              >
                Edit
              </Button>
              <IconButton
                color="error"
                onClick={() => onDelete(book)}
                sx={{
                  border: '1px solid',
                  borderColor: 'error.main',
                  borderRadius: 1,
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}

interface EmptyStateProps {
  onAddBook: () => void
  hidden: boolean
}

function EmptyState({ onAddBook, hidden }: EmptyStateProps) {
  if (hidden) {
    return null
  }

  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 8,
        px: 2,
      }}
    >
      <AutoStoriesIcon sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
      <Typography variant="h5" gutterBottom color="text.secondary">
        No books yet
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Start by adding your first book to the store
      </Typography>
      <Button variant="contained" startIcon={<AddIcon />} onClick={onAddBook} size="large">
        Add Your First Book
      </Button>
    </Box>
  )
}

interface DeleteDialogProps {
  open: boolean
  book?: Book | null
  onClose: () => void
  onConfirm: () => void
}

function DeleteConfirmationDialog({ open, book, onClose, onConfirm }: DeleteDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete &ldquo;{book?.title}&rdquo;? This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default function AuthorDashboard() {
  const { user, loading: authLoading } = useAuth()
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null)
  const [useCoverUrlInput, setUseCoverUrlInput] = useState(true)
  const [coverImageFileName, setCoverImageFileName] = useState('')
  const [pdfFileName, setPdfFileName] = useState('')

  const [formData, setFormData] = useState<Partial<Book>>({
    title: '',
    author: '',
    genre: '',
    price: 0,
    stockQuantity: 0,
    description: '',
    isbn: '',
    language: 'English',
    pageCount: 0,
    publisher: '',
    coverImageUrl: '',
    inStock: true,
    isNew: false,
    isFeatured: false,
  })

  const isAuthor = user !== null

  useEffect(() => {
    if (!authLoading) {
      if (isAuthor) {
        void loadBooks()
      } else {
        setLoading(false)
      }
    }
  }, [authLoading, isAuthor])

  const loadBooks = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getAllBooks()
      setBooks(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load books')
    } finally {
      setLoading(false)
    }
  }

  const resetFormState = (authorName: string) => {
    setFormData({
      title: '',
      author: authorName,
      genre: '',
      price: 0,
      stockQuantity: 0,
      description: '',
      isbn: '',
      language: 'English',
      pageCount: 0,
      publisher: '',
      coverImageUrl: '',
      inStock: true,
      isNew: false,
      isFeatured: false,
    })
    setUseCoverUrlInput(true)
    setCoverImageFileName('')
    setPdfFileName('')
  }

  const handleOpenDialog = (book?: Book) => {
    if (book) {
      setEditingBook(book)
      setFormData(book)
      setUseCoverUrlInput(Boolean(book.coverImageUrl))
      setCoverImageFileName('')
      setPdfFileName(book.pdfFileName || '')
    } else {
      setEditingBook(null)
      resetFormState(user?.displayName || '')
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingBook(null)
    setError(null)
    setCoverImageFileName('')
    setPdfFileName('')
  }

  const handleInputChange = (field: keyof Book, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleToggleCoverSource = (useUrl: boolean) => {
    setUseCoverUrlInput(useUrl)
    if (!useUrl) {
      setFormData((prev) => ({ ...prev, coverImageUrl: '' }))
    }
  }

  const handleCoverFileSelect = (file: File | null) => {
    if (!file) return

    setCoverImageFileName(file.name)

    const reader = new FileReader()
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        handleInputChange('coverImageUrl', reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  const handlePdfFileSelect = (file: File | null) => {
    if (!file) return

    setPdfFileName(file.name)
    handleInputChange('pdfFileName', file.name)

    // Optional: You can add logic to upload the PDF file to a server
    // For now, we're just storing the file name
    const reader = new FileReader()
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        handleInputChange('pdfUrl', reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async () => {
    try {
      setError(null)
      setSuccess(null)

      if (!formData.title || !formData.author || !formData.genre || !formData.price) {
        setError('Please fill in all required fields (Title, Author, Genre, Price)')
        return
      }

      if (editingBook && editingBook.id) {
        const updated = await updateBook(editingBook.id, formData)
        setBooks((prev) => prev.map((b) => (b.id === updated.id ? updated : b)))
        setSuccess('Book updated successfully!')
      } else {
        const newBook = await createBook(formData)
        setBooks((prev) => [newBook, ...prev])
        setSuccess('Book created successfully!')
      }

      handleCloseDialog()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save book')
    }
  }

  const handleDeleteClick = (book: Book) => {
    setBookToDelete(book)
    setDeleteConfirmOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!bookToDelete?.id) return

    try {
      setError(null)
      setSuccess(null)
      await deleteBook(bookToDelete.id)
      setBooks((prev) => prev.filter((b) => b.id !== bookToDelete.id))
      setSuccess('Book deleted successfully!')
      setDeleteConfirmOpen(false)
      setBookToDelete(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete book')
      setDeleteConfirmOpen(false)
    }
  }

  if (authLoading || loading) {
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

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="warning" sx={{ borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Authentication Required
          </Typography>
          <Typography>Please sign in to access the author dashboard.</Typography>
        </Alert>
      </Container>
    )
  }

  if (!isAuthor) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Access Denied
          </Typography>
          <Typography>You must be an author to access this page.</Typography>
        </Alert>
      </Container>
    )
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <DashboardHeader onAddBook={() => handleOpenDialog()} />

      {error && (
        <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" onClose={() => setSuccess(null)} sx={{ mb: 3, borderRadius: 2 }}>
          {success}
        </Alert>
      )}

      <DashboardStats books={books} />

      <BooksGrid books={books} onEdit={handleOpenDialog} onDelete={handleDeleteClick} />

      <EmptyState onAddBook={() => handleOpenDialog()} hidden={books.length !== 0 || loading} />

      <BookDialog
        open={openDialog}
        formData={formData}
        isEditing={Boolean(editingBook)}
        useCoverUrlInput={useCoverUrlInput}
        coverImageFileName={coverImageFileName}
        pdfFileName={pdfFileName}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
        onToggleCoverSource={handleToggleCoverSource}
        onCoverFileSelect={handleCoverFileSelect}
        onPdfFileSelect={handlePdfFileSelect}
      />

      <DeleteConfirmationDialog
        open={deleteConfirmOpen}
        book={bookToDelete}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </Container>
  )
}

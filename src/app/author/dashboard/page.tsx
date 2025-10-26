'use client'

import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  TextField,
  Typography,
  Alert,
  Chip,
  alpha,
  CircularProgress,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import { Book } from '@/interfaces/book'
import { useAuth } from '@/contexts/AuthContext'
import { createBook, getAllBooks, updateBook, deleteBook } from '@/app/api/books'

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

  // Form state
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

  // Check if user is an author (in real app, check custom claims or database)
  const isAuthor = user !== null // For now, any logged-in user can be an author

  useEffect(() => {
    if (!authLoading) {
      if (isAuthor) {
        loadBooks()
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

  const handleOpenDialog = (book?: Book) => {
    if (book) {
      setEditingBook(book)
      setFormData(book)
    } else {
      setEditingBook(null)
      setFormData({
        title: '',
        author: user?.displayName || '',
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
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingBook(null)
    setError(null)
  }

  const handleInputChange = (field: keyof Book, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
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
        // Update existing book
        const updated = await updateBook(editingBook.id, formData)
        setBooks((prev) => prev.map((b) => (b.id === updated.id ? updated : b)))
        setSuccess('Book updated successfully!')
      } else {
        // Create new book
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
      {/* Header */}
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
            onClick={() => handleOpenDialog()}
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

      {/* Alerts */}
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

      {/* Stats */}
      <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
        <Card sx={{ flex: 1, borderRadius: 2 }}>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Total Books
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main' }}>
              {books.length}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, borderRadius: 2 }}>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              In Stock
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, color: 'success.main' }}>
              {books.filter((b) => b.inStock).length}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, borderRadius: 2 }}>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Featured
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, color: 'secondary.main' }}>
              {books.filter((b) => b.isFeatured).length}
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      {/* Books Grid */}
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
                  onClick={() => handleOpenDialog(book)}
                  sx={{ flex: 1, textTransform: 'none', fontWeight: 600 }}
                >
                  Edit
                </Button>
                <IconButton
                  color="error"
                  onClick={() => handleDeleteClick(book)}
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

      {books.length === 0 && !loading && (
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
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            size="large"
          >
            Add Your First Book
          </Button>
        </Box>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: 600, fontSize: '1.5rem' }}>
          {editingBook ? 'Edit Book' : 'Add New Book'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              label="Title *"
              fullWidth
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
            />
            <TextField
              label="Author *"
              fullWidth
              value={formData.author}
              onChange={(e) => handleInputChange('author', e.target.value)}
            />
            <TextField
              label="Genre *"
              fullWidth
              value={formData.genre}
              onChange={(e) => handleInputChange('genre', e.target.value)}
              placeholder="e.g., Fiction, Science, History"
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                label="Price *"
                type="number"
                fullWidth
                value={formData.price}
                onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                inputProps={{ step: 0.01, min: 0 }}
              />
              <TextField
                label="Stock Quantity *"
                type="number"
                fullWidth
                value={formData.stockQuantity}
                onChange={(e) => handleInputChange('stockQuantity', parseInt(e.target.value) || 0)}
                inputProps={{ min: 0 }}
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                label="ISBN"
                fullWidth
                value={formData.isbn}
                onChange={(e) => handleInputChange('isbn', e.target.value)}
              />
              <TextField
                label="Language"
                fullWidth
                value={formData.language}
                onChange={(e) => handleInputChange('language', e.target.value)}
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                label="Page Count"
                type="number"
                fullWidth
                value={formData.pageCount}
                onChange={(e) => handleInputChange('pageCount', parseInt(e.target.value) || 0)}
                inputProps={{ min: 0 }}
              />
              <TextField
                label="Publisher"
                fullWidth
                value={formData.publisher}
                onChange={(e) => handleInputChange('publisher', e.target.value)}
              />
            </Stack>
            <TextField
              label="Cover Image URL"
              fullWidth
              value={formData.coverImageUrl}
              onChange={(e) => handleInputChange('coverImageUrl', e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
            <Stack direction="row" spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.inStock || false}
                    onChange={(e) => handleInputChange('inStock', e.target.checked)}
                  />
                }
                label="In Stock"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isNew || false}
                    onChange={(e) => handleInputChange('isNew', e.target.checked)}
                  />
                }
                label="New Release"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isFeatured || false}
                    onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
                  />
                }
                label="Featured"
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={handleCloseDialog}
            startIcon={<CancelIcon />}
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            startIcon={<SaveIcon />}
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            {editingBook ? 'Update Book' : 'Create Book'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete &ldquo;{bookToDelete?.title}&rdquo;? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

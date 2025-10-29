'use client'

import React from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Book } from '@/interfaces/book'

interface BookDialogProps {
  open: boolean
  formData: Partial<Book>
  isEditing: boolean
  useCoverUrlInput: boolean
  coverImageFileName: string
  pdfFileName?: string
  onClose: () => void
  onSubmit: () => void
  onInputChange: (field: keyof Book, value: string | number | boolean) => void
  onToggleCoverSource: (useUrl: boolean) => void
  onCoverFileSelect: (file: File | null) => void
  onPdfFileSelect?: (file: File | null) => void
}

export default function BookDialog({
  open,
  formData,
  isEditing,
  useCoverUrlInput,
  coverImageFileName,
  pdfFileName = '',
  onClose,
  onSubmit,
  onInputChange,
  onToggleCoverSource,
  onCoverFileSelect,
  onPdfFileSelect = () => {},
}: BookDialogProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    onCoverFileSelect(file)
    event.target.value = ''
  }

  const handlePdfFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    onPdfFileSelect(file)
    event.target.value = ''
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: 600, fontSize: '1.5rem' }}>
        {isEditing ? 'Edit Book' : 'Add New Book'}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          <TextField
            label="Title *"
            fullWidth
            value={formData.title}
            onChange={(e) => onInputChange('title', e.target.value)}
          />
          <TextField
            label="Author *"
            fullWidth
            value={formData.author}
            onChange={(e) => onInputChange('author', e.target.value)}
          />
          <TextField
            label="Genre *"
            fullWidth
            value={formData.genre}
            onChange={(e) => onInputChange('genre', e.target.value)}
            placeholder="e.g., Fiction, Science, History"
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={formData.description}
            onChange={(e) => onInputChange('description', e.target.value)}
          />
          <Stack direction="row" spacing={2}>
            <TextField
              label="Price *"
              type="number"
              fullWidth
              value={formData.price}
              onChange={(e) => onInputChange('price', parseFloat(e.target.value) || 0)}
              inputProps={{ step: 0.01, min: 0 }}
            />
            <TextField
              label="Stock Quantity *"
              type="number"
              fullWidth
              value={formData.stockQuantity}
              onChange={(e) =>
                onInputChange('stockQuantity', Number.parseInt(e.target.value, 10) || 0)
              }
              inputProps={{ min: 0 }}
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <TextField
              label="ISBN"
              fullWidth
              value={formData.isbn}
              onChange={(e) => onInputChange('isbn', e.target.value)}
            />
            <TextField
              label="Language"
              fullWidth
              value={formData.language}
              onChange={(e) => onInputChange('language', e.target.value)}
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Page Count"
              type="number"
              fullWidth
              value={formData.pageCount}
              onChange={(e) => onInputChange('pageCount', Number.parseInt(e.target.value, 10) || 0)}
              inputProps={{ min: 0 }}
            />
            <TextField
              label="Publisher"
              fullWidth
              value={formData.publisher}
              onChange={(e) => onInputChange('publisher', e.target.value)}
            />
          </Stack>

          <Stack spacing={1.5}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, textTransform: 'uppercase' }}>
              Cover Image Source
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button
                variant={useCoverUrlInput ? 'contained' : 'outlined'}
                onClick={() => onToggleCoverSource(true)}
                sx={{ textTransform: 'none', fontWeight: 600 }}
              >
                Use URL
              </Button>
              <Button
                variant={!useCoverUrlInput ? 'contained' : 'outlined'}
                onClick={() => onToggleCoverSource(false)}
                sx={{ textTransform: 'none', fontWeight: 600 }}
              >
                Upload Image
              </Button>
            </Stack>

            {useCoverUrlInput ? (
              <TextField
                label="Cover Image URL"
                fullWidth
                value={formData.coverImageUrl}
                onChange={(e) => onInputChange('coverImageUrl', e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            ) : (
              <Stack spacing={1}>
                <Button
                  component="label"
                  variant="outlined"
                  sx={{ alignSelf: 'flex-start', textTransform: 'none', fontWeight: 600 }}
                >
                  Select Image
                  <input hidden accept="image/*" type="file" onChange={handleFileChange} />
                </Button>
                {coverImageFileName && (
                  <Typography variant="body2" color="text.secondary">
                    Selected file: {coverImageFileName}
                  </Typography>
                )}
              </Stack>
            )}

            {formData.coverImageUrl && (
              <Box
                component="img"
                src={formData.coverImageUrl}
                alt="Book cover preview"
                sx={{
                  mt: 1,
                  width: '100%',
                  maxHeight: 240,
                  objectFit: 'cover',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              />
            )}
          </Stack>

          <Stack spacing={1.5}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, textTransform: 'uppercase' }}>
              Book PDF File
            </Typography>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              sx={{ alignSelf: 'flex-start', textTransform: 'none', fontWeight: 600 }}
            >
              Upload PDF
              <input hidden accept=".pdf" type="file" onChange={handlePdfFileChange} />
            </Button>
            {pdfFileName && (
              <Typography variant="body2" color="text.secondary">
                Selected file: {pdfFileName}
              </Typography>
            )}
          </Stack>

          <Stack direction="row" spacing={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.inStock || false}
                  onChange={(e) => onInputChange('inStock', e.target.checked)}
                />
              }
              label="In Stock"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isNew || false}
                  onChange={(e) => onInputChange('isNew', e.target.checked)}
                />
              }
              label="New Release"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isFeatured || false}
                  onChange={(e) => onInputChange('isFeatured', e.target.checked)}
                />
              }
              label="Featured"
            />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} startIcon={<CancelIcon />} sx={{ textTransform: 'none', fontWeight: 600 }}>
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          variant="contained"
          startIcon={<SaveIcon />}
          sx={{ textTransform: 'none', fontWeight: 600 }}
        >
          {isEditing ? 'Update Book' : 'Create Book'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

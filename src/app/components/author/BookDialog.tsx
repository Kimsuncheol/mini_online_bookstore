'use client'

import React, { useEffect, useState } from 'react'
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
import { useAuth } from '@/contexts/AuthContext'

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
  const { displayName } = useAuth()
  const [isDragActive, setIsDragActive] = useState(false)

  useEffect(() => {
    if (!isEditing && displayName && (!formData.author || formData.author.trim() === '')) {
      onInputChange('author', displayName)
    }
  }, [isEditing, displayName, formData.author, onInputChange])

  useEffect(() => {
    if (!open) {
      setIsDragActive(false)
    }
  }, [open])

  const deriveTitleFromFileName = (fileName: string): string => {
    const withoutExtension = fileName.replace(/\.[^/.]+$/, '')
    const withSpaces = withoutExtension.replace(/[_-]+/g, ' ')
    return withSpaces.replace(/\s+/g, ' ').trim()
  }

  const autoFillTitleFromFile = (file: File) => {
    if (!formData.title || formData.title.trim() === '') {
      const derivedTitle = deriveTitleFromFileName(file.name)
      if (derivedTitle) {
        onInputChange('title', derivedTitle)
      }
    }
  }

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
    autoFillTitleFromFile(file)
    event.target.value = ''
  }

  const handleDragEnter = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragActive(true)
  }

  const handleDragOver = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault()
    event.stopPropagation()
    if (!isDragActive) {
      setIsDragActive(true)
    }
  }

  const handleDragLeave = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault()
    event.stopPropagation()
    const relatedTarget = event.relatedTarget as Node | null
    if (relatedTarget && event.currentTarget.contains(relatedTarget)) {
      return
    }
    setIsDragActive(false)
  }

  const handleDrop = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragActive(false)

    const files = event.dataTransfer.files
    if (files.length === 0) return

    const file = files[0]
    if (file.type === 'application/pdf') {
      onPdfFileSelect(file)
      autoFillTitleFromFile(file)
    } else if (file.type.startsWith('image/')) {
      onCoverFileSelect(file)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        onDragEnter: handleDragEnter,
        onDragOver: handleDragOver,
        onDragLeave: handleDragLeave,
        onDrop: handleDrop,
        sx: {
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          outline: isDragActive ? '2px dashed' : 'none',
          outlineColor: isDragActive ? 'primary.main' : undefined,
          outlineOffset: isDragActive ? '6px' : undefined,
          transition: 'outline-color 0.2s ease',
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 600, fontSize: '1.5rem' }}>
        {isEditing ? 'Edit Book' : 'Add New Book'}
      </DialogTitle>
      <DialogContent
        sx={{
          flex: 1,
          overflowY: 'auto',
          backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
          transition: 'background-color 0.2s ease-in-out',
        }}
      >
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
            helperText={displayName ? 'Auto-filled from your profile' : undefined}
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
          <TextField
            label="Publisher"
            fullWidth
            value={formData.publisher}
            onChange={(e) => onInputChange('publisher', e.target.value)}
          />

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
            <Box
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              sx={{
                border: '2px dashed',
                borderColor: isDragActive ? 'primary.main' : 'divider',
                borderRadius: 2,
                p: 3,
                textAlign: 'center',
                backgroundColor: isDragActive ? 'action.selected' : 'action.hover',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'action.selected',
                },
              }}
            >
              <Stack spacing={2} alignItems="center">
                <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main' }} />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Drag and drop your PDF file here
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    or use the button below to select a file
                  </Typography>
                </Box>
                <Button
                  component="label"
                  variant="contained"
                  sx={{ textTransform: 'none', fontWeight: 600 }}
                >
                  Select PDF File
                  <input hidden accept=".pdf" type="file" onChange={handlePdfFileChange} />
                </Button>
              </Stack>
            </Box>
            {pdfFileName && (
              <Box sx={{ p: 2, backgroundColor: 'success.light', borderRadius: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'success.dark' }}>
                  ✓ Selected file: {pdfFileName}
                </Typography>
              </Box>
            )}
          </Stack>

          <Stack direction="row" spacing={2}>
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

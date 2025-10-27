import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
  FormControlLabel,
  Stack,
  Button,
  Box,
  Typography,
  InputAdornment,
} from '@mui/material'
import { Advertisement } from '@/interfaces/advertisement'

interface FormData {
  title: string
  author: string
  description: string
  price: string
  pageCount: string
  originalPrice: string
  coverImageUrl: string
  isActive: boolean
}

interface AdvertisementDialogProps {
  open: boolean
  editingAd: Advertisement | null
  formData: FormData
  useCoverUrlInput: boolean
  coverImageFileName: string
  onClose: () => void
  onSubmit: () => void
  onFormChange: (field: keyof FormData, value: string | boolean) => void
  onToggleCoverSource: (useUrl: boolean) => void
  onCoverFileSelect: (file: File | null) => void
}

export default function AdvertisementDialog({
  open,
  editingAd,
  formData,
  useCoverUrlInput,
  coverImageFileName,
  onClose,
  onSubmit,
  onFormChange,
  onToggleCoverSource,
  onCoverFileSelect,
}: AdvertisementDialogProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    onCoverFileSelect(file)
    event.target.value = ''
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600, fontSize: '1.5rem' }}>
        {editingAd ? 'Edit Advertisement' : 'Add Advertisement'}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Title *"
            fullWidth
            value={formData.title}
            onChange={(e) => onFormChange('title', e.target.value)}
          />
          <TextField
            label="Author *"
            fullWidth
            value={formData.author}
            onChange={(e) => onFormChange('author', e.target.value)}
          />
          <TextField
            label="Description *"
            fullWidth
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) => onFormChange('description', e.target.value)}
          />
          <Stack direction="row" spacing={2}>
            <TextField
              label="Price *"
              fullWidth
              type="number"
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              value={formData.price}
              onChange={(e) => onFormChange('price', e.target.value)}
            />
            <TextField
              label="Original Price"
              fullWidth
              type="number"
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              value={formData.originalPrice}
              onChange={(e) => onFormChange('originalPrice', e.target.value)}
            />
          </Stack>
          <TextField
            label="Page Count"
            fullWidth
            type="number"
            value={formData.pageCount}
            onChange={(e) => onFormChange('pageCount', e.target.value)}
          />

          {/* Cover Image Source Section */}
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
                onChange={(e) => onFormChange('coverImageUrl', e.target.value)}
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
                alt="Cover preview"
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

          <FormControlLabel
            control={
              <Switch
                checked={formData.isActive}
                onChange={(e) => onFormChange('isActive', e.target.checked)}
              />
            }
            label="Active"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ textTransform: 'none' }}>
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          variant="contained"
          disabled={!formData.title || !formData.author || !formData.description || !formData.price}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          {editingAd ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

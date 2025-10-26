import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
  Box,
  Typography,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'
import type { ManagementUser, UserUpdateData } from '@/lib/user-api'
import UserRoleChip from './UserRoleChip'

interface UserEditDialogProps {
  open: boolean
  user: ManagementUser | null
  onClose: () => void
  onSave: (userId: string, data: UserUpdateData) => Promise<void>
}

export default function UserEditDialog({ open, user, onClose, onSave }: UserEditDialogProps) {
  const [formData, setFormData] = useState<UserUpdateData>({
    role: 'user',
    status: 'active',
    displayName: '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      setFormData({
        role: user.role,
        status: user.status,
        displayName: user.displayName || '',
      })
      setError(null)
    }
  }, [user])

  const handleSave = async () => {
    if (!user) return

    setSaving(true)
    setError(null)

    try {
      await onSave(user.id, formData)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user')
    } finally {
      setSaving(false)
    }
  }

  const handleClose = () => {
    if (!saving) {
      setError(null)
      onClose()
    }
  }

  if (!user) return null

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3 },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Edit User
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.email}
        </Typography>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ pt: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        <Stack spacing={3}>
          {/* Display Name */}
          <TextField
            fullWidth
            label="Display Name"
            value={formData.displayName || ''}
            onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
            disabled={saving}
          />

          {/* Role */}
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 600 }}>
              Role
            </Typography>
            <TextField
              fullWidth
              select
              value={formData.role}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role: e.target.value as 'admin' | 'author' | 'user',
                })
              }
              disabled={saving}
            >
              <MenuItem value="user">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <UserRoleChip role="user" />
                  <Typography variant="body2">Regular User</Typography>
                </Box>
              </MenuItem>
              <MenuItem value="author">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <UserRoleChip role="author" />
                  <Typography variant="body2">Author (Can publish books)</Typography>
                </Box>
              </MenuItem>
              <MenuItem value="admin">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <UserRoleChip role="admin" />
                  <Typography variant="body2">Administrator (Full access)</Typography>
                </Box>
              </MenuItem>
            </TextField>
          </Box>

          {/* Status */}
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 600 }}>
              Account Status
            </Typography>
            <TextField
              fullWidth
              select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as 'active' | 'suspended' | 'pending',
                })
              }
              disabled={saving}
            >
              <MenuItem value="active">
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'success.main' }}>
                    Active
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    User can access the platform
                  </Typography>
                </Box>
              </MenuItem>
              <MenuItem value="pending">
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'warning.main' }}>
                    Pending
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Awaiting verification or approval
                  </Typography>
                </Box>
              </MenuItem>
              <MenuItem value="suspended">
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'error.main' }}>
                    Suspended
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    User is blocked from accessing the platform
                  </Typography>
                </Box>
              </MenuItem>
            </TextField>
          </Box>

          {/* User Info (Read-only) */}
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              backgroundColor: 'action.hover',
            }}
          >
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 600 }}>
              User Information
            </Typography>
            <Stack spacing={1}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  User ID:
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                  {user.id}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Email Verified:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {user.isEmailVerified ? '✓ Yes' : '✗ No'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Created:
                </Typography>
                <Typography variant="body2">
                  {new Date(user.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ p: 2.5 }}>
        <Button onClick={handleClose} disabled={saving} startIcon={<CloseIcon />}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={saving}
          startIcon={saving ? <CircularProgress size={16} /> : <SaveIcon />}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

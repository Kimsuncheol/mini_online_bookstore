'use client'

import React, { useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
  IconButton,
  Chip,
  Alert,
  alpha,
  CircularProgress,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import NotificationsIcon from '@mui/icons-material/Notifications'
import VerifiedIcon from '@mui/icons-material/Verified'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { useAuth } from '@/contexts/AuthContext'

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth()

  // Edit mode state
  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState({
    displayName: '',
    phone: '',
    address: '',
  })

  // Preferences state
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    marketingEmails: false,
    orderUpdates: true,
    newReleases: true,
  })

  const [saveSuccess, setSaveSuccess] = useState(false)

  // Initialize edited data when user loads
  React.useEffect(() => {
    if (user) {
      setEditedData({
        displayName: user.displayName || '',
        phone: '',
        address: '',
      })
    }
  }, [user])

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing
      setEditedData({
        displayName: user?.displayName || '',
        phone: '',
        address: '',
      })
    }
    setIsEditing(!isEditing)
  }

  const handleSave = () => {
    // TODO: Implement backend save
    console.log('Saving profile:', editedData)
    setSaveSuccess(true)
    setIsEditing(false)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const handlePreferenceChange = (key: string, value: boolean) => {
    setPreferences((prev) => ({ ...prev, [key]: value }))
    // TODO: Implement backend save
    console.log('Saving preference:', key, value)
  }

  if (authLoading) {
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
            Please Sign In
          </Typography>
          <Typography>You need to be signed in to view your profile.</Typography>
        </Alert>
      </Container>
    )
  }

  const formatDate = (date: string | null) => {
    if (!date) return 'N/A'
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Success Alert */}
      {saveSuccess && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
          Profile updated successfully!
        </Alert>
      )}

      {/* Profile Header */}
      <Card
        sx={{
          mb: 4,
          borderRadius: 3,
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: 'white',
          position: 'relative',
          overflow: 'visible',
        }}
      >
        <CardContent sx={{ py: 4 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="center">
            <Avatar
              src={user.photoURL || undefined}
              sx={{
                width: 120,
                height: 120,
                border: '4px solid white',
                boxShadow: 3,
                fontSize: '3rem',
              }}
            >
              {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
            </Avatar>
            <Box sx={{ flex: 1, textAlign: { xs: 'center', sm: 'left' } }}>
              <Stack direction="row" spacing={1} alignItems="center" justifyContent={{ xs: 'center', sm: 'flex-start' }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {user.displayName || 'BookNest Reader'}
                </Typography>
                {user.emailVerified && (
                  <VerifiedIcon sx={{ color: '#4ade80', fontSize: 28 }} />
                )}
              </Stack>
              <Typography variant="h6" sx={{ opacity: 0.9, mt: 1 }}>
                {user.email}
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                sx={{ mt: 2 }}
                justifyContent={{ xs: 'center', sm: 'flex-start' }}
              >
                <Chip
                  icon={<CalendarTodayIcon />}
                  label={`Member since ${formatDate(user.metadata?.creationTime || null)}`}
                  sx={{
                    backgroundColor: alpha('#ffffff', 0.2),
                    color: 'white',
                    fontWeight: 600,
                  }}
                />
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' } }}>
        {/* Personal Information Card */}
        <Card sx={{ borderRadius: 3, height: 'fit-content' }}>
          <CardContent sx={{ p: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                <PersonIcon color="primary" />
                Personal Information
              </Typography>
              {!isEditing ? (
                <IconButton
                  onClick={handleEditToggle}
                  color="primary"
                  sx={{
                    backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                  }}
                >
                  <EditIcon />
                </IconButton>
              ) : (
                <Stack direction="row" spacing={1}>
                  <IconButton onClick={handleEditToggle} color="error" size="small">
                    <CancelIcon />
                  </IconButton>
                  <IconButton onClick={handleSave} color="primary" size="small">
                    <SaveIcon />
                  </IconButton>
                </Stack>
              )}
            </Stack>

            <Stack spacing={3}>
              {/* Display Name */}
              <Box>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <PersonIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                    Display Name
                  </Typography>
                </Stack>
                {isEditing ? (
                  <TextField
                    fullWidth
                    size="small"
                    value={editedData.displayName}
                    onChange={(e) =>
                      setEditedData((prev) => ({ ...prev, displayName: e.target.value }))
                    }
                    placeholder="Enter your name"
                  />
                ) : (
                  <Typography variant="body1">
                    {user.displayName || editedData.displayName || 'Not set'}
                  </Typography>
                )}
              </Box>

              {/* Email */}
              <Box>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <EmailIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                    Email Address
                  </Typography>
                </Stack>
                <Typography variant="body1">{user.email}</Typography>
                {user.emailVerified ? (
                  <Chip
                    icon={<VerifiedIcon />}
                    label="Verified"
                    size="small"
                    color="success"
                    sx={{ mt: 1, fontWeight: 600 }}
                  />
                ) : (
                  <Chip label="Not Verified" size="small" color="warning" sx={{ mt: 1 }} />
                )}
              </Box>

              <Divider />

              {/* Phone */}
              <Box>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <PhoneIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                    Phone Number
                  </Typography>
                </Stack>
                {isEditing ? (
                  <TextField
                    fullWidth
                    size="small"
                    value={editedData.phone}
                    onChange={(e) => setEditedData((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1 (555) 123-4567"
                  />
                ) : (
                  <Typography variant="body1" color={editedData.phone ? 'text.primary' : 'text.disabled'}>
                    {editedData.phone || 'Not set'}
                  </Typography>
                )}
              </Box>

              {/* Address */}
              <Box>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <LocationOnIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                    Address
                  </Typography>
                </Stack>
                {isEditing ? (
                  <TextField
                    fullWidth
                    size="small"
                    multiline
                    rows={2}
                    value={editedData.address}
                    onChange={(e) => setEditedData((prev) => ({ ...prev, address: e.target.value }))}
                    placeholder="123 Main St, City, State, ZIP"
                  />
                ) : (
                  <Typography variant="body1" color={editedData.address ? 'text.primary' : 'text.disabled'}>
                    {editedData.address || 'Not set'}
                  </Typography>
                )}
              </Box>
            </Stack>

            {isEditing && (
              <Button
                variant="contained"
                fullWidth
                startIcon={<SaveIcon />}
                onClick={handleSave}
                sx={{ mt: 3, fontWeight: 600, textTransform: 'none' }}
              >
                Save Changes
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Preferences Card */}
        <Card sx={{ borderRadius: 3, height: 'fit-content' }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
              <NotificationsIcon color="primary" />
              Notification Preferences
            </Typography>

            <Stack spacing={2}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.05),
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={preferences.emailNotifications}
                      onChange={(e) => handlePreferenceChange('emailNotifications', e.target.checked)}
                      color="primary"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        Email Notifications
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Receive updates about your account via email
                      </Typography>
                    </Box>
                  }
                />
              </Box>

              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: (theme) => alpha(theme.palette.secondary.main, 0.05),
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={preferences.orderUpdates}
                      onChange={(e) => handlePreferenceChange('orderUpdates', e.target.checked)}
                      color="primary"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        Order Updates
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Get notified about your order status
                      </Typography>
                    </Box>
                  }
                />
              </Box>

              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: (theme) => alpha(theme.palette.info.main, 0.05),
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={preferences.newReleases}
                      onChange={(e) => handlePreferenceChange('newReleases', e.target.checked)}
                      color="primary"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        New Releases
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Be the first to know about new books
                      </Typography>
                    </Box>
                  }
                />
              </Box>

              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: (theme) => alpha(theme.palette.warning.main, 0.05),
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={preferences.marketingEmails}
                      onChange={(e) => handlePreferenceChange('marketingEmails', e.target.checked)}
                      color="primary"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        Marketing Emails
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Receive promotional offers and deals
                      </Typography>
                    </Box>
                  }
                />
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Account Information Card */}
        <Card sx={{ borderRadius: 3, gridColumn: { xs: '1', md: 'span 2' } }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
              Account Information
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gap: 3,
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              }}
            >
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
                  textAlign: 'center',
                }}
              >
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Account Status
                </Typography>
                <Chip label="Active" color="success" sx={{ fontWeight: 600 }} />
              </Box>

              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: (theme) => alpha(theme.palette.secondary.main, 0.08),
                  textAlign: 'center',
                }}
              >
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Member Since
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {formatDate(user.metadata?.creationTime || null)}
                </Typography>
              </Box>

              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: (theme) => alpha(theme.palette.info.main, 0.08),
                  textAlign: 'center',
                }}
              >
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Last Sign In
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {formatDate(user.metadata?.lastSignInTime || null)}
                </Typography>
              </Box>

              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: (theme) => alpha(theme.palette.warning.main, 0.08),
                  textAlign: 'center',
                }}
              >
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  User ID
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    fontFamily: 'monospace',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {user.uid.slice(0, 12)}...
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}

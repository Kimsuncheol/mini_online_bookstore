'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
  alpha,
  CircularProgress
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import GoogleIcon from '@mui/icons-material/Google'
import EmailIcon from '@mui/icons-material/Email'
import { signIn } from 'next-auth/react'

interface SignInProps {
  open: boolean
  onClose: () => void
  onSwitchToSignUp: () => void
}

export default function SignIn({ open, onClose, onSwitchToSignUp }: SignInProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await signIn('email', {
        email,
        redirect: false,
      })

      if (result?.ok) {
        setEmailSent(true)
      }
    } catch (error) {
      console.error('Sign in error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    try {
      await signIn('google', { callbackUrl: '/' })
    } catch (error) {
      console.error('Google sign in error:', error)
      setLoading(false)
    }
  }

  const handleClose = () => {
    setEmail('')
    setEmailSent(false)
    setLoading(false)
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: '24px',
            boxShadow: '0 24px 48px rgba(0, 0, 0, 0.15)',
            overflow: 'hidden'
          }
        }
      }}
    >
      <IconButton
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 16,
          top: 16,
          color: 'text.secondary',
          zIndex: 1,
          '&:hover': {
            backgroundColor: (theme) => alpha(theme.palette.grey[100], 0.8),
          }
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ p: 5, pb: 4 }}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1
              }}
            >
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to continue to BookNest
            </Typography>
          </Box>

          {emailSent ? (
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <EmailIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Check your email
              </Typography>
              <Typography variant="body2" color="text.secondary">
                We sent a magic link to {email}
              </Typography>
              <Button
                onClick={() => setEmailSent(false)}
                sx={{ mt: 3, textTransform: 'none' }}
              >
                Use a different email
              </Button>
            </Box>
          ) : (
            <>
              {/* Google Sign In */}
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                onClick={handleGoogleSignIn}
                disabled={loading}
                sx={{
                  py: 1.5,
                  mb: 2,
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  borderColor: 'divider',
                  color: 'text.primary',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.05),
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
                  }
                }}
              >
                Continue with Google
              </Button>

              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  or
                </Typography>
              </Divider>

              {/* Email Sign In */}
              <form onSubmit={handleEmailSignIn}>
                <TextField
                  fullWidth
                  type="email"
                  label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  sx={{
                    mb: 2.5,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                    }
                  }}
                />

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1rem',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                    transition: 'all 0.2s',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                      boxShadow: '0 6px 16px rgba(102, 126, 234, 0.4)',
                      transform: 'translateY(-2px)',
                    },
                    '&:disabled': {
                      background: 'grey.300',
                    }
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Continue with Email'}
                </Button>
              </form>
            </>
          )}
        </Box>

        {/* Footer */}
        <Box
          sx={{
            borderTop: '1px solid',
            borderColor: 'divider',
            py: 2.5,
            px: 5,
            backgroundColor: (theme) => alpha(theme.palette.grey[50], 0.5),
            textAlign: 'center'
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Haven&apos;t signed up yet?{' '}
            <Button
              onClick={onSwitchToSignUp}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                p: 0,
                minWidth: 'auto',
                verticalAlign: 'baseline',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                '&:hover': {
                  backgroundColor: 'transparent',
                  textDecoration: 'underline',
                }
              }}
            >
              Sign up
            </Button>
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

'use client'

import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  TextField,
  Button,
  Box,
  InputAdornment,
  alpha,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import LogoutIcon from '@mui/icons-material/Logout'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import SignInDialog from '../Auth/SignIn'
import SignUpDialog from '../Auth/SignUp'

export default function Header() {
  const [signInOpen, setSignInOpen] = useState(false)
  const [signUpOpen, setSignUpOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { user, logout } = useAuth()
  const router = useRouter();


  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    try {
      await logout()
      handleMenuClose()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const getInitials = (name?: string | null): string => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid',
          borderColor: 'divider',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', py: 1.5, px: { xs: 2, sm: 4 } }}>
          {/* Left side - Modern Logo */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.02)'
              }
            }}
          >
            <Link href={"/"}>
              <Image src={"/logo.png"} alt='logo' width={100} height={80} style={{ objectFit: 'contain', aspectRatio: '1/0.8' }} />
            </Link>
          </Box>

          {/* Right side - Modern Search bar and auth */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
            {/* Modern search bar */}
            <TextField
              size="small"
              placeholder="Search for books, authors..."
              variant="outlined"
              sx={{
                width: { xs: '180px', sm: '250px', md: '350px' },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '24px',
                  backgroundColor: (theme) => alpha(theme.palette.grey[100], 0.8),
                  transition: 'all 0.3s',
                  border: 'none',
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover': {
                    backgroundColor: (theme) => alpha(theme.palette.grey[200], 0.9),
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  },
                  '&.Mui-focused': {
                    backgroundColor: '#ffffff',
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
                  }
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
            />

            {/* Auth Button or User Menu */}
            {/* <Link href="/cart"> */}
              <IconButton
                sx={{
                  color: 'text.primary',
                  '&:hover': {
                    backgroundColor: alpha('#667eea', 0.1),
                  },
                }}
                onClick={(e) => {
                  if (user) {
                    router.push('/cart');
                  } else {
                    setSignInOpen(true);
                    e.stopPropagation();
                  }
                }}
              >
                <ShoppingCartIcon />
              </IconButton>
            {/* </Link> */}
            {user ? (
              <>
                <IconButton
                  onClick={handleMenuOpen}
                  sx={{
                    p: 0,
                    '&:hover': {
                      backgroundColor: alpha('#667eea', 0.1),
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {getInitials(user.displayName)}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem disabled>
                    <Box sx={{ fontSize: '0.875rem' }}>
                      {user.displayName || user.email}
                    </Box>
                  </MenuItem>
                  <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                    <LogoutIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Button
                  variant="contained"
                  onClick={() => setSignInOpen(true)}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 2.5,
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                      boxShadow: '0 6px 16px rgba(102, 126, 234, 0.4)',
                    },
                  }}
                >
                  Sign In
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sign In Modal */}
      <SignInDialog
        open={signInOpen}
        onClose={() => setSignInOpen(false)}
        onSwitchToSignUp={() => {
          setSignInOpen(false)
          setSignUpOpen(true)
        }}
      />

      {/* Sign Up Modal */}
      <SignUpDialog
        open={signUpOpen}
        onClose={() => setSignUpOpen(false)}
        onSwitchToSignIn={() => {
          setSignUpOpen(false)
          setSignInOpen(true)
        }}
      />
    </>
  )
}

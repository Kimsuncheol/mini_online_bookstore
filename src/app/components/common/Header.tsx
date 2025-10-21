'use client'

import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  TextField,
  Button,
  Avatar,
  Box,
  InputAdornment,
  alpha,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import SignIn from '../Auth/SignIn'
import SignUp from '../Auth/SignUp'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'

export default function Header() {
  const { data: session } = useSession()
  const [signInOpen, setSignInOpen] = useState(false)
  const [signUpOpen, setSignUpOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleSignOut = async () => {
    handleMenuClose()
    await signOut({ callbackUrl: '/' })
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
              <Image src={"/logo.png"} alt='logo' width={100} height={80} style={{objectFit: 'contain', aspectRatio: '1/0.8'}}/>
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

            {/* Modern Auth button or Avatar */}
            {!session ? (
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
                  }
                }}
              >
                Sign In
              </Button>
            ) : (
              <Avatar
                onClick={handleAvatarClick}
                sx={{
                  width: 40,
                  height: 40,
                  cursor: 'pointer',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                  fontWeight: 600,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    boxShadow: '0 6px 16px rgba(102, 126, 234, 0.4)',
                  }
                }}
              >
                {session.user?.name?.[0] || session.user?.email?.[0] || 'U'}
              </Avatar>
            )}

            {/* User Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              slotProps={{
                paper: {
                  sx: {
                    mt: 1.5,
                    minWidth: 200,
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                  }
                }
              }}
            >
              <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography variant="body2" fontWeight={600}>
                  {session?.user?.name || 'User'}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {session?.user?.email}
                </Typography>
              </Box>
              <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>
              <MenuItem onClick={handleSignOut} sx={{ py: 1.5 }}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Sign Out
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Auth Modals */}
      <SignIn
        open={signInOpen}
        onClose={() => setSignInOpen(false)}
        onSwitchToSignUp={() => {
          setSignInOpen(false)
          setSignUpOpen(true)
        }}
      />
      <SignUp
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

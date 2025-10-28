'use client'

import React, { useState } from 'react'
import { AppBar, Toolbar, Box } from '@mui/material'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import SignInDialog from '../Auth/SignIn'
import SignUpDialog from '../Auth/SignUp'
import HeaderLogo from './Header/HeaderLogo'
import HeaderSearchField from './Header/HeaderSearchField'
import HeaderCartButton from './Header/HeaderCartButton'
import HeaderUserMenu from './Header/HeaderUserMenu'
import HeaderGuestActions from './Header/HeaderGuestActions'

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

  const handleCartClick = (event: React.MouseEvent<HTMLElement>) => {
    if (user) {
      router.push('/cart')
      return
    }
    setSignInOpen(true)
    event.stopPropagation()
  }

  const handleProfileClick = () => {
    router.push('/profile')
    handleMenuClose()
  }

  const handleAuthorDashboardClick = (userId: string) => {
    router.push(`/author/${userId}`)
    handleMenuClose()
  }

  const handleUserManagementClick = () => {
    router.push('/admin/users')
    handleMenuClose()
  }

  const handleAdvertisementClick = () => {
    router.push('/admin/advertisement')
    handleMenuClose()
  }

  const handlePaymentHistoryClick = () => {
    router.push('/payment-history')
    handleMenuClose()
  }

  const handleAdminPaymentHistoryClick = () => {
    router.push('/admin/payment-history')
    handleMenuClose()
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
          <HeaderLogo />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
            <HeaderSearchField />

            <HeaderCartButton onClick={handleCartClick} />
            {user ? (
              <HeaderUserMenu
                user={user}
                anchorEl={anchorEl}
                onMenuOpen={handleMenuOpen}
                onMenuClose={handleMenuClose}
                onProfileClick={handleProfileClick}
                onAuthorDashboardClick={() => {
                  if (user.email) handleAuthorDashboardClick(user.uid)
                }}
                onUserManagementClick={handleUserManagementClick}
                onAdvertisementClick={handleAdvertisementClick}
                onPaymentHistoryClick={handlePaymentHistoryClick}
                onAdminPaymentHistoryClick={handleAdminPaymentHistoryClick}
                onLogout={handleLogout}
              />
            ) : (
              <HeaderGuestActions onSignIn={() => setSignInOpen(true)} />
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

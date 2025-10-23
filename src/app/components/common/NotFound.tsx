'use client'

import React from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  alpha,
} from '@mui/material'
import Link from 'next/link'
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Tabbar from './Tabbar'

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Tabbar />

      <Box
        sx={{
          position: 'relative',
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
          overflow: 'hidden',
        }}
      >
        {/* Animated background elements */}
        <Box
          sx={{
            position: 'absolute',
            width: 300,
            height: 300,
            background: 'radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            top: '-100px',
            left: '-100px',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: 250,
            height: 250,
            background: 'radial-gradient(circle, rgba(118, 75, 162, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            bottom: '-80px',
            right: '-80px',
          }}
        />

        <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center' }}>
            {/* 404 Text with gradient */}
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '120px', sm: '180px' },
                fontWeight: 900,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1,
                mb: 2,
                mt: 4,
              }}
            >
              404
            </Typography>

            {/* Main Heading */}
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 1,
                color: 'text.primary',
              }}
            >
              Page Not Found
            </Typography>

            {/* Subheading */}
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                mb: 4,
                fontSize: '1.1rem',
                lineHeight: 1.6,
              }}
            >
              Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
              Let&apos;s get you back to exploring our collection of great books!
            </Typography>

            {/* Action Buttons */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ mb: 4 }}
            >
              {/* Home Button */}
              <Link href="/" style={{ flex: 1 }}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<HomeIcon />}
                  sx={{
                    py: 1.5,
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '1rem',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                      boxShadow: '0 6px 16px rgba(102, 126, 234, 0.4)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Back to Home
                </Button>
              </Link>

              {/* Browse Books Button */}
              <Link href="/books" style={{ flex: 1 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<SearchIcon />}
                  sx={{
                    py: 1.5,
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '1rem',
                    borderColor: '#667eea',
                    color: '#667eea',
                    '&:hover': {
                      borderColor: '#667eea',
                      backgroundColor: alpha('#667eea', 0.05),
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Browse Books
                </Button>
              </Link>
            </Stack>

            {/* Info Cards */}
            <Stack spacing={2}>
              {/* Search Info */}
              <Box
                sx={{
                  backgroundColor: 'white',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  p: 3,
                  transition: 'all 0.3s',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.1)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <SearchIcon
                    sx={{
                      fontSize: 32,
                      color: 'primary.main',
                      mt: 0.5,
                    }}
                  />
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Search for Books
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Find your next great read by searching for authors, titles, or genres.
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Cart Info */}
              <Box
                sx={{
                  backgroundColor: 'white',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  p: 3,
                  transition: 'all 0.3s',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.1)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <ShoppingCartIcon
                    sx={{
                      fontSize: 32,
                      color: 'primary.main',
                      mt: 0.5,
                    }}
                  />
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                      View Your Cart
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Check your shopping cart and proceed to checkout when ready.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Stack>

            {/* Footer Message */}
            <Box sx={{ mt: 6 }}>
              <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                If you believe this is a mistake, please{' '}
                <Typography
                  component="span"
                  variant="caption"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 600,
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  contact support
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

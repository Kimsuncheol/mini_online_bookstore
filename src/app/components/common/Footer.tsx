'use client'

import React from 'react'
import NextLink from 'next/link'
import {
  Box,
  Container,
  Divider,
  IconButton,
  Link as MuiLink,
  Stack,
  Typography,
  SvgIcon,
  SvgIconProps,
} from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import YouTubeIcon from '@mui/icons-material/YouTube'

function XIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path d="M4 4h3.44l5.19 6.85L17.77 4H20l-6.87 8.93L20 20h-3.44l-5.33-7.04L6.23 20H4l7.02-9.12L4 4z" />
    </SvgIcon>
  )
}

const socialLinks = [
  { label: 'Facebook', href: 'https://facebook.com', icon: FacebookIcon },
  { label: 'Instagram', href: 'https://instagram.com', icon: InstagramIcon },
  { label: 'X', href: 'https://x.com', icon: XIcon },
  { label: 'YouTube', href: 'https://youtube.com', icon: YouTubeIcon },
]

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 4, md: 8 }}
          justifyContent="space-between"
        >
          <Stack spacing={3} sx={{ minWidth: 0 }}>
            <Stack spacing={1}>
              <Typography variant="body2" sx={{ textTransform: 'uppercase', fontWeight: 600, letterSpacing: 1 }}>
                Customer Service
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                We&apos;re here to help
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Email us anytime at{' '}
                <MuiLink component={NextLink} href="mailto:support@booknest.com" sx={{ fontWeight: 600 }}>
                  support@booknest.com
                </MuiLink>
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Call our team at +1 (800) 555-0132 from 9AM–6PM ET
              </Typography>
            </Stack>

            <Stack spacing={1}>
              <Typography variant="body2" sx={{ textTransform: 'uppercase', fontWeight: 600, letterSpacing: 1 }}>
                Notification
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Stay updated with new arrivals, curated lists, and special offers tailored just for readers.
              </Typography>
            </Stack>
          </Stack>

          <Stack spacing={2} alignItems={{ xs: 'flex-start', md: 'flex-end' }}>
            <Typography variant="body2" sx={{ textTransform: 'uppercase', fontWeight: 600, letterSpacing: 1 }}>
              Follow BookNest
            </Typography>
            <Stack direction="row" spacing={1.5}>
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <IconButton
                  key={label}
                  component={NextLink}
                  href={href}
                  target="_blank"
                  aria-label={label}
                  sx={{
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    color: 'text.primary',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      borderColor: 'primary.main',
                      color: 'primary.contrastText',
                    },
                  }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Stack>
          </Stack>
        </Stack>

        <Divider sx={{ my: { xs: 3, md: 4 } }} />

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between">
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            © {new Date().getFullYear()} BookNest. Crafted for book lovers everywhere.
          </Typography>
          <Stack direction="row" spacing={3} sx={{ color: 'text.disabled', fontSize: 12 }}>
            <MuiLink component={NextLink} href="/privacy" color="inherit" underline="hover">
              Privacy Policy
            </MuiLink>
            <MuiLink component={NextLink} href="/terms" color="inherit" underline="hover">
              Terms of Use
            </MuiLink>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

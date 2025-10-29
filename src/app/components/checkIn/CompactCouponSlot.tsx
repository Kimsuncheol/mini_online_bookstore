'use client'

import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Alert,
} from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import type { Coupon } from '@/interfaces/coupon'

interface CompactCouponSlotProps {
  coupons: Coupon[]
}

export default function CompactCouponSlot({ coupons }: CompactCouponSlotProps) {
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  // Filter active coupons
  const activeCoupons = coupons.filter((c) => !c.used)

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const getSourceBadgeColor = (source: string) => {
    switch (source) {
      case 'streak':
        return 'success'
      case 'spin_wheel':
        return 'info'
      case 'promotion':
        return 'warning'
      default:
        return 'default'
    }
  }

  const getSourceLabel = (source: string) => {
    switch (source) {
      case 'streak':
        return '🔥 Streak'
      case 'spin_wheel':
        return '🎡 Spin'
      case 'promotion':
        return '📢 Promo'
      default:
        return 'Coupon'
    }
  }

  if (activeCoupons.length === 0) {
    return null
  }

  return (
    <Box sx={{ width: '100%' }}>
      {/* Show first active coupon in compact form */}
      {activeCoupons.length > 0 && (
        <Card
          sx={{
            borderRadius: 1.5,
            border: '1.5px solid',
            borderColor: 'primary.main',
            background: 'linear-gradient(135deg, rgba(103, 58, 183, 0.08) 0%, rgba(63, 81, 181, 0.08) 100%)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: 2,
            },
          }}
          onClick={() => setSelectedCoupon(activeCoupons[0])}
        >
          <CardContent sx={{ py: 1.5, px: 2, '&:last-child': { pb: 1.5 } }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1.5}>
              {/* Left: Discount Info */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 700,
                        color: 'primary.main',
                        fontSize: '0.95rem',
                      }}
                    >
                      ${activeCoupons[0].discountValue.toFixed(2)} OFF
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        fontSize: '0.75rem',
                        display: 'block',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {activeCoupons[0].description}
                    </Typography>
                  </Box>
                  <Chip
                    label={getSourceLabel(activeCoupons[0].source)}
                    color={getSourceBadgeColor(activeCoupons[0].source) as 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: '0.7rem' }}
                  />
                </Stack>
              </Box>

              {/* Right: Copy Button */}
              <Button
                size="small"
                variant="outlined"
                startIcon={<ContentCopyIcon sx={{ fontSize: '0.9rem !important' }} />}
                onClick={(e) => {
                  e.stopPropagation()
                  handleCopyCode(activeCoupons[0].code)
                }}
                sx={{
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  py: 0.6,
                  px: 1,
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                {copiedCode === activeCoupons[0].code ? 'Copied!' : 'Copy'}
              </Button>
            </Stack>

            {/* Show more coupons indicator */}
            {activeCoupons.length > 1 && (
              <Typography
                variant="caption"
                sx={{
                  color: 'primary.main',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  mt: 1,
                  display: 'block',
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                +{activeCoupons.length - 1} more coupon{activeCoupons.length > 2 ? 's' : ''}
              </Typography>
            )}
          </CardContent>
        </Card>
      )}

      {/* Coupon Detail Dialog */}
      <Dialog open={!!selectedCoupon} onClose={() => setSelectedCoupon(null)} maxWidth="xs" fullWidth>
        {selectedCoupon && (
          <>
            <DialogTitle sx={{ fontWeight: 700, fontSize: '1rem' }}>
              Coupon Details
            </DialogTitle>
            <DialogContent sx={{ py: 2.5 }}>
              <Stack spacing={2}>
                <Alert severity="success" sx={{ borderRadius: 1.5 }}>
                  <Typography variant="caption">
                    Copy the coupon code and use it at checkout to get your discount!
                  </Typography>
                </Alert>

                {/* Coupon Code Display */}
                <Box sx={{ textAlign: 'center', p: 1.5, backgroundColor: 'background.paper', borderRadius: 1.5 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                    Code
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      letterSpacing: 1,
                      fontSize: '1rem',
                      mb: 1.5,
                    }}
                  >
                    {selectedCoupon.code}
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    fullWidth
                    startIcon={<ContentCopyIcon />}
                    onClick={() => handleCopyCode(selectedCoupon.code)}
                    sx={{ fontWeight: 600, fontSize: '0.85rem' }}
                  >
                    {copiedCode === selectedCoupon.code ? 'Copied!' : 'Copy Code'}
                  </Button>
                </Box>

                {/* Details */}
                <Stack spacing={1}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption" color="text.secondary">
                      Discount:
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      ${selectedCoupon.discountValue.toFixed(2)}
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption" color="text.secondary">
                      Source:
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      {getSourceLabel(selectedCoupon.source)}
                    </Typography>
                  </Stack>
                  {selectedCoupon.expiryDate && (
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="caption" color="text.secondary">
                        Expires:
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        {new Date(selectedCoupon.expiryDate).toLocaleDateString()}
                      </Typography>
                    </Stack>
                  )}
                </Stack>
              </Stack>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  )
}

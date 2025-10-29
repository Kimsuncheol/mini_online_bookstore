'use client'

import { useState, useMemo } from 'react'
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
  Tabs,
  Tab,
} from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import HistoryIcon from '@mui/icons-material/History'
import type { Coupon } from '@/interfaces/checkIn'

interface CouponSlotProps {
  coupons: Coupon[]
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`coupon-tabpanel-${index}`}
      aria-labelledby={`coupon-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  )
}

export default function CouponSlot({ coupons }: CouponSlotProps) {
  const [tabValue, setTabValue] = useState(0)
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const { activeCoupons, usedCoupons } = useMemo(() => {
    const active = coupons.filter((c) => !c.used)
    const used = coupons.filter((c) => c.used)
    return { activeCoupons: active, usedCoupons: used }
  }, [coupons])

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
        return '🔥 Streak Bonus'
      case 'spin_wheel':
        return '🎡 Spin Reward'
      case 'promotion':
        return '📢 Promotion'
      default:
        return 'Coupon'
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabValue}
          onChange={(_, newValue) => setTabValue(newValue)}
          aria-label="coupon tabs"
        >
          <Tab
            label={`Active Coupons (${activeCoupons.length})`}
            id="coupon-tab-0"
            aria-controls="coupon-tabpanel-0"
          />
          <Tab
            label={`Used Coupons (${usedCoupons.length})`}
            id="coupon-tab-1"
            aria-controls="coupon-tabpanel-1"
          />
        </Tabs>
      </Box>

      {/* Active Coupons Tab */}
      <TabPanel value={tabValue} index={0}>
        {activeCoupons.length === 0 ? (
          <Alert severity="info" sx={{ borderRadius: 2 }}>
            No active coupons yet. Check in or spin the wheel to earn coupons!
          </Alert>
        ) : (
          <Stack spacing={2}>
            {activeCoupons.map((coupon) => (
              <Card
                key={coupon.id}
                sx={{
                  borderRadius: 2,
                  border: '2px solid',
                  borderColor: 'primary.main',
                  background: 'linear-gradient(135deg, rgba(103, 58, 183, 0.05) 0%, rgba(63, 81, 181, 0.05) 100%)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 4,
                  },
                }}
                onClick={() => setSelectedCoupon(coupon)}
              >
                <CardContent>
                  <Stack spacing={1.5}>
                    <Stack direction="row" justifyContent="space-between" alignItems="start">
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main', mb: 0.5 }}>
                          ${coupon.discountValue.toFixed(2)} OFF
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {coupon.description}
                        </Typography>
                      </Box>
                      <Chip
                        label={getSourceLabel(coupon.source)}
                        color={getSourceBadgeColor(coupon.source) as any}
                        size="small"
                        variant="outlined"
                      />
                    </Stack>

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{
                        p: 1.5,
                        backgroundColor: 'background.paper',
                        borderRadius: 1,
                        border: '1px dashed',
                        borderColor: 'divider',
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: 'monospace',
                          fontWeight: 600,
                          letterSpacing: 2,
                        }}
                      >
                        {coupon.code}
                      </Typography>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<ContentCopyIcon />}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleCopyCode(coupon.code)
                        }}
                        sx={{
                          whiteSpace: 'nowrap',
                          fontWeight: 600,
                        }}
                      >
                        {copiedCode === coupon.code ? 'Copied!' : 'Copy'}
                      </Button>
                    </Stack>

                    {coupon.expiryDate && (
                      <Typography variant="caption" color="warning.main" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <HistoryIcon sx={{ fontSize: 14 }} />
                        Expires: {new Date(coupon.expiryDate).toLocaleDateString()}
                      </Typography>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </TabPanel>

      {/* Used Coupons Tab */}
      <TabPanel value={tabValue} index={1}>
        {usedCoupons.length === 0 ? (
          <Alert severity="info" sx={{ borderRadius: 2 }}>
            No used coupons yet. Use your active coupons to get discounts!
          </Alert>
        ) : (
          <Stack spacing={2}>
            {usedCoupons.map((coupon) => (
              <Card
                key={coupon.id}
                sx={{
                  borderRadius: 2,
                  opacity: 0.6,
                  background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.04) 100%)',
                }}
              >
                <CardContent>
                  <Stack spacing={1.5}>
                    <Stack direction="row" justifyContent="space-between" alignItems="start">
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                          ${coupon.discountValue.toFixed(2)} OFF
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {coupon.description}
                        </Typography>
                      </Box>
                      <Chip
                        icon={<CheckCircleIcon />}
                        label="Used"
                        color="success"
                        size="small"
                        variant="outlined"
                      />
                    </Stack>

                    <Typography variant="caption" color="text.secondary">
                      Used on: {coupon.usedAt ? new Date(coupon.usedAt).toLocaleDateString() : 'N/A'}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </TabPanel>

      {/* Coupon Detail Dialog */}
      <Dialog open={!!selectedCoupon} onClose={() => setSelectedCoupon(null)} maxWidth="sm" fullWidth>
        {selectedCoupon && (
          <>
            <DialogTitle sx={{ fontWeight: 700 }}>
              Coupon Details
            </DialogTitle>
            <DialogContent sx={{ py: 3 }}>
              <Stack spacing={2}>
                <Alert severity="success" sx={{ borderRadius: 2 }}>
                  <Typography variant="body2">
                    Copy the coupon code and use it at checkout to get your discount!
                  </Typography>
                </Alert>

                <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'background.paper', borderRadius: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Coupon Code
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      letterSpacing: 2,
                      mb: 2,
                    }}
                  >
                    {selectedCoupon.code}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<ContentCopyIcon />}
                    onClick={() => handleCopyCode(selectedCoupon.code)}
                    sx={{ fontWeight: 600 }}
                  >
                    {copiedCode === selectedCoupon.code ? 'Copied to clipboard!' : 'Copy Code'}
                  </Button>
                </Box>

                <Stack spacing={1}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                      Discount Value:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      ${selectedCoupon.discountValue.toFixed(2)}
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                      Source:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {getSourceLabel(selectedCoupon.source)}
                    </Typography>
                  </Stack>
                  {selectedCoupon.expiryDate && (
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">
                        Expires:
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
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

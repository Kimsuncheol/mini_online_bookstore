'use client'

import { useEffect, useState, useCallback } from 'react'
import { Box, Typography, CircularProgress, Alert } from '@mui/material'
import CouponSlot from '../checkIn/CouponSlot'
import { useAuth } from '@/contexts/AuthContext'
import type { Coupon } from '@/interfaces/coupon'

export default function BookCouponSection() {
  const { user } = useAuth()
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [loading, setLoading] = useState(true)

  const loadCoupons = useCallback(() => {
    try {
      setLoading(true)
      if (!user?.uid) {
        setCoupons([])
        return
      }

      const storedCoupons = localStorage.getItem(`checkIn_coupons_${user.uid}`)
      if (storedCoupons) {
        const parsed = JSON.parse(storedCoupons)
        setCoupons(parsed)
      } else {
        setCoupons([])
      }
    } catch (err) {
      console.error('Failed to load coupons:', err)
      setCoupons([])
    } finally {
      setLoading(false)
    }
  }, [user?.uid])

  useEffect(() => {
    loadCoupons()
  }, [loadCoupons])

  if (!user) {
    return (
      <Alert severity="info" sx={{ borderRadius: 2 }}>
        Sign in to view your coupons and apply discounts!
      </Alert>
    )
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        🎟️ Apply Your Coupons
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Use your available coupons to get a discount on this book!
      </Typography>
      <CouponSlot coupons={coupons} />
    </Box>
  )
}

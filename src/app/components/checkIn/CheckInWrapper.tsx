'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Alert,
  CircularProgress,
  Divider,
} from '@mui/material'
import { useAuth } from '@/contexts/AuthContext'
import CheckInStats from './CheckInStats'
import AttendanceGrid from './AttendanceGrid'
import SpinWheel from './SpinWheel'
import CouponSlot from './CouponSlot'
import type {
  CheckInRecord,
  CheckInStats as CheckInStatsType,
  Coupon,
  CouponIssueRecord,
  SpinWheelResult,
  UserCheckInProfile,
} from '@/interfaces/checkIn'

const STREAK_BONUS_CONFIG = [
  { days: 7, value: 1 },
  { days: 14, value: 2 },
  { days: 30, value: 5 },
]

export default function CheckInWrapper() {
  const { user, loading: authLoading } = useAuth()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [checkInData, setCheckInData] = useState<UserCheckInProfile | null>(null)
  const [checkedInToday, setCheckedInToday] = useState(false)
  const [spinsRemaining, setSpinsRemaining] = useState(1)

  // Initialize or fetch check-in data
  useEffect(() => {
    if (!authLoading && user?.uid) {
      loadCheckInData()
    } else if (!authLoading && !user) {
      setLoading(false)
    }
  }, [authLoading, user?.uid])

  const loadCheckInData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // This would fetch from Firebase in production
      // For now, we'll initialize with default data
      const today = new Date().toISOString().split('T')[0]
      const lastRecord = getLastCheckInRecord()
      const isCheckedToday = lastRecord === today

      const profile: UserCheckInProfile = {
        userId: user!.uid,
        userEmail: user!.email || '',
        userName: user!.displayName || 'User',
        stats: {
          userId: user!.uid,
          currentStreak: isCheckedToday ? calculateCurrentStreak() : 0,
          longestStreak: 0,
          totalCheckIns: 0,
          lastCheckInDate: lastRecord,
          checkedInToday: isCheckedToday,
        },
        records: getStoredRecords(),
        coupons: getStoredCoupons(),
        streakCoupons: [],
        spinHistory: [],
      }

      setCheckInData(profile)
      setCheckedInToday(isCheckedToday)
      setSpinsRemaining(isCheckedToday ? 1 : 0)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load check-in data')
    } finally {
      setLoading(false)
    }
  }, [user?.uid, user?.email, user?.displayName])

  // Utility: Get last check-in date from localStorage
  const getLastCheckInRecord = useCallback(() => {
    const records = localStorage.getItem(`checkIn_records_${user?.uid}`)
    if (!records) return ''
    try {
      const parsed: CheckInRecord[] = JSON.parse(records)
      const sorted = [...parsed].sort((a, b) => b.date.localeCompare(a.date))
      return sorted[0]?.date || ''
    } catch {
      return ''
    }
  }, [user?.uid])

  // Utility: Calculate current streak
  const calculateCurrentStreak = useCallback((): number => {
    const records = getStoredRecords()
    if (records.length === 0) return 0

    let streak = 0
    const today = new Date()
    let checkDate = new Date(today)

    for (let i = 0; i < 365; i++) {
      const dateStr = checkDate.toISOString().split('T')[0]
      const found = records.find((r) => r.date === dateStr && r.checked)

      if (!found) break
      streak++
      checkDate.setDate(checkDate.getDate() - 1)
    }

    return streak
  }, [])

  // Utility: Get stored records from localStorage
  const getStoredRecords = useCallback((): CheckInRecord[] => {
    const records = localStorage.getItem(`checkIn_records_${user?.uid}`)
    if (!records) return []
    try {
      return JSON.parse(records)
    } catch {
      return []
    }
  }, [user?.uid])

  // Utility: Get stored coupons from localStorage
  const getStoredCoupons = useCallback((): Coupon[] => {
    const coupons = localStorage.getItem(`checkIn_coupons_${user?.uid}`)
    if (!coupons) return []
    try {
      return JSON.parse(coupons)
    } catch {
      return []
    }
  }, [user?.uid])

  // Handle check-in action
  const handleCheckIn = useCallback(async () => {
    if (!user?.uid || checkedInToday) return

    try {
      setError(null)
      const today = new Date().toISOString().split('T')[0]
      const records = getStoredRecords()

      // Add today's check-in
      records.push({ date: today, checked: true, checkedAt: new Date() })
      localStorage.setItem(`checkIn_records_${user.uid}`, JSON.stringify(records))

      // Calculate new streak
      const newStreak = calculateCurrentStreak()

      // Check for streak bonuses
      const earnedCoupons: Coupon[] = []
      for (const config of STREAK_BONUS_CONFIG) {
        if (newStreak === config.days) {
          const coupon: Coupon = {
            id: `coupon_${Date.now()}`,
            userId: user.uid,
            code: `STREAK${config.days}${Date.now()}`,
            discountValue: config.value,
            source: 'streak',
            issued: true,
            used: false,
            issuedAt: new Date(),
            description: `${config.days}-day streak bonus - $${config.value} OFF`,
          }
          earnedCoupons.push(coupon)
        }
      }

      // Save coupons
      if (earnedCoupons.length > 0) {
        const existingCoupons = getStoredCoupons()
        const allCoupons = [...existingCoupons, ...earnedCoupons]
        localStorage.setItem(`checkIn_coupons_${user.uid}`, JSON.stringify(allCoupons))
      }

      // Update state
      setCheckedInToday(true)
      setSpinsRemaining(1)

      // Reload data
      await loadCheckInData()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check in')
    }
  }, [user?.uid, checkedInToday, getStoredRecords, calculateCurrentStreak, loadCheckInData])

  // Handle spin wheel result
  const handleSpinWheelResult = useCallback(
    (result: SpinWheelResult) => {
      if (!user?.uid) return

      try {
        // Add coupon from spin wheel
        const existingCoupons = getStoredCoupons()
        const newCoupons = [...existingCoupons, result.coupon]
        localStorage.setItem(`checkIn_coupons_${user.uid}`, JSON.stringify(newCoupons))

        // Update spin remaining
        setSpinsRemaining(0)

        // Reload check-in data
        loadCheckInData()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to save spin reward')
      }
    },
    [user?.uid, getStoredCoupons, loadCheckInData]
  )

  if (authLoading || loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    )
  }

  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning" sx={{ borderRadius: 2 }}>
          Please sign in to access the check-in system.
        </Alert>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {error && (
        <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      {/* Header */}
      <Stack spacing={3} sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            🎯 Daily Check-in
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Check in daily to build your streak, earn coupons, and unlock special rewards!
          </Typography>
        </Box>

        {/* Check-in Button */}
        <Button
          variant="contained"
          size="large"
          onClick={handleCheckIn}
          disabled={checkedInToday}
          sx={{
            alignSelf: 'flex-start',
            px: 4,
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
            textTransform: 'none',
          }}
        >
          {checkedInToday ? '✓ Already checked in today' : 'Check In Today'}
        </Button>
      </Stack>

      {/* Stats Section */}
      {checkInData && (
        <>
          <CheckInStats stats={checkInData.stats} />
          <Divider sx={{ my: 4 }} />

          <Stack spacing={4}>
            {/* Attendance Grid */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                📅 Attendance History
              </Typography>
              <AttendanceGrid records={checkInData.records} maxDays={90} />
            </Box>

            <Divider />

            {/* Spin Wheel Section */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                🎡 Daily Spin Wheel
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Spin the wheel daily to win coupons worth $0.10 to $1.00!
              </Typography>
              <SpinWheel
                onSpin={handleSpinWheelResult}
                disabled={!checkedInToday}
                spinsRemaining={spinsRemaining}
              />
            </Box>

            <Divider />

            {/* Coupons Section */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                🎟️ My Coupons
              </Typography>
              <CouponSlot coupons={checkInData.coupons} />
            </Box>
          </Stack>
        </>
      )}
    </Container>
  )
}

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
import CouponSlot from './CouponSlot'
import type {
  CheckInRecord,
  CheckInStats as CheckInStatsType,
  UserCheckInProfile,
} from '@/interfaces/checkIn'
import type { Coupon } from '@/interfaces/coupon'

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
    const checkDate = new Date(today)

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

  // Utility: Calculate remaining days in the month
  const getRemainingDaysInMonth = useCallback((): number => {
    const today = new Date()
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    const remaining = lastDayOfMonth.getDate() - today.getDate()
    return remaining
  }, [])

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

      // Reload data
      await loadCheckInData()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check in')
    }
  }, [user?.uid, checkedInToday, getStoredRecords, calculateCurrentStreak, loadCheckInData])

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
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          🎯 Daily Check-in
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Check in daily to build your streak, earn coupons, and unlock special rewards!
        </Typography>
      </Box>

      {/* Stats Section */}
      {checkInData && (
        <>
          <CheckInStats stats={checkInData.stats} />
          <Divider sx={{ my: 4 }} />

          <Stack spacing={4}>
            {/* Attendance Grid - Show only if remaining days >= 7 */}
            {getRemainingDaysInMonth() >= 7 && (
              <>
                <Box>
                  {/* Header with Button on the right */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      📅 Attendance History
                    </Typography>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleCheckIn}
                      disabled={checkedInToday}
                      sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 600,
                        textTransform: 'none',
                      }}
                    >
                      {checkedInToday ? '✓ Already checked in today' : 'Check In Today'}
                    </Button>
                  </Box>
                  <AttendanceGrid records={checkInData.records} maxDays={28} />
                </Box>

                <Divider />
              </>
            )}

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

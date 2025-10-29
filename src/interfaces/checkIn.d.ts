/**
 * Check-in System Interfaces
 * Manages user attendance, streaks, and rewards
 */

import type { Coupon, CouponIssueRecord } from './coupon'

/**
 * Daily Check-in Record
 * Tracks attendance for each day
 */
export interface CheckInRecord {
  date: string // YYYY-MM-DD format
  checked: boolean
  checkedAt?: Date
}

/**
 * User Check-in Statistics
 * Tracks streaks and attendance metrics
 */
export interface CheckInStats {
  userId: string
  currentStreak: number // Current consecutive days
  longestStreak: number // Best streak ever
  totalCheckIns: number // Total days checked in
  lastCheckInDate?: string // YYYY-MM-DD format
  checkedInToday: boolean
}

/**
 * User Check-in Profile
 * Complete check-in data for a user
 */
export interface UserCheckInProfile {
  userId: string
  userEmail: string
  userName: string
  stats: CheckInStats
  records: CheckInRecord[] // Last 30-90 days
  coupons: Coupon[]
  streakCoupons: CouponIssueRecord[] // Track streak-based coupon issuance
}

/**
 * Check-in Response DTO
 * Response from check-in API
 */
export interface CheckInResponse {
  success: boolean
  checked: boolean
  stats: CheckInStats
  earnedCoupons: Coupon[]
  message?: string
  error?: string
}

/**
 * Check-in System Interfaces
 * Manages user attendance, streaks, and rewards
 */

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
 * Coupon Data
 * Represents a coupon earned or used
 */
export interface Coupon {
  id: string
  userId: string
  code: string
  discountValue: number // Amount in dollars
  source: 'streak' | 'spin_wheel' | 'promotion' // How it was earned
  issued: boolean // Whether it has been issued
  used: boolean
  usedAt?: Date
  issuedAt: Date
  expiryDate?: Date
  description: string // e.g., "7-day streak bonus", "Spin wheel reward"
}

/**
 * Coupon Issue Record
 * Automatically issued coupons based on streaks
 */
export interface CouponIssueRecord {
  userId: string
  streakDays: number // Days required (7, 14, 30)
  couponValue: number // Dollar amount ($1, $2, $5)
  issued: boolean
  issuedAt?: Date
}

/**
 * Spin Wheel Slot
 * Configuration for each slot in the spin wheel
 */
export interface SpinWheelSlot {
  id: string
  value: number // Coupon value in dollars (0.10 to 1.00)
  probability: number // Weight for random selection
  emoji?: string // Visual representation
  color?: string // Slot color for UI
}

/**
 * Spin Wheel Reward History
 * Records of spins and rewards earned
 */
export interface SpinWheelReward {
  id: string
  userId: string
  date: string // YYYY-MM-DD when spin occurred
  rewardValue: number // Dollar amount won
  couponId: string // Link to issued coupon
  spinnedAt: Date
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
  spinHistory: SpinWheelReward[] // Recent spins
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
  spinWheelAvailable: boolean
  message?: string
  error?: string
}

/**
 * Spin Wheel Result
 * Result of spinning the wheel
 */
export interface SpinWheelResult {
  selected: SpinWheelSlot
  coupon: Coupon
  animationDuration: number // ms
}

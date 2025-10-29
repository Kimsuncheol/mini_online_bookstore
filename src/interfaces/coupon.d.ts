/**
 * Coupon System Interfaces
 * Manages coupons and discounts
 */

/**
 * Coupon Data
 * Represents a coupon earned or used
 */
export interface Coupon {
  id: string
  userId: string
  code: string
  discountValue: number // Amount in dollars
  source: 'streak' | 'promotion' | 'spin_wheel' // How it was earned
  issued: boolean // Whether it has been issued
  used: boolean
  usedAt?: Date
  issuedAt: Date
  expiryDate?: Date
  description: string // e.g., "7-day streak bonus"
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

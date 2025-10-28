/**
 * Payment History Interfaces
 * For tracking and displaying user payment transactions
 */

/**
 * Payment Status
 */
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded' | 'cancelled'

/**
 * Payment Method
 */
export type PaymentMethod = 'paypal' | 'credit_card' | 'debit_card' | 'other'

/**
 * Individual item in a payment transaction
 */
export interface PaymentItem {
  bookId: string
  bookTitle: string
  bookAuthor: string
  quantity: number
  unitPrice: number
  totalPrice: number
  coverImageUrl?: string
}

/**
 * Payment Transaction Record
 */
export interface PaymentTransaction {
  id: string
  orderId: string
  userId: string
  userEmail: string
  userName?: string

  // Payment Details
  paymentMethod: PaymentMethod
  status: PaymentStatus

  // Financial Details
  subtotal: number
  tax: number
  shippingCost: number
  totalAmount: number
  currency: string

  // Items
  items: PaymentItem[]

  // Timestamps
  createdAt: Date
  updatedAt: Date
  completedAt?: Date

  // PayPal specific
  paypalOrderId?: string
  paypalPayerId?: string

  // Additional Info
  shippingAddress?: {
    fullName: string
    addressLine1: string
    addressLine2?: string
    city: string
    state: string
    postalCode: string
    country: string
  }

  notes?: string
}

/**
 * Payment History Summary for Users
 */
export interface UserPaymentSummary {
  totalTransactions: number
  totalSpent: number
  currency: string
  lastPurchaseDate?: Date
  averageOrderValue: number
}

/**
 * Payment History Filter Options
 */
export interface PaymentHistoryFilter {
  userId?: string
  userEmail?: string
  status?: PaymentStatus[]
  paymentMethod?: PaymentMethod[]
  startDate?: Date
  endDate?: Date
  minAmount?: number
  maxAmount?: number
  searchTerm?: string
  page?: number
  limit?: number
  sortBy?: 'date' | 'amount' | 'status'
  sortOrder?: 'asc' | 'desc'
}

/**
 * Payment History Response
 */
export interface PaymentHistoryResponse {
  transactions: PaymentTransaction[]
  total: number
  page: number
  limit: number
  hasMore: boolean
  summary?: UserPaymentSummary
}

/**
 * Admin Payment Statistics
 */
export interface AdminPaymentStatistics {
  totalRevenue: number
  totalTransactions: number
  completedTransactions: number
  pendingTransactions: number
  failedTransactions: number
  refundedTransactions: number
  averageOrderValue: number
  currency: string

  // Time-based stats
  todayRevenue: number
  weekRevenue: number
  monthRevenue: number

  // Top buyers
  topBuyers?: {
    userEmail: string
    userName?: string
    totalSpent: number
    transactionCount: number
  }[]

  // Popular books
  topSellingBooks?: {
    bookId: string
    bookTitle: string
    bookAuthor: string
    quantitySold: number
    revenue: number
  }[]
}

/**
 * Refund Request
 */
export interface RefundRequest {
  transactionId: string
  reason: string
  amount?: number // Partial refund amount, if not provided, full refund
}

/**
 * Refund Response
 */
export interface RefundResponse {
  success: boolean
  refundId: string
  amount: number
  status: string
  message?: string
}

import type {
  PaymentTransaction,
  PaymentHistoryFilter,
  PaymentHistoryResponse,
  AdminPaymentStatistics,
  RefundRequest,
  RefundResponse,
} from '@/interfaces/paymentHistory'

// API base URL - from environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

/**
 * Fetches payment history for a specific user
 * @param userEmail - User's email address
 * @param filter - Optional filter parameters
 * @returns Payment history with transactions
 */
export async function getUserPaymentHistory(
  userEmail: string,
  filter?: PaymentHistoryFilter
): Promise<PaymentHistoryResponse> {
  try {
    const params = new URLSearchParams()
    params.append('user_email', userEmail)

    if (filter?.page) params.append('page', filter.page.toString())
    if (filter?.limit) params.append('limit', filter.limit.toString())
    if (filter?.sortBy) params.append('sort_by', filter.sortBy)
    if (filter?.sortOrder) params.append('sort_order', filter.sortOrder)
    if (filter?.status) params.append('status', filter.status.join(','))
    if (filter?.startDate) params.append('start_date', filter.startDate.toISOString())
    if (filter?.endDate) params.append('end_date', filter.endDate.toISOString())

    const response = await fetch(
      `${API_BASE_URL}/api/payments/history/user?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch payment history: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Get User Payment History Error:', error)
    throw error
  }
}

/**
 * Fetches all payment history for admin view
 * @param filter - Optional filter parameters
 * @returns Payment history with all transactions
 */
export async function getAllPaymentHistory(
  filter?: PaymentHistoryFilter
): Promise<PaymentHistoryResponse> {
  try {
    const params = new URLSearchParams()

    if (filter?.page) params.append('page', filter.page.toString())
    if (filter?.limit) params.append('limit', filter.limit.toString())
    if (filter?.sortBy) params.append('sort_by', filter.sortBy)
    if (filter?.sortOrder) params.append('sort_order', filter.sortOrder)
    if (filter?.status) params.append('status', filter.status.join(','))
    if (filter?.userEmail) params.append('user_email', filter.userEmail)
    if (filter?.searchTerm) params.append('search', filter.searchTerm)
    if (filter?.startDate) params.append('start_date', filter.startDate.toISOString())
    if (filter?.endDate) params.append('end_date', filter.endDate.toISOString())
    if (filter?.minAmount) params.append('min_amount', filter.minAmount.toString())
    if (filter?.maxAmount) params.append('max_amount', filter.maxAmount.toString())

    const response = await fetch(
      `${API_BASE_URL}/api/payments/history/admin?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch payment history: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Get All Payment History Error:', error)
    throw error
  }
}

/**
 * Fetches a specific payment transaction by ID
 * @param transactionId - Transaction ID
 * @returns Payment transaction details
 */
export async function getPaymentTransaction(
  transactionId: string
): Promise<PaymentTransaction> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/payments/transactions/${encodeURIComponent(transactionId)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch transaction: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Get Payment Transaction Error:', error)
    throw error
  }
}

/**
 * Fetches admin payment statistics
 * @returns Admin statistics including revenue, transactions, top buyers, etc.
 */
export async function getAdminPaymentStatistics(): Promise<AdminPaymentStatistics> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/payments/admin/statistics`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch statistics: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Get Admin Statistics Error:', error)
    throw error
  }
}

/**
 * Requests a refund for a transaction
 * @param refundRequest - Refund request details
 * @returns Refund response
 */
export async function requestRefund(refundRequest: RefundRequest): Promise<RefundResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/payments/refund`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        transaction_id: refundRequest.transactionId,
        reason: refundRequest.reason,
        amount: refundRequest.amount,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || `Failed to process refund: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Request Refund Error:', error)
    throw error
  }
}

/**
 * Exports payment history to CSV
 * @param filter - Optional filter parameters
 * @returns Blob of CSV file
 */
export async function exportPaymentHistoryCSV(filter?: PaymentHistoryFilter): Promise<Blob> {
  try {
    const params = new URLSearchParams()

    if (filter?.startDate) params.append('start_date', filter.startDate.toISOString())
    if (filter?.endDate) params.append('end_date', filter.endDate.toISOString())
    if (filter?.status) params.append('status', filter.status.join(','))

    const response = await fetch(
      `${API_BASE_URL}/api/payments/export/csv?${params.toString()}`,
      {
        method: 'GET',
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to export CSV: ${response.status}`)
    }

    return await response.blob()
  } catch (error) {
    console.error('Export CSV Error:', error)
    throw error
  }
}

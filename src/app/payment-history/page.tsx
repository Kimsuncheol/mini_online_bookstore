'use client'

import { useState, useEffect } from 'react'
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  CircularProgress,
  Alert,
  Pagination,
  Stack,
  Card,
  CardContent,
  Grid,
  Skeleton,
} from '@mui/material'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { useAuth } from '@/contexts/AuthContext'
import { getUserPaymentHistory } from '@/services/paymentHistoryService'
import PaymentTransactionItem from '@/app/components/payment/PaymentTransactionItem'
import type { PaymentHistoryResponse } from '@/interfaces/paymentHistory'

export default function PaymentHistoryPage() {
  const { user } = useAuth()
  const [history, setHistory] = useState<PaymentHistoryResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const limit = 10

  useEffect(() => {
    fetchPaymentHistory()
  }, [page, user])

  const fetchPaymentHistory = async () => {
    if (!user?.email) {
      setError('Please sign in to view payment history')
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const data = await getUserPaymentHistory(user.email, {
        page,
        limit,
        sortBy: 'date',
        sortOrder: 'desc',
      })
      setHistory(data)
    } catch (err) {
      console.error('Error fetching payment history:', err)
      setError(err instanceof Error ? err.message : 'Failed to load payment history')
    } finally {
      setLoading(false)
    }
  }

  const totalPages = history ? Math.ceil(history.total / limit) : 0

  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning">Please sign in to view your payment history</Alert>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Payment History
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View and manage all your past transactions
        </Typography>
      </Box>

      {/* Summary Cards */}
      {loading && !history ? (
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {[1, 2, 3, 4].map((i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 2 }} />
            </Grid>
          ))}
        </Grid>
      ) : (
        history?.summary && (
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={0} sx={{ bgcolor: 'primary.lighter', borderRadius: 2 }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <ReceiptLongIcon sx={{ color: 'primary.main' }} />
                    <Typography variant="body2" color="text.secondary">
                      Total Orders
                    </Typography>
                  </Stack>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {history.summary.totalTransactions}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={0} sx={{ bgcolor: 'success.lighter', borderRadius: 2 }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <AttachMoneyIcon sx={{ color: 'success.main' }} />
                    <Typography variant="body2" color="text.secondary">
                      Total Spent
                    </Typography>
                  </Stack>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    ${history.summary.totalSpent.toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={0} sx={{ bgcolor: 'info.lighter', borderRadius: 2 }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <TrendingUpIcon sx={{ color: 'info.main' }} />
                    <Typography variant="body2" color="text.secondary">
                      Average Order
                    </Typography>
                  </Stack>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    ${history.summary.averageOrderValue.toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={0} sx={{ bgcolor: 'warning.lighter', borderRadius: 2 }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <ShoppingBagIcon sx={{ color: 'warning.main' }} />
                    <Typography variant="body2" color="text.secondary">
                      Last Purchase
                    </Typography>
                  </Stack>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {history.summary.lastPurchaseDate
                      ? new Date(history.summary.lastPurchaseDate).toLocaleDateString()
                      : 'N/A'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )
      )}

      {/* Transactions List */}
      <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : !history || history.transactions.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <ReceiptLongIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              No payment history yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your transactions will appear here once you make a purchase
            </Typography>
          </Box>
        ) : (
          <>
            <List sx={{ p: 0 }}>
              {history.transactions.map((transaction) => (
                <PaymentTransactionItem key={transaction.id} transaction={transaction} />
              ))}
            </List>

            {/* Pagination */}
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(_, value) => setPage(value)}
                  color="primary"
                  size="large"
                />
              </Box>
            )}
          </>
        )}
      </Paper>
    </Container>
  )
}

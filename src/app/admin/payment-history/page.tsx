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
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Skeleton,
  Chip,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import PendingIcon from '@mui/icons-material/Pending'
import { useAuth } from '@/contexts/AuthContext'
import { getAllPaymentHistory, getAdminPaymentStatistics } from '@/services/paymentHistoryService'
import PaymentTransactionItem from '@/app/components/payment/PaymentTransactionItem'
import type { PaymentHistoryResponse, AdminPaymentStatistics, PaymentStatus } from '@/interfaces/paymentHistory'

export default function AdminPaymentHistoryPage() {
  const { user } = useAuth()
  const [history, setHistory] = useState<PaymentHistoryResponse | null>(null)
  const [statistics, setStatistics] = useState<AdminPaymentStatistics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | 'all'>('all')
  const limit = 10

  useEffect(() => {
    fetchData()
  }, [page, searchTerm, statusFilter, user])

  const fetchData = async () => {
    if (!user?.email) {
      setError('Please sign in as admin to view payment history')
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      // Fetch payment history
      const filter = {
        page,
        limit,
        sortBy: 'date' as const,
        sortOrder: 'desc' as const,
        searchTerm: searchTerm || undefined,
        status: statusFilter !== 'all' ? [statusFilter] : undefined,
      }
      const historyData = await getAllPaymentHistory(filter)
      setHistory(historyData)

      // Fetch statistics (only on first load)
      if (!statistics) {
        const statsData = await getAdminPaymentStatistics()
        setStatistics(statsData)
      }
    } catch (err) {
      console.error('Error fetching data:', err)
      setError(err instanceof Error ? err.message : 'Failed to load payment data')
    } finally {
      setLoading(false)
    }
  }

  const totalPages = history ? Math.ceil(history.total / limit) : 0

  if (!user) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Alert severity="warning">Please sign in as admin to view payment history</Alert>
      </Container>
    )
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Payment History Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Monitor and manage all payment transactions across the platform
        </Typography>
      </Box>

      {/* Statistics Cards */}
      {!statistics ? (
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={i}>
              <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 2 }} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Card elevation={0} sx={{ bgcolor: 'success.lighter', borderRadius: 2 }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                  <AttachMoneyIcon sx={{ color: 'success.main', fontSize: 20 }} />
                  <Typography variant="caption" color="text.secondary">
                    Total Revenue
                  </Typography>
                </Stack>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  ${statistics.totalRevenue.toFixed(0)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Card elevation={0} sx={{ bgcolor: 'primary.lighter', borderRadius: 2 }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                  <ReceiptLongIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                  <Typography variant="caption" color="text.secondary">
                    Total Orders
                  </Typography>
                </Stack>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {statistics.totalTransactions}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Card elevation={0} sx={{ bgcolor: 'success.lighter', borderRadius: 2 }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                  <CheckCircleIcon sx={{ color: 'success.main', fontSize: 20 }} />
                  <Typography variant="caption" color="text.secondary">
                    Completed
                  </Typography>
                </Stack>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {statistics.completedTransactions}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Card elevation={0} sx={{ bgcolor: 'warning.lighter', borderRadius: 2 }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                  <PendingIcon sx={{ color: 'warning.main', fontSize: 20 }} />
                  <Typography variant="caption" color="text.secondary">
                    Pending
                  </Typography>
                </Stack>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {statistics.pendingTransactions}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Card elevation={0} sx={{ bgcolor: 'error.lighter', borderRadius: 2 }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                  <ErrorIcon sx={{ color: 'error.main', fontSize: 20 }} />
                  <Typography variant="caption" color="text.secondary">
                    Failed
                  </Typography>
                </Stack>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {statistics.failedTransactions}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Card elevation={0} sx={{ bgcolor: 'info.lighter', borderRadius: 2 }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                  <TrendingUpIcon sx={{ color: 'info.main', fontSize: 20 }} />
                  <Typography variant="caption" color="text.secondary">
                    Avg Order
                  </Typography>
                </Stack>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  ${statistics.averageOrderValue.toFixed(0)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Filters */}
      <Paper elevation={0} sx={{ p: 2, mb: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search by order ID, user email, or book title..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setPage(1)
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => {
                  setStatusFilter(e.target.value as PaymentStatus | 'all')
                  setPage(1)
                }}
              >
                <MenuItem value="all">All Statuses</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="failed">Failed</MenuItem>
                <MenuItem value="refunded">Refunded</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              {history && (
                <Chip
                  label={`${history.total} Total Results`}
                  color="primary"
                  variant="outlined"
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>

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
              No transactions found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your filters
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

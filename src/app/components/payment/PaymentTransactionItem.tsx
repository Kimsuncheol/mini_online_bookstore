'use client'

import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Box,
  Chip,
  IconButton,
  Collapse,
  Stack,
  Divider,
} from '@mui/material'
import { useState } from 'react'
import ReceiptIcon from '@mui/icons-material/Receipt'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import CancelIcon from '@mui/icons-material/Cancel'
import RateReviewIcon from '@mui/icons-material/RateReview'
import type { PaymentTransaction, PaymentStatus } from '@/interfaces/paymentHistory'

interface PaymentTransactionItemProps {
  transaction: PaymentTransaction
  onViewDetails?: (transaction: PaymentTransaction) => void
  onLeaveReview?: (bookId: string, bookTitle: string) => void
}

export default function PaymentTransactionItem({
  transaction,
  onViewDetails,
  onLeaveReview,
}: PaymentTransactionItemProps) {
  const [expanded, setExpanded] = useState(false)

  const statusConfig = getStatusConfig(transaction.status)
  const isCompleted = transaction.status === 'completed'

  return (
    <>
      <ListItem
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          mb: 1.5,
          '&:hover': {
            bgcolor: 'action.hover',
          },
        }}
      >
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: statusConfig.color }}>
            <ReceiptIcon />
          </Avatar>
        </ListItemAvatar>

        <ListItemText
          primary={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Order #{transaction.orderId.slice(-8)}
              </Typography>
              <Chip
                icon={statusConfig.icon}
                label={transaction.status.toUpperCase()}
                size="small"
                sx={{
                  bgcolor: statusConfig.color,
                  color: 'white',
                  fontWeight: 600,
                  '& .MuiChip-icon': { color: 'white' },
                }}
              />
            </Box>
          }
          secondary={
            <Stack spacing={0.5}>
              <Typography variant="body2" color="text.secondary">
                {transaction.items.length} {transaction.items.length === 1 ? 'item' : 'items'} •{' '}
                {new Date(transaction.createdAt).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Payment: {transaction.paymentMethod.toUpperCase()}
              </Typography>
            </Stack>
          }
        />

        <Box sx={{ textAlign: 'right', mr: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
            ${transaction.totalAmount.toFixed(2)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {transaction.currency}
          </Typography>
        </Box>

        <IconButton onClick={() => setExpanded(!expanded)} size="small">
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </ListItem>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box
          sx={{
            pl: 9,
            pr: 2,
            pb: 2,
            mb: 1.5,
          }}
        >
          {/* Items List */}
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
            Order Items
          </Typography>
          <Stack spacing={1.5} sx={{ mb: 2 }}>
            {transaction.items.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 1.5,
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                {item.coverImageUrl && (
                  <Avatar
                    src={item.coverImageUrl}
                    variant="rounded"
                    sx={{ width: 50, height: 70 }}
                  />
                )}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {item.bookTitle}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    by {item.bookAuthor}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'flex-end' }}>
                  {isCompleted && onLeaveReview && (
                    <IconButton
                      size="small"
                      onClick={() => onLeaveReview(item.bookId, item.bookTitle)}
                      color="primary"
                      title="Leave a review"
                    >
                      <RateReviewIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  )}
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="body2">
                      ${item.unitPrice.toFixed(2)} × {item.quantity}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                      ${item.totalPrice.toFixed(2)}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            ))}
          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* Price Breakdown */}
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                Subtotal
              </Typography>
              <Typography variant="body2">${transaction.subtotal.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                Tax
              </Typography>
              <Typography variant="body2">${transaction.tax.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                Shipping
              </Typography>
              <Typography variant="body2">${transaction.shippingCost.toFixed(2)}</Typography>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Total
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'primary.main' }}>
                ${transaction.totalAmount.toFixed(2)}
              </Typography>
            </Box>
          </Stack>

          {/* Additional Info */}
          {transaction.completedAt && (
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
              Completed: {new Date(transaction.completedAt).toLocaleString()}
            </Typography>
          )}
        </Box>
      </Collapse>
    </>
  )
}

function getStatusConfig(status: PaymentStatus) {
  switch (status) {
    case 'completed':
      return {
        color: 'success.main',
        icon: <CheckCircleIcon sx={{ fontSize: 16 }} />,
      }
    case 'pending':
      return {
        color: 'warning.main',
        icon: <HourglassEmptyIcon sx={{ fontSize: 16 }} />,
      }
    case 'failed':
      return {
        color: 'error.main',
        icon: <ErrorIcon sx={{ fontSize: 16 }} />,
      }
    case 'refunded':
      return {
        color: 'info.main',
        icon: <CancelIcon sx={{ fontSize: 16 }} />,
      }
    case 'cancelled':
      return {
        color: 'text.disabled',
        icon: <CancelIcon sx={{ fontSize: 16 }} />,
      }
    default:
      return {
        color: 'grey.500',
        icon: <ReceiptIcon sx={{ fontSize: 16 }} />,
      }
  }
}

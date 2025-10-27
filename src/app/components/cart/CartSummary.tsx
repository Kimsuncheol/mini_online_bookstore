'use client'

import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import { CartItem } from '@/contexts/CartContext'
import PayPalCartCheckoutButton from '@/app/components/payment/PayPalCartCheckoutButton'
import type { PayPalPaymentItem } from '@/interfaces/payment'

interface CartSummaryProps {
  items: CartItem[]
  totalItems: number
  subtotal: number
  tax?: number
  shipping?: number
  onCheckoutSuccess?: () => void
}

export default function CartSummary({
  items,
  totalItems,
  subtotal,
  tax = 0,
  shipping = 0,
  onCheckoutSuccess,
}: CartSummaryProps) {
  const total = subtotal + tax + shipping

  // Convert CartItems to PayPalPaymentItems
  const paypalItems: PayPalPaymentItem[] = items.map((item) => ({
    book: {
      id: item.id,
      title: item.title,
      price: item.price,
      currency: 'USD', // Default currency
    },
    quantity: item.quantity,
  }))

  return (
    <Card
      sx={{
        backgroundColor: 'rgba(102, 126, 234, 0.05)',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Order Summary
        </Typography>

        <Stack spacing={1.5} sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Subtotal ({totalItems} item{totalItems !== 1 ? 's' : ''})
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              ${subtotal.toFixed(2)}
            </Typography>
          </Box>

          {shipping > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Shipping
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                ${shipping.toFixed(2)}
              </Typography>
            </Box>
          )}

          {tax > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Tax
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                ${tax.toFixed(2)}
              </Typography>
            </Box>
          )}
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Total
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, color: 'primary.main' }}
          >
            ${total.toFixed(2)}
          </Typography>
        </Box>

        <PayPalCartCheckoutButton
          items={paypalItems}
          disabled={items.length === 0}
          onSuccess={onCheckoutSuccess}
        />
      </CardContent>
    </Card>
  )
}

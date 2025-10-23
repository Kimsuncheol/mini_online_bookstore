'use client'

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'

interface CartSummaryProps {
  totalItems: number
  subtotal: number
  tax?: number
  shipping?: number
  onCheckout: () => void
}

export default function CartSummary({
  totalItems,
  subtotal,
  tax = 0,
  shipping = 0,
  onCheckout,
}: CartSummaryProps) {
  const total = subtotal + tax + shipping

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

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
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

        <Button
          variant="contained"
          fullWidth
          onClick={onCheckout}
          startIcon={<ShoppingCartCheckoutIcon />}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            py: 1.5,
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
              boxShadow: '0 6px 16px rgba(102, 126, 234, 0.4)',
            },
          }}
        >
          Proceed to Checkout
        </Button>
      </CardContent>
    </Card>
  )
}

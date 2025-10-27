'use client'

import { Box, Container, Typography, CircularProgress, Alert, Snackbar } from '@mui/material'
import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import CartItems from './CartItems'
import CartSummary from './CartSummary'
import EmptyCart from './EmptyCart'

export default function Cart() {
  const { items, totalItems, totalPrice, loading, error, updateQuantity, removeFromCart, clearCart } = useCart()
  const [operationLoading, setOperationLoading] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  const handleQuantityUpdate = async (id: string, quantity: number) => {
    setOperationLoading(true)
    try {
      await updateQuantity(id, quantity)
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to update quantity')
      setShowError(true)
    } finally {
      setOperationLoading(false)
    }
  }

  const handleRemove = async (id: string) => {
    setOperationLoading(true)
    try {
      await removeFromCart(id)
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to remove item')
      setShowError(true)
    } finally {
      setOperationLoading(false)
    }
  }

  const handleCheckoutSuccess = async () => {
    try {
      await clearCart()
      setShowSuccess(true)
      // Success message will be shown by PayPal button
    } catch (err) {
      console.error('Error clearing cart after checkout:', err)
    }
  }

  if (loading && items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    )
  }

  if (items.length === 0) {
    return <EmptyCart />
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Shopping Cart
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
          Review your items and proceed to checkout
        </Typography>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
          gap: 3,
        }}
      >
        {/* Cart Items Section */}
        <Box>
          <CartItems
            items={items}
            onUpdateQuantity={handleQuantityUpdate}
            onRemove={handleRemove}
          />
        </Box>

        {/* Order Summary Sidebar */}
        <Box>
          <Box sx={{ position: 'sticky', top: 20 }}>
            <CartSummary
              items={items}
              totalItems={totalItems}
              subtotal={totalPrice}
              onCheckoutSuccess={handleCheckoutSuccess}
            />
          </Box>
        </Box>
      </Box>

      {/* Error Snackbar */}
      <Snackbar
        open={showError}
        autoHideDuration={4000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowError(false)}
          severity="error"
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Order completed successfully! Your cart has been cleared.
        </Alert>
      </Snackbar>
    </Container>
  )
}

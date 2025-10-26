'use client'

import { Box, Container, Typography } from '@mui/material'
import { useCart } from '@/contexts/CartContext'
import CartItems from './CartItems'
import CartSummary from './CartSummary'
import EmptyCart from './EmptyCart'

export default function Cart() {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart } =
    useCart()

  const handleCheckout = () => {
    // TODO: Implement checkout logic
    console.log('Proceeding to checkout with items:', items)
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
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
          />
        </Box>

        {/* Order Summary Sidebar */}
        <Box>
          <Box sx={{ position: 'sticky', top: 20 }}>
            <CartSummary
              totalItems={totalItems}
              subtotal={totalPrice}
              onCheckout={handleCheckout}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

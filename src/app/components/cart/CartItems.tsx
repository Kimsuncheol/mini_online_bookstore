'use client'

import { Box, Stack, Typography } from '@mui/material'
import { CartItem } from '@/contexts/CartContext'
import CartItemCard from './CartItemCard'

interface CartItemsProps {
  items: CartItem[]
  onUpdateQuantity: (id: string, quantity: number) => Promise<void>
  onRemove: (id: string) => Promise<void>
}

export default function CartItems({
  items,
  onUpdateQuantity,
  onRemove,
}: CartItemsProps) {
  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Shopping Cart ({items.length} item{items.length !== 1 ? 's' : ''})
      </Typography>
      <Stack spacing={2}>
        {items.map((item) => (
          <CartItemCard
            key={item.id}
            item={item}
            onUpdateQuantity={onUpdateQuantity}
            onRemove={onRemove}
          />
        ))}
      </Stack>
    </Box>
  )
}

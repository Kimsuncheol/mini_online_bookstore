'use client'

import {
  Box,
  Card,
  CardContent,
  IconButton,
  TextField,
  Typography,
  alpha,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { CartItem } from '@/contexts/CartContext'

interface CartItemCardProps {
  item: CartItem
  onUpdateQuantity: (id: string, quantity: number) => Promise<void>
  onRemove: (id: string) => Promise<void>
}

export default function CartItemCard({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemCardProps) {
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10)
    if (!isNaN(value) && value > 0) {
      onUpdateQuantity(item.id, value)
    }
  }

  const handleIncrement = () => {
    onUpdateQuantity(item.id, item.quantity + 1)
  }

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1)
    }
  }

  return (
    <Card
      sx={{
        display: 'flex',
        gap: 2,
        p: 2,
        backgroundColor: alpha('#ffffff', 0.8),
        border: '1px solid',
        borderColor: 'divider',
        '&:hover': {
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        },
      }}
    >
      {/* Book Image Placeholder */}
      <Box
        sx={{
          width: 100,
          height: 150,
          backgroundColor: alpha('#667eea', 0.1),
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
          {item.image || 'No Image'}
        </Typography>
      </Box>

      <CardContent
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: 0,
        }}
      >
        {/* Book Info */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
            {item.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
            by {item.author}
          </Typography>
        </Box>

        {/* Quantity and Price Controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Quantity Controls */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              size="small"
              onClick={handleDecrement}
              disabled={item.quantity <= 1}
              sx={{
                color: 'primary.main',
              }}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
            <TextField
              type="number"
              value={item.quantity}
              onChange={handleQuantityChange}
              inputProps={{
                min: 1,
                style: { textAlign: 'center', width: '50px' },
              }}
              size="small"
              variant="outlined"
              sx={{
                '& input': {
                  textAlign: 'center',
                  fontSize: '0.875rem',
                },
              }}
            />
            <IconButton
              size="small"
              onClick={handleIncrement}
              sx={{
                color: 'primary.main',
              }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Price */}
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: 'primary.main',
              minWidth: '80px',
              textAlign: 'right',
            }}
          >
            ${(item.price * item.quantity).toFixed(2)}
          </Typography>

          {/* Remove Button */}
          <IconButton
            size="small"
            onClick={() => onRemove(item.id)}
            sx={{
              color: 'error.main',
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  )
}

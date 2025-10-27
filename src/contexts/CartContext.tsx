'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import type { CartItem } from '@/interfaces/cart'
import { useAuth } from '@/contexts/AuthContext'
import {
  addItemToCart as addItemToCartAPI,
  getUserCart,
  removeItemFromCart as removeItemFromCartAPI,
  updateItemQuantity,
  clearUserCart,
} from '@/app/api/cart'

export type { CartItem }

interface CartContextType {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  loading: boolean
  error: string | null
  addToCart: (item: Omit<CartItem, 'quantity'>) => Promise<void>
  removeFromCart: (id: string) => Promise<void>
  updateQuantity: (id: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  refreshCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Fetch cart items from server when user logs in
  const refreshCart = useCallback(async () => {
    if (!user?.email) {
      setItems([])
      return
    }

    setLoading(true)
    setError(null)
    try {
      const cartItems = await getUserCart(user.email)
      setItems(cartItems)
    } catch (err) {
      console.error('Error fetching cart:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch cart')
      // Keep local cart if server fetch fails
    } finally {
      setLoading(false)
    }
  }, [user?.email])

  // Load cart on mount and when user changes
  useEffect(() => {
    refreshCart()
  }, [refreshCart])

  const addToCart = useCallback(async (item: Omit<CartItem, 'quantity'>) => {
    // Optimistically update local state
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id)
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prevItems, { ...item, quantity: 1 }]
    })

    // If user is logged in, sync with server
    if (user?.email) {
      try {
        await addItemToCartAPI(user.email, { ...item, quantity: 1 })
        await refreshCart() // Refresh to get accurate server state
      } catch (err) {
        console.error('Error adding item to cart:', err)
        setError(err instanceof Error ? err.message : 'Failed to add item to cart')
        // Revert optimistic update on error
        setItems((prevItems) => prevItems.filter((i) => i.id !== item.id))
        throw err
      }
    }
  }, [user?.email, refreshCart])

  const removeFromCart = useCallback(async (id: string) => {
    // Optimistically update local state
    const removedItem = items.find((item) => item.id === id)
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))

    // If user is logged in, sync with server
    if (user?.email && removedItem) {
      try {
        await removeItemFromCartAPI(user.email, id)
      } catch (err) {
        console.error('Error removing item from cart:', err)
        setError(err instanceof Error ? err.message : 'Failed to remove item from cart')
        // Revert optimistic update on error
        if (removedItem) {
          setItems((prevItems) => [...prevItems, removedItem])
        }
        throw err
      }
    }
  }, [user?.email, items])

  const updateQuantity = useCallback(async (id: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(id)
      return
    }

    // Optimistically update local state
    const oldQuantity = items.find((item) => item.id === id)?.quantity
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    )

    // If user is logged in, sync with server
    if (user?.email) {
      try {
        await updateItemQuantity(user.email, id, quantity)
      } catch (err) {
        console.error('Error updating quantity:', err)
        setError(err instanceof Error ? err.message : 'Failed to update quantity')
        // Revert optimistic update on error
        if (oldQuantity !== undefined) {
          setItems((prevItems) =>
            prevItems.map((item) =>
              item.id === id ? { ...item, quantity: oldQuantity } : item
            )
          )
        }
        throw err
      }
    }
  }, [user?.email, items, removeFromCart])

  const clearCart = useCallback(async () => {
    // Optimistically update local state
    const oldItems = [...items]
    setItems([])

    // If user is logged in, sync with server
    if (user?.email) {
      try {
        await clearUserCart(user.email)
      } catch (err) {
        console.error('Error clearing cart:', err)
        setError(err instanceof Error ? err.message : 'Failed to clear cart')
        // Revert optimistic update on error
        setItems(oldItems)
        throw err
      }
    }
  }, [user?.email, items])

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        loading,
        error,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

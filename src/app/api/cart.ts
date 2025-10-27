import { CartItem } from '@/interfaces/cart'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

// Helper function to convert camelCase to snake_case
function toSnakeCase<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj
  if (Array.isArray(obj)) return obj.map(toSnakeCase) as T
  if (typeof obj !== 'object') return obj

  const snakeCased: Record<string, unknown> = {}
  for (const key in obj) {
    const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
    snakeCased[snakeKey] = toSnakeCase(obj[key])
  }
  return snakeCased as T
}

// Helper function to convert snake_case to camelCase
function toCamelCase<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj
  if (Array.isArray(obj)) return obj.map(toCamelCase) as T
  if (typeof obj !== 'object') return obj

  const camelCased: Record<string, unknown> = {}
  for (const key in obj) {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
    camelCased[camelKey] = toCamelCase(obj[key])
  }
  return camelCased as T
}

/**
 * Add an item to the user's shopping cart
 * POST /api/carts/{user_id}/items
 */
export async function addItemToCart(
  userId: string,
  itemData: Omit<CartItem, 'quantity'> & { quantity?: number }
): Promise<CartItem> {
  try {
    const snakeCaseData = toSnakeCase({
      ...itemData,
      quantity: itemData.quantity || 1,
    })

    const response = await fetch(`${API_BASE_URL}/api/carts/${encodeURIComponent(userId)}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(snakeCaseData),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Failed to add item to cart' }))
      throw new Error(error.detail || 'Failed to add item to cart')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error adding item to cart:', error)
    throw error
  }
}

/**
 * Fetch all items from a user's shopping cart
 * GET /api/carts/{user_id}
 */
export async function getUserCart(userId: string): Promise<CartItem[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/carts/${encodeURIComponent(userId)}`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch user cart')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error fetching user cart:', error)
    throw error
  }
}

/**
 * Clear all items from a user's shopping cart
 * DELETE /api/carts/{user_id}
 */
export async function clearUserCart(userId: string): Promise<{
  message: string
  itemsDeleted: number
}> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/carts/${encodeURIComponent(userId)}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Failed to clear cart')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error clearing cart:', error)
    throw error
  }
}

/**
 * Fetch a specific item from a user's shopping cart
 * GET /api/carts/{user_id}/items/{item_id}
 */
export async function getCartItem(userId: string, itemId: string): Promise<CartItem> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/carts/${encodeURIComponent(userId)}/items/${encodeURIComponent(itemId)}`,
      {
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Cart item not found')
      }
      throw new Error('Failed to fetch cart item')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error fetching cart item:', error)
    throw error
  }
}

/**
 * Update a cart item (quantity or price)
 * PATCH /api/carts/{user_id}/items/{item_id}
 */
export async function updateCartItem(
  userId: string,
  itemId: string,
  updateData: Partial<CartItem>
): Promise<CartItem> {
  try {
    const snakeCaseData = toSnakeCase(updateData)

    const response = await fetch(
      `${API_BASE_URL}/api/carts/${encodeURIComponent(userId)}/items/${encodeURIComponent(itemId)}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(snakeCaseData),
      }
    )

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Failed to update cart item' }))
      if (response.status === 404) {
        throw new Error('Cart item not found')
      }
      if (response.status === 400) {
        throw new Error(error.detail || 'Invalid data')
      }
      throw new Error(error.detail || 'Failed to update cart item')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error updating cart item:', error)
    throw error
  }
}

/**
 * Remove an item from a user's shopping cart
 * DELETE /api/carts/{user_id}/items/{item_id}
 */
export async function removeItemFromCart(
  userId: string,
  itemId: string
): Promise<{ message: string }> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/carts/${encodeURIComponent(userId)}/items/${encodeURIComponent(itemId)}`,
      {
        method: 'DELETE',
      }
    )

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Cart item not found')
      }
      throw new Error('Failed to remove item from cart')
    }

    return await response.json()
  } catch (error) {
    console.error('Error removing item from cart:', error)
    throw error
  }
}

/**
 * Get a comprehensive summary of the user's shopping cart
 * GET /api/carts/{user_id}/summary
 */
export async function getCartSummary(userId: string): Promise<{
  items: CartItem[]
  totalItems: number
  totalPrice: number
  totalQuantity: number
}> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/carts/${encodeURIComponent(userId)}/summary`,
      {
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch cart summary')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error fetching cart summary:', error)
    throw error
  }
}

/**
 * Update the quantity of a specific product in the cart
 * PATCH /api/carts/{user_id}/items/{product_id}/quantity
 */
export async function updateItemQuantity(
  userId: string,
  productId: string,
  quantity: number
): Promise<CartItem> {
  try {
    if (quantity <= 0) {
      throw new Error('Quantity must be greater than 0')
    }

    const response = await fetch(
      `${API_BASE_URL}/api/carts/${encodeURIComponent(userId)}/items/${encodeURIComponent(productId)}/quantity?quantity=${quantity}`,
      {
        method: 'PATCH',
      }
    )

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Failed to update quantity' }))
      if (response.status === 404) {
        throw new Error('Cart item not found')
      }
      if (response.status === 400) {
        throw new Error(error.detail || 'Invalid quantity')
      }
      throw new Error(error.detail || 'Failed to update quantity')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error updating item quantity:', error)
    throw error
  }
}

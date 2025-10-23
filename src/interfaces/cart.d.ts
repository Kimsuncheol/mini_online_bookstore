/**
 * Cart Item Interface
 * Represents a book item in the shopping cart
 */
export interface CartItem {
  id: string
  title: string
  author: string
  price: number
  quantity: number
  image?: string
}

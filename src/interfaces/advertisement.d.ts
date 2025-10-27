/**
 * Advertisement Interface
 * Represents advertisements for the hero carousel
 */

/**
 * Advertisement
 * Full advertisement data from the database
 */
export interface Advertisement {
  id: string
  title: string
  author: string
  description: string
  price: number
  pageCount?: number
  originalPrice?: number
  coverImageUrl?: string
  isActive: boolean
  displayOrder: number
  createdAt?: Date
  updatedAt?: Date
}

/**
 * Advertisement Create
 * Data required to create a new advertisement
 */
export interface AdvertisementCreate {
  title: string
  author: string
  description: string
  price: number
  pageCount?: number
  originalPrice?: number
  coverImageUrl?: string
  isActive?: boolean
  displayOrder?: number
}

/**
 * Advertisement Update
 * Data that can be updated in an advertisement
 */
export interface AdvertisementUpdate {
  title?: string
  author?: string
  description?: string
  price?: number
  pageCount?: number
  originalPrice?: number
  coverImageUrl?: string
  isActive?: boolean
  displayOrder?: number
}

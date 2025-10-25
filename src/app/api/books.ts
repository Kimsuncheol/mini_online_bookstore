import { Book, BookFilterOptions } from '@/interfaces/book'

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
 * Create a new book
 * POST /api/books
 */
export async function createBook(bookData: Partial<Book>): Promise<Book> {
  try {
    const snakeCaseData = toSnakeCase(bookData)

    const response = await fetch(`${API_BASE_URL}/api/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(snakeCaseData),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Failed to create book' }))
      throw new Error(error.detail || 'Failed to create book')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error creating book:', error)
    throw error
  }
}

/**
 * Get all books
 * GET /api/books
 */
export async function getAllBooks(limit?: number): Promise<Book[]> {
  try {
    const url = new URL(`${API_BASE_URL}/api/books`)
    if (limit) {
      url.searchParams.append('limit', limit.toString())
    }

    const response = await fetch(url.toString(), {
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch books')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error fetching books:', error)
    throw error
  }
}

/**
 * Get a book by ID
 * GET /api/books/{book_id}
 */
export async function getBook(bookId: string): Promise<Book> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/books/${bookId}`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Book not found')
      }
      throw new Error('Failed to fetch book')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error fetching book:', error)
    throw error
  }
}

/**
 * Update a book
 * PATCH /api/books/{book_id}
 */
export async function updateBook(bookId: string, updateData: Partial<Book>): Promise<Book> {
  try {
    const snakeCaseData = toSnakeCase(updateData)

    const response = await fetch(`${API_BASE_URL}/api/books/${bookId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(snakeCaseData),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Failed to update book' }))
      if (response.status === 404) {
        throw new Error('Book not found')
      }
      throw new Error(error.detail || 'Failed to update book')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error updating book:', error)
    throw error
  }
}

/**
 * Delete a book
 * DELETE /api/books/{book_id}
 */
export async function deleteBook(bookId: string): Promise<{ message: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/books/${bookId}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Book not found')
      }
      throw new Error('Failed to delete book')
    }

    return await response.json()
  } catch (error) {
    console.error('Error deleting book:', error)
    throw error
  }
}

/**
 * Search books with filters
 * POST /api/books/search
 */
export async function searchBooks(filters: BookFilterOptions): Promise<{
  books: Book[]
  total: number
  page: number
  limit: number
  totalPages: number
}> {
  try {
    const snakeCaseFilters = toSnakeCase(filters)

    const response = await fetch(`${API_BASE_URL}/api/books/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(snakeCaseFilters),
    })

    if (!response.ok) {
      throw new Error('Failed to search books')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error searching books:', error)
    throw error
  }
}

/**
 * Update book stock
 * PATCH /api/books/{book_id}/stock
 */
export async function updateBookStock(
  bookId: string,
  quantityChange: number
): Promise<Book> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/books/${bookId}/stock?quantity_change=${quantityChange}`,
      {
        method: 'PATCH',
      }
    )

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Failed to update stock' }))
      if (response.status === 404) {
        throw new Error('Book not found')
      }
      if (response.status === 400) {
        throw new Error(error.detail || 'Invalid stock quantity')
      }
      throw new Error('Failed to update stock')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error updating stock:', error)
    throw error
  }
}

/**
 * Get books by genre
 * GET /api/books/genre/{genre}
 */
export async function getBooksByGenre(genre: string, limit?: number): Promise<Book[]> {
  try {
    const url = new URL(`${API_BASE_URL}/api/books/genre/${encodeURIComponent(genre)}`)
    if (limit) {
      url.searchParams.append('limit', limit.toString())
    }

    const response = await fetch(url.toString())

    if (!response.ok) {
      throw new Error('Failed to fetch books by genre')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error fetching books by genre:', error)
    throw error
  }
}

/**
 * Get featured books
 * GET /api/books/featured/list
 */
export async function getFeaturedBooks(limit: number = 10): Promise<Book[]> {
  try {
    const url = new URL(`${API_BASE_URL}/api/books/featured/list`)
    url.searchParams.append('limit', limit.toString())

    const response = await fetch(url.toString())

    if (!response.ok) {
      throw new Error('Failed to fetch featured books')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error fetching featured books:', error)
    throw error
  }
}

/**
 * Get new release books
 * GET /api/books/new-releases/list
 */
export async function getNewReleases(limit: number = 10): Promise<Book[]> {
  try {
    const url = new URL(`${API_BASE_URL}/api/books/new-releases/list`)
    url.searchParams.append('limit', limit.toString())

    const response = await fetch(url.toString())

    if (!response.ok) {
      throw new Error('Failed to fetch new releases')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error fetching new releases:', error)
    throw error
  }
}

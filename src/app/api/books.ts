import {
  Book,
  BookCategory,
  BookFilterOptions,
  BookSummary,
  BookViewerPayload,
  SummaryGenerationResponse,
} from '@/interfaces/book'

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

async function throwResponseError(response: Response, defaultMessage: string): Promise<never> {
  let message = defaultMessage
  try {
    const error = await response.json()
    message = error?.detail || error?.message || defaultMessage
  } catch {
    // ignore JSON parse errors
  }
  throw new Error(message)
}

/**
 * Create a new book
 * POST /api/books
 */
export async function createBook(
  bookData: Partial<Book>,
  options: { generateSummary?: boolean } = {}
): Promise<Book> {
  try {
    const snakeCaseData = toSnakeCase(bookData)
    const { generateSummary = true } = options
    const url = new URL(`${API_BASE_URL}/api/books`)
    if (generateSummary !== undefined) {
      url.searchParams.append('generate_summary', String(generateSummary))
    }

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(snakeCaseData),
    })

    if (!response.ok) {
      await throwResponseError(response, 'Failed to create book')
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
    if (typeof limit === 'number') {
      url.searchParams.append('limit', limit.toString())
    }

    const response = await fetch(url.toString(), {
      cache: 'no-store',
    })

    if (!response.ok) {
      await throwResponseError(response, 'Failed to fetch books')
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
      await throwResponseError(response, 'Failed to fetch book')
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
export async function updateBook(
  bookId: string,
  updateData: Partial<Book>,
  options: { regenerateSummary?: boolean } = {}
): Promise<Book> {
  try {
    const snakeCaseData = toSnakeCase(updateData)
    const url = new URL(`${API_BASE_URL}/api/books/${bookId}`)
    if (options.regenerateSummary !== undefined) {
      url.searchParams.append('regenerate_summary', String(options.regenerateSummary))
    }

    const response = await fetch(url.toString(), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(snakeCaseData),
    })

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Book not found')
      }
      await throwResponseError(response, 'Failed to update book')
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
      await throwResponseError(response, 'Failed to delete book')
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
      await throwResponseError(response, 'Failed to search books')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error searching books:', error)
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
    if (typeof limit === 'number') {
      url.searchParams.append('limit', limit.toString())
    }

    const response = await fetch(url.toString())

    if (!response.ok) {
      await throwResponseError(response, 'Failed to fetch books by genre')
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
      await throwResponseError(response, 'Failed to fetch featured books')
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
      await throwResponseError(response, 'Failed to fetch new releases')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error fetching new releases:', error)
    throw error
  }
}

/**
 * Get AI-generated summary for a book
 * GET /api/books/{book_id}/summary
 */
export async function getBookSummary(bookId: string): Promise<BookSummary | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/books/${bookId}/summary`, {
      cache: 'no-store',
    })

    if (response.status === 404) {
      return null
    }

    if (!response.ok) {
      await throwResponseError(response, 'Failed to fetch book summary')
    }

    const data = await response.json()
    const summary = toCamelCase(data) as BookSummary
    return {
      ...summary,
      keyThemes: summary.keyThemes ?? [],
      moodTags: summary.moodTags ?? [],
      contentWarnings: summary.contentWarnings ?? [],
      similarBooksTags: summary.similarBooksTags ?? [],
    }
  } catch (error) {
    console.error('Error fetching book summary:', error)
    throw error
  }
}

/**
 * Generate AI summary for a book
 * POST /api/books/{book_id}/summary/generate
 */
export async function generateBookSummary(
  bookId: string,
  forceRegenerate: boolean = false
): Promise<SummaryGenerationResponse> {
  try {
    const url = new URL(`${API_BASE_URL}/api/books/${bookId}/summary/generate`)
    if (forceRegenerate) {
      url.searchParams.append('force_regenerate', String(forceRegenerate))
    }

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      await throwResponseError(response, 'Failed to generate book summary')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error generating book summary:', error)
    throw error
  }
}

/**
 * Delete AI summary for a book
 * DELETE /api/books/{book_id}/summary
 */
export async function deleteBookSummary(bookId: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/books/${bookId}/summary`, {
      method: 'DELETE',
    })

    if (response.status === 404) {
      return
    }

    if (!response.ok) {
      await throwResponseError(response, 'Failed to delete book summary')
    }
  } catch (error) {
    console.error('Error deleting book summary:', error)
    throw error
  }
}

/**
 * Fetch PDF viewer payload for a book
 * GET /api/books/{book_id}/viewer
 */
export async function getBookViewer(bookId: string): Promise<BookViewerPayload> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/books/${bookId}/viewer`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      await throwResponseError(response, 'Failed to load book viewer data')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error fetching book viewer payload:', error)
    throw error
  }
}

/**
 * Stream the PDF asset for a given book
 * GET /api/books/{book_id}/viewer/stream
 */
export async function streamBookPdf(bookId: string): Promise<Response> {
  const response = await fetch(`${API_BASE_URL}/api/books/${bookId}/viewer/stream`, {
    method: 'GET',
  })

  if (!response.ok) {
    await throwResponseError(response, 'Failed to stream book PDF')
  }

  return response
}

/**
 * Update stock quantity for a book
 * PATCH /api/books/{book_id}/stock
 */
export async function updateBookStock(bookId: string, quantityChange: number): Promise<Book> {
  try {
    const url = new URL(`${API_BASE_URL}/api/books/${bookId}/stock`)
    url.searchParams.append('quantity_change', quantityChange.toString())

    const response = await fetch(url.toString(), {
      method: 'PATCH',
    })

    if (!response.ok) {
      await throwResponseError(response, 'Failed to update book stock')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error updating book stock:', error)
    throw error
  }
}

/**
 * Get all book categories
 * GET /api/books/categories
 */
export async function getAllCategories(): Promise<BookCategory[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/books/categories`)

    if (!response.ok) {
      await throwResponseError(response, 'Failed to fetch book categories')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error fetching book categories:', error)
    throw error
  }
}

/**
 * Create a new book category
 * POST /api/books/categories
 */
export async function createCategory(categoryData: Partial<BookCategory>): Promise<BookCategory> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/books/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(toSnakeCase(categoryData)),
    })

    if (!response.ok) {
      await throwResponseError(response, 'Failed to create category')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error creating book category:', error)
    throw error
  }
}

/**
 * Update an existing category
 * PATCH /api/books/categories/{category_id}
 */
export async function updateCategory(
  categoryId: string,
  updateData: Partial<BookCategory>
): Promise<BookCategory> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/books/categories/${categoryId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(toSnakeCase(updateData)),
    })

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Category not found')
      }
      await throwResponseError(response, 'Failed to update category')
    }

    const data = await response.json()
    return toCamelCase(data)
  } catch (error) {
    console.error('Error updating book category:', error)
    throw error
  }
}

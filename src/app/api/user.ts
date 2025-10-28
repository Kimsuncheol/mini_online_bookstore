const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

// Sign Up Request Interface
export interface SignUpRequest {
  email: string
  display_name?: string
}

// Sign Up Response Interface
export interface SignUpResponse {
  user: {
    id: string
    email: string
    display_name?: string
    created_at: string
  }
  message: string
}

// Member Interface (from backend)
export interface Member {
  id: string
  email: string
  display_name?: string
  created_at: string
  updated_at?: string
  is_active?: boolean
  role?: string
}

/**
 * Sign up a new user
 * POST /api/auth/signup
 *
 * Creates a new member in the members collection with the provided email and username.
 *
 * @param email - User's email address
 * @param displayName - User's display name (optional)
 * @returns SignUpResponse with user information
 * @throws Error if email already exists or database error occurs
 */
export async function signUp(
  email: string,
  displayName?: string
): Promise<SignUpResponse> {
  try {
    const requestBody: SignUpRequest = {
      email,
      display_name: displayName,
    }

    const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        detail: 'Failed to sign up'
      }))

      if (response.status === 400) {
        throw new Error(error.detail || 'Email already exists')
      }

      if (response.status === 422) {
        throw new Error(error.detail || 'Invalid email or display name')
      }

      if (response.status === 500) {
        throw new Error('Server error. Please try again later.')
      }

      throw new Error(error.detail || 'Failed to sign up')
    }

    const data: SignUpResponse = await response.json()
    return data
  } catch (error) {
    console.error('Error during sign up:', error)
    throw error
  }
}

/**
 * Get user by email
 * GET /members/email/{email}
 */
export async function getUserByEmail(email: string): Promise<Member | null> {
  try {
    console.log('email' + email);
    const response = await fetch(
      `${API_BASE_URL}/members/email/${encodeURIComponent(email)}`,
      {
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error('Failed to fetch user')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching user by email:', error)
    throw error
  }
}

/**
 * Get user by ID
 * GET /members/{member_id}
 */
export async function getUserById(userId: string): Promise<Member | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/members/${userId}`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error('Failed to fetch user')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching user by ID:', error)
    throw error
  }
}

/**
 * Get all members
 * GET /members
 */
export async function getAllMembers(): Promise<Member[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/members`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch members')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching members:', error)
    throw error
  }
}

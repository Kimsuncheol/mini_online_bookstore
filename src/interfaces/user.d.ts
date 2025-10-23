/**
 * Application User Interface
 * Represents a user in the BookNest application
 */
export interface User {
  // Authentication
  id: string
  email: string
  displayName?: string
  photoURL?: string

  // Account Status
  isEmailVerified: boolean
  createdAt: Date
  lastSignInAt?: Date

  // User Preferences
  preferences?: {
    emailNotifications: boolean
    marketingEmails: boolean
  }

  // Additional Profile Info
  phone?: string
  address?: string
}

/**
 * Sign-up Form Data Interface
 * Represents the data submitted during sign-up
 */
export interface SignUpFormData {
  email: string
  displayName?: string
}

/**
 * Sign-in Form Data Interface
 * Represents the data submitted during sign-in
 */
export interface SignInFormData {
  email: string
}

/**
 * Auth Response Interface
 * Represents the response from authentication operations
 */
export interface AuthResponse {
  success: boolean
  user?: User
  message?: string
  error?: string
}

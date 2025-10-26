/**
 * User Management API
 * Handles CRUD operations for user management
 */

import type { User } from '@/interfaces/user'

/**
 * Extended User type for management with additional fields
 */
export interface ManagementUser extends Omit<User, 'createdAt' | 'lastSignInAt'> {
  id: string
  email: string
  displayName?: string
  photoURL?: string
  role: 'admin' | 'author' | 'user'
  isEmailVerified: boolean
  createdAt: string
  lastSignInAt?: string
  status: 'active' | 'suspended' | 'pending'
}

/**
 * User filter parameters
 */
export interface UserFilters {
  search?: string
  role?: 'admin' | 'author' | 'user' | 'all'
  status?: 'active' | 'suspended' | 'pending' | 'all'
  emailVerified?: boolean | 'all'
}

/**
 * User update data
 */
export interface UserUpdateData {
  role?: 'admin' | 'author' | 'user'
  status?: 'active' | 'suspended' | 'pending'
  displayName?: string
  phone?: string
  address?: string
}

/**
 * User statistics
 */
export interface UserStats {
  totalUsers: number
  adminCount: number
  authorCount: number
  userCount: number
  activeUsers: number
  suspendedUsers: number
  verifiedUsers: number
}

/**
 * Mock data for development - replace with real API calls
 */
const mockUsers: ManagementUser[] = [
  {
    id: '1',
    email: 'admin@booknest.com',
    displayName: 'Admin User',
    role: 'admin',
    isEmailVerified: true,
    createdAt: '2024-01-15T10:00:00Z',
    lastSignInAt: '2025-10-26T08:30:00Z',
    status: 'active',
  },
  {
    id: '2',
    email: 'author@booknest.com',
    displayName: 'John Author',
    role: 'author',
    isEmailVerified: true,
    createdAt: '2024-02-20T14:00:00Z',
    lastSignInAt: '2025-10-25T16:45:00Z',
    status: 'active',
  },
  {
    id: '3',
    email: 'user1@example.com',
    displayName: 'Jane Reader',
    role: 'user',
    isEmailVerified: true,
    createdAt: '2024-03-10T09:15:00Z',
    lastSignInAt: '2025-10-26T07:20:00Z',
    status: 'active',
  },
  {
    id: '4',
    email: 'user2@example.com',
    displayName: 'Bob Smith',
    role: 'user',
    isEmailVerified: false,
    createdAt: '2024-04-05T11:30:00Z',
    lastSignInAt: '2025-10-24T13:10:00Z',
    status: 'pending',
  },
  {
    id: '5',
    email: 'suspended@example.com',
    displayName: 'Suspended User',
    role: 'user',
    isEmailVerified: true,
    createdAt: '2024-05-12T15:45:00Z',
    lastSignInAt: '2025-09-15T12:00:00Z',
    status: 'suspended',
  },
]

/**
 * Get all users with optional filters
 */
export async function getAllUsers(filters?: UserFilters): Promise<ManagementUser[]> {
  // TODO: Replace with real Firebase/API call
  // Example: const response = await fetch('/api/users', { ... })

  await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API delay

  let filteredUsers = [...mockUsers]

  if (filters) {
    // Filter by search (email or displayName)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.email.toLowerCase().includes(searchLower) ||
          user.displayName?.toLowerCase().includes(searchLower)
      )
    }

    // Filter by role
    if (filters.role && filters.role !== 'all') {
      filteredUsers = filteredUsers.filter((user) => user.role === filters.role)
    }

    // Filter by status
    if (filters.status && filters.status !== 'all') {
      filteredUsers = filteredUsers.filter((user) => user.status === filters.status)
    }

    // Filter by email verification
    if (typeof filters.emailVerified === 'boolean') {
      filteredUsers = filteredUsers.filter((user) => user.isEmailVerified === filters.emailVerified)
    }
  }

  return filteredUsers
}

/**
 * Get user by ID
 */
export async function getUserById(userId: string): Promise<ManagementUser | null> {
  // TODO: Replace with real Firebase/API call
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockUsers.find((user) => user.id === userId) || null
}

/**
 * Update user data
 */
export async function updateUser(
  userId: string,
  data: UserUpdateData
): Promise<{ success: boolean; user?: ManagementUser; error?: string }> {
  // TODO: Replace with real Firebase/API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  const userIndex = mockUsers.findIndex((user) => user.id === userId)
  if (userIndex === -1) {
    return { success: false, error: 'User not found' }
  }

  // Update the mock user
  mockUsers[userIndex] = {
    ...mockUsers[userIndex],
    ...data,
  }

  return { success: true, user: mockUsers[userIndex] }
}

/**
 * Update user role
 */
export async function updateUserRole(
  userId: string,
  role: 'admin' | 'author' | 'user'
): Promise<{ success: boolean; error?: string }> {
  return updateUser(userId, { role }).then((result) => ({
    success: result.success,
    error: result.error,
  }))
}

/**
 * Update user status
 */
export async function updateUserStatus(
  userId: string,
  status: 'active' | 'suspended' | 'pending'
): Promise<{ success: boolean; error?: string }> {
  return updateUser(userId, { status }).then((result) => ({
    success: result.success,
    error: result.error,
  }))
}

/**
 * Get user statistics
 */
export async function getUserStats(): Promise<UserStats> {
  // TODO: Replace with real Firebase/API call
  await new Promise((resolve) => setTimeout(resolve, 300))

  const users = await getAllUsers()

  return {
    totalUsers: users.length,
    adminCount: users.filter((u) => u.role === 'admin').length,
    authorCount: users.filter((u) => u.role === 'author').length,
    userCount: users.filter((u) => u.role === 'user').length,
    activeUsers: users.filter((u) => u.status === 'active').length,
    suspendedUsers: users.filter((u) => u.status === 'suspended').length,
    verifiedUsers: users.filter((u) => u.isEmailVerified).length,
  }
}

/**
 * Delete user (soft delete - set status to suspended)
 */
export async function deleteUser(userId: string): Promise<{ success: boolean; error?: string }> {
  // TODO: Replace with real Firebase/API call
  return updateUserStatus(userId, 'suspended')
}

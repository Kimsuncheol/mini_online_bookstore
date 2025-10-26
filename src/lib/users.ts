/**
 * User Management API
 * Simple service for managing users
 */

export interface AppUser {
  id: string
  email: string
  displayName: string
  role: 'admin' | 'author' | 'user'
  status: 'active' | 'inactive'
  avatar?: string
  joinedAt: string
  isVerified: boolean
}

// Mock user data
const mockUsers: AppUser[] = [
  {
    id: '1',
    email: 'admin@booknest.com',
    displayName: 'Admin User',
    role: 'admin',
    status: 'active',
    joinedAt: '2024-01-15',
    isVerified: true,
  },
  {
    id: '2',
    email: 'john.author@booknest.com',
    displayName: 'John Smith',
    role: 'author',
    status: 'active',
    joinedAt: '2024-02-20',
    isVerified: true,
  },
  {
    id: '3',
    email: 'jane.doe@example.com',
    displayName: 'Jane Doe',
    role: 'user',
    status: 'active',
    joinedAt: '2024-03-10',
    isVerified: true,
  },
  {
    id: '4',
    email: 'bob.wilson@example.com',
    displayName: 'Bob Wilson',
    role: 'user',
    status: 'active',
    joinedAt: '2024-04-05',
    isVerified: false,
  },
  {
    id: '5',
    email: 'sarah.author@booknest.com',
    displayName: 'Sarah Johnson',
    role: 'author',
    status: 'active',
    joinedAt: '2024-05-12',
    isVerified: true,
  },
  {
    id: '6',
    email: 'mike.reader@example.com',
    displayName: 'Mike Chen',
    role: 'user',
    status: 'inactive',
    joinedAt: '2024-06-18',
    isVerified: false,
  },
  {
    id: '7',
    email: 'emma.brown@example.com',
    displayName: 'Emma Brown',
    role: 'user',
    status: 'active',
    joinedAt: '2024-07-22',
    isVerified: true,
  },
  {
    id: '8',
    email: 'david.author@booknest.com',
    displayName: 'David Lee',
    role: 'author',
    status: 'active',
    joinedAt: '2024-08-30',
    isVerified: true,
  },
]

/**
 * Fetch all users
 */
export async function fetchUsers(): Promise<AppUser[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return [...mockUsers]
}

/**
 * Update user role
 */
export async function updateUserRole(
  userId: string,
  role: 'admin' | 'author' | 'user'
): Promise<AppUser | null> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  const user = mockUsers.find((u) => u.id === userId)
  if (user) {
    user.role = role
    return { ...user }
  }
  return null
}

/**
 * Update user status
 */
export async function updateUserStatus(
  userId: string,
  status: 'active' | 'inactive'
): Promise<AppUser | null> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  const user = mockUsers.find((u) => u.id === userId)
  if (user) {
    user.status = status
    return { ...user }
  }
  return null
}

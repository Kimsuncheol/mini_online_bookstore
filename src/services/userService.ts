/**
 * User Service - Data layer for user management
 * Handles all user-related API operations
 */

export interface UserData {
  id: string
  name: string
  email: string
  role: 'admin' | 'author' | 'user'
  status: 'active' | 'inactive'
  avatar?: string
  joinedDate: string
  verified: boolean
}

// Mock data - Replace with actual API calls
const mockUsers: UserData[] = [
  {
    id: '1',
    name: 'Sarah Admin',
    email: 'sarah@booknest.com',
    role: 'admin',
    status: 'active',
    joinedDate: '2024-01-15',
    verified: true,
  },
  {
    id: '2',
    name: 'John Writer',
    email: 'john.writer@booknest.com',
    role: 'author',
    status: 'active',
    joinedDate: '2024-02-20',
    verified: true,
  },
  {
    id: '3',
    name: 'Emma Thompson',
    email: 'emma.t@example.com',
    role: 'author',
    status: 'active',
    joinedDate: '2024-03-10',
    verified: true,
  },
  {
    id: '4',
    name: 'Mike Johnson',
    email: 'mike.j@example.com',
    role: 'user',
    status: 'active',
    joinedDate: '2024-04-05',
    verified: true,
  },
  {
    id: '5',
    name: 'Lisa Chen',
    email: 'lisa.chen@example.com',
    role: 'user',
    status: 'active',
    joinedDate: '2024-05-12',
    verified: false,
  },
  {
    id: '6',
    name: 'David Park',
    email: 'david.park@example.com',
    role: 'user',
    status: 'inactive',
    joinedDate: '2024-06-18',
    verified: true,
  },
  {
    id: '7',
    name: 'Anna Martinez',
    email: 'anna.m@example.com',
    role: 'author',
    status: 'active',
    joinedDate: '2024-07-22',
    verified: true,
  },
  {
    id: '8',
    name: 'Tom Wilson',
    email: 'tom.w@example.com',
    role: 'user',
    status: 'active',
    joinedDate: '2024-08-30',
    verified: false,
  },
]

/**
 * Fetch all users
 */
export async function getUsers(): Promise<UserData[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400))
  return [...mockUsers]
}

/**
 * Update user role
 */
export async function updateUserRole(
  userId: string,
  role: 'admin' | 'author' | 'user'
): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  const user = mockUsers.find((u) => u.id === userId)
  if (user) {
    user.role = role
  }
}

/**
 * Update user status
 */
export async function updateUserStatus(
  userId: string,
  status: 'active' | 'inactive'
): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  const user = mockUsers.find((u) => u.id === userId)
  if (user) {
    user.status = status
  }
}

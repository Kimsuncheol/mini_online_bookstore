# Authentication API Reference

## Firebase Auth Utilities (`src/lib/firebase-auth.ts`)

### Email Link Authentication

#### `sendEmailSignInLink(email: string): Promise<void>`
Sends a passwordless sign-in link to the user's email.

**Parameters:**
- `email` - User's email address

**Returns:** Promise that resolves when email is sent

**Example:**
```typescript
await sendEmailSignInLink('user@example.com')
```

**Behavior:**
- Sends magic link to email
- Stores email in localStorage as `emailForSignIn`
- Email link expires in 24 hours by default

---

#### `completeEmailSignIn(email: string): Promise<User>`
Completes sign-in using the link from email.

**Parameters:**
- `email` - The email address used for sign-in

**Returns:** Firebase User object

**Example:**
```typescript
const user = await completeEmailSignIn('user@example.com')
console.log(user.email) // 'user@example.com'
```

**Behavior:**
- Verifies email link from URL
- Signs in user automatically
- Clears localStorage `emailForSignIn`
- Throws error if link is invalid/expired

---

### Email & Password Authentication

#### `signUpWithEmailAndPassword(email: string, password: string, displayName?: string): Promise<User>`
Creates a new account with email and password.

**Parameters:**
- `email` - User's email
- `password` - User's password (min 6 characters)
- `displayName` - (Optional) User's display name

**Returns:** Firebase User object

**Example:**
```typescript
const user = await signUpWithEmailAndPassword(
  'user@example.com',
  'securePassword123',
  'John Doe'
)
```

**Behavior:**
- Creates Firebase account
- Updates user profile if displayName provided
- Signs in user automatically
- Throws error if email already exists

---

### Google OAuth

#### `signInWithGooglePopup(): Promise<User>`
Opens Google sign-in popup for authentication.

**Returns:** Firebase User object

**Example:**
```typescript
const user = await signInWithGooglePopup()
console.log(user.displayName) // Google profile name
```

**Behavior:**
- Opens Google OAuth popup
- Automatically creates/signs in user
- Returns user with Google profile data
- Throws error if popup blocked or user cancels

---

### Session Management

#### `logOut(): Promise<void>`
Signs out the current user.

**Example:**
```typescript
await logOut()
// User is now signed out
```

**Behavior:**
- Signs out from Firebase
- Clears localStorage auth data
- Clears `emailForSignIn`

---

#### `onAuthStateChangeListener(callback: (user: User | null) => void): () => void`
Sets up real-time listener for auth state changes.

**Parameters:**
- `callback` - Function called when auth state changes

**Returns:** Unsubscribe function

**Example:**
```typescript
const unsubscribe = onAuthStateChangeListener((user) => {
  if (user) {
    console.log('User signed in:', user.email)
  } else {
    console.log('User signed out')
  }
})

// Clean up listener
unsubscribe()
```

---

#### `getAuth(): Auth`
Returns the Firebase Auth instance.

**Returns:** Firebase Auth object

**Example:**
```typescript
const auth = getAuth()
```

---

## AuthContext (`src/contexts/AuthContext.tsx`)

### useAuth Hook

**Usage:**
```typescript
const {
  user,
  loading,
  error,
  signInWithEmail,
  completeSignInWithEmail,
  signUpWithEmail,
  signInWithGoogle,
  logout,
  clearError
} = useAuth()
```

---

### Context Properties

#### `user: User | null`
The currently authenticated user object or null if signed out.

**User Object Properties:**
```typescript
{
  uid: string                // Firebase user ID
  email: string | null       // User email
  displayName: string | null // User display name
  emailVerified: boolean     // Email verification status
  photoURL: string | null    // Profile photo URL
  metadata: { ... }          // Creation and last sign in time
}
```

---

#### `loading: boolean`
Indicates if an async auth operation is in progress.

**Use cases:**
- Disable buttons during sign in/up
- Show loading spinner
- Prevent multiple submissions

---

#### `error: string | null`
Contains error message from last failed operation.

**Error Examples:**
- "auth/email-already-in-use"
- "auth/weak-password"
- "auth/user-not-found"
- "auth/wrong-password"
- Custom Firebase error messages

---

### Context Methods

#### `signInWithEmail(email: string): Promise<void>`
Sends email sign-in link.

**Parameters:**
- `email` - User's email address

**Behavior:**
- Sets loading to true during operation
- Clears previous errors
- Updates error state if fails
- Sets loading to false when complete

---

#### `completeSignInWithEmail(email: string): Promise<User>`
Completes email sign-in process.

**Parameters:**
- `email` - Email used for sign-in

**Returns:** User object

---

#### `signUpWithEmail(email: string, password: string, displayName?: string): Promise<User>`
Creates account with email and password.

**Parameters:**
- `email` - User's email
- `password` - Password (minimum 6 characters)
- `displayName` - (Optional) Display name

**Returns:** User object

**Validation:**
- Password must be at least 6 characters
- Email must be valid format
- Email must not already exist

---

#### `signInWithGoogle(): Promise<User>`
Initiates Google OAuth sign-in.

**Returns:** User object

**Behavior:**
- Opens Google popup
- Automatically sets user state
- Handles errors automatically

---

#### `logout(): Promise<void>`
Signs out current user.

**Behavior:**
- Signs out from Firebase
- Clears user state
- Clears error state
- Clears localStorage

---

#### `clearError(): void`
Clears the error message.

**Use case:**
- Reset error display when user closes modal
- Clear error when user retries

---

## Firebase User Object

### Standard Properties
```typescript
interface User {
  uid: string                    // Unique user ID
  email: string | null           // User email
  displayName: string | null     // Display name
  photoURL: string | null        // Profile photo URL
  emailVerified: boolean         // Email verification status
  isAnonymous: boolean           // Anonymous user flag
  metadata: UserMetadata         // Creation/sign in timestamps
  providerData: UserInfo[]       // Sign-in provider info
  phoneNumber: string | null     // Phone number (if set)
  customClaims: object           // Custom claims (admin only)
}
```

### Useful Methods
```typescript
// Check if user is authenticated
if (user) { /* authenticated */ }

// Get user's email
console.log(user.email)

// Get user's display name
console.log(user.displayName || 'User')

// Get profile photo
console.log(user.photoURL)

// Check if email verified
console.log(user.emailVerified)
```

---

## Error Handling

### Common Firebase Errors

```typescript
try {
  await signUpWithEmail(email, password)
} catch (error) {
  if (error.code === 'auth/email-already-in-use') {
    console.log('Email already registered')
  } else if (error.code === 'auth/weak-password') {
    console.log('Password too weak')
  } else if (error.code === 'auth/invalid-email') {
    console.log('Invalid email format')
  }
}
```

### Error Messages
These are automatically caught and passed to the `error` context property:
- "auth/user-not-found"
- "auth/wrong-password"
- "auth/email-already-in-use"
- "auth/invalid-email"
- "auth/weak-password"
- "auth/too-many-requests"
- "auth/popup-blocked"
- "auth/cancelled-popup-request"

---

## TypeScript Support

All functions are fully typed:

```typescript
import { User } from 'firebase/auth'
import { useAuth } from '@/contexts/AuthContext'

function MyComponent(): JSX.Element {
  const { user, signInWithGoogle }: ReturnType<typeof useAuth> = useAuth()

  const handleGoogleSignIn = async (): Promise<void> => {
    try {
      const signedInUser: User = await signInWithGoogle()
      console.log(signedInUser.email)
    } catch (error: unknown) {
      console.error(error)
    }
  }

  return <button onClick={handleGoogleSignIn}>Sign In</button>
}
```

---

## Best Practices

1. **Always wrap components with AuthProvider**
   ```tsx
   <AuthProvider>
     <YourApp />
   </AuthProvider>
   ```

2. **Use useAuth in client components**
   ```tsx
   'use client'
   import { useAuth } from '@/contexts/AuthContext'
   ```

3. **Handle loading states**
   ```tsx
   if (loading) return <Spinner />
   ```

4. **Display errors to users**
   ```tsx
   {error && <Alert severity="error">{error}</Alert>}
   ```

5. **Clear errors when closing modals**
   ```tsx
   const handleClose = () => {
     clearError()
     onClose()
   }
   ```

6. **Validate form before submission**
   ```tsx
   if (!email || password.length < 6) {
     return
   }
   ```

7. **Use try-catch for custom error handling**
   ```tsx
   try {
     await signUpWithEmail(email, password)
   } catch (err) {
     // Handle specific errors
   }
   ```

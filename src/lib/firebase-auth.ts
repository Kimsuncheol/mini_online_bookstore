import {
  createUserWithEmailAndPassword,
  signInWithEmailLink,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  Auth,
  User,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth } from '@/firebase/config'

/**
 * Send a sign-in link to the user's email (passwordless auth)
 */
export async function sendEmailSignInLink(email: string): Promise<void> {
  const actionCodeSettings = {
    url: `${typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_APP_URL}/auth/callback?email=${encodeURIComponent(email)}`,
    handleCodeInApp: true,
  }

  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings)
    // Save email to localStorage for verification
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('emailForSignIn', email)
    }
  } catch (error) {
    throw error
  }
}

/**
 * Complete the email sign-in process
 */
export async function completeEmailSignIn(email: string): Promise<User> {
  try {
    if (!isSignInWithEmailLink(auth, window.location.href)) {
      throw new Error('Invalid sign-in link')
    }

    const result = await signInWithEmailLink(auth, email, window.location.href)

    // Clear the saved email
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('emailForSignIn')
    }

    return result.user
  } catch (error) {
    throw error
  }
}

/**
 * Sign up with email and password
 */
export async function signUpWithEmailAndPassword(
  email: string,
  password: string,
  displayName?: string
): Promise<User> {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password)

    // Update profile with display name if provided
    if (displayName && result.user) {
      await updateProfile(result.user, {
        displayName,
      })
    }

    return result.user
  } catch (error) {
    throw error
  }
}

/**
 * Sign in with Google
 */
export async function signInWithGooglePopup(): Promise<User> {
  try {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    return result.user
  } catch (error) {
    throw error
  }
}

/**
 * Sign out the current user
 */
export async function logOut(): Promise<void> {
  try {
    await signOut(auth)
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('emailForSignIn')
    }
  } catch (error) {
    throw error
  }
}

/**
 * Listen to auth state changes
 */
export function onAuthStateChangeListener(
  callback: (user: User | null) => void
): () => void {
  return onAuthStateChanged(auth, callback)
}

/**
 * Get current auth instance
 */
export function getAuth(): Auth {
  return auth
}

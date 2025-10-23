# Authentication Quick Start Guide

## Files Created/Modified

### New Files
- `src/lib/firebase-auth.ts` - Firebase authentication functions
- `src/contexts/AuthContext.tsx` - Auth context provider and hook
- `src/app/components/Auth/SignIn.tsx` - Sign In modal component
- `src/app/components/Auth/SignUp.tsx` - Sign Up modal component

### Modified Files
- `src/app/components/common/Header.tsx` - Added modal management and user menu
- `src/app/components/home/ClientLayout.tsx` - Wrapped with AuthProvider
- `src/firebase/config.ts` - Exported auth instance

---

## How It Works

### 1. **Sign In with Email Link (Passwordless)**
```
User Email → Firebase sends magic link → User clicks link → Signed in
```

### 2. **Sign Up with Email/Password**
```
Email + Password → Firebase creates account → User signed in
```

### 3. **Sign In/Up with Google**
```
Click Google button → Google OAuth popup → User signed in
```

---

## Using Auth in Components

```tsx
import { useAuth } from '@/contexts/AuthContext'

export function MyComponent() {
  const { user, loading, error, signInWithGoogle, logout } = useAuth()

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  if (!user) {
    return <button onClick={signInWithGoogle}>Sign In</button>
  }

  return (
    <>
      <p>Hello, {user.email}</p>
      <button onClick={logout}>Logout</button>
    </>
  )
}
```

---

## Key Components

### AuthContext Methods
```typescript
const {
  user,                          // Current user object
  loading,                       // Loading state
  error,                         // Error message
  signInWithEmail,               // Send email link
  completeSignInWithEmail,       // Complete email auth
  signUpWithEmail,               // Create account
  signInWithGoogle,              // Google sign in
  logout,                        // Sign out
  clearError                     // Clear errors
} = useAuth()
```

---

## Setup Checklist

- [ ] Firebase project created and configured
- [ ] Firebase credentials in `.env.local`
- [ ] Email authentication enabled in Firebase Console
- [ ] Google OAuth configured in Firebase Console
- [ ] Email link domain configured (if using custom domain)
- [ ] Test sign in with email
- [ ] Test sign up with password
- [ ] Test Google OAuth
- [ ] Verify user avatar shows after login
- [ ] Test logout functionality

---

## Troubleshooting

**Issue:** Modal not opening
- Check that Header is wrapped with AuthProvider
- Verify state management in Header component

**Issue:** Email link not received
- Check Firebase email provider is enabled
- Verify email address is correct
- Check spam folder

**Issue:** Google sign in fails
- Verify Google OAuth credentials in Firebase Console
- Check authorized redirect URIs
- Clear browser cache and try again

**Issue:** User not persisting
- Check browser allows localStorage
- Verify Firebase is initialized correctly
- Check network tab for errors

---

## File Structure
```
src/
├── lib/
│   └── firebase-auth.ts              (Auth functions)
├── contexts/
│   └── AuthContext.tsx               (Auth state management)
├── firebase/
│   └── config.ts                     (Firebase setup)
└── app/
    ├── components/
    │   ├── Auth/
    │   │   ├── SignIn.tsx            (Sign in modal)
    │   │   └── SignUp.tsx            (Sign up modal)
    │   ├── common/
    │   │   └── Header.tsx            (Updated with auth)
    │   └── home/
    │       └── ClientLayout.tsx      (Updated with AuthProvider)
    └── layout.tsx
```

---

## Next Steps

After verification:
1. Add protected routes/pages
2. Add user profile page
3. Add email verification page
4. Add password reset functionality
5. Add social media providers (if needed)
6. Deploy to production

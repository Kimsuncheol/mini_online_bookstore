import { Container } from '@mui/material'
import { Metadata } from 'next'
import AuthorPageWrapper from '@/app/components/author/AuthorPageWrapper'
import { getUserById } from '@/app/api/user'
import { getAuthorPublicProfile } from '@/services/author'
import type { AuthorMetadata } from '@/interfaces/author'

interface AuthorPageParams {
  id: string
}

interface AuthorPageProps {
  params: Promise<AuthorPageParams>
}

/**
 * Generate metadata for the author page
 * Used for SEO and social sharing
 */
export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { id } = await params
  try {
    // Try to get author public profile first
    const authorProfile = await getAuthorPublicProfile(id)
    if (!authorProfile) {
      // Fallback to getUserById if public profile not available
      const author = await getUserById(id)
      const authorMetadata: AuthorMetadata = {
        title: `${author?.display_name || 'Author'} | BookNest`,
        description: `View books by ${author?.display_name || 'Author'}`,
        keywords: [author?.display_name || 'Author', 'books', 'author profile'].filter(Boolean),
      }

      return {
        title: authorMetadata.title,
        description: authorMetadata.description,
        keywords: authorMetadata.keywords,
      }
    }

    const displayName = (authorProfile.display_name as string) || 'Author'
    const bio = (authorProfile.bio as string) || ''

    const authorMetadata: AuthorMetadata = {
      title: `${displayName} | BookNest`,
      description: bio || `View books by ${displayName}`,
      keywords: [displayName, 'books', 'author profile'].filter(Boolean),
    }

    return {
      title: authorMetadata.title,
      description: authorMetadata.description,
      keywords: authorMetadata.keywords,
    }
  } catch {
    return {
      title: 'Author | BookNest',
      description: 'View author profile and books',
    }
  }
}

/**
 * Author Page Component
 * Displays the author's profile and published books
 */
export default async function AuthorPage({ params }: AuthorPageProps) {
  const { id } = await params
  const decodedId = decodeURIComponent(id)

  // Initialize default author data
  let authorName = 'Unknown Author'
  let authorEmail = ''

  try {
    // Try to fetch author's public profile first
    // This provides enriched author data suitable for public display
    const authorProfile = await getAuthorPublicProfile(decodedId)

    if (authorProfile) {
      // Use author profile data if available
      authorName = (authorProfile.display_name as string) || 'Unknown Author'
      authorEmail = (authorProfile.email as string) || ''
    } else {
      // Fallback to getUserById if public profile not available
      // Note: getUserById is kept as per requirements
      const author = await getUserById(decodedId)

      if (author) {
        // Set author name from display_name or email
        authorName = author.display_name || author.email || 'Unknown Author'
        // Set author email from the user object
        authorEmail = author.email || ''
      }
    }
  } catch (error) {
    console.error('Error fetching author:', error)
    // Continue with default values if fetch fails
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <AuthorPageWrapper
        authorId={decodedId}
        authorName={authorName}
        authorEmail={authorEmail}
      />
    </Container>
  )
}

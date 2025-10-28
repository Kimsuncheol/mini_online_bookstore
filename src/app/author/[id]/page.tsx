import { Container, Typography } from '@mui/material'
import AuthorPageWrapper from '@/app/components/author/AuthorPageWrapper'
import { getUserByEmail, getUserById } from '@/app/api/user'

interface AuthorPageParams {
  id: string
}

interface AuthorPageProps {
  params: Promise<AuthorPageParams>
}

export async function generateMetadata({ params }: AuthorPageProps) {
  const { id } = await params
  try {
    const author = await getUserById(id)
    return {
      title: `${author?.display_name || 'Author'} | BookNest`,
      description: `View books by ${author?.display_name || 'Author'}`,
    }
  } catch {
    return {
      title: 'Author | BookNest',
      description: 'View author profile and books',
    }
  }
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { id } = await params

  let authorName = 'Unknown Author'
  let authorEmail = ''

  try {
    // const author = await getUserByEmail(decodeURIComponent(authorEmail));
    const author = await getUserById(id)
    if (author) {
      authorName = author.display_name || author.email || 'Unknown Author'
      authorEmail = author.email || ''
    }
  } catch (error) {
    console.error('Error fetching author:', error)
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <AuthorPageWrapper authorId={decodeURIComponent(id)} authorName={authorName} authorEmail={authorEmail} />
    </Container>
  )
}

import NotFound from '@/app/components/common/NotFound'

export const metadata = {
  title: '404 - Page Not Found | BookNest',
  description: 'The page you are looking for could not be found. Browse our collection of books instead.',
}

export default function NotFoundPage() {
  return <NotFound />
}

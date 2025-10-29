import { Metadata } from 'next'
import MyFavorites from '@/app/components/favorites/MyFavorites'

export const metadata: Metadata = {
  title: 'My Favorites | BookNest',
  description: 'View and manage your favorite books',
}

export default function MyFavoritesPage() {
  return <MyFavorites />
}

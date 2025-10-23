import type { Metadata } from 'next'
import BookCategoryPage from '@/app/components/book/BookCategoryPage'
import {
  BookCategoryKey,
  getCategoryConfig,
} from '@/data/bookCategories'

export const buildCategoryMetadata = (slug: BookCategoryKey): Metadata => {
  const config = getCategoryConfig(slug)

  return {
    title: `${config.title} | BookNest`,
    description: config.description,
  }
}

export const buildCategoryPage = (slug: BookCategoryKey) => {
  const CategoryPage = () => {
    const config = getCategoryConfig(slug)

    return (
      <BookCategoryPage
        category={config.slug}
        title={config.title}
        description={config.description}
        books={config.books}
      />
    )
  }

  return CategoryPage
}

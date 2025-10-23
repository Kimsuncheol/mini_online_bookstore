import React from 'react'
import StarIcon from '@mui/icons-material/Star'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import ScienceIcon from '@mui/icons-material/Science'
import CorporateFareIcon from '@mui/icons-material/CorporateFare'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement'
import { Book } from '@/interfaces/book'

export type BookCategoryKey =
  | 'recommended'
  | 'trending'
  | 'featured-collection'
  | 'stem'
  | 'economics'
  | 'novel'
  | 'self-improvement'

export interface BookCategoryNavItem {
  id: BookCategoryKey
  label: string
  href: string
  icon: React.ReactElement
}

export interface BookCategoryConfig {
  slug: BookCategoryKey
  title: string
  description: string
  books: Book[]
}

const createBook = (id: string, overrides: Partial<Book>): Book => ({
  id,
  title: overrides.title ?? 'Untitled Book',
  author: overrides.author ?? 'Unknown Author',
  genre: overrides.genre ?? 'General',
  description:
    overrides.description ??
    'Explore captivating stories and insightful knowledge curated for book lovers.',
  price: overrides.price ?? 18.99,
  originalPrice:
    overrides.originalPrice ??
    (overrides.price ? parseFloat((overrides.price + 4).toFixed(2)) : 22.99),
  currency: overrides.currency ?? 'USD',
  inStock: overrides.inStock ?? true,
  stockQuantity: overrides.stockQuantity ?? 64,
  coverImage: overrides.coverImage,
  coverImageUrl:
    overrides.coverImageUrl ??
    'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=480&h=720&fit=crop',
  rating: overrides.rating,
  reviewCount: overrides.reviewCount,
  publisher: overrides.publisher ?? 'BookNest Publishing',
  language: overrides.language ?? 'English',
  publishedDate: overrides.publishedDate ?? new Date('2023-01-01'),
  pageCount: overrides.pageCount ?? 320,
  isbn:
    overrides.isbn ??
    `978-1-${Math.floor(Math.random() * 89999 + 10000)}-${Math.floor(
      Math.random() * 9 + 1
    )}`,
  createdAt: overrides.createdAt,
  updatedAt: overrides.updatedAt,
  isNew: overrides.isNew ?? false,
  isFeatured: overrides.isFeatured ?? false,
  discount: overrides.discount,
})

const CATEGORY_CONTENT: Record<BookCategoryKey, BookCategoryConfig> = {
  recommended: {
    slug: 'recommended',
    title: 'Recommended Highlights',
    description:
      'Handpicked selections from our editors blending standout storytelling with reader favorites.',
    books: [
      createBook('recommended-astro-odyssey', {
        title: 'Astro Odyssey',
        author: 'Lena Park',
        genre: 'Science Fiction',
        description:
          'Embark on an interstellar journey where a crew of explorers confronts the mysteries of a distant nebula.',
        price: 19.99,
        originalPrice: 27.99,
        coverImageUrl:
          'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=480&h=720&fit=crop',
        rating: 4.8,
        reviewCount: 1890,
        publisher: 'Cosmic Tales',
        pageCount: 432,
        publishedDate: new Date('2024-02-10'),
        isbn: '978-1-59327-702-0',
        isFeatured: true,
        isNew: true,
        discount: 29,
      }),
      createBook('recommended-coastal-echoes', {
        title: 'Coastal Echoes',
        author: 'Amelia Drake',
        genre: 'Literary Fiction',
        description:
          'A lyrical exploration of family ties and the memories that wash ashore in a seaside town.',
        price: 16.5,
        originalPrice: 21.99,
        coverImageUrl:
          'https://images.unsplash.com/photo-1509027572583-6c8b57778d21?w=480&h=720&fit=crop',
        rating: 4.6,
        reviewCount: 942,
        publisher: 'Harbor House',
        pageCount: 288,
        publishedDate: new Date('2023-09-05'),
        isbn: '978-1-4028-9462-1',
        isFeatured: true,
      }),
      createBook('recommended-quantum-garden', {
        title: 'The Quantum Gardeners',
        author: 'Dr. Arjun Patel',
        genre: 'Popular Science',
        description:
          'Discover how quantum mechanics is revolutionizing biology in this accessible science narrative.',
        price: 22.0,
        originalPrice: 27.0,
        coverImageUrl:
          'https://images.unsplash.com/photo-1521587767270-05b1033ac3f6?w=480&h=720&fit=crop',
        rating: 4.7,
        reviewCount: 654,
        publisher: 'Nova Frontier',
        pageCount: 368,
        publishedDate: new Date('2024-01-17'),
        isbn: '978-1-250-30777-9',
        discount: 18,
      }),
      createBook('recommended-midnight-cyclist', {
        title: 'Midnight Cyclist',
        author: 'Rafael Moreno',
        genre: 'Thriller',
        description:
          'When a courier uncovers a conspiracy twisting through the city night, survival becomes a race against time.',
        price: 15.99,
        originalPrice: 20.99,
        coverImageUrl:
          'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=480&h=720&fit=crop',
        rating: 4.5,
        reviewCount: 1112,
        publisher: 'Velocity Press',
        pageCount: 344,
        publishedDate: new Date('2023-11-02'),
        isbn: '978-1-56619-909-4',
        discount: 24,
      }),
      createBook('recommended-glass-libraries', {
        title: 'Glass Libraries',
        author: 'Sasha Bennett',
        genre: 'Fantasy',
        description:
          'A young archivist enters a realm where stories are alive and every chapter rewrites fate.',
        price: 18.49,
        originalPrice: 24.5,
        coverImageUrl:
          'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=480&h=720&fit=crop',
        rating: 4.9,
        reviewCount: 2055,
        publisher: 'Mythos Lane',
        pageCount: 512,
        publishedDate: new Date('2024-03-12'),
        isbn: '978-1-60309-469-1',
        isNew: true,
        discount: 25,
      }),
      createBook('recommended-sound-of-ember', {
        title: 'Sound of Ember',
        author: 'Noah Wilde',
        genre: 'Music Memoir',
        description:
          'A legendary producer reveals the untold stories behind genre-defining tracks and studio secrets.',
        price: 21.49,
        originalPrice: 26.99,
        coverImageUrl:
          'https://images.unsplash.com/photo-1507842217343-583f7270bfda?w=480&h=720&fit=crop',
        rating: 4.4,
        reviewCount: 488,
        publisher: 'Tempo Notes',
        pageCount: 384,
        publishedDate: new Date('2023-08-22'),
        isbn: '978-1-336-09163-0',
      }),
    ],
  },
  trending: {
    slug: 'trending',
    title: 'Trending Now',
    description:
      'What readers across BookNest are buzzing about this week—discover breakout hits and can’t-miss titles.',
    books: [
      createBook('trending-skyward-bound', {
        title: 'Skyward Bound',
        author: 'Ivy Chen',
        genre: 'Adventure',
        description:
          'A daring expedition scales the highest peaks to uncover a hidden civilization cloaked in mist.',
        price: 17.99,
        originalPrice: 23.99,
        coverImageUrl:
          'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=480&h=720&fit=crop',
        rating: 4.5,
        reviewCount: 1580,
        publisher: 'Summit Road',
        pageCount: 368,
        publishedDate: new Date('2024-01-05'),
        isbn: '978-1-250-00001-1',
        isFeatured: true,
        discount: 25,
      }),
      createBook('trending-digital-alchemist', {
        title: 'The Digital Alchemist',
        author: 'Priya Malhotra',
        genre: 'Tech & Innovation',
        description:
          'Explore how creative technologists are blending AI with art to craft immersive experiences.',
        price: 24.0,
        originalPrice: 29.0,
        coverImageUrl:
          'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=480&h=720&fit=crop',
        rating: 4.6,
        reviewCount: 1032,
        publisher: 'Circuit Press',
        pageCount: 312,
        publishedDate: new Date('2023-10-28'),
        isbn: '978-1-59327-001-0',
        discount: 17,
      }),
      createBook('trending-saffron-winds', {
        title: 'Saffron Winds',
        author: 'Farah Alami',
        genre: 'Historical Fiction',
        description:
          'A spice merchant’s daughter navigates alliances and intrigue across the Silk Road.',
        price: 18.99,
        originalPrice: 24.99,
        coverImageUrl:
          'https://images.unsplash.com/photo-1476958526483-36efcaa80b1e?w=480&h=720&fit=crop',
        rating: 4.7,
        reviewCount: 768,
        publisher: 'Amber Lantern',
        pageCount: 416,
        publishedDate: new Date('2023-12-15'),
        isbn: '978-1-4028-9463-8',
      }),
      createBook('trending-urban-mycelium', {
        title: 'Urban Mycelium',
        author: 'Gabriel Ortiz',
        genre: 'Non-fiction',
        description:
          'Discover how fungal networks inspire sustainable city planning and architecture.',
        price: 20.49,
        originalPrice: 26.5,
        coverImageUrl:
          'https://images.unsplash.com/photo-1526045478516-99145907023c?w=480&h=720&fit=crop',
        rating: 4.3,
        reviewCount: 528,
        publisher: 'Greenline Press',
        pageCount: 298,
        publishedDate: new Date('2024-02-20'),
        isbn: '978-1-336-09164-7',
        discount: 22,
      }),
      createBook('trending-pixel-hearts', {
        title: 'Pixel Hearts',
        author: 'Marco Ruiz',
        genre: 'Romance',
        description:
          'Two indie game devs fake-date for publicity and discover a genuine connection.',
        price: 14.5,
        originalPrice: 18.99,
        coverImageUrl:
          'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?w=480&h=720&fit=crop',
        rating: 4.4,
        reviewCount: 1940,
        publisher: 'NextGen Love',
        pageCount: 336,
        publishedDate: new Date('2023-07-18'),
        isbn: '978-1-59327-888-7',
        discount: 24,
      }),
      createBook('trending-celestial-ink', {
        title: 'Celestial Ink',
        author: 'Mira Das',
        genre: 'Poetry',
        description:
          'A contemporary poetry collection mapping constellations of memory, migration, and belonging.',
        price: 12.99,
        originalPrice: 16.99,
        coverImageUrl:
          'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=480&h=720&fit=crop',
        rating: 4.8,
        reviewCount: 412,
        publisher: 'Northstar Verse',
        pageCount: 184,
        publishedDate: new Date('2023-11-24'),
        isbn: '978-1-60309-470-7',
      }),
    ],
  },
  'featured-collection': {
    slug: 'featured-collection',
    title: 'Featured Collection',
    description:
      'Limited-time showcases, exclusive launches, and spotlight campaigns curated by BookNest editors.',
    books: [
      createBook('featured-exit-eight', {
        title: 'Exit Eight',
        author: 'Seojin Park',
        genre: 'Mystery',
        description:
          'A journalist uncovers a decades-old disappearance tied to a secret passage beneath the subway.',
        price: 13.99,
        originalPrice: 19.99,
        coverImageUrl:
          'https://images.unsplash.com/photo-1526312426976-f4d754fa9bd6?w=480&h=720&fit=crop',
        rating: 4.6,
        reviewCount: 1290,
        publisher: 'Signal Noir',
        pageCount: 352,
        publishedDate: new Date('2024-01-09'),
        isbn: '978-1-4028-9464-5',
        isFeatured: true,
        discount: 30,
      }),
      createBook('featured-aurora-syndicate', {
        title: 'Aurora Syndicate',
        author: 'Kendra Holt',
        genre: 'Cyberpunk',
        description:
          'Corporate espionage collides with a neon-drenched future in this high-stakes thriller.',
        price: 21.99,
        originalPrice: 27.99,
        coverImageUrl:
          'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=480&h=720&fit=crop',
        rating: 4.7,
        reviewCount: 847,
        publisher: 'Neon Relay',
        pageCount: 408,
        publishedDate: new Date('2023-12-01'),
        isbn: '978-1-56619-910-0',
        discount: 22,
      }),
      createBook('featured-mindful-bites', {
        title: 'Mindful Bites',
        author: 'Chef Hana Lim',
        genre: 'Cookbook',
        description:
          'Plant-forward recipes and rituals aligned with wellness for mindful kitchens.',
        price: 26.99,
        originalPrice: 34.99,
        coverImageUrl:
          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=480&h=720&fit=crop',
        rating: 4.5,
        reviewCount: 693,
        publisher: 'Kitchen Alchemy',
        pageCount: 320,
        publishedDate: new Date('2024-02-01'),
        isbn: '978-1-59327-777-4',
        discount: 23,
      }),
      createBook('featured-orbiting-hearts', {
        title: 'Orbiting Hearts',
        author: 'Leah Winters',
        genre: 'Romantic Fantasy',
        description:
          'A starship diplomat and a rebel navigator must broker peace while confronting an impossible love.',
        price: 17.49,
        originalPrice: 22.5,
        coverImageUrl:
          'https://images.unsplash.com/photo-1533639321664-1b0e53b7c3cc?w=480&h=720&fit=crop',
        rating: 4.6,
        reviewCount: 512,
        publisher: 'Stardust Imprint',
        pageCount: 376,
        publishedDate: new Date('2024-03-05'),
        isbn: '978-1-60309-471-4',
        isNew: true,
      }),
      createBook('featured-emerald-archives', {
        title: 'Emerald Archives',
        author: 'Jonah Pierce',
        genre: 'Fantasy Anthology',
        description:
          'An anthology exploring ancient relics, legendary beasts, and hidden realms beyond imagination.',
        price: 24.5,
        originalPrice: 31.99,
        coverImageUrl:
          'https://images.unsplash.com/photo-1507842217343-583f7270bfda?w=480&h=720&fit=crop',
        rating: 4.8,
        reviewCount: 389,
        publisher: 'Verdant Tales',
        pageCount: 520,
        publishedDate: new Date('2023-08-11'),
        isbn: '978-1-336-09165-4',
        discount: 23,
      }),
      createBook('featured-dawn-of-drone', {
        title: 'Dawn of the Drone',
        author: 'Ibrahim Khan',
        genre: 'Non-fiction',
        description:
          'Investigating how autonomous flight is reshaping rescue missions, agriculture, and urban design.',
        price: 18.75,
        originalPrice: 24.99,
        coverImageUrl:
          'https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?w=480&h=720&fit=crop',
        rating: 4.2,
        reviewCount: 288,
        publisher: 'Future Lens',
        pageCount: 276,
        publishedDate: new Date('2023-09-21'),
        isbn: '978-1-59327-912-9',
        discount: 25,
      }),
    ],
  },
  stem: {
    slug: 'stem',
    title: 'STEM Essentials',
    description:
      'Dive into standout science, technology, engineering, and mathematics titles chosen for curious minds.',
    books: [
      createBook('stem-ai-frontiers', {
        title: 'AI Frontiers',
        author: 'Dr. Alicia Monroe',
        genre: 'Technology',
        description:
          'A roadmap through the latest breakthroughs in artificial intelligence and their societal impact.',
        price: 28.0,
        originalPrice: 34.0,
        coverImageUrl:
          'https://images.unsplash.com/photo-1518770660439-4636190af475?w=480&h=720&fit=crop',
        rating: 4.7,
        reviewCount: 1120,
        publisher: 'FutureSight Labs',
        pageCount: 352,
        publishedDate: new Date('2024-02-18'),
        isbn: '978-1-59327-913-6',
        discount: 18,
      }),
      createBook('stem-cracking-code', {
        title: 'Cracking the Code of Life',
        author: 'Dr. Mei Sato',
        genre: 'Biology',
        description:
          'From CRISPR to quantum biology, uncover the science redefining life as we know it.',
        price: 23.99,
        originalPrice: 29.99,
        coverImageUrl:
          'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=480&h=720&fit=crop',
        rating: 4.8,
        reviewCount: 884,
        publisher: 'BioNova Press',
        pageCount: 408,
        publishedDate: new Date('2023-11-30'),
        isbn: '978-1-336-09166-1',
        discount: 20,
      }),
      createBook('stem-engineering-renaissance', {
        title: 'Engineering Renaissance',
        author: 'Lars Becker',
        genre: 'Engineering',
        description:
          'Profiles of engineers reimagining infrastructure, energy grids, and resilient cities.',
        price: 26.5,
        originalPrice: 32.99,
        coverImageUrl:
          'https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=480&h=720&fit=crop',
        rating: 4.5,
        reviewCount: 512,
        publisher: 'Blueprint Stories',
        pageCount: 360,
        publishedDate: new Date('2023-09-12'),
        isbn: '978-1-60309-472-1',
      }),
      createBook('stem-cosmic-chemistry', {
        title: 'Cosmic Chemistry',
        author: 'Dr. Layla Saeed',
        genre: 'Chemistry',
        description:
          'A journey through the molecules forged in stars and how they seeded life on Earth.',
        price: 22.5,
        originalPrice: 28.99,
        coverImageUrl:
          'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=480&h=720&fit=crop',
        rating: 4.6,
        reviewCount: 436,
        publisher: 'Elemental Press',
        pageCount: 328,
        publishedDate: new Date('2024-01-22'),
        isbn: '978-1-4028-9465-2',
        discount: 22,
      }),
      createBook('stem-geometry-of-sound', {
        title: 'Geometry of Sound',
        author: 'Carlos Mendes',
        genre: 'Physics',
        description:
          'Explore the math behind music, from resonance to harmonics, through visual and audio experiments.',
        price: 24.75,
        originalPrice: 31.5,
        coverImageUrl:
          'https://images.unsplash.com/photo-1515666996424-91b2da8ce159?w=480&h=720&fit=crop',
        rating: 4.4,
        reviewCount: 374,
        publisher: 'Waveform House',
        pageCount: 296,
        publishedDate: new Date('2023-10-18'),
        isbn: '978-1-59327-914-3',
      }),
      createBook('stem-logic-labyrinths', {
        title: 'Logic Labyrinths',
        author: 'Prof. Elena Ricci',
        genre: 'Mathematics',
        description:
          'A playful tour through paradoxes, puzzles, and proofs designed to sharpen analytical thinking.',
        price: 19.99,
        originalPrice: 24.99,
        coverImageUrl:
          'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=480&h=720&fit=crop',
        rating: 4.7,
        reviewCount: 623,
        publisher: 'NumberLine Press',
        pageCount: 342,
        publishedDate: new Date('2023-08-07'),
        isbn: '978-1-60309-473-8',
      }),
    ],
  },
  economics: {
    slug: 'economics',
    title: 'Economics & Business',
    description:
      'Strategic thinking, market insights, and economic trends to stay ahead in business and finance.',
    books: [
      createBook('economics-market-signals', {
        title: 'Market Signals',
        author: 'Dr. Henry Lowell',
        genre: 'Finance',
        description:
          'Decode hidden patterns driving global markets with data-backed strategies.',
        price: 27.99,
        originalPrice: 34.99,
        coverImageUrl:
          'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=480&h=720&fit=crop',
        rating: 4.6,
        reviewCount: 972,
        publisher: 'Capital Lens',
        pageCount: 368,
        publishedDate: new Date('2023-12-02'),
        isbn: '978-1-59327-915-0',
        discount: 20,
      }),
      createBook('economics-zero-to-ethos', {
        title: 'Zero to Ethos',
        author: 'Mara Liu',
        genre: 'Entrepreneurship',
        description:
          'How mission-driven startups build resilient brands while staying true to their values.',
        price: 23.5,
        originalPrice: 29.5,
        coverImageUrl:
          'https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?w=480&h=720&fit=crop',
        rating: 4.5,
        reviewCount: 648,
        publisher: 'Founders Studio',
        pageCount: 304,
        publishedDate: new Date('2024-01-14'),
        isbn: '978-1-60309-474-5',
        discount: 20,
      }),
      createBook('economics-people-centered-ledgers', {
        title: 'People-Centered Ledgers',
        author: 'Rajesh Kumar',
        genre: 'Economics',
        description:
          'A human-first approach to digital finance, blockchain communities, and inclusive policy.',
        price: 25.99,
        originalPrice: 31.99,
        coverImageUrl:
          'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=480&h=720&fit=crop',
        rating: 4.3,
        reviewCount: 512,
        publisher: 'Equity Press',
        pageCount: 332,
        publishedDate: new Date('2023-09-29'),
        isbn: '978-1-4028-9466-9',
      }),
      createBook('economics-designing-teams', {
        title: 'Designing Teams',
        author: 'Nia Howard',
        genre: 'Management',
        description:
          'Research-backed frameworks for cultivating adaptive teams in hybrid workplaces.',
        price: 21.99,
        originalPrice: 27.99,
        coverImageUrl:
          'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=480&h=720&fit=crop',
        rating: 4.7,
        reviewCount: 788,
        publisher: 'Collaborate Lab',
        pageCount: 280,
        publishedDate: new Date('2023-07-20'),
        isbn: '978-1-56619-911-7',
        discount: 21,
      }),
      createBook('economics-supply-chain-symphony', {
        title: 'Supply Chain Symphony',
        author: 'Omar Castillo',
        genre: 'Operations',
        description:
          'Unlock agility across manufacturing and logistics with systems thinking and scenario modeling.',
        price: 26.0,
        originalPrice: 33.5,
        coverImageUrl:
          'https://images.unsplash.com/photo-1503389152951-9f343605f61e?w=480&h=720&fit=crop',
        rating: 4.4,
        reviewCount: 344,
        publisher: 'FlowState Books',
        pageCount: 360,
        publishedDate: new Date('2024-02-08'),
        isbn: '978-1-59327-916-7',
      }),
      createBook('economics-ethical-growth', {
        title: 'Ethical Growth',
        author: 'Sofia Mendes',
        genre: 'Business Ethics',
        description:
          'Strategies for scaling businesses responsibly while prioritizing social impact.',
        price: 22.49,
        originalPrice: 28.49,
        coverImageUrl:
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=480&h=720&fit=crop',
        rating: 4.6,
        reviewCount: 456,
        publisher: 'Compass & Co.',
        pageCount: 312,
        publishedDate: new Date('2023-11-09'),
        isbn: '978-1-60309-475-2',
      }),
    ],
  },
  novel: {
    slug: 'novel',
    title: 'Novels & Storytelling',
    description:
      'Fiction across genres—immersive narratives, award contenders, and voices worth discovering.',
    books: [
      createBook('novel-river-of-stars', {
        title: 'River of Stars',
        author: 'Clarissa Holt',
        genre: 'Fantasy',
        description:
          'An astronomer maps constellations to avert a prophecy while deciphering her family legacy.',
        price: 17.99,
        originalPrice: 23.99,
        coverImageUrl:
          'https://images.unsplash.com/photo-1455885666463-9f286d1d1e1c?w=480&h=720&fit=crop',
        rating: 4.7,
        reviewCount: 1420,
        publisher: 'Aurora Gate',
        pageCount: 496,
        publishedDate: new Date('2024-02-03'),
        isbn: '978-1-59327-917-4',
        isFeatured: true,
        discount: 25,
      }),
      createBook('novel-lanterns-in-rain', {
        title: 'Lanterns in the Rain',
        author: 'Kenji Mori',
        genre: 'Contemporary Fiction',
        description:
          'In Tokyo’s back alleys, a chef rebuilds life after loss through the art of supper clubs.',
        price: 16.5,
        originalPrice: 21.5,
        coverImageUrl:
          'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=480&h=720&fit=crop',
        rating: 4.5,
        reviewCount: 988,
        publisher: 'Moonbridge Press',
        pageCount: 344,
        publishedDate: new Date('2023-09-18'),
        isbn: '978-1-4028-9467-6',
      }),
      createBook('novel-clockwork-tempest', {
        title: 'Clockwork Tempest',
        author: 'Elijah Strauss',
        genre: 'Steampunk',
        description:
          'An engineer and aviator uncover a coup in a skybound empire powered by storm energy.',
        price: 18.75,
        originalPrice: 24.75,
        coverImageUrl:
          'https://images.unsplash.com/photo-1507842217343-583f7270bfda?w=480&h=720&fit=crop',
        rating: 4.6,
        reviewCount: 612,
        publisher: 'Brass & Steam',
        pageCount: 416,
        publishedDate: new Date('2023-12-27'),
        isbn: '978-1-336-09167-8',
      }),
      createBook('novel-embers-between-us', {
        title: 'Embers Between Us',
        author: 'Riley Navarro',
        genre: 'Romance',
        description:
          'Estranged childhood friends reunite during a mountain rescue mission and find sparks reigniting.',
        price: 15.5,
        originalPrice: 20.5,
        coverImageUrl:
          'https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=480&h=720&fit=crop',
        rating: 4.3,
        reviewCount: 878,
        publisher: 'HeartLine Fiction',
        pageCount: 328,
        publishedDate: new Date('2023-08-30'),
        isbn: '978-1-59327-918-1',
      }),
      createBook('novel-shadow-of-echoes', {
        title: 'Shadow of Echoes',
        author: 'Nalini Bose',
        genre: 'Psychological Thriller',
        description:
          'A forensic linguist unravels coded messages linking cold cases across two continents.',
        price: 19.25,
        originalPrice: 25.5,
        coverImageUrl:
          'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=480&h=720&fit=crop',
        rating: 4.8,
        reviewCount: 1212,
        publisher: 'Cipher Books',
        pageCount: 384,
        publishedDate: new Date('2024-01-26'),
        isbn: '978-1-60309-476-9',
        discount: 24,
      }),
      createBook('novel-echoes-of-ash', {
        title: 'Echoes of Ash',
        author: 'Sabine Laurent',
        genre: 'Historical Drama',
        description:
          'In post-war Marseille, a perfumer discovers a scandal entwining fragrance, memory, and identity.',
        price: 17.25,
        originalPrice: 22.99,
        coverImageUrl:
          'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=480&h=720&fit=crop',
        rating: 4.6,
        reviewCount: 542,
        publisher: 'Harborlight',
        pageCount: 360,
        publishedDate: new Date('2023-11-11'),
        isbn: '978-1-59327-919-8',
      }),
    ],
  },
  'self-improvement': {
    slug: 'self-improvement',
    title: 'Self-Improvement & Wellness',
    description:
      'Cultivate habits, resilience, and mindful reflection with our curated personal growth collection.',
    books: [
      createBook('self-growth-rituals', {
        title: 'Growth Rituals',
        author: 'Denise Harper',
        genre: 'Personal Development',
        description:
          'Daily practices for aligning intention, creativity, and calm in a hyper-connected world.',
        price: 18.5,
        originalPrice: 24.0,
        coverImageUrl:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=480&h=720&fit=crop',
        rating: 4.5,
        reviewCount: 1088,
        publisher: 'Bloom Path',
        pageCount: 288,
        publishedDate: new Date('2024-01-09'),
        isbn: '978-1-59327-920-4',
        discount: 23,
      }),
      createBook('self-focus-resets', {
        title: 'Focus Resets',
        author: 'Dr. Aaron Wells',
        genre: 'Productivity',
        description:
          'Science-backed techniques to rebuild attention, energy, and deep work rhythms.',
        price: 19.99,
        originalPrice: 26.5,
        coverImageUrl:
          'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=480&h=720&fit=crop',
        rating: 4.6,
        reviewCount: 932,
        publisher: 'Mindframe',
        pageCount: 312,
        publishedDate: new Date('2023-09-07'),
        isbn: '978-1-60309-477-6',
        discount: 25,
      }),
      createBook('self-breathe-again', {
        title: 'Breathe Again',
        author: 'Sahana Gupta',
        genre: 'Wellness',
        description:
          'Reset stress cycles with mindful breathing, somatic awareness, and restorative rituals.',
        price: 16.75,
        originalPrice: 21.75,
        coverImageUrl:
          'https://images.unsplash.com/photo-1528543606781-2f6e6857f318?w=480&h=720&fit=crop',
        rating: 4.7,
        reviewCount: 756,
        publisher: 'Calm Current',
        pageCount: 256,
        publishedDate: new Date('2023-12-19'),
        isbn: '978-1-4028-9468-3',
      }),
      createBook('self-boundary-blueprint', {
        title: 'Boundary Blueprint',
        author: 'Morgan Ellis',
        genre: 'Self-Help',
        description:
          'Empowering frameworks to set compassionate boundaries in relationships and work.',
        price: 17.25,
        originalPrice: 22.75,
        coverImageUrl:
          'https://images.unsplash.com/photo-1493666438817-866a91353ca9?w=480&h=720&fit=crop',
        rating: 4.4,
        reviewCount: 602,
        publisher: 'Kind Harbor',
        pageCount: 284,
        publishedDate: new Date('2023-08-15'),
        isbn: '978-1-59327-921-1',
      }),
      createBook('self-habit-cartography', {
        title: 'Habit Cartography',
        author: 'Leonardo Caro',
        genre: 'Personal Development',
        description:
          'Map lasting habit loops through behavioral design, micro-milestones, and reflection prompts.',
        price: 18.0,
        originalPrice: 23.5,
        coverImageUrl:
          'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=480&h=720&fit=crop',
        rating: 4.5,
        reviewCount: 844,
        publisher: 'Momentum Works',
        pageCount: 296,
        publishedDate: new Date('2023-10-03'),
        isbn: '978-1-60309-478-3',
      }),
      createBook('self-nourish-within', {
        title: 'Nourish Within',
        author: 'Irene Okafor',
        genre: 'Nutrition & Wellness',
        description:
          'Integrate intuitive eating, joyful movement, and community care into everyday routines.',
        price: 20.99,
        originalPrice: 27.99,
        coverImageUrl:
          'https://images.unsplash.com/photo-1464306076886-da185f6a3150?w=480&h=720&fit=crop',
        rating: 4.6,
        reviewCount: 498,
        publisher: 'Vital Bloom',
        pageCount: 308,
        publishedDate: new Date('2024-02-28'),
        isbn: '978-1-59327-922-8',
        discount: 25,
      }),
    ],
  },
}

export const BOOK_CATEGORY_NAV_ITEMS: BookCategoryNavItem[] = [
  {
    id: 'recommended',
    label: 'Recommended',
    href: '/books/recommended',
    icon: <StarIcon sx={{ fontSize: 18 }} />,
  },
  {
    id: 'trending',
    label: 'Trending',
    href: '/books/trending',
    icon: <TrendingUpIcon sx={{ fontSize: 18 }} />,
  },
  {
    id: 'featured-collection',
    label: 'Featured Collection',
    href: '/books/featured-collection',
    icon: <AutoAwesomeIcon sx={{ fontSize: 18 }} />,
  },
  {
    id: 'stem',
    label: 'STEM',
    href: '/books/stem',
    icon: <ScienceIcon sx={{ fontSize: 18 }} />,
  },
  {
    id: 'economics',
    label: 'Economics & Business',
    href: '/books/economics',
    icon: <CorporateFareIcon sx={{ fontSize: 18 }} />,
  },
  {
    id: 'novel',
    label: 'Novel',
    href: '/books/novel',
    icon: <MenuBookIcon sx={{ fontSize: 18 }} />,
  },
  {
    id: 'self-improvement',
    label: 'Self-Improvement',
    href: '/books/self-improvement',
    icon: <SelfImprovementIcon sx={{ fontSize: 18 }} />,
  },
]

export const getCategoryConfig = (slug: BookCategoryKey) => CATEGORY_CONTENT[slug]

export const BOOK_CATEGORY_SLUGS = Object.keys(CATEGORY_CONTENT) as BookCategoryKey[]


/**
 * Carousel Interface
 * Represents carousel configuration and props
 */

import { Book, HeroCarouselBook } from './book'

/**
 * Infinite Carousel Configuration
 */
export interface InfiniteCarouselConfig {
  itemWidth?: number
  gap?: number
  autoPlay?: boolean
  autoPlayInterval?: number
  showArrows?: boolean
}

/**
 * Hero Book Slide Props
 */
export interface HeroBookSlideProps {
  book: HeroCarouselBook
}

/**
 * Hero Book Carousel Responsive Configuration
 */
export type HeroBookCarouselBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface HeroBookCarouselWidthConfig {
  small: number
  large: number
}

export interface HeroBookCarouselResponsiveConfig {
  breakpoint: HeroBookCarouselBreakpoint
  widths: HeroBookCarouselWidthConfig
}

export interface HeroBookCarouselResponsiveOverrides {
  breakpoint?: HeroBookCarouselBreakpoint
  widths?: Partial<HeroBookCarouselWidthConfig>
}

export interface HeroBookCarouselDisplayConfig {
  itemWidth?: number
  gap: number
}

export interface HeroBookCarouselBehaviorConfig {
  autoPlay: boolean
  autoPlayInterval: number
  showArrows: boolean
}

/**
 * Hero Book Carousel Configuration
 */
export interface HeroBookCarouselConfig {
  display: HeroBookCarouselDisplayConfig
  behavior: HeroBookCarouselBehaviorConfig
  responsive: HeroBookCarouselResponsiveConfig
}

export interface HeroBookCarouselConfigOverrides {
  display?: Partial<HeroBookCarouselDisplayConfig>
  behavior?: Partial<HeroBookCarouselBehaviorConfig>
  responsive?: HeroBookCarouselResponsiveOverrides
}

/**
 * Hero Book Carousel Props
 */
export interface HeroBookCarouselProps {
  books: HeroCarouselBook[]
  carouselConfig?: HeroBookCarouselConfigOverrides
}

/**
 * Book Carousel Card Props
 */
export interface BookCarouselCardProps {
  book: Book
  variant?: 'featured' | 'default'
}

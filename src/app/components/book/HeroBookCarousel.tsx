'use client'

import { Box, useMediaQuery, Theme } from '@mui/material'
import { useMemo } from 'react'
import InfiniteCarousel from '../common/InfiniteCarousel'
import HeroBookSlide from './HeroBookSlide'
import {
  HeroBookCarouselProps,
  HeroBookCarouselConfig,
  HeroBookCarouselConfigOverrides,
} from '@/interfaces/carousel'

/**
 * Default carousel configuration for different screen sizes
 */
const DEFAULT_CAROUSEL_CONFIG: HeroBookCarouselConfig = {
  display: {
    gap: 32,
  },
  behavior: {
    autoPlay: true,
    autoPlayInterval: 4500,
    showArrows: true,
  },
  responsive: {
    breakpoint: 'md',
    widths: {
      small: 320,
      large: 620,
    },
  },
}

export default function HeroBookCarousel({ books, carouselConfig }: HeroBookCarouselProps) {
  const config = useMemo(
    () => mergeCarouselConfig(DEFAULT_CAROUSEL_CONFIG, carouselConfig),
    [carouselConfig]
  )

  const { display, behavior, responsive } = config
  const breakpoint = responsive.breakpoint
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down(breakpoint))
  const hasBooks = books.length > 0

  if (!hasBooks) {
    return null
  }

  const defaultWidth = isSmall ? responsive.widths.small : responsive.widths.large
  const carouselItemWidth = display.itemWidth ?? defaultWidth

  return (
    <Box sx={{ position: 'relative' }}>
      <InfiniteCarousel
        itemWidth={carouselItemWidth}
        gap={display.gap}
        autoPlay={behavior.autoPlay}
        autoPlayInterval={behavior.autoPlayInterval}
        showArrows={!isSmall && behavior.showArrows}
      >
        {books.map((book) => (
          <HeroBookSlide key={book.id} book={book} />
        ))}
      </InfiniteCarousel>
    </Box>
  )
}

function mergeCarouselConfig(
  baseConfig: HeroBookCarouselConfig,
  overrides?: HeroBookCarouselConfigOverrides
): HeroBookCarouselConfig {
  const mergedDisplay = {
    ...baseConfig.display,
    ...overrides?.display,
  }

  const mergedBehavior = {
    ...baseConfig.behavior,
    ...overrides?.behavior,
  }

  const responsiveWidths = {
    ...baseConfig.responsive.widths,
    ...overrides?.responsive?.widths,
  }

  const mergedResponsive = {
    breakpoint: overrides?.responsive?.breakpoint ?? baseConfig.responsive.breakpoint,
    widths: responsiveWidths,
  }

  return {
    display: mergedDisplay,
    behavior: mergedBehavior,
    responsive: mergedResponsive,
  }
}

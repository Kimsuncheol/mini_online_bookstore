'use client'

import { Box, IconButton } from '@mui/material'
import {
  Children,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

interface InfiniteCarouselProps {
  children: ReactNode | ReactNode[]
  itemWidth?: number
  gap?: number
  autoPlay?: boolean
  autoPlayInterval?: number
  showArrows?: boolean
  transitionDuration?: number
}

const DEFAULT_TRANSITION_MS = 450

export default function InfiniteCarousel({
  children,
  itemWidth = 260,
  gap = 24,
  autoPlay = false,
  autoPlayInterval = 3000,
  showArrows = true,
  transitionDuration = DEFAULT_TRANSITION_MS,
}: InfiniteCarouselProps) {
  const items = useMemo(() => Children.toArray(children) as ReactNode[], [children])
  const totalItems = items.length

  const [startIndex, setStartIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationDirection, setAnimationDirection] = useState<'left' | 'right' | null>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    setStartIndex(0)
  }, [totalItems])

  const orderedItems = useMemo(() => {
    if (!totalItems) return []

    return Array.from({ length: totalItems }, (_, position) => {
      const nextIndex = (startIndex + position) % totalItems
      return items[nextIndex]
    })
  }, [items, startIndex, totalItems])

  const handleNavigation = useCallback(
    (direction: 'left' | 'right') => {
      if (isAnimating || totalItems < 2) return

      setAnimationDirection(direction)
      setIsAnimating(true)

      const travel = itemWidth + gap
      setOffset(direction === 'right' ? -travel : travel)
    },
    [gap, isAnimating, itemWidth, totalItems]
  )

  useEffect(() => {
    if (!isAnimating || !animationDirection || totalItems < 2) {
      return
    }

    const timeout = window.setTimeout(() => {
      setStartIndex((prev) => {
        if (animationDirection === 'right') {
          return (prev + 1) % totalItems
        }
        return (prev - 1 + totalItems) % totalItems
      })
      setIsAnimating(false)
      setAnimationDirection(null)
      setOffset(0)
    }, transitionDuration)

    return () => window.clearTimeout(timeout)
  }, [animationDirection, isAnimating, totalItems, transitionDuration])

  useEffect(() => {
    if (!autoPlay || isHovered || totalItems < 2) {
      return
    }

    const interval = window.setInterval(() => {
      handleNavigation('right')
    }, autoPlayInterval)

    return () => window.clearInterval(interval)
  }, [autoPlay, autoPlayInterval, handleNavigation, isHovered, totalItems])

  const canNavigate = totalItems > 1

  return (
    <Box
      sx={{ position: 'relative', width: '100%' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showArrows && canNavigate && (
        <IconButton
          onClick={() => handleNavigation('left')}
          disabled={isAnimating}
          sx={{
            position: 'absolute',
            left: -20,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            backgroundColor: 'background.paper',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            '&:hover': {
              backgroundColor: 'background.paper',
              boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
            },
            '&.Mui-disabled': {
              opacity: 0.6,
            },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
      )}

      <Box
        sx={{
          overflow: 'hidden',
          width: '100%',
          pb: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: `${gap}px`,
            transform: `translateX(${offset}px)`,
            transition: isAnimating ? `transform ${transitionDuration}ms ease` : 'none',
          }}
        >
          {orderedItems.map((child, index) => (
            <Box
              key={index}
              sx={{
                flexShrink: 0,
                width: itemWidth,
              }}
            >
              {child}
            </Box>
          ))}
        </Box>
      </Box>

      {showArrows && canNavigate && (
        <IconButton
          onClick={() => handleNavigation('right')}
          disabled={isAnimating}
          sx={{
            position: 'absolute',
            right: -20,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            backgroundColor: 'background.paper',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            '&:hover': {
              backgroundColor: 'background.paper',
              boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
            },
            '&.Mui-disabled': {
              opacity: 0.6,
            },
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      )}
    </Box>
  )
}

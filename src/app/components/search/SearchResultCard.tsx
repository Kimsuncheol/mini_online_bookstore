'use client'

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  CardActionArea,
} from '@mui/material'
import Link from 'next/link'
import type { SearchResultItem } from '@/interfaces/search'

interface SearchResultCardProps {
  item: SearchResultItem
  layout?: 'grid' | 'list'
}

export default function SearchResultCard({
  item,
  layout = 'grid',
}: SearchResultCardProps) {
  const typeColors: Record<string, 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'> = {
    book: 'primary',
    author: 'secondary',
    category: 'info',
  }

  const typeLabel = item.type.charAt(0).toUpperCase() + item.type.slice(1)

  if (layout === 'list') {
    return (
      <Link href={item.url || `/${item.type}s/${item.id}`}>
        <CardActionArea component="div">
          <Card
            sx={{
              display: 'flex',
              mb: 2,
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            {item.image && (
              <CardMedia
                component="img"
                sx={{
                  width: 120,
                  height: 160,
                  objectFit: 'cover',
                }}
                image={item.image}
                alt={item.title}
              />
            )}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                p: 2,
              }}
            >
              <Box sx={{ mb: 1 }}>
                <Chip
                  label={typeLabel}
                  size="small"
                  color={typeColors[item.type] || 'default'}
                  variant="outlined"
                  sx={{ mr: 1 }}
                />
                {item.score && (
                  <Chip
                    label={`Match: ${(item.score * 100).toFixed(0)}%`}
                    size="small"
                    variant="filled"
                    sx={{ backgroundColor: 'success.light', color: 'success.dark' }}
                  />
                )}
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 0.5,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {item.title}
              </Typography>
              {item.subtitle && (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    mb: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {item.subtitle}
                </Typography>
              )}
              {item.description && (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {item.description}
                </Typography>
              )}
            </Box>
          </Card>
        </CardActionArea>
      </Link>
    )
  }

  // Grid layout
  return (
    <Link href={item.url || `/${item.type}s/${item.id}`}>
      <CardActionArea component="div">
        <Card
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
              transform: 'translateY(-8px)',
            },
          }}
        >
          <Box
            sx={{
              position: 'relative',
              paddingTop: '140%',
              backgroundColor: 'grey.200',
              overflow: 'hidden',
            }}
          >
            {item.image && (
              <CardMedia
                component="img"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                image={item.image}
                alt={item.title}
              />
            )}
            <Box
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                display: 'flex',
                gap: 0.5,
                flexWrap: 'wrap',
                justifyContent: 'flex-end',
              }}
            >
              <Chip
                label={typeLabel}
                size="small"
                color={typeColors[item.type] || 'default'}
                variant="filled"
                sx={{
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  color: '#fff',
                }}
              />
            </Box>
          </Box>
          <CardContent sx={{ flexGrow: 1, pb: 1 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                mb: 0.5,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                minHeight: '2.8em',
              }}
            >
              {item.title}
            </Typography>
            {item.subtitle && (
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{
                  display: 'block',
                  mb: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.subtitle}
              </Typography>
            )}
            {item.score && (
              <Box sx={{ mt: 1 }}>
                <Typography variant="caption" color="textSecondary">
                  Match: {(item.score * 100).toFixed(0)}%
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </CardActionArea>
    </Link>
  )
}

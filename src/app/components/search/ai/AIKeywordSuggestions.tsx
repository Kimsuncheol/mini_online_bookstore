'use client'

import { Box, Button, Stack, Typography, Chip } from '@mui/material'
import LightbulbIcon from '@mui/icons-material/Lightbulb'

interface AIKeywordSuggestionsProps {
  onSuggestionClick: (keyword: string) => void
}

const DEFAULT_SUGGESTIONS = [
  'Find books like Harry Potter',
  'Best sci-fi novels this year',
  'Recommend mystery books',
  'What are trending genres?',
  'Books about adventure',
  'Historical fiction recommendations',
  'Young adult fantasy novels',
  'Best-selling authors 2024',
]

export default function AIKeywordSuggestions({
  onSuggestionClick,
}: AIKeywordSuggestionsProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      {/* Suggested Keywords Section */}
      <Box>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <LightbulbIcon
            sx={{
              fontSize: 20,
              color: 'warning.main',
            }}
          />
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              textTransform: 'uppercase',
              fontSize: '0.8rem',
              color: 'text.secondary',
            }}
          >
            Try asking about:
          </Typography>
        </Stack>

        <Stack
          spacing={1.5}
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {DEFAULT_SUGGESTIONS.map((suggestion, index) => (
            <Button
              key={index}
              onClick={() => onSuggestionClick(suggestion)}
              sx={{
                display: 'block',
                textAlign: 'left',
                p: 1.5,
                borderRadius: 1.5,
                border: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'background.paper',
                color: 'text.primary',
                textTransform: 'none',
                fontSize: '0.875rem',
                fontWeight: 500,
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'action.hover',
                  borderColor: 'primary.main',
                  transform: 'translateX(4px)',
                },
              }}
            >
              {suggestion}
            </Button>
          ))}
        </Stack>
      </Box>

      {/* Suggested Topics Tags */}
      <Box>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
            textTransform: 'uppercase',
            fontSize: '0.8rem',
            color: 'text.secondary',
            mb: 1.5,
          }}
        >
          Popular topics:
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {[
            'Fantasy',
            'Mystery',
            'Romance',
            'Sci-Fi',
            'Thriller',
            'Biography',
            'Self-Help',
            'Adventure',
          ].map((topic) => (
            <Chip
              key={topic}
              label={topic}
              onClick={() => onSuggestionClick(`Books about ${topic}`)}
              variant="outlined"
              sx={{
                borderRadius: 1,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'primary.light',
                  borderColor: 'primary.main',
                  color: 'primary.contrastText',
                },
              }}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  )
}

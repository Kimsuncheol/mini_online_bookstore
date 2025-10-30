'use client'

import { useState } from 'react'
import {
  TextField,
  InputAdornment,
  alpha,
  Box,
  Container,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import SearchPageSearchModal from './SearchPageSearchModal'

interface SearchPageHeaderSearchFieldProps {
  onSearch: (query: string) => void
  currentQuery: string
}

export default function SearchPageHeaderSearchField({
  onSearch,
  currentQuery,
}: SearchPageHeaderSearchFieldProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget)
    setModalOpen(true)
  }

  const handleClose = () => {
    setModalOpen(false)
    setAnchorEl(null)
  }

  return (
    <>
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)',
          borderBottom: '1px solid',
          borderColor: 'divider',
          py: 1.5,
          mb: 2,
        }}
      >
        <Container maxWidth="lg">
          <Box onClick={handleClick}>
            <TextField
              size="small"
              placeholder="Search for books, authors, categories..."
              variant="outlined"
              value={currentQuery}
              sx={{
                width: '100%',
                cursor: 'pointer',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '24px',
                  backgroundColor: (theme) => alpha(theme.palette.grey[100], 0.8),
                  transition: 'all 0.3s',
                  border: 'none',
                  cursor: 'pointer',
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover': {
                    backgroundColor: (theme) => alpha(theme.palette.grey[200], 0.9),
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  },
                  '&.Mui-focused': {
                    backgroundColor: '#ffffff',
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
                  },
                },
                '& input': {
                  cursor: 'pointer',
                },
              }}
              slotProps={{
                input: {
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>
        </Container>
      </Box>

      <SearchPageSearchModal
        open={modalOpen}
        onClose={handleClose}
        anchorEl={anchorEl}
        onSearch={onSearch}
      />
    </>
  )
}

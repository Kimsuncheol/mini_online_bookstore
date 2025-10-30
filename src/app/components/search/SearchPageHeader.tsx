'use client'

import { useState } from 'react'
import {
  Box,
  Container,
  TextField,
  InputAdornment,
  Button,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import SearchPageSearchModal from './SearchPageSearchModal'

interface SearchPageHeaderProps {
  onSearch: (query: string) => void
  currentQuery: string
}

export default function SearchPageHeader({
  onSearch,
  currentQuery,
}: SearchPageHeaderProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [searchInput, setSearchInput] = useState(currentQuery)

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget)
    setModalOpen(true)
  }

  const handleClose = () => {
    setModalOpen(false)
    setAnchorEl(null)
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchInput.trim()) {
      onSearch(searchInput)
      handleClose()
    }
  }

  const handleClear = () => {
    setSearchInput('')
  }

  return (
    <>
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)',
          borderBottom: '1px solid',
          borderColor: 'divider',
          py: 2,
          mb: 3,
        }}
      >
        <Container maxWidth="lg">
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              p: 1.5,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              borderRadius: 3,
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              transition: 'all 0.3s ease',
              '&:focus-within': {
                boxShadow: '0 8px 24px rgba(102, 126, 234, 0.15)',
                borderColor: 'primary.main',
              },
            }}
            onClick={handleClick}
          >
            <SearchIcon
              sx={{
                color: 'text.secondary',
                ml: 1,
              }}
            />
            <TextField
              fullWidth
              placeholder="Search for books, authors, categories..."
              variant="standard"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: searchInput && (
                    <InputAdornment position="end">
                      <Button
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleClear()
                        }}
                        sx={{
                          minWidth: 'auto',
                          p: 0.5,
                          color: 'text.secondary',
                          '&:hover': { color: 'text.primary' },
                        }}
                      >
                        <ClearIcon sx={{ fontSize: 20 }} />
                      </Button>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                '& .MuiInput-underline:before': {
                  borderBottomColor: 'transparent',
                },
                '& .MuiInput-underline:hover:before': {
                  borderBottomColor: 'transparent',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: 'transparent',
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                px: 3,
                mr: 0.5,
              }}
            >
              Search
            </Button>
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

'use client'

import { useState } from 'react'
import { TextField, InputAdornment, alpha, Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import SearchModal from '../../search/SearchModal'

export default function HeaderSearchField() {
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
      <Box onClick={handleClick}>
        <TextField
          size="small"
          placeholder="Search for books, authors..."
          variant="outlined"
          sx={{
            width: { xs: '180px', sm: '250px', md: '350px' },
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

      <SearchModal open={modalOpen} onClose={handleClose} anchorEl={anchorEl} />
    </>
  )
}

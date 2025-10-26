import { TextField, InputAdornment, alpha } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

export default function HeaderSearchField() {
  return (
    <TextField
      size="small"
      placeholder="Search for books, authors..."
      variant="outlined"
      sx={{
        width: { xs: '180px', sm: '250px', md: '350px' },
        '& .MuiOutlinedInput-root': {
          borderRadius: '24px',
          backgroundColor: (theme) => alpha(theme.palette.grey[100], 0.8),
          transition: 'all 0.3s',
          border: 'none',
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
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
          </InputAdornment>
        ),
      }}
    />
  )
}

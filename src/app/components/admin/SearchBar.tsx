import { TextField, InputAdornment, Box, ToggleButtonGroup, ToggleButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import CreateIcon from '@mui/icons-material/Create'
import PersonIcon from '@mui/icons-material/Person'

interface SearchBarProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  roleFilter: string
  onRoleFilterChange: (value: string) => void
}

export default function SearchBar({
  searchTerm,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
}: SearchBarProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search users by name or email..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          mb: 2,
          '& .MuiOutlinedInput-root': {
            borderRadius: 3,
          },
        }}
      />

      <ToggleButtonGroup
        value={roleFilter}
        exclusive
        onChange={(_, newValue) => newValue && onRoleFilterChange(newValue)}
        size="small"
        sx={{
          '& .MuiToggleButton-root': {
            borderRadius: 2,
            px: 2,
            textTransform: 'none',
            fontWeight: 600,
          },
        }}
      >
        <ToggleButton value="all">All Users</ToggleButton>
        <ToggleButton value="admin">
          <AdminPanelSettingsIcon sx={{ mr: 0.5, fontSize: 18 }} />
          Admins
        </ToggleButton>
        <ToggleButton value="author">
          <CreateIcon sx={{ mr: 0.5, fontSize: 18 }} />
          Authors
        </ToggleButton>
        <ToggleButton value="user">
          <PersonIcon sx={{ mr: 0.5, fontSize: 18 }} />
          Users
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  )
}

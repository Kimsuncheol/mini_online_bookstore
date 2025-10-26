import { Box, TextField, InputAdornment, ToggleButtonGroup, ToggleButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import CreateIcon from '@mui/icons-material/Create'
import PersonIcon from '@mui/icons-material/Person'

interface FilterBarProps {
  searchTerm: string
  roleFilter: string
  onSearchChange: (value: string) => void
  onRoleFilterChange: (value: string) => void
}

export default function FilterBar({
  searchTerm,
  roleFilter,
  onSearchChange,
  onRoleFilterChange,
}: FilterBarProps) {
  return (
    <Box sx={{ mb: 4 }}>
      {/* Search Field */}
      <TextField
        fullWidth
        placeholder="Search by name or email..."
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

      {/* Role Filter Buttons */}
      <ToggleButtonGroup
        value={roleFilter}
        exclusive
        onChange={(_, newValue) => newValue && onRoleFilterChange(newValue)}
        size="small"
        sx={{
          '& .MuiToggleButton-root': {
            borderRadius: 2,
            px: 2.5,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.875rem',
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

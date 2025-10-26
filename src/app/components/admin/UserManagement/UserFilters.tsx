import {
  Box,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Stack,
  InputAdornment,
  FormControl,
  Select,
  type SelectChangeEvent,
  Chip,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'
import type { UserFilters as UserFiltersType } from '@/lib/user-api'

interface UserFiltersProps {
  filters: UserFiltersType
  onFilterChange: (filters: UserFiltersType) => void
  resultCount?: number
}

export default function UserFilters({ filters, onFilterChange, resultCount }: UserFiltersProps) {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: event.target.value })
  }

  const handleRoleChange = (event: SelectChangeEvent) => {
    onFilterChange({
      ...filters,
      role: event.target.value as UserFiltersType['role'],
    })
  }

  const handleStatusChange = (event: SelectChangeEvent) => {
    onFilterChange({
      ...filters,
      status: event.target.value as UserFiltersType['status'],
    })
  }

  const handleVerificationChange = (event: SelectChangeEvent) => {
    const value = event.target.value
    onFilterChange({
      ...filters,
      emailVerified: value === 'all' ? 'all' : value === 'true',
    })
  }

  const activeFilterCount = [
    filters.role !== 'all' && filters.role,
    filters.status !== 'all' && filters.status,
    filters.emailVerified !== 'all' && filters.emailVerified !== undefined,
  ].filter(Boolean).length

  return (
    <Card sx={{ mb: 3, borderRadius: 2 }}>
      <CardContent>
        <Stack spacing={2}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 1,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FilterListIcon color="primary" />
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box component="span" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
                    Filters
                  </Box>
                  {activeFilterCount > 0 && (
                    <Chip
                      label={`${activeFilterCount} active`}
                      size="small"
                      color="primary"
                      sx={{ height: 20, fontSize: '0.75rem' }}
                    />
                  )}
                </Box>
                {resultCount !== undefined && (
                  <Box sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                    {resultCount} {resultCount === 1 ? 'user' : 'users'} found
                  </Box>
                )}
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gap: 2,
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)',
              },
            }}
          >
            {/* Search */}
            <TextField
              fullWidth
              size="small"
              placeholder="Search by email or name..."
              value={filters.search || ''}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            {/* Role Filter */}
            <FormControl fullWidth size="small">
              <Select value={filters.role || 'all'} onChange={handleRoleChange} displayEmpty>
                <MenuItem value="all">All Roles</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="author">Author</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
            </FormControl>

            {/* Status Filter */}
            <FormControl fullWidth size="small">
              <Select value={filters.status || 'all'} onChange={handleStatusChange} displayEmpty>
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="suspended">Suspended</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </Select>
            </FormControl>

            {/* Email Verification Filter */}
            <FormControl fullWidth size="small">
              <Select
                value={
                  filters.emailVerified === 'all'
                    ? 'all'
                    : filters.emailVerified === undefined
                      ? 'all'
                      : filters.emailVerified.toString()
                }
                onChange={handleVerificationChange}
                displayEmpty
              >
                <MenuItem value="all">All Verification</MenuItem>
                <MenuItem value="true">Verified</MenuItem>
                <MenuItem value="false">Not Verified</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

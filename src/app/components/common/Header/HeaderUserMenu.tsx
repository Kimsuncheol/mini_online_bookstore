import type { MouseEvent } from 'react'
import { Avatar, IconButton, Menu, MenuItem, Box, alpha } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize'

type HeaderUserMenuProps = {
  user: { displayName?: string | null; email?: string | null, role: 'admin' | 'author' | 'user' | null } | null
  anchorEl: HTMLElement | null
  onMenuOpen: (event: MouseEvent<HTMLElement>) => void
  onMenuClose: () => void
  onProfileClick: () => void
  onAuthorDashboardClick: () => void
  onLogout: () => void | Promise<void>
}

const getInitials = (name?: string | null): string => {
  if (!name) return 'U'
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export default function HeaderUserMenu({
  user,
  anchorEl,
  onMenuOpen,
  onMenuClose,
  onProfileClick,
  onAuthorDashboardClick,
  onLogout,
}: HeaderUserMenuProps) {
  if (!user) return null

  return (
    <>
      <IconButton
        onClick={onMenuOpen}
        sx={{
          p: 0,
          '&:hover': {
            backgroundColor: alpha('#667eea', 0.1),
          },
        }}
      >
        <Avatar
          sx={{
            width: 40,
            height: 40,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontSize: '0.875rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {getInitials(user.displayName || user.email)}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem disabled>
          <Box sx={{ fontSize: '0.875rem' }}>{user.displayName || user.email}</Box>
        </MenuItem>
        <MenuItem
          onClick={onProfileClick}
          sx={{ color: 'GrayText' }}
        >
          <AccountCircleIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
          Profile
        </MenuItem>
        <MenuItem
          onClick={onAuthorDashboardClick}
          sx={{ color: 'GrayText' }}
        >
          <DashboardCustomizeIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
          Author Dashboard
        </MenuItem>
        {/* {(user?.role === 'admin' || 'author') && (
          <MenuItem
            onClick={onAuthorDashboardClick}
            sx={{ color: 'GrayText' }}
          >
            <DashboardCustomizeIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
            Author Dashboard
          </MenuItem>
        )} */}
        <MenuItem
          onClick={onLogout}
          sx={{ color: 'error.main' }}
        >
          <LogoutIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}

import type { MouseEvent } from 'react'
import { Avatar, IconButton, Menu, MenuItem, Box, alpha } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize'
import PeopleIcon from '@mui/icons-material/People'
import CampaignIcon from '@mui/icons-material/Campaign'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'

type HeaderUserMenuProps = {
  user: { displayName?: string | null; email?: string | null; role?: 'admin' | 'author' | 'user' | null } | null
  anchorEl: HTMLElement | null
  onMenuOpen: (event: MouseEvent<HTMLElement>) => void
  onMenuClose: () => void
  onProfileClick: () => void
  onAuthorDashboardClick: () => void
  onUserManagementClick: () => void
  onAdvertisementClick: () => void
  onPaymentHistoryClick: () => void
  onAdminPaymentHistoryClick: () => void
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
  onUserManagementClick,
  onAdvertisementClick,
  onPaymentHistoryClick,
  onAdminPaymentHistoryClick,
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
        <CustomizedMenuItem
          onClick={onProfileClick}
          sx={{ color: 'GrayText' }}
          text="Profile"
          icon={<AccountCircleIcon />}
        />
        {/* Don't remove the code below */}
        {/* {(user.role === 'admin' || user.role === 'author') && (
          <CustomizedMenuItem
          onClick={onAuthorDashboardClick}
          sx={{ color: 'GrayText' }}
          text="Author Dashboard"
          icon={<DashboardCustomizeIcon />}
        />
        )} */}
        <CustomizedMenuItem
          onClick={onAuthorDashboardClick}
          sx={{ color: 'GrayText' }}
          text="Author Dashboard"
          icon={<DashboardCustomizeIcon />}
        />
        {/* Don't remove the code below */}
        {/* {user.role === 'admin' && (
          <CustomizedMenuItem
          onClick={onUserManagementClick}
          sx={{ color: 'GrayText' }}
          text="User Management"
          icon={<PeopleIcon />}
        />
        )} */}
        <CustomizedMenuItem
          onClick={onUserManagementClick}
          sx={{ color: 'GrayText' }}
          text="User Management"
          icon={<PeopleIcon />}
        />
        <CustomizedMenuItem
          onClick={onAdvertisementClick}
          sx={{ color: 'GrayText' }}
          text="Advertisements"
          icon={<CampaignIcon />}
        />
        <CustomizedMenuItem
          onClick={onPaymentHistoryClick}
          sx={{ color: 'GrayText' }}
          text="Payment History"
          icon={<ReceiptLongIcon />}
        />
        <CustomizedMenuItem
          onClick={onAdminPaymentHistoryClick}
          sx={{ color: 'GrayText' }}
          text="Admin Payment History"
          icon={<AdminPanelSettingsIcon />}
        />
        <CustomizedMenuItem
          onClick={onLogout}
          sx={{ color: 'GrayText' }}
          text="Logout"
          icon={<LogoutIcon />}
        />
      </Menu>
    </>
  )
}

function CustomizedMenuItem({
  onClick,
  sx,
  text,
  icon,
}: {
  onClick: () => void,
  sx?: React.CSSProperties,
  text?: string,
  icon?: React.ReactElement,
}) {
  return (
    <MenuItem
      onClick={onClick}
      sx={sx}
    >
      {icon && <Box sx={{ mr: 1, fontSize: '1.2rem' }}>{icon}</Box>}
      {text}
    </MenuItem>
  )
}
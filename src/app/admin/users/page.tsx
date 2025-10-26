'use client'

import { useState, useEffect, useMemo } from 'react'
import { Container, Box, Typography, CircularProgress, Stack } from '@mui/material'
import PeopleIcon from '@mui/icons-material/People'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import CreateIcon from '@mui/icons-material/Create'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import type { UserData } from '@/services/userService'
import { getUsers, updateUserRole, updateUserStatus } from '@/services/userService'
import FilterBar from '@/app/components/users/FilterBar'
import UserGrid from '@/app/components/users/UserGrid'
import StatsCard from '@/app/components/users/StatsCard'

export default function UserManagementPage() {
  const [users, setUsers] = useState<UserData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')

  // Load users on mount
  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    setLoading(true)
    try {
      const data = await getUsers()
      setUsers(data)
    } catch (error) {
      console.error('Failed to load users:', error)
    } finally {
      setLoading(false)
    }
  }

  // Filter users
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesRole = roleFilter === 'all' || user.role === roleFilter

      return matchesSearch && matchesRole
    })
  }, [users, searchTerm, roleFilter])

  // Calculate stats
  const stats = useMemo(() => {
    return {
      total: users.length,
      admins: users.filter((u) => u.role === 'admin').length,
      authors: users.filter((u) => u.role === 'author').length,
      active: users.filter((u) => u.status === 'active').length,
    }
  }, [users])

  // Handle role change
  const handleRoleChange = async (userId: string, role: 'admin' | 'author' | 'user') => {
    try {
      await updateUserRole(userId, role)
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role } : u)))
    } catch (error) {
      console.error('Failed to update role:', error)
    }
  }

  // Handle status change
  const handleStatusChange = async (userId: string, status: 'active' | 'inactive') => {
    try {
      await updateUserStatus(userId, status)
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, status } : u)))
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <CircularProgress size={60} />
      </Box>
    )
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
            }}
          >
            <PeopleIcon />
          </Box>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              User Management
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage user roles and permissions
            </Typography>
          </Box>
        </Box>

        {/* Statistics */}
        <Stack
          direction="row"
          spacing={2}
          sx={{
            mt: 3,
            overflowX: 'auto',
            pb: 1,
          }}
        >
          <Box sx={{ minWidth: 200 }}>
            <StatsCard
              label="Total Users"
              value={stats.total}
              icon={<PeopleIcon />}
              color="#667eea"
            />
          </Box>
          <Box sx={{ minWidth: 200 }}>
            <StatsCard
              label="Admins"
              value={stats.admins}
              icon={<AdminPanelSettingsIcon />}
              color="#dc2626"
            />
          </Box>
          <Box sx={{ minWidth: 200 }}>
            <StatsCard
              label="Authors"
              value={stats.authors}
              icon={<CreateIcon />}
              color="#2563eb"
            />
          </Box>
          <Box sx={{ minWidth: 200 }}>
            <StatsCard
              label="Active"
              value={stats.active}
              icon={<CheckCircleIcon />}
              color="#10b981"
            />
          </Box>
        </Stack>
      </Box>

      {/* Filters */}
      <FilterBar
        searchTerm={searchTerm}
        roleFilter={roleFilter}
        onSearchChange={setSearchTerm}
        onRoleFilterChange={setRoleFilter}
      />

      {/* User Grid */}
      <UserGrid
        users={filteredUsers}
        onRoleChange={handleRoleChange}
        onStatusChange={handleStatusChange}
      />
    </Container>
  )
}

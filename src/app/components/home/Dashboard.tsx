'use client'

import React from 'react'
import { Box } from '@mui/material'
import Tabbar from '../common/Tabbar'

export default function Dashboard() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Tabbar />

      {/* Placeholder for other dashboard sections */}
      <Box sx={{ p: 3, backgroundColor: '#f8f9fa', minHeight: 'calc(100vh - 128px)' }}>
        {/* Other sections will be added here later */}
      </Box>
    </Box>
  )
}

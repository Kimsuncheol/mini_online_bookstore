'use client'

import { useMemo } from 'react'
import { Box, Paper, Tooltip } from '@mui/material'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import type { CheckInRecord } from '@/interfaces/checkIn'

interface AttendanceGridProps {
  records: CheckInRecord[] // Should be in reverse chronological order
  maxDays?: number // Maximum days to display (default 28)
}

export default function AttendanceGrid({ records, maxDays = 28 }: AttendanceGridProps) {
  // Calculate item size based on screen size
  const itemSize = useMemo(() => {
    const containerWidth = typeof window !== 'undefined' ? window.innerWidth : 1200
    // 7 columns with padding and gap
    const usableWidth = containerWidth - 32 // 16px padding on each side
    const gap = 12 // Gap between items
    const totalGapWidth = gap * 6 // 6 gaps between 7 columns
    const singleItemWidth = (usableWidth - totalGapWidth) / 7

    // Clamp between reasonable sizes
    return Math.min(Math.max(singleItemWidth, 20), 60)
  }, [])

  // Create array of last 28 days
  const displayRecords = useMemo(() => {
    const today = new Date()
    const allDays: CheckInRecord[] = []

    for (let i = maxDays - 1; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]

      const found = records.find((r) => r.date === dateStr)
      allDays.push(found || { date: dateStr, checked: false })
    }

    return allDays
  }, [records, maxDays])

  const getDateLabel = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00')
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '12px',
        p: 3,
        borderRadius: 2,
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      {displayRecords.map((record) => (
        <Tooltip
          key={record.date}
          title={`${getDateLabel(record.date)} - ${record.checked ? 'Checked in' : 'Missed'}`}
          arrow
        >
          <Paper
            elevation={record.checked ? 2 : 0}
            sx={{
              width: itemSize,
              height: itemSize,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              backgroundColor: record.checked
                ? 'success.light'
                : 'action.hover',
              border: `2px solid`,
              borderColor: record.checked ? 'success.main' : 'divider',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: record.checked ? 6 : 2,
              },
            }}
          >
            {record.checked ? (
              <CalendarTodayIcon
                sx={{
                  fontSize: itemSize * 0.6,
                  color: 'success.main',
                }}
              />
            ) : (
              <Box
                sx={{
                  width: itemSize * 0.4,
                  height: itemSize * 0.4,
                  borderRadius: '50%',
                  backgroundColor: 'text.disabled',
                  opacity: 0.3,
                }}
              />
            )}
          </Paper>
        </Tooltip>
      ))}
    </Box>
  )
}

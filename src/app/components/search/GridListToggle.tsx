'use client'

import { ToggleButton, ToggleButtonGroup, Box } from '@mui/material'
import GridViewIcon from '@mui/icons-material/GridView'
import ViewListIcon from '@mui/icons-material/ViewList'

export type LayoutType = 'grid' | 'list'

interface GridListToggleProps {
  layout: LayoutType
  onLayoutChange: (layout: LayoutType) => void
}

export default function GridListToggle({
  layout,
  onLayoutChange,
}: GridListToggleProps) {
  const handleChange = (_: React.MouseEvent<HTMLElement>, newLayout: LayoutType) => {
    if (newLayout !== null) {
      onLayoutChange(newLayout)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        mb: 2,
      }}
    >
      <ToggleButtonGroup
        value={layout}
        exclusive
        onChange={handleChange}
        aria-label="layout view"
        size="small"
        sx={{
          backgroundColor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          p: 0.5,
          '& .MuiToggleButton-root': {
            border: 'none',
            borderRadius: 0.75,
            padding: '6px 12px',
            '&.Mui-selected': {
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            },
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          },
        }}
      >
        <ToggleButton value="grid" aria-label="grid view">
          <GridViewIcon sx={{ fontSize: 20 }} />
        </ToggleButton>
        <ToggleButton value="list" aria-label="list view">
          <ViewListIcon sx={{ fontSize: 20 }} />
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  )
}

import { Box, Switch, Typography } from '@mui/material'

interface SearchHistoryToggleProps {
  enabled: boolean
  onChange: (enabled: boolean) => void
}

export default function SearchHistoryToggle({ enabled, onChange }: SearchHistoryToggleProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 1.5,
        borderRadius: 2,
        backgroundColor: 'action.hover',
      }}
    >
      <Box>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          Search History
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Save your recent searches
        </Typography>
      </Box>
      <Switch checked={enabled} onChange={(e) => onChange(e.target.checked)} color="primary" />
    </Box>
  )
}

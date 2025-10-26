import { Box, Switch, Typography } from '@mui/material'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'

interface DeleteSearchHistoryToggleProps {
  onDelete: () => void
  hasHistory: boolean
}

export default function DeleteSearchHistoryToggle({
  onDelete,
  hasHistory,
}: DeleteSearchHistoryToggleProps) {
  const handleToggle = (checked: boolean) => {
    if (checked) {
      onDelete()
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 1.5,
        borderRadius: 2,
        backgroundColor: 'action.hover',
        opacity: hasHistory ? 1 : 0.5,
        pointerEvents: hasHistory ? 'auto' : 'none',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <DeleteSweepIcon sx={{ color: 'error.main' }} />
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            Delete Search History
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Clear all saved searches
          </Typography>
        </Box>
      </Box>
      <Switch
        checked={false}
        onChange={(e) => handleToggle(e.target.checked)}
        color="error"
        disabled={!hasHistory}
      />
    </Box>
  )
}

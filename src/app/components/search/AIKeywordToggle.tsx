'use client'

import { Stack, FormControlLabel, Switch, Typography } from '@mui/material'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'

interface AIKeywordToggleProps {
  enabled: boolean
  onChange: (enabled: boolean) => void
}

export default function AIKeywordToggle({ enabled, onChange }: AIKeywordToggleProps) {
  return (
    <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="space-between">
      <Stack direction="row" spacing={1} alignItems="center">
        <AutoAwesomeIcon sx={{ fontSize: 20, color: 'primary.main' }} />
        <Stack spacing={0.25}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            AI Suggestions
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {enabled ? 'Showing AI-powered keyword suggestions' : 'AI suggestions disabled'}
          </Typography>
        </Stack>
      </Stack>
      <FormControlLabel
        control={
          <Switch
            checked={enabled}
            onChange={(e) => onChange(e.target.checked)}
            size="small"
          />
        }
        label=""
      />
    </Stack>
  )
}

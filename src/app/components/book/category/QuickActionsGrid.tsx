import { Box, Button } from '@mui/material'
import { SvgIconComponent } from '@mui/icons-material'

export interface QuickAction {
  label: string
  icon: SvgIconComponent
  value: string
}

interface QuickActionsChipsProps {
  actions: QuickAction[]
  activeAction: string
  onActionClick: (actionValue: string) => void
}

export default function QuickActionChips({
  actions,
  activeAction,
  onActionClick,
}: QuickActionsChipsProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
      }}
    >
      {actions.map(({ label, icon: Icon, value }) => (
        <Button
          key={value}
          variant={activeAction === value ? 'contained' : 'outlined'}
          startIcon={<Icon />}
          onClick={() => onActionClick(value)}
          sx={{
            borderRadius: 999,
            px: 3,
            py: 1.5,
            textTransform: 'none',
            fontWeight: 600,
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            ...(activeAction === value && {
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
            }),
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow:
                activeAction === value
                  ? '0 6px 16px rgba(102, 126, 234, 0.4)'
                  : '0 4px 12px rgba(102, 126, 234, 0.15)',
            },
          }}
        >
          {label}
        </Button>
      ))}
    </Box>
  )
}

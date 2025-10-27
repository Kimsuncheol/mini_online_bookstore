import { Box, Typography, Stack, Button, alpha } from '@mui/material'
import CampaignIcon from '@mui/icons-material/Campaign'
import AddIcon from '@mui/icons-material/Add'

interface AdvertisementHeaderProps {
  onAddAdvertisement: () => void
}

export default function AdvertisementHeader({ onAddAdvertisement }: AdvertisementHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
          <CampaignIcon />
        </Box>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Advertisement Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage hero carousel advertisements
          </Typography>
        </Box>
      </Box>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onAddAdvertisement}
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          textTransform: 'none',
          px: 3,
          py: 1.5,
          '&:hover': {
            background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8e 100%)',
          },
        }}
      >
        Add Advertisement
      </Button>
    </Box>
  )
}

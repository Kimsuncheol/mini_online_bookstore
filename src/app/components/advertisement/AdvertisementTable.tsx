import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Stack,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import { Advertisement } from '@/interfaces/advertisement'

interface AdvertisementTableProps {
  advertisements: Advertisement[]
  onEdit: (ad: Advertisement) => void
  onDelete: (adId: string) => void
  onToggleStatus: (adId: string) => void
}

export default function AdvertisementTable({
  advertisements,
  onEdit,
  onDelete,
  onToggleStatus,
}: AdvertisementTableProps) {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'grey.50' }}>
            <TableCell sx={{ fontWeight: 600 }}>Cover</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Author</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Price</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 600 }} align="right">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {advertisements.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                <Typography color="text.secondary">
                  No advertisements yet. Click &quot;Add Advertisement&quot; to create one.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            advertisements.map((ad) => (
              <TableRow key={ad.id} hover>
                <TableCell>
                  {ad.coverImageUrl ? (
                    <Box
                      component="img"
                      src={ad.coverImageUrl}
                      alt={ad.title}
                      sx={{
                        width: 48,
                        height: 64,
                        objectFit: 'cover',
                        borderRadius: 1,
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: 48,
                        height: 64,
                        bgcolor: 'grey.200',
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        No Image
                      </Typography>
                    </Box>
                  )}
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {ad.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    noWrap
                    sx={{ maxWidth: 300, display: 'block' }}
                  >
                    {ad.description}
                  </Typography>
                </TableCell>
                <TableCell>{ad.author}</TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    ${ad.price.toFixed(2)}
                  </Typography>
                  {ad.originalPrice && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ textDecoration: 'line-through' }}
                    >
                      ${ad.originalPrice.toFixed(2)}
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Chip
                    label={ad.isActive ? 'Active' : 'Inactive'}
                    size="small"
                    color={ad.isActive ? 'success' : 'default'}
                    icon={ad.isActive ? <CheckCircleIcon /> : <CancelIcon />}
                  />
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                    <IconButton
                      size="small"
                      onClick={() => onToggleStatus(ad.id)}
                      sx={{ color: ad.isActive ? 'warning.main' : 'success.main' }}
                      title={ad.isActive ? 'Deactivate' : 'Activate'}
                    >
                      {ad.isActive ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => onEdit(ad)}
                      sx={{ color: 'primary.main' }}
                      title="Edit"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => onDelete(ad.id)}
                      sx={{ color: 'error.main' }}
                      title="Delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

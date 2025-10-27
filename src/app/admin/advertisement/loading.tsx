import {
  Container,
  Box,
  Skeleton,
  Stack,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

export default function Loading() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Skeleton */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Skeleton variant="rounded" width={48} height={48} />
            <Box>
              <Skeleton width={250} height={36} />
              <Skeleton width={200} height={20} sx={{ mt: 0.5 }} />
            </Box>
          </Stack>
          <Skeleton variant="rounded" width={180} height={48} sx={{ borderRadius: 2 }} />
        </Box>

        {/* Stats Skeleton */}
        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          {[...Array(3)].map((_, i) => (
            <Paper
              key={i}
              sx={{
                flex: 1,
                p: 3,
                borderRadius: 2,
              }}
            >
              <Skeleton width={140} height={20} sx={{ mb: 1 }} />
              <Skeleton width={80} height={48} />
            </Paper>
          ))}
        </Stack>
      </Box>

      {/* Table Skeleton */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.50' }}>
              <TableCell>
                <Skeleton width={60} height={20} />
              </TableCell>
              <TableCell>
                <Skeleton width={80} height={20} />
              </TableCell>
              <TableCell>
                <Skeleton width={80} height={20} />
              </TableCell>
              <TableCell>
                <Skeleton width={60} height={20} />
              </TableCell>
              <TableCell>
                <Skeleton width={80} height={20} />
              </TableCell>
              <TableCell align="right">
                <Skeleton width={80} height={20} sx={{ ml: 'auto' }} />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton variant="rounded" width={48} height={64} />
                </TableCell>
                <TableCell>
                  <Skeleton width={200} height={20} sx={{ mb: 0.5 }} />
                  <Skeleton width={250} height={16} />
                </TableCell>
                <TableCell>
                  <Skeleton width={120} height={20} />
                </TableCell>
                <TableCell>
                  <Skeleton width={80} height={20} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="rounded" width={80} height={24} />
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Skeleton variant="circular" width={32} height={32} />
                    <Skeleton variant="circular" width={32} height={32} />
                    <Skeleton variant="circular" width={32} height={32} />
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

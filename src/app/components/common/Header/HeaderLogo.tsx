'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Box } from '@mui/material'

export default function HeaderLogo() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
    >
      <Link href="/">
        <Image
          src="/logo.png"
          alt="logo"
          width={100}
          height={80}
          style={{ objectFit: 'contain', aspectRatio: '1/0.8' }}
        />
      </Link>
    </Box>
  )
}

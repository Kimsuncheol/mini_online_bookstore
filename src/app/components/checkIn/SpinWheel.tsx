'use client'

import { useState, useMemo, useCallback } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import type { SpinWheelSlot, SpinWheelResult } from '@/interfaces/checkIn'

interface SpinWheelProps {
  onSpin?: (result: SpinWheelResult) => void
  disabled?: boolean
  spinsRemaining?: number
}

// Predefined wheel slots - no losing slots
const SPIN_WHEEL_SLOTS: SpinWheelSlot[] = [
  { id: '1', value: 0.1, probability: 20, emoji: '🎉', color: '#FFD700' },
  { id: '2', value: 0.25, probability: 20, emoji: '⭐', color: '#FF6B6B' },
  { id: '3', value: 0.5, probability: 20, emoji: '💎', color: '#4ECDC4' },
  { id: '4', value: 0.75, probability: 20, emoji: '🏆', color: '#95E1D3' },
  { id: '5', value: 1.0, probability: 20, emoji: '🎁', color: '#FFA07A' },
]

export default function SpinWheel({ onSpin, disabled = false, spinsRemaining = 1 }: SpinWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [resultDialog, setResultDialog] = useState(false)
  const [spinResult, setSpinResult] = useState<SpinWheelResult | null>(null)

  const totalProbability = useMemo(
    () => SPIN_WHEEL_SLOTS.reduce((sum, slot) => sum + slot.probability, 0),
    []
  )

  const selectRandomSlot = useCallback((): SpinWheelSlot => {
    let random = Math.random() * totalProbability
    for (const slot of SPIN_WHEEL_SLOTS) {
      random -= slot.probability
      if (random <= 0) return slot
    }
    return SPIN_WHEEL_SLOTS[0]
  }, [totalProbability])

  const handleSpin = useCallback(() => {
    if (isSpinning || disabled || spinsRemaining <= 0) return

    setIsSpinning(true)

    const selectedSlot = selectRandomSlot()
    const slotIndex = SPIN_WHEEL_SLOTS.findIndex((s) => s.id === selectedSlot.id)
    const degreesPerSlot = 360 / SPIN_WHEEL_SLOTS.length
    const targetDegrees = slotIndex * degreesPerSlot + degreesPerSlot / 2

    // Multiple rotations + target position
    const spins = 5
    const finalRotation = spins * 360 + targetDegrees
    const newRotation = rotation + finalRotation

    // Animate the spin
    setRotation(newRotation)

    // Show result after animation
    setTimeout(() => {
      setIsSpinning(false)

      const result: SpinWheelResult = {
        selected: selectedSlot,
        coupon: {
          id: `coupon_${Date.now()}`,
          userId: '',
          code: `SPIN${Date.now()}`,
          discountValue: selectedSlot.value,
          source: 'spin_wheel',
          issued: true,
          used: false,
          issuedAt: new Date(),
          description: `Spin wheel reward - $${selectedSlot.value.toFixed(2)}`,
        },
        animationDuration: 3000,
      }

      setSpinResult(result)
      setResultDialog(true)
      onSpin?.(result)
    }, 3000)
  }, [isSpinning, disabled, spinsRemaining, rotation, selectRandomSlot, onSpin])

  const handleCloseResult = () => {
    setResultDialog(false)
    setSpinResult(null)
  }

  const degreesPerSlot = 360 / SPIN_WHEEL_SLOTS.length

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {/* Wheel */}
        <Box
          sx={{
            position: 'relative',
            width: 280,
            height: 280,
            borderRadius: '50%',
            overflow: 'hidden',
            boxShadow: 4,
            border: '4px solid',
            borderColor: 'primary.main',
          }}
        >
          {/* Pointer/Indicator */}
          <Box
            sx={{
              position: 'absolute',
              top: -12,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10,
              width: 0,
              height: 0,
              borderLeft: '12px solid transparent',
              borderRight: '12px solid transparent',
              borderTop: '20px solid',
              borderTopColor: 'error.main',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
            }}
          />

          {/* Wheel Container */}
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'grid',
              gridTemplateColumns: `repeat(auto-fit, minmax(1px, 1fr))`,
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? 'transform 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
            }}
          >
            {SPIN_WHEEL_SLOTS.map((slot, index) => {
              const rotation = index * degreesPerSlot
              return (
                <Box
                  key={slot.id}
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    transformOrigin: 'center',
                    transform: `rotate(${rotation}deg)`,
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      textAlign: 'center',
                      fontWeight: 700,
                      fontSize: '14px',
                    }}
                  >
                    <Box sx={{ fontSize: '24px', mb: 0.5 }}>{slot.emoji}</Box>
                    <Box>${slot.value.toFixed(2)}</Box>
                  </Box>
                </Box>
              )
            })}

            {/* Center circle */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 60,
                height: 60,
                borderRadius: '50%',
                backgroundColor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '28px',
                zIndex: 5,
              }}
            >
              🎯
            </Box>

            {/* Segmented background */}
            <svg
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
              }}
              viewBox="0 0 280 280"
            >
              {SPIN_WHEEL_SLOTS.map((slot, index) => {
                const startAngle = (index * degreesPerSlot * Math.PI) / 180
                const endAngle = (((index + 1) * degreesPerSlot) * Math.PI) / 180
                const radius = 140

                const x1 = 140 + radius * Math.cos(startAngle)
                const y1 = 140 + radius * Math.sin(startAngle)
                const x2 = 140 + radius * Math.cos(endAngle)
                const y2 = 140 + radius * Math.sin(endAngle)

                const largeArc = degreesPerSlot > 180 ? 1 : 0

                return (
                  <path
                    key={`path-${slot.id}`}
                    d={`M 140 140 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`}
                    fill={slot.color}
                    stroke="white"
                    strokeWidth="2"
                  />
                )
              })}
            </svg>
          </Box>
        </Box>

        {/* Spin Info */}
        <Stack alignItems="center" spacing={1}>
          <Typography variant="body2" color="text.secondary">
            Spins remaining today: {spinsRemaining}
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={handleSpin}
            disabled={isSpinning || disabled || spinsRemaining <= 0}
            startIcon={<EmojiEventsIcon />}
            sx={{
              borderRadius: 2,
              px: 4,
              py: 1.5,
              fontWeight: 600,
              textTransform: 'none',
            }}
          >
            {isSpinning ? (
              <Stack direction="row" alignItems="center" gap={1}>
                <CircularProgress size={20} color="inherit" />
                Spinning...
              </Stack>
            ) : spinsRemaining <= 0 ? (
              'Come back tomorrow'
            ) : (
              'Spin Now'
            )}
          </Button>
        </Stack>
      </Box>

      {/* Result Dialog */}
      <Dialog open={resultDialog} onClose={handleCloseResult} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 700 }}>
          🎉 You Won!
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', py: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ fontSize: '80px', mb: 1 }}>
              {spinResult?.selected.emoji}
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
              ${spinResult?.selected.value.toFixed(2)}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Coupon has been added to your account
            </Typography>
          </Box>

          <Button
            variant="contained"
            fullWidth
            onClick={handleCloseResult}
            sx={{ borderRadius: 2, fontWeight: 600 }}
          >
            Great!
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

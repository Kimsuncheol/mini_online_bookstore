'use client'

import { useEffect, useRef, useState } from 'react'
import { Alert, Box, CircularProgress, Stack, Typography } from '@mui/material'

import { capturePayPalOrder, createPayPalOrder, createPayPalOrderPayload, loadPayPalScript } from '@/app/api/payment'
import type { Book } from '@/interfaces/book'
import type { PayPalApproveData, PayPalButtonsActions, PayPalButtonsOptions } from '@/interfaces/payment'

interface PayPalPaymentButtonProps {
  book: Book
  quantity: number
  disabled?: boolean
}

type PayPalButtonStatus = 'idle' | 'loading' | 'ready' | 'processing' | 'success' | 'error'

export default function PayPalPaymentButton({ book, quantity, disabled }: PayPalPaymentButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<PayPalButtonStatus>('loading')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function renderButtons() {
      if (!book || quantity <= 0) {
        setStatus('error')
        setError('A valid book and quantity are required for PayPal checkout.')
        return
      }

      if (disabled) {
        setStatus('idle')
        setError(null)
        if (containerRef.current) {
          containerRef.current.innerHTML = ''
        }
        return
      }

      setStatus('loading')
      setError(null)

      try {
        const paypal = await loadPayPalScript({ currency: book.currency || 'USD' })
        if (!isMounted || !paypal || !containerRef.current) {
          return
        }

        containerRef.current.innerHTML = ''

        const orderPayload = createPayPalOrderPayload({
          items: [{ book, quantity }],
          currencyCode: book.currency || 'USD',
          referencePrefix: 'BOOK',
        })

        const buttonOptions: PayPalButtonsOptions = {
          style: { layout: 'horizontal', label: 'paypal', color: 'gold' },
          createOrder: async (_data: unknown, actions: PayPalButtonsActions) => {
            if (actions?.order?.create) {
              return actions.order.create(orderPayload)
            }
            const order = await createPayPalOrder(orderPayload)
            return order.id
          },
          onApprove: async (data: PayPalApproveData, actions: PayPalButtonsActions) => {
            setStatus('processing')
            try {
              if (actions?.order?.capture) {
                await actions.order.capture()
              } else if (data?.orderID) {
                await capturePayPalOrder(data.orderID)
              }
              if (isMounted) {
                setStatus('success')
              }
            } catch (captureError) {
              console.error('PayPal capture error:', captureError)
              if (isMounted) {
                setStatus('error')
                setError('Unable to capture the payment. Please try again.')
              }
            }
          },
          onCancel: () => {
            if (isMounted) {
              setStatus('idle')
            }
          },
          onError: (sdkError: unknown) => {
            console.error('PayPal SDK error:', sdkError)
            if (isMounted) {
              setStatus('error')
              setError('PayPal encountered an issue. Please refresh and try again.')
            }
          },
        }

        paypal
          .Buttons(buttonOptions)
          .render(containerRef.current)
          .then(() => {
            if (isMounted) {
              setStatus('ready')
            }
          })
          .catch((renderError: unknown) => {
            console.error('PayPal render error:', renderError)
            if (isMounted) {
              setStatus('error')
              setError('Unable to render the PayPal button. Please try again later.')
            }
          })
      } catch (sdkError) {
        console.error('PayPal button initialization failed:', sdkError)
        if (isMounted) {
          setStatus('error')
          setError(
            sdkError instanceof Error ? sdkError.message : 'Failed to initialize PayPal payments.'
          )
        }
      }
    }

    renderButtons()

    return () => {
      isMounted = false
    }
  }, [book, quantity, disabled])

  useEffect(() => {
    if (status === 'success') {
      const timeout = setTimeout(() => {
        setStatus('ready')
      }, 6000)
      return () => clearTimeout(timeout)
    }
  }, [status])

  return (
    <Stack spacing={1.5}>
      <Box
        ref={containerRef}
        sx={{
          position: 'relative',
          minHeight: 48,
          '& > div': { width: '100%' },
        }}
      />
      {(status === 'loading' || status === 'processing') && (
        <Stack direction="row" spacing={1} alignItems="center">
          <CircularProgress size={20} />
          <Typography variant="body2" color="text.secondary">
            {status === 'processing' ? 'Finalizing payment...' : 'Preparing PayPal checkout...'}
          </Typography>
        </Stack>
      )}
      {status === 'success' && (
        <Alert severity="success">Payment completed successfully with PayPal.</Alert>
      )}
      {error && <Alert severity="error">{error}</Alert>}
    </Stack>
  )
}

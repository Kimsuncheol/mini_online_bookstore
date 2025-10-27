import {
  PayPalCaptureResponse,
  PayPalCreateOrderParams,
  PayPalOrderItem,
  PayPalOrderPayload,
  PayPalOrderResponse,
  PayPalPaymentItem,
  PayPalPurchaseUnit,
  PayPalNamespace,
} from '@/interfaces/payment'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'
const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
const PAYPAL_SDK_URL = 'https://www.paypal.com/sdk/js'

declare global {
  interface Window {
    paypal?: PayPalNamespace
  }
}

let paypalScriptPromise: Promise<PayPalNamespace | undefined> | null = null

/**
 * Ensures a PayPal client ID is available for the front-end SDK.
 */
export function getPayPalClientId(): string {
  if (!PAYPAL_CLIENT_ID) {
    throw new Error(
      'PayPal client ID is missing. Please set NEXT_PUBLIC_PAYPAL_CLIENT_ID in your environment.'
    )
  }
  return PAYPAL_CLIENT_ID
}

/**
 * Lazily loads the PayPal SDK script and resolves when the global paypal namespace is ready.
 */
export async function loadPayPalScript(options?: {
  clientId?: string
  currency?: string
}): Promise<PayPalNamespace> {
  if (typeof window === 'undefined') {
    throw new Error('PayPal script can only be loaded in the browser.')
  }

  if (window.paypal) {
    return window.paypal
  }

  if (!paypalScriptPromise) {
    paypalScriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      const clientId = options?.clientId ?? getPayPalClientId()
      const params = new URLSearchParams({
        'client-id': clientId,
        currency: options?.currency ?? 'USD',
        intent: 'capture',
      })

      script.src = `${PAYPAL_SDK_URL}?${params.toString()}`
      script.async = true
      script.onload = () => resolve(window.paypal)
      script.onerror = () => {
        paypalScriptPromise = null
        reject(new Error('Failed to load PayPal SDK script.'))
      }

      document.body.appendChild(script)
    })
  }

  const paypal = await paypalScriptPromise
  if (!paypal) {
    paypalScriptPromise = null
    throw new Error('PayPal SDK failed to initialize.')
  }

  return paypal
}

/**
 * Builds a PayPal order payload using book data.
 */
export function createPayPalOrderPayload(params: PayPalCreateOrderParams): PayPalOrderPayload {
  if (!params.items.length) {
    throw new Error('At least one item is required to create a PayPal order.')
  }

  const purchaseUnit = buildPurchaseUnit(params.items, params.currencyCode, params.referencePrefix)

  return {
    intent: 'CAPTURE',
    purchase_units: [purchaseUnit],
  }
}

/**
 * Calls the backend to create a PayPal order using the provided payload.
 */
export async function createPayPalOrder(
  payload: PayPalOrderPayload
): Promise<PayPalOrderResponse> {
  const response = await fetch(`${API_BASE_URL}/api/payments/paypal/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to create PayPal order' }))
    throw new Error(error.detail || 'Failed to create PayPal order')
  }

  return response.json()
}

/**
 * Captures a PayPal order after approval.
 */
export async function capturePayPalOrder(orderId: string): Promise<PayPalCaptureResponse> {
  const response = await fetch(
    `${API_BASE_URL}/api/payments/paypal/orders/${encodeURIComponent(orderId)}/capture`,
    {
      method: 'POST',
    }
  )

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to capture PayPal order' }))
    throw new Error(error.detail || 'Failed to capture PayPal order')
  }

  return response.json()
}

function buildPurchaseUnit(
  items: PayPalPaymentItem[],
  currencyCode?: string,
  referencePrefix = 'BOOK'
): PayPalPurchaseUnit {
  const sanitizedItems = items
    .map((item) => sanitizeItem(item, currencyCode))
    .filter((item): item is NonNullable<ReturnType<typeof sanitizeItem>> => Boolean(item))

  if (!sanitizedItems.length) {
    throw new Error('No valid items provided for PayPal purchase unit.')
  }

  const currency = sanitizedItems[0].unit_amount.currency_code
  const totalValue = sanitizedItems
    .reduce((sum, item) => sum + parseFloat(item.unit_amount.value) * parseInt(item.quantity, 10), 0)
    .toFixed(2)

  return {
    reference_id: `${referencePrefix}-${Date.now()}`,
    amount: {
      currency_code: currency,
      value: totalValue,
      breakdown: {
        item_total: {
          currency_code: currency,
          value: totalValue,
        },
      },
    },
    items: sanitizedItems,
  }
}

function sanitizeItem(item: PayPalPaymentItem, forcedCurrency?: string): PayPalOrderItem | null {
  const { book, quantity } = item
  if (!book || quantity <= 0) {
    return null
  }

  const currencyCode = forcedCurrency || book.currency || 'USD'

  return {
    name: book.title,
    quantity: String(quantity),
    sku: book.id,
    unit_amount: {
      currency_code: currencyCode,
      value: Number(book.price).toFixed(2),
    },
  }
}

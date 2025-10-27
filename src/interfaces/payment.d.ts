
import type { Book } from './book'

/**
 * Represents a book item that can be purchased via PayPal.
 * Uses a subset of the Book interface to keep the payload minimal.
 */
export interface PayPalPaymentItem {
  book: Pick<Book, 'id' | 'title' | 'price' | 'currency'>
  quantity: number
}

/**
 * Options used when building an order payload for PayPal.
 */
export interface PayPalCreateOrderParams {
  items: PayPalPaymentItem[]
  /**
   * Currency code defaults to USD when omitted.
   */
  currencyCode?: string
  /**
   * Optional prefix applied to the reference_id for the purchase unit.
   */
  referencePrefix?: string
}

/**
 * Individual line item inside a purchase unit sent to PayPal.
 */
export interface PayPalOrderItem {
  name: string
  quantity: string
  sku?: string
  unit_amount: {
    currency_code: string
    value: string
  }
}

/**
 * Purchase unit payload that PayPal expects when creating an order.
 */
export interface PayPalPurchaseUnit {
  reference_id: string
  amount: {
    currency_code: string
    value: string
    breakdown: {
      item_total: {
        currency_code: string
        value: string
      }
    }
  }
  items: PayPalOrderItem[]
}

/**
 * Order payload sent to the PayPal Orders API.
 */
export interface PayPalOrderPayload {
  intent: 'CAPTURE'
  purchase_units: PayPalPurchaseUnit[]
}

/**
 * Response returned when an order is created through PayPal.
 */
export interface PayPalOrderResponse {
  id: string
  status: string
}

/**
 * Response returned after capturing a PayPal order.
 */
export interface PayPalCaptureResponse {
  id: string
  status: string
  payer_email?: string
}

export interface PayPalButtonsActions {
  order?: {
    create?: (data: PayPalOrderPayload) => Promise<string> | string
    capture?: () => Promise<unknown>
  }
}

export interface PayPalApproveData {
  orderID?: string
}

export interface PayPalButtonsOptions {
  style?: Record<string, unknown>
  createOrder?: (data: unknown, actions: PayPalButtonsActions) => Promise<string> | string
  onApprove?: (data: PayPalApproveData, actions: PayPalButtonsActions) => void | Promise<void>
  onCancel?: () => void
  onError?: (error: unknown) => void
}

export interface PayPalButtonsInstance {
  render: (container: HTMLElement) => Promise<void>
}

export interface PayPalNamespace {
  Buttons: (options: PayPalButtonsOptions) => PayPalButtonsInstance
}

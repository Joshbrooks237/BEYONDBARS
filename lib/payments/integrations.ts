/**
 * Payment Integrations
 * Support for Cash App, PayPal, Venmo, and traditional payment methods
 */

export type PaymentMethod = 'cashapp' | 'paypal' | 'venmo' | 'card' | 'bank'

export interface PaymentConfig {
  method: PaymentMethod
  displayName: string
  icon: string
  processingTime: string
  feePercent: number
  minAmount: number
  maxAmount: number
  instant: boolean
}

export const paymentMethods: Record<PaymentMethod, PaymentConfig> = {
  cashapp: {
    method: 'cashapp',
    displayName: 'Cash App',
    icon: '$',
    processingTime: 'Instant',
    feePercent: 2.5,
    minAmount: 5,
    maxAmount: 1000,
    instant: true,
  },
  paypal: {
    method: 'paypal',
    displayName: 'PayPal',
    icon: 'P',
    processingTime: 'Instant',
    feePercent: 2.9,
    minAmount: 5,
    maxAmount: 10000,
    instant: true,
  },
  venmo: {
    method: 'venmo',
    displayName: 'Venmo',
    icon: 'V',
    processingTime: 'Instant',
    feePercent: 2.5,
    minAmount: 5,
    maxAmount: 5000,
    instant: true,
  },
  card: {
    method: 'card',
    displayName: 'Credit/Debit Card',
    icon: '💳',
    processingTime: 'Instant',
    feePercent: 2.9,
    minAmount: 5,
    maxAmount: 10000,
    instant: true,
  },
  bank: {
    method: 'bank',
    displayName: 'Bank Account (ACH)',
    icon: '🏦',
    processingTime: '2-3 business days',
    feePercent: 0.8,
    minAmount: 5,
    maxAmount: 50000,
    instant: false,
  },
}

/**
 * Process Cash App payment
 * In production, integrate with Cash App API or use Stripe with Cash App Pay
 */
export async function processCashAppPayment(
  amount: number,
  recipientId: string,
  metadata: Record<string, any>
) {
  // This would integrate with Cash App's API
  // For now, return mock success
  return {
    success: true,
    transactionId: `cashapp_${Date.now()}`,
    amount,
    fee: (amount * paymentMethods.cashapp.feePercent) / 100,
    status: 'completed',
    method: 'cashapp',
  }
}

/**
 * Process PayPal payment
 * In production, integrate with PayPal SDK
 */
export async function processPayPalPayment(
  amount: number,
  recipientId: string,
  metadata: Record<string, any>
) {
  // This would integrate with PayPal's API
  return {
    success: true,
    transactionId: `paypal_${Date.now()}`,
    amount,
    fee: (amount * paymentMethods.paypal.feePercent) / 100,
    status: 'completed',
    method: 'paypal',
  }
}

/**
 * Process Venmo payment
 * In production, integrate with Venmo API (owned by PayPal)
 */
export async function processVenmoPayment(
  amount: number,
  recipientId: string,
  metadata: Record<string, any>
) {
  // This would integrate with Venmo's API
  return {
    success: true,
    transactionId: `venmo_${Date.now()}`,
    amount,
    fee: (amount * paymentMethods.venmo.feePercent) / 100,
    status: 'completed',
    method: 'venmo',
  }
}

/**
 * Process card payment
 * In production, use Stripe or similar
 */
export async function processCardPayment(
  amount: number,
  recipientId: string,
  cardToken: string,
  metadata: Record<string, any>
) {
  // This would integrate with Stripe
  return {
    success: true,
    transactionId: `card_${Date.now()}`,
    amount,
    fee: (amount * paymentMethods.card.feePercent) / 100,
    status: 'completed',
    method: 'card',
  }
}

/**
 * Process ACH bank transfer
 * In production, use Stripe ACH or Plaid
 */
export async function processBankPayment(
  amount: number,
  recipientId: string,
  bankAccountId: string,
  metadata: Record<string, any>
) {
  // This would integrate with Stripe ACH or Plaid
  return {
    success: true,
    transactionId: `ach_${Date.now()}`,
    amount,
    fee: (amount * paymentMethods.bank.feePercent) / 100,
    status: 'pending', // ACH takes time
    method: 'bank',
  }
}

/**
 * Calculate total with fees
 */
export function calculateTotal(amount: number, method: PaymentMethod): {
  amount: number
  fee: number
  total: number
  feePercent: number
} {
  const config = paymentMethods[method]
  const fee = Math.round((amount * config.feePercent) / 100)
  
  return {
    amount,
    fee,
    total: amount + fee,
    feePercent: config.feePercent,
  }
}

/**
 * Validate payment amount
 */
export function validatePaymentAmount(
  amount: number,
  method: PaymentMethod
): { valid: boolean; error?: string } {
  const config = paymentMethods[method]
  
  if (amount < config.minAmount) {
    return {
      valid: false,
      error: `Minimum amount is $${config.minAmount}`,
    }
  }
  
  if (amount > config.maxAmount) {
    return {
      valid: false,
      error: `Maximum amount is $${config.maxAmount}`,
    }
  }
  
  return { valid: true }
}


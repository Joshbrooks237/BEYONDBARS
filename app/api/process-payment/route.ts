import { NextRequest, NextResponse } from 'next/server'
import {
  processCashAppPayment,
  processPayPalPayment,
  processVenmoPayment,
  processCardPayment,
  processBankPayment,
  validatePaymentAmount,
  PaymentMethod,
} from '@/lib/payments/integrations'

export async function POST(request: NextRequest) {
  try {
    const { amount, method, recipientId, metadata } = await request.json()

    // Validate inputs
    if (!amount || !method || !recipientId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate amount
    const validation = validatePaymentAmount(amount, method as PaymentMethod)
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    // Process payment based on method
    let result
    switch (method) {
      case 'cashapp':
        result = await processCashAppPayment(amount, recipientId, metadata)
        break
      case 'paypal':
        result = await processPayPalPayment(amount, recipientId, metadata)
        break
      case 'venmo':
        result = await processVenmoPayment(amount, recipientId, metadata)
        break
      case 'card':
        const { cardToken } = await request.json()
        result = await processCardPayment(amount, recipientId, cardToken, metadata)
        break
      case 'bank':
        const { bankAccountId } = await request.json()
        result = await processBankPayment(amount, recipientId, bankAccountId, metadata)
        break
      default:
        return NextResponse.json(
          { error: 'Invalid payment method' },
          { status: 400 }
        )
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Payment processing error:', error)
    return NextResponse.json(
      { error: 'Failed to process payment' },
      { status: 500 }
    )
  }
}


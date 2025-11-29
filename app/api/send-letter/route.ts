import { NextRequest, NextResponse } from 'next/server'
import { sendLetter, LetterParams } from '@/lib/mail/lob-sender'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const required = [
      'recipientName',
      'recipientInmateNumber',
      'facilityName',
      'facilityAddress',
      'senderName',
      'message'
    ]
    
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }
    
    // Prepare letter params
    const params: LetterParams = {
      recipientName: body.recipientName,
      recipientInmateNumber: body.recipientInmateNumber,
      facilityName: body.facilityName,
      facilityAddress: body.facilityAddress,
      senderName: body.senderName,
      senderAddress: body.senderAddress,
      subject: body.subject || '',
      message: body.message,
      color: body.color || false,
      doubleSided: body.doubleSided || false,
      mailType: body.mailType || 'usps_first_class'
    }
    
    // Send letter via Lob
    const result = await sendLetter(params)
    
    if (result.success) {
      // TODO: Save to database
      // - Log the letter send
      // - Update message status to "sent"
      // - Record tracking info
      
      return NextResponse.json({
        success: true,
        letterId: result.letterId,
        expectedDeliveryDate: result.expectedDeliveryDate,
        trackingUrl: result.trackingUrl,
        cost: result.cost,
        message: 'Letter sent successfully! It will be delivered in 3-5 business days.'
      })
    } else {
      return NextResponse.json(
        { error: result.error || 'Failed to send letter' },
        { status: 500 }
      )
    }
    
  } catch (error: any) {
    console.error('Send letter API error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}


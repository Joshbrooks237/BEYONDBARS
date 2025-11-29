/**
 * Lob Mail Integration
 * Send physical letters to prisons
 */

import Lob from 'lob'

// Initialize Lob client
function getLobClient() {
  const apiKey = process.env.LOB_API_KEY
  
  if (!apiKey) {
    throw new Error('LOB_API_KEY not configured')
  }
  
  return new Lob(apiKey)
}

export interface LetterParams {
  // Recipient (Inmate)
  recipientName: string
  recipientInmateNumber: string
  facilityName: string
  facilityAddress: {
    line1: string
    city: string
    state: string
    zip: string
  }
  
  // Sender
  senderName: string
  senderAddress?: {
    line1: string
    city: string
    state: string
    zip: string
  }
  
  // Message
  subject: string
  message: string
  
  // Options
  color?: boolean // black & white (cheaper) or color
  doubleSided?: boolean
  mailType?: 'usps_first_class' | 'usps_standard'
}

export interface LetterResult {
  success: boolean
  letterId?: string
  expectedDeliveryDate?: string
  trackingUrl?: string
  cost?: number
  error?: string
}

/**
 * Generate HTML for letter
 */
function generateLetterHTML(params: LetterParams): string {
  const date = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    @page {
      size: 8.5in 11in;
      margin: 0.5in;
    }
    body {
      font-family: 'Helvetica', 'Arial', sans-serif;
      font-size: 12pt;
      line-height: 1.6;
      color: #000;
    }
    .header {
      margin-bottom: 30px;
      padding-bottom: 10px;
      border-bottom: 2px solid #000;
    }
    .date {
      text-align: right;
      margin-bottom: 20px;
      font-size: 10pt;
    }
    .recipient {
      margin-bottom: 30px;
      font-weight: bold;
    }
    .subject {
      font-size: 14pt;
      font-weight: bold;
      margin-bottom: 20px;
      text-decoration: underline;
    }
    .message {
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    .signature {
      margin-top: 40px;
    }
    .footer {
      margin-top: 50px;
      padding-top: 20px;
      border-top: 1px solid #ccc;
      font-size: 9pt;
      color: #666;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="date">${date}</div>
  </div>
  
  <div class="recipient">
    To: ${params.recipientName}<br>
    Inmate #${params.recipientInmateNumber}<br>
    ${params.facilityName}
  </div>
  
  ${params.subject ? `<div class="subject">${params.subject}</div>` : ''}
  
  <div class="message">
${params.message}
  </div>
  
  <div class="signature">
    With love,<br>
    ${params.senderName}
  </div>
  
  <div class="footer">
    Letter sent via BeyondBars - Keeping families connected
  </div>
</body>
</html>
  `
}

/**
 * Send a letter via Lob
 */
export async function sendLetter(params: LetterParams): Promise<LetterResult> {
  try {
    const lob = getLobClient()
    
    // Generate letter HTML
    const html = generateLetterHTML(params)
    
    // Prepare recipient address
    const to = {
      name: `${params.recipientName} #${params.recipientInmateNumber}`,
      address_line1: params.facilityAddress.line1,
      address_city: params.facilityAddress.city,
      address_state: params.facilityAddress.state,
      address_zip: params.facilityAddress.zip,
      address_country: 'US'
    }
    
    // Prepare sender address (use default if not provided)
    const from = params.senderAddress ? {
      name: params.senderName,
      address_line1: params.senderAddress.line1,
      address_city: params.senderAddress.city,
      address_state: params.senderAddress.state,
      address_zip: params.senderAddress.zip,
      address_country: 'US'
    } : {
      name: 'BeyondBars',
      address_line1: '123 Main St', // Replace with your business address
      address_city: 'San Francisco',
      address_state: 'CA',
      address_zip: '94102',
      address_country: 'US'
    }
    
    // Send letter
    const letter = await lob.letters.create({
      to,
      from,
      file: html,
      color: params.color || false, // Black & white is cheaper
      double_sided: params.doubleSided || false,
      mail_type: params.mailType || 'usps_first_class',
      merge_variables: {}, // Can use for templating
    })
    
    return {
      success: true,
      letterId: letter.id,
      expectedDeliveryDate: letter.expected_delivery_date,
      trackingUrl: letter.url,
      cost: parseFloat(letter.price || '0')
    }
    
  } catch (error: any) {
    console.error('Lob send error:', error)
    return {
      success: false,
      error: error.message || 'Failed to send letter'
    }
  }
}

/**
 * Get letter status
 */
export async function getLetterStatus(letterId: string) {
  try {
    const lob = getLobClient()
    const letter = await lob.letters.retrieve(letterId)
    
    return {
      id: letter.id,
      status: letter.status,
      expectedDeliveryDate: letter.expected_delivery_date,
      trackingUrl: letter.url,
      trackingEvents: letter.tracking_events || []
    }
  } catch (error: any) {
    console.error('Lob status error:', error)
    return null
  }
}

/**
 * Test mode - send to your own address
 */
export async function sendTestLetter(message: string, testAddress: {
  name: string
  line1: string
  city: string
  state: string
  zip: string
}) {
  const params: LetterParams = {
    recipientName: 'Test Inmate',
    recipientInmateNumber: '12345',
    facilityName: 'Test Facility',
    facilityAddress: {
      line1: testAddress.line1,
      city: testAddress.city,
      state: testAddress.state,
      zip: testAddress.zip
    },
    senderName: 'Test Sender',
    subject: 'Test Letter',
    message: message,
    color: false,
    doubleSided: false,
    mailType: 'usps_first_class'
  }
  
  return sendLetter(params)
}

/**
 * Estimate cost
 */
export function estimateCost(params: {
  color?: boolean
  doubleSided?: boolean
  mailType?: 'usps_first_class' | 'usps_standard'
}): number {
  // Lob pricing as of 2024:
  // First Class (4-6 days): $0.69 (B&W) / $0.99 (color)
  // Standard (7-10 days): $0.53 (B&W) / $0.83 (color)
  
  const isColor = params.color || false
  const isFirstClass = params.mailType !== 'usps_standard'
  
  if (isFirstClass) {
    return isColor ? 0.99 : 0.69
  } else {
    return isColor ? 0.83 : 0.53
  }
}


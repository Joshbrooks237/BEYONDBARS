/**
 * Compliance Rules Engine
 * Validates messages and transactions against CDCR and facility-specific rules
 */

import { Message, Facility } from '../db/schema'

export interface ComplianceResult {
  passed: boolean
  violations: string[]
  warnings: string[]
}

/**
 * Validate message content against facility rules
 */
export function validateMessage(message: Message, facility: Facility): ComplianceResult {
  const violations: string[] = []
  const warnings: string[] = []

  // Check if messaging is enabled
  if (!facility.messagingEnabled) {
    violations.push('Messaging is not enabled at this facility')
  }

  // Check message length
  if (facility.maxMessageLength && message.body.length > facility.maxMessageLength) {
    violations.push(`Message exceeds maximum length of ${facility.maxMessageLength} characters`)
  }

  // Check for prohibited topics
  const messageContent = (message.subject + ' ' + message.body).toLowerCase()
  for (const topic of facility.prohibitedTopics) {
    if (messageContent.includes(topic.toLowerCase())) {
      violations.push(`Message contains prohibited topic: ${topic}`)
    }
  }

  // Check for common prohibited content patterns
  const prohibitedPatterns = [
    { pattern: /\b(escape|break\s*out)\b/i, warning: 'Possible escape-related content' },
    { pattern: /\b(drug|cocaine|heroin|meth)\b/i, warning: 'Drug-related content detected' },
    { pattern: /\b(gang|set|hood)\b/i, warning: 'Possible gang-related content' },
    { pattern: /\b(weapon|gun|knife)\b/i, warning: 'Weapon-related content detected' },
    { pattern: /\b(threaten|kill|hurt)\b/i, warning: 'Threatening language detected' },
  ]

  for (const { pattern, warning } of prohibitedPatterns) {
    if (pattern.test(messageContent)) {
      warnings.push(warning)
    }
  }

  // Check for excessive capitalization (shouting)
  const capsRatio = (message.body.match(/[A-Z]/g) || []).length / message.body.length
  if (capsRatio > 0.5 && message.body.length > 50) {
    warnings.push('Message contains excessive capitalization')
  }

  // Check for contact information (phone numbers, addresses)
  if (/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/.test(message.body)) {
    warnings.push('Message may contain phone numbers')
  }
  if (/@\w+\.\w+/.test(message.body)) {
    warnings.push('Message may contain email addresses')
  }

  return {
    passed: violations.length === 0,
    violations,
    warnings,
  }
}

/**
 * Validate transaction against facility rules
 */
export function validateTransaction(
  amount: number,
  facility: Facility
): ComplianceResult {
  const violations: string[] = []
  const warnings: string[] = []

  // Check if commissary is enabled
  if (!facility.commissaryEnabled) {
    violations.push('Commissary is not enabled at this facility')
  }

  // Check minimum amount
  if (facility.minTransactionAmount && amount < facility.minTransactionAmount) {
    violations.push(
      `Transaction amount must be at least $${(facility.minTransactionAmount / 100).toFixed(2)}`
    )
  }

  // Check maximum amount
  if (facility.maxTransactionAmount && amount > facility.maxTransactionAmount) {
    violations.push(
      `Transaction amount cannot exceed $${(facility.maxTransactionAmount / 100).toFixed(2)}`
    )
  }

  // Warn about large transactions
  if (amount > 10000) {
    // $100+
    warnings.push('Large transaction amount - may require additional verification')
  }

  return {
    passed: violations.length === 0,
    violations,
    warnings,
  }
}

/**
 * Calculate commissary fee
 */
export function calculateCommissaryFee(amount: number, facility: Facility): number {
  if (!facility.commissaryFeePercent) {
    return 0
  }
  return Math.round((amount * facility.commissaryFeePercent) / 100)
}

/**
 * Sanitize message content
 */
export function sanitizeMessage(content: string): string {
  // Remove potentially harmful content
  let sanitized = content
  
  // Remove HTML tags
  sanitized = sanitized.replace(/<[^>]*>/g, '')
  
  // Remove excessive whitespace
  sanitized = sanitized.replace(/\s+/g, ' ').trim()
  
  return sanitized
}

/**
 * Check if photo is allowed
 */
export function validatePhoto(facility: Facility, photoCount: number): ComplianceResult {
  const violations: string[] = []
  const warnings: string[] = []

  if (!facility.photoEnabled) {
    violations.push('Photo sharing is not enabled at this facility')
  }

  // Most facilities limit to 5 photos per message
  if (photoCount > 5) {
    violations.push('Maximum 5 photos per message')
  }

  return {
    passed: violations.length === 0,
    violations,
    warnings,
  }
}


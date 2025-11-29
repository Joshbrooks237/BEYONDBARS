/**
 * AI-Powered Content Scanner
 * Uses AI to scan messages for compliance with CDCR rules
 */

import { Facility } from '../db/schema'
import { ComplianceResult } from './rules'

export interface ScanResult extends ComplianceResult {
  score: number // 0-100, higher is better
  suggestions: string[]
  flaggedPhrases: Array<{
    text: string
    reason: string
    severity: 'low' | 'medium' | 'high'
  }>
}

/**
 * AI Content Scanner
 * In production, this would call OpenAI Moderation API or similar
 */
export async function scanLetterContent(
  content: string,
  facility: Facility
): Promise<ScanResult> {
  const violations: string[] = []
  const warnings: string[] = []
  const suggestions: string[] = []
  const flaggedPhrases: ScanResult['flaggedPhrases'] = []
  let score = 100

  // Simulate AI scanning with pattern matching
  // In production, integrate with OpenAI Moderation API or Claude
  
  const contentLower = content.toLowerCase()

  // HIGH SEVERITY - Automatic rejection
  const highSeverityPatterns = [
    { pattern: /\b(escape|break\s*out|get\s*out\s*of\s*here)\b/gi, reason: 'Escape-related content' },
    { pattern: /\b(smuggle|sneak\s*in|bring\s*in)\b/gi, reason: 'Contraband-related content' },
    { pattern: /\b(gang|set|hood|crew)\b/gi, reason: 'Gang-related content' },
    { pattern: /\b(threaten|gonna\s*hurt|gonna\s*kill)\b/gi, reason: 'Threatening language' },
  ]

  for (const { pattern, reason } of highSeverityPatterns) {
    const matches = content.match(pattern)
    if (matches) {
      matches.forEach(match => {
        flaggedPhrases.push({
          text: match,
          reason,
          severity: 'high'
        })
      })
      violations.push(reason + ' detected')
      score -= 30
    }
  }

  // MEDIUM SEVERITY - Review required
  const mediumSeverityPatterns = [
    { pattern: /\b(drug|cocaine|heroin|meth|weed|marijuana)\b/gi, reason: 'Drug-related terms' },
    { pattern: /\b(weapon|gun|knife|shank)\b/gi, reason: 'Weapon-related terms' },
    { pattern: /\b(deal|business|money\s*for)\b/gi, reason: 'Possible illegal activity' },
  ]

  for (const { pattern, reason } of mediumSeverityPatterns) {
    const matches = content.match(pattern)
    if (matches) {
      matches.forEach(match => {
        flaggedPhrases.push({
          text: match,
          reason,
          severity: 'medium'
        })
      })
      warnings.push(reason + ' detected')
      score -= 15
    }
  }

  // LOW SEVERITY - Minor issues
  const lowSeverityPatterns = [
    { pattern: /\b(party|celebrate)\b/gi, reason: 'May be misinterpreted' },
    { pattern: /\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/g, reason: 'Phone number detected' },
    { pattern: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, reason: 'Email address detected' },
  ]

  for (const { pattern, reason } of lowSeverityPatterns) {
    const matches = content.match(pattern)
    if (matches) {
      matches.forEach(match => {
        flaggedPhrases.push({
          text: match,
          reason,
          severity: 'low'
        })
      })
      warnings.push(reason)
      score -= 5
    }
  }

  // Check for excessive profanity
  const profanityPattern = /\b(fuck|shit|bitch|ass)\b/gi
  const profanityMatches = content.match(profanityPattern)
  if (profanityMatches) {
    if (profanityMatches.length > 3) {
      warnings.push('Excessive profanity may delay approval')
      score -= 10
    } else {
      warnings.push('Profanity detected - consider softening language')
      score -= 5
    }
  }

  // Check message length
  if (facility.maxMessageLength && content.length > facility.maxMessageLength) {
    violations.push(`Message is too long (${content.length} characters, max ${facility.maxMessageLength})`)
    suggestions.push(`Shorten your message by ${content.length - facility.maxMessageLength} characters`)
    score -= 20
  }

  // Check for all caps (shouting)
  const capsRatio = (content.match(/[A-Z]/g) || []).length / content.length
  if (capsRatio > 0.5 && content.length > 50) {
    warnings.push('Excessive capitalization detected')
    suggestions.push('Use regular capitalization - all caps may seem like shouting')
    score -= 5
  }

  // Provide helpful suggestions
  if (flaggedPhrases.length === 0 && violations.length === 0) {
    suggestions.push('Your message looks good! No compliance issues detected.')
  } else if (violations.length > 0) {
    suggestions.push('Please remove or rephrase the flagged content before sending.')
  } else if (warnings.length > 0) {
    suggestions.push('Your message may be flagged for review. Consider rephrasing the highlighted sections.')
  }

  // Ensure score doesn't go below 0
  score = Math.max(0, score)

  return {
    passed: violations.length === 0,
    violations,
    warnings,
    suggestions,
    flaggedPhrases,
    score
  }
}

/**
 * Get AI suggestions for improving message
 */
export function getImprovementSuggestions(content: string): string[] {
  const suggestions: string[] = []

  // Check if message is too short
  if (content.trim().length < 20) {
    suggestions.push('Your message is quite short. Consider sharing more about your day or asking questions.')
  }

  // Check for positive tone
  const positiveWords = ['love', 'miss', 'proud', 'hope', 'happy', 'support', 'care']
  const hasPositiveWords = positiveWords.some(word => 
    content.toLowerCase().includes(word)
  )
  
  if (!hasPositiveWords && content.length > 100) {
    suggestions.push('Consider adding encouraging or supportive language to lift their spirits.')
  }

  // Check for questions
  if (!content.includes('?')) {
    suggestions.push('Try asking a question to encourage a response.')
  }

  return suggestions
}

/**
 * Suggest alternative phrasing for flagged content
 */
export function suggestAlternatives(flaggedText: string, reason: string): string[] {
  const alternatives: string[] = []

  // Map of problematic terms to safe alternatives
  const replacements: Record<string, string[]> = {
    'gang': ['group', 'friends', 'people'],
    'escape': ['leave', 'when you get out', 'after release'],
    'drug': ['medicine', 'medication'],
    'weapon': ['item', 'thing'],
    'threaten': ['upset', 'concerned'],
  }

  const lowerText = flaggedText.toLowerCase()
  
  for (const [problem, suggestions] of Object.entries(replacements)) {
    if (lowerText.includes(problem)) {
      alternatives.push(...suggestions.map(s => 
        flaggedText.replace(new RegExp(problem, 'gi'), s)
      ))
    }
  }

  if (alternatives.length === 0) {
    alternatives.push('Consider removing or rephrasing this section')
  }

  return alternatives
}

/**
 * Real-time compliance check as user types
 */
export function quickScan(content: string): {
  isClean: boolean
  issueCount: number
} {
  const highRiskPatterns = [
    /\b(escape|gang|drug|weapon|threaten|smuggle)\b/gi,
  ]

  let issueCount = 0
  for (const pattern of highRiskPatterns) {
    const matches = content.match(pattern)
    if (matches) {
      issueCount += matches.length
    }
  }

  return {
    isClean: issueCount === 0,
    issueCount
  }
}


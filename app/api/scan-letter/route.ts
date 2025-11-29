import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

export async function POST(request: NextRequest) {
  try {
    const { content, facilityType, prohibitedTopics } = await request.json()

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message content is required' },
        { status: 400 }
      )
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      // Fallback to basic pattern matching if no API key
      return NextResponse.json(await fallbackScan(content, prohibitedTopics))
    }

    // Call OpenAI to analyze the letter
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a compassionate AI assistant helping families send compliant letters to their incarcerated loved ones. Your job is to scan letters for compliance with California Department of Corrections and Rehabilitation (CDCR) rules.

**Context**: This is a platform to help families express love and stay connected with people in prison or juvenile facilities. Your role is supportive - help them communicate while following facility rules.

**Facility Type**: ${facilityType || 'prison'}

**Rules to check**:
1. NO gang-related content (gang names, sets, affiliations)
2. NO escape plans or discussions about getting out illegally
3. NO discussion of criminal activity or illegal plans
4. NO threats or violent language
5. NO explicit sexual content
6. NO discussion of drugs, weapons, or contraband
7. NO contact information (phone numbers, addresses, social media)
${prohibitedTopics?.length ? `8. Facility-specific prohibited topics: ${prohibitedTopics.join(', ')}` : ''}

**Your response must be JSON** with this exact structure:
{
  "passed": boolean,
  "score": number (0-100),
  "violations": ["list of serious issues that must be fixed"],
  "warnings": ["list of minor concerns"],
  "suggestions": ["helpful suggestions to improve the message"],
  "flaggedPhrases": [
    {"text": "exact phrase", "reason": "why it's flagged", "severity": "high|medium|low"}
  ],
  "sentiment": "positive|neutral|negative",
  "alternativePhrasing": ["suggestions for better wording"]
}

**Be compassionate**: Remember, these are families trying to express love. Be helpful, not harsh. If something is borderline, provide warnings rather than violations.`,
        },
        {
          role: 'user',
          content: `Please scan this letter for compliance:\n\n${content}`,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    })

    const result = JSON.parse(completion.choices[0].message.content || '{}')

    // Add additional helpful suggestions if the message is clean
    if (result.passed && result.score > 80) {
      if (!result.suggestions) result.suggestions = []
      result.suggestions.push('Your message looks great! It shows love and support. 💙')
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error scanning letter:', error)
    
    // If OpenAI fails, use fallback
    const { content, prohibitedTopics } = await request.json()
    return NextResponse.json(await fallbackScan(content, prohibitedTopics))
  }
}

// Fallback scanning when OpenAI is not available
async function fallbackScan(content: string, prohibitedTopics: string[] = []) {
  const violations: string[] = []
  const warnings: string[] = []
  const suggestions: string[] = []
  const flaggedPhrases: Array<{
    text: string
    reason: string
    severity: 'low' | 'medium' | 'high'
  }> = []
  let score = 100

  const contentLower = content.toLowerCase()

  // High severity patterns
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
        flaggedPhrases.push({ text: match, reason, severity: 'high' })
      })
      violations.push(reason + ' detected')
      score -= 30
    }
  }

  // Medium severity patterns
  const mediumSeverityPatterns = [
    { pattern: /\b(drug|cocaine|heroin|meth|weed)\b/gi, reason: 'Drug-related terms' },
    { pattern: /\b(weapon|gun|knife)\b/gi, reason: 'Weapon-related terms' },
  ]

  for (const { pattern, reason } of mediumSeverityPatterns) {
    const matches = content.match(pattern)
    if (matches) {
      matches.forEach(match => {
        flaggedPhrases.push({ text: match, reason, severity: 'medium' })
      })
      warnings.push(reason + ' detected')
      score -= 15
    }
  }

  // Add helpful suggestions
  if (violations.length === 0 && warnings.length === 0) {
    suggestions.push('Your message looks good! No compliance issues detected. 💙')
  } else if (violations.length > 0) {
    suggestions.push('Please remove or rephrase the flagged content before sending.')
  } else {
    suggestions.push('Your message may be flagged for review. Consider rephrasing the highlighted sections.')
  }

  // Positive reinforcement
  if (contentLower.includes('love') || contentLower.includes('miss')) {
    suggestions.push('Your message shows love and care - that\'s beautiful! ❤️')
  }

  return {
    passed: violations.length === 0,
    score: Math.max(0, score),
    violations,
    warnings,
    suggestions,
    flaggedPhrases,
    sentiment: 'positive',
    alternativePhrasing: [],
  }
}


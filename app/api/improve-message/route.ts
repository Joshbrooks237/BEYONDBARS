import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

export async function POST(request: NextRequest) {
  try {
    const { content, issue } = await request.json()

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { 
          suggestions: [
            'OpenAI API key not configured. Please add your API key to use AI suggestions.',
          ]
        }
      )
    }

    // Ask OpenAI to suggest better phrasing
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are helping families send loving messages to incarcerated loved ones. The message has a compliance issue: "${issue}". 

Suggest 2-3 alternative ways to express the same sentiment that would be compliant with prison rules. Be warm, compassionate, and preserve the loving intent.

Respond with JSON:
{
  "suggestions": ["alternative 1", "alternative 2", "alternative 3"]
}`,
        },
        {
          role: 'user',
          content: `Help me rephrase this to be compliant:\n\n${content}`,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    })

    const result = JSON.parse(completion.choices[0].message.content || '{}')
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error improving message:', error)
    return NextResponse.json(
      { error: 'Failed to generate suggestions' },
      { status: 500 }
    )
  }
}


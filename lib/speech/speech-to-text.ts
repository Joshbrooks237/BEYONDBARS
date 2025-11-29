/**
 * Speech-to-Text Support
 * Enables voice input for messages in English and Spanish
 */

export type SpeechLanguage = 'en-US' | 'es-US' | 'es-MX'

export interface SpeechRecognitionConfig {
  language: SpeechLanguage
  continuous: boolean
  interimResults: boolean
}

// Browser Speech Recognition API
// Works in Chrome, Edge, Safari (limited)
// FREE - no API key needed!
export class SpeechToText {
  private recognition: any
  private isListening: boolean = false
  private language: SpeechLanguage

  constructor(language: SpeechLanguage = 'en-US') {
    this.language = language
    
    // Check browser support
    const SpeechRecognition = 
      (window as any).SpeechRecognition || 
      (window as any).webkitSpeechRecognition

    if (!SpeechRecognition) {
      console.warn('Speech recognition not supported in this browser')
      return
    }

    this.recognition = new SpeechRecognition()
    this.recognition.continuous = true
    this.recognition.interimResults = true
    this.recognition.lang = language
  }

  start(
    onResult: (transcript: string, isFinal: boolean) => void,
    onError?: (error: any) => void
  ) {
    if (!this.recognition) {
      onError?.(new Error('Speech recognition not supported'))
      return
    }

    this.recognition.lang = this.language

    this.recognition.onresult = (event: any) => {
      const results = event.results
      const lastResult = results[results.length - 1]
      const transcript = lastResult[0].transcript
      const isFinal = lastResult.isFinal

      onResult(transcript, isFinal)
    }

    this.recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error)
      onError?.(event.error)
    }

    this.recognition.onend = () => {
      this.isListening = false
    }

    try {
      this.recognition.start()
      this.isListening = true
    } catch (error) {
      console.error('Error starting speech recognition:', error)
      onError?.(error)
    }
  }

  stop() {
    if (this.recognition && this.isListening) {
      this.recognition.stop()
      this.isListening = false
    }
  }

  changeLanguage(language: SpeechLanguage) {
    this.language = language
    if (this.recognition) {
      this.recognition.lang = language
    }
  }

  isSupported(): boolean {
    return !!(
      (window as any).SpeechRecognition || 
      (window as any).webkitSpeechRecognition
    )
  }

  getIsListening(): boolean {
    return this.isListening
  }
}

// Helper function for use in React components
export function useSpeechToText() {
  if (typeof window === 'undefined') {
    return { isSupported: false }
  }

  const SpeechRecognition = 
    (window as any).SpeechRecognition || 
    (window as any).webkitSpeechRecognition

  return {
    isSupported: !!SpeechRecognition,
    SpeechToText
  }
}

// Language configurations
export const speechLanguages = {
  'en-US': {
    code: 'en-US',
    name: 'English (US)',
    flag: '🇺🇸',
  },
  'es-US': {
    code: 'es-US',
    name: 'Español (US)',
    flag: '🇺🇸',
  },
  'es-MX': {
    code: 'es-MX',
    name: 'Español (México)',
    flag: '🇲🇽',
  },
}

// Future: Google Cloud Speech-to-Text integration
// More accurate, supports more languages, but requires API key
export async function googleSpeechToText(
  audioBlob: Blob,
  language: string = 'en-US'
): Promise<string> {
  // This would call Google Cloud Speech-to-Text API
  // Requires API key and backend integration
  
  const formData = new FormData()
  formData.append('audio', audioBlob)
  formData.append('language', language)

  const response = await fetch('/api/speech-to-text', {
    method: 'POST',
    body: formData,
  })

  const result = await response.json()
  return result.transcript
}


'use client'

import { useState, useEffect, useRef } from 'react'
import { Mic, Volume2 } from 'lucide-react'
import { SpeechToText, SpeechLanguage } from '@/lib/speech/speech-to-text'

interface SpeechToTextButtonProps {
  onTranscript: (text: string) => void
  language?: SpeechLanguage
  buttonText?: string
  className?: string
  mode?: 'toggle' | 'hold' // toggle = click to start/stop, hold = hold down to record
}

export default function SpeechToTextButton({
  onTranscript,
  language = 'en-US',
  buttonText,
  className = '',
  mode = 'hold' // Default to hold-down mode
}: SpeechToTextButtonProps) {
  const [isListening, setIsListening] = useState(false)
  const [speechToText, setSpeechToText] = useState<SpeechToText | null>(null)
  const [isSupported, setIsSupported] = useState(true)
  const [interimTranscript, setInterimTranscript] = useState('')
  const [fullTranscript, setFullTranscript] = useState('')
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Initialize speech recognition
    if (typeof window !== 'undefined') {
      const stt = new SpeechToText(language)
      setSpeechToText(stt)
      setIsSupported(stt.isSupported())
    }

    // Cleanup on unmount
    return () => {
      if (speechToText) {
        speechToText.stop()
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [language])

  const startListening = () => {
    if (!speechToText) return
    
    setFullTranscript('')
    setInterimTranscript('')

    speechToText.start(
      (transcript, isFinal) => {
        if (isFinal) {
          // Add to full transcript
          setFullTranscript(prev => prev + (prev ? ' ' : '') + transcript)
          setInterimTranscript('')
        } else {
          // Show interim results
          setInterimTranscript(transcript)
        }
      },
      (error) => {
        console.error('Speech recognition error:', error)
        setIsListening(false)
        setInterimTranscript('')
        
        // User-friendly error messages
        if (error === 'not-allowed' || error === 'permission-denied') {
          alert('Please allow microphone access in your browser settings.')
        } else if (error === 'no-speech') {
          // This is normal - just means user stopped talking
        } else {
          alert('Microphone error. Please check your microphone and try again.')
        }
      }
    )

    setIsListening(true)
  }

  const stopListening = () => {
    if (speechToText) {
      speechToText.stop()
      setIsListening(false)
      
      // Add any final transcript to the message
      const finalText = fullTranscript + (fullTranscript && interimTranscript ? ' ' : '') + interimTranscript
      if (finalText.trim()) {
        onTranscript(finalText.trim())
      }
      
      setInterimTranscript('')
      setFullTranscript('')
    }
  }

  // Hold-down handlers (push-to-talk)
  const handleMouseDown = () => {
    if (mode === 'hold') {
      startListening()
    }
  }

  const handleMouseUp = () => {
    if (mode === 'hold') {
      stopListening()
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault() // Prevent scrolling on mobile
    if (mode === 'hold') {
      startListening()
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault()
    if (mode === 'hold') {
      stopListening()
    }
  }

  // Toggle mode handler
  const handleClick = () => {
    if (mode === 'toggle') {
      if (isListening) {
        stopListening()
      } else {
        startListening()
      }
    }
  }

  if (!isSupported) {
    return (
      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800 font-semibold mb-1">
          Voice input not available
        </p>
        <p className="text-xs text-yellow-700">
          Please use Chrome, Edge, or Safari for voice input.
        </p>
      </div>
    )
  }

  const currentTranscript = fullTranscript + (fullTranscript && interimTranscript ? ' ' : '') + interimTranscript

  return (
    <div className="space-y-3">
      {/* Big Hold-Down Button */}
      <button
        type="button"
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // Stop if mouse leaves button while held
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`${className} ${
          isListening
            ? 'bg-red-500 hover:bg-red-600 scale-110 shadow-2xl ring-4 ring-red-300'
            : 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg'
        } text-white font-bold py-6 px-8 rounded-2xl transition-all transform active:scale-95 flex flex-col items-center justify-center space-y-2 select-none touch-none relative overflow-hidden`}
      >
        {/* Animated background pulse when listening */}
        {isListening && (
          <div className="absolute inset-0 bg-red-400 animate-ping opacity-75 rounded-2xl"></div>
        )}
        
        <div className="relative z-10 flex flex-col items-center">
          <Mic className={`h-12 w-12 mb-2 ${isListening ? 'animate-pulse' : ''}`} />
          <span className="text-xl">
            {isListening ? (
              mode === 'hold' ? '🎤 Release to Stop' : '🎤 Recording...'
            ) : (
              buttonText || (mode === 'hold' ? '🎤 Hold to Speak' : '🎤 Tap to Speak')
            )}
          </span>
        </div>
      </button>

      {/* Instructions */}
      {!isListening && mode === 'hold' && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-800 font-semibold mb-1">
            💡 How to use:
          </p>
          <ol className="text-xs text-blue-700 space-y-1 ml-4">
            <li>1. Press and HOLD the button</li>
            <li>2. Speak clearly into your microphone</li>
            <li>3. Release when you're done speaking</li>
            <li>4. Your words will appear in the message!</li>
          </ol>
        </div>
      )}

      {!isListening && mode === 'toggle' && (
        <p className="text-sm text-gray-600 text-center">
          Tap to start recording. Tap again to stop.
        </p>
      )}

      {/* Live transcript display */}
      {(isListening || currentTranscript) && (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-4 shadow-inner">
          <div className="flex items-start space-x-3">
            {isListening && (
              <Volume2 className="h-6 w-6 text-green-600 mt-1 animate-pulse flex-shrink-0" />
            )}
            <div className="flex-1">
              <p className="text-xs text-green-700 font-semibold mb-1">
                {isListening ? '🎤 You\'re saying:' : '✅ You said:'}
              </p>
              <p className="text-lg text-gray-800 leading-relaxed">
                {currentTranscript || '...'}
              </p>
              {isListening && interimTranscript && (
                <p className="text-xs text-green-600 mt-2 italic">
                  (Keep talking... still listening)
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Listening indicator */}
      {isListening && mode === 'hold' && (
        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-3 text-center animate-pulse">
          <p className="text-sm text-red-700 font-bold">
            🔴 RECORDING - Keep holding the button!
          </p>
        </div>
      )}

      {/* Success message */}
      {!isListening && fullTranscript && (
        <div className="bg-green-50 border-2 border-green-300 rounded-lg p-3 text-center">
          <p className="text-sm text-green-700 font-semibold">
            ✅ Added to your message!
          </p>
        </div>
      )}
    </div>
  )
}


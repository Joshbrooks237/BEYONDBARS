'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Heart, Send, Star, Smile, Sun, Mic } from 'lucide-react'
import SpeechToTextButton from '@/components/SpeechToTextButton'

// Pre-written templates for kids
const kidsTemplates = [
  {
    id: 1,
    title: "I Love You",
    emoji: "❤️",
    message: "Dear {parent},\n\nI love you so much! I miss you every day. I think about you all the time.\n\nLove,\n{child}"
  },
  {
    id: 2,
    title: "I Miss You",
    emoji: "🥺",
    message: "Hi {parent}!\n\nI miss you a lot. I can't wait to see you again. I think about you every day.\n\nHugs and kisses,\n{child}"
  },
  {
    id: 3,
    title: "Good News!",
    emoji: "🎉",
    message: "Dear {parent},\n\nI wanted to tell you some good news! [Tell your parent something good that happened]\n\nI hope you're doing good too!\n\nLove,\n{child}"
  },
  {
    id: 4,
    title: "School Update",
    emoji: "📚",
    message: "Hi {parent}!\n\nSchool is going good. I'm learning a lot. [Tell about your favorite subject or what you're learning]\n\nI wish you could see my work! I'm doing my best.\n\nLove,\n{child}"
  },
  {
    id: 5,
    title: "Thinking of You",
    emoji: "💭",
    message: "Dear {parent},\n\nI'm thinking about you today. I remember when we [share a happy memory together].\n\nI can't wait to make more happy memories with you.\n\nLove always,\n{child}"
  },
  {
    id: 6,
    title: "I'm Proud of You",
    emoji: "⭐",
    message: "Hi {parent}!\n\nI want you to know that I'm proud of you. You're my {parent} and I love you no matter what.\n\nStay strong!\n\nLove,\n{child}"
  }
]

export default function KidsModePage() {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const [message, setMessage] = useState('')
  const [childName, setChildName] = useState('')
  const [parentName, setParentName] = useState('')
  const [drawing, setDrawing] = useState(false)

  const handleTemplateSelect = (template: typeof kidsTemplates[0]) => {
    setSelectedTemplate(template.id)
    const customMessage = template.message
      .replace('{parent}', parentName || 'Mom/Dad')
      .replace('{child}', childName || 'Your Child')
    setMessage(customMessage)
  }

  const handleSend = () => {
    alert(`Great job! Your message will be sent to ${parentName || 'your parent'}. They're going to love it! ❤️`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Kid-Friendly Header */}
      <nav className="bg-white border-b-4 border-primary-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/dashboard" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-6 w-6" />
              <span className="text-lg">Back</span>
            </Link>
            <div className="flex items-center space-x-3">
              <Heart className="h-10 w-10 text-pink-500" />
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Kids Mode
              </span>
            </div>
            <Link href="/messages/kids-es" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Español
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message for Kids */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📝 Write to Your Parent! 💌
          </h1>
          <p className="text-xl text-gray-700">
            Let them know you love them and miss them!
          </p>
        </div>

        {/* Step 1: Names */}
        {(!childName || !parentName) && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border-4 border-purple-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Star className="h-8 w-8 text-yellow-400 mr-3" />
              First, let's get started!
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  What's your name?
                </label>
                <input
                  type="text"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="Your name"
                  className="w-full text-xl border-4 border-purple-200 rounded-xl px-6 py-4 focus:ring-4 focus:ring-purple-300 focus:border-purple-400"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  What do you call your parent?
                </label>
                <input
                  type="text"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="Mom, Dad, Mommy, Papa, etc."
                  className="w-full text-xl border-4 border-purple-200 rounded-xl px-6 py-4 focus:ring-4 focus:ring-purple-300 focus:border-purple-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Template Selection */}
        {childName && parentName && !selectedTemplate && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border-4 border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Smile className="h-8 w-8 text-blue-500 mr-3" />
              Choose a message to start with:
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {kidsTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template)}
                  className="bg-gradient-to-br from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 rounded-2xl p-6 text-left transition-all transform hover:scale-105 border-4 border-transparent hover:border-purple-300"
                >
                  <div className="text-5xl mb-3">{template.emoji}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {template.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Click to use this message
                  </p>
                </button>
              ))}
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setSelectedTemplate(-1)
                  setMessage(`Dear ${parentName},\n\n\n\nLove,\n${childName}`)
                }}
                className="text-lg text-purple-600 hover:text-purple-700 font-semibold"
              >
                Or write your own message from scratch →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Edit Message */}
        {selectedTemplate && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 border-4 border-green-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Sun className="h-8 w-8 text-yellow-500 mr-3" />
                Your message for {parentName}:
              </h2>

              <div className="mb-6">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={12}
                  className="w-full text-xl border-4 border-green-200 rounded-xl px-6 py-4 focus:ring-4 focus:ring-green-300 focus:border-green-400 font-sans leading-relaxed"
                  placeholder="Write your message here..."
                />
                <p className="text-sm text-gray-600 mt-2">
                  💡 Tip: You can add or change anything you want!
                </p>
              </div>

              {/* Speech-to-Text - Kid Friendly */}
              <div className="mb-6 bg-gradient-to-br from-purple-100 to-pink-100 border-4 border-purple-300 rounded-2xl p-6 shadow-lg">
                <h4 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
                  <Mic className="h-7 w-7 text-purple-600 mr-2" />
                  Can't type? Just talk! 🗣️
                </h4>
                <p className="text-sm text-gray-700 mb-4">
                  Press and hold the button, then speak. Let go when you're done!
                </p>
                <SpeechToTextButton
                  language="en-US"
                  mode="hold"
                  onTranscript={(text) => {
                    // Add spoken text to message
                    setMessage(prev => prev + (prev ? ' ' : '') + text)
                  }}
                  buttonText="Hold to Speak"
                  className="w-full"
                />
              </div>

              {/* Helper Prompts for Kids */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
                <h4 className="font-bold text-gray-900 mb-2">Need ideas? Add things like:</h4>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>• What you did today</li>
                  <li>• Something fun at school</li>
                  <li>• A happy memory with them</li>
                  <li>• How you're feeling</li>
                  <li>• What you want to do when you see them again</li>
                </ul>
              </div>

              {/* Drawing Option */}
              <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4 mb-6">
                <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                  🎨 Want to add a drawing?
                </h4>
                <p className="text-sm text-gray-700 mb-3">
                  Ask a grown-up to help you take a picture of your drawing and add it to your letter!
                </p>
                <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-lg">
                  Add Drawing (Coming Soon!)
                </button>
              </div>

              {/* Send Button */}
              <button
                onClick={handleSend}
                disabled={message.length < 20}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-2xl font-bold py-6 px-8 rounded-2xl shadow-lg transform transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3"
              >
                <Send className="h-8 w-8" />
                <span>Send to {parentName}! 💌</span>
              </button>

              {message.length < 20 && (
                <p className="text-center text-red-600 mt-3 font-semibold">
                  Your message needs to be a little longer!
                </p>
              )}
            </div>

            {/* Encouragement */}
            <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-6 text-center border-4 border-pink-200">
              <p className="text-xl font-bold text-gray-900 mb-2">
                ⭐ You're doing great! ⭐
              </p>
              <p className="text-gray-700">
                {parentName} is going to be so happy to get your message! They love you very much. ❤️
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


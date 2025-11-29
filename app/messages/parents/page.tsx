'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Heart, Send, AlertCircle, Lightbulb, BookOpen, Mic } from 'lucide-react'
import SpeechToTextButton from '@/components/SpeechToTextButton'

// Templates for parents writing to youth in juvenile facilities
const parentTemplates = [
  {
    id: 1,
    title: "I Love You No Matter What",
    category: "Unconditional Love",
    message: "Dear {child},\n\nI love you. That will never change, no matter what. You are my {son/daughter} and nothing can break that bond.\n\nI'm here for you. I'm not going anywhere. We will get through this together.\n\nLove always,\n{parent}"
  },
  {
    id: 2,
    title: "I'm Proud of Your Strength",
    category: "Encouragement",
    message: "Dear {child},\n\nI want you to know that I see how hard you're trying. I'm proud of the choices you're making now. Every day is a new chance.\n\nYou are stronger than you think. Keep your head up and stay focused on your future. I believe in you.\n\nWith love and pride,\n{parent}"
  },
  {
    id: 3,
    title: "We Miss You at Home",
    category: "Family Connection",
    message: "Hi {child},\n\nWe miss you so much at home. {sibling/family member} asks about you all the time. We talk about you every day.\n\n[Share a small family update - but keep it light and positive]\n\nWe're counting the days until you're home with us again.\n\nLove,\n{parent}"
  },
  {
    id: 4,
    title: "I'm Here to Listen",
    category: "Support",
    message: "Dear {child},\n\nHow are you doing? Really - how are you feeling? You can always be honest with me.\n\nI'm here to listen, not to judge. Whatever you're going through, we can talk about it. You're not alone in this.\n\nI love you,\n{parent}"
  },
  {
    id: 5,
    title: "Looking Forward Together",
    category: "Hope & Future",
    message: "Hi {child},\n\nI've been thinking about the future - your future. You have so much ahead of you. This is just one chapter, not your whole story.\n\nLet's talk about what you want to do when you get home. What are you interested in? What are your goals? I want to support your dreams.\n\nWe'll build that future together.\n\nLove,\n{parent}"
  },
  {
    id: 6,
    title: "I Forgive You, I Love You",
    category: "Healing",
    message: "Dear {child},\n\nI forgive you. I want you to know that. Whatever hurt or anger I felt, I'm choosing love. You are my {son/daughter} and I love you.\n\nI hope you can forgive yourself too. We all make mistakes. What matters now is how we move forward.\n\nI'm with you every step of the way.\n\nLove,\n{parent}"
  },
  {
    id: 7,
    title: "You're Not Defined By This",
    category: "Identity",
    message: "Dear {child},\n\nYou are not your mistakes. You are not this place. You are {child's name} - a person with value, worth, and a future.\n\nI see who you really are. I see your heart, your potential, your goodness. That's what defines you.\n\nNever forget who you are.\n\nLove,\n{parent}"
  },
  {
    id: 8,
    title: "Keep Learning & Growing",
    category: "Personal Growth",
    message: "Hi {child},\n\nI hope you're taking advantage of the programs and classes there. Education and learning are things no one can ever take from you.\n\nEverything you learn now is building your future. I'm so proud when I hear about you participating and trying.\n\nKeep growing. Keep learning. I'm cheering for you.\n\nLove,\n{parent}"
  }
]

const guidanceTopics = [
  {
    title: "What NOT to Say",
    icon: "⚠️",
    tips: [
      "Avoid: \"How could you do this to me?\" - It's not about you",
      "Avoid: \"You've ruined your life\" - They need hope, not despair",
      "Avoid: \"Everyone is so ashamed\" - Focus on love, not shame",
      "Avoid: Comparing them to other siblings or friends",
      "Avoid: Threatening to give up on them"
    ]
  },
  {
    title: "What TO Say",
    icon: "✅",
    tips: [
      "\"I love you no matter what\"",
      "\"I believe in you and your future\"",
      "\"We will get through this together\"",
      "\"I'm proud of the positive choices you're making now\"",
      "\"You are more than your worst moment\""
    ]
  },
  {
    title: "How to Support",
    icon: "💪",
    tips: [
      "Be consistent - write regularly",
      "Share small family updates (keep them light)",
      "Ask about their day and really listen",
      "Celebrate small victories",
      "Talk about the future with hope"
    ]
  }
]

export default function ParentsModePage() {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const [message, setMessage] = useState('')
  const [childName, setChildName] = useState('')
  const [relationship, setRelationship] = useState('son')
  const [parentName, setParentName] = useState('')
  const [showGuidance, setShowGuidance] = useState(false)

  const handleTemplateSelect = (template: typeof parentTemplates[0]) => {
    setSelectedTemplate(template.id)
    let customMessage = template.message
      .replace('{child}', childName || 'my child')
      .replace('{son/daughter}', relationship)
      .replace('{child\'s name}', childName || 'you')
      .replace('{parent}', parentName || 'Mom/Dad')
    
    customMessage = customMessage.replace('{sibling/family member}', '[sibling/family member name]')
    setMessage(customMessage)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/dashboard" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </Link>
            <div className="flex items-center space-x-3">
              <Heart className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Parents Mode</span>
            </div>
            <div className="w-24"></div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Message */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 border-l-4 border-blue-600">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Writing to Your Child in Juvenile Detention
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            This is hard. You're going through something no parent should face. But your child needs you now more than ever.
          </p>
          <p className="text-gray-700">
            <strong>Your love matters.</strong> Your words can be a lifeline. We're here to help you write messages that 
            show unconditional love, provide hope, and support their growth.
          </p>
          
          <button
            onClick={() => setShowGuidance(!showGuidance)}
            className="mt-4 text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-2"
          >
            <BookOpen className="h-5 w-5" />
            <span>{showGuidance ? 'Hide' : 'Show'} Parent Guidance</span>
          </button>
        </div>

        {/* Guidance Section */}
        {showGuidance && (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {guidanceTopics.map((topic, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-blue-500">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-3xl mr-3">{topic.icon}</span>
                  {topic.title}
                </h3>
                <ul className="space-y-2">
                  {topic.tips.map((tip, tipIdx) => (
                    <li key={tipIdx} className="text-sm text-gray-700">
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Names Input */}
        {(!childName || !parentName) && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Let's personalize your message</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your child's name
                </label>
                <input
                  type="text"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="e.g., Marcus"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your child is your
                </label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="son">Son</option>
                  <option value="daughter">Daughter</option>
                  <option value="child">Child</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sign as
                </label>
                <input
                  type="text"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="Mom, Dad, etc."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Template Selection */}
        {childName && parentName && !selectedTemplate && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Choose a message type to start</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {parentTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template)}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-lg p-6 text-left transition-all border-2 border-transparent hover:border-blue-400"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">
                      {template.title}
                    </h3>
                    <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                      {template.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {template.message.substring(0, 100)}...
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message Editor */}
        {selectedTemplate && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Your message to {childName}</h2>
                <button
                  onClick={() => {
                    setSelectedTemplate(null)
                    setMessage('')
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Choose different template
                </button>
              </div>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={14}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg leading-relaxed"
              />

              {/* Speech-to-Text for Parents */}
              <div className="mt-4 bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-300 rounded-xl p-5">
                <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                  <Mic className="h-5 w-5 text-indigo-600 mr-2" />
                  Prefer to speak? Express yourself with your voice
                </h4>
                <p className="text-sm text-gray-700 mb-4">
                  Sometimes it's easier to say what's in your heart than to type it. Hold the button and speak.
                </p>
                <SpeechToTextButton
                  language="en-US"
                  mode="hold"
                  onTranscript={(text) => {
                    setMessage(prev => prev + (prev ? ' ' : '') + text)
                  }}
                  buttonText="Hold to Speak"
                  className="w-full"
                />
              </div>

              {/* Writing Tips for Parents */}
              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <Lightbulb className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Writing Tips</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Lead with love, not disappointment</li>
                        <li>• Focus on the future, not the past</li>
                        <li>• Be specific: "I'm proud you finished that class"</li>
                        <li>• Share light family news (not heavy stuff)</li>
                        <li>• End with hope and encouragement</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Remember</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Your child is still developing (teen brain!)</li>
                        <li>• They need your love more than lectures</li>
                        <li>• Small encouragements = big impact</li>
                        <li>• Consistency matters - write regularly</li>
                        <li>• You're modeling resilience and love</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Send Button */}
              <div className="mt-6">
                <button
                  onClick={() => alert(`Your message will be sent to ${childName}. You're doing the right thing by staying connected. ❤️`)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>Send Message to {childName}</span>
                </button>
              </div>
            </div>

            {/* Support Resources */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border-2 border-purple-200">
              <h3 className="font-bold text-gray-900 mb-3">💜 You're Not Alone</h3>
              <p className="text-gray-700 mb-4">
                Being a parent of a child in juvenile detention is incredibly difficult. Your feelings are valid. 
                Reach out for support if you need it.
              </p>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Resources:</strong></p>
                <p>• National Alliance on Mental Illness (NAMI): 1-800-950-NAMI</p>
                <p>• Family & Corrections Network</p>
                <p>• Local family support groups</p>
                <p>• Juvenile facility family services</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


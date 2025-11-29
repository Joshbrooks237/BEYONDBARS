'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Send, AlertCircle, CheckCircle, Loader2, Sparkles } from 'lucide-react'

// Mock data - in production, this would come from API
const mockInmates = [
  {
    id: '1',
    name: 'John Doe',
    inmateNumber: 'A12345',
    facility: 'California State Prison, Los Angeles County',
    facilityId: 'facility_1'
  }
]

const mockFacility = {
  name: 'California State Prison, Los Angeles County',
  maxMessageLength: 2000,
  approvalTimeHours: 48,
  prohibitedTopics: ['gang activity', 'escape plans', 'criminal activity']
}

interface FlaggedPhrase {
  text: string
  reason: string
  severity: 'low' | 'medium' | 'high'
}

export default function NewMessagePage() {
  const [selectedInmate, setSelectedInmate] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [scanning, setScanning] = useState(false)
  const [scanResult, setScanResult] = useState<any>(null)
  const [showAIHelp, setShowAIHelp] = useState(false)

  // Real-time quick scan
  const [quickScanResult, setQuickScanResult] = useState({ isClean: true, issueCount: 0 })

  useEffect(() => {
    // Quick scan as user types
    const timer = setTimeout(() => {
      if (body.length > 10) {
        const result = performQuickScan(body)
        setQuickScanResult(result)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [body])

  const performQuickScan = (content: string) => {
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

  const handleAIScan = async () => {
    setScanning(true)
    setScanResult(null)

    try {
      // Call OpenAI API to scan the letter
      const response = await fetch('/api/scan-letter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: subject + '\n\n' + body,
          facilityType: 'prison',
          prohibitedTopics: mockFacility.prohibitedTopics,
        }),
      })

      const result = await response.json()
      setScanResult(result)
    } catch (error) {
      console.error('Error scanning letter:', error)
      setScanResult({
        passed: false,
        score: 0,
        violations: ['Failed to scan letter. Please try again.'],
        warnings: [],
        suggestions: ['There was an error scanning your letter. Please try again.'],
        flaggedPhrases: []
      })
    } finally {
      setScanning(false)
    }
  }

  const handleSend = async () => {
    if (!scanResult || !scanResult.passed) {
      alert('Please scan your message and fix any issues before sending.')
      return
    }

    if (!selectedInmate) {
      alert('Please select a contact.')
      return
    }

    // Show confirmation
    const confirmed = confirm(
      `Ready to send your letter!\n\n` +
      `To: ${mockInmates[0].name}\n` +
      `Facility: ${mockInmates[0].facility}\n\n` +
      `Your letter will be:\n` +
      `✓ Professionally printed\n` +
      `✓ Mailed via USPS First Class\n` +
      `✓ Delivered in 3-5 business days\n\n` +
      `Cost: $0.69 (printing + postage)\n\n` +
      `Send now?`
    )

    if (!confirmed) return

    try {
      // Call Lob API to send physical letter
      const response = await fetch('/api/send-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientName: mockInmates[0].name,
          recipientInmateNumber: mockInmates[0].inmateNumber,
          facilityName: mockInmates[0].facility,
          facilityAddress: {
            line1: '44750 60th Street West', // From facility database
            city: 'Lancaster',
            state: 'CA',
            zip: '93536'
          },
          senderName: 'Your Name', // Replace with actual user
          subject: subject,
          message: body,
          color: false,
          mailType: 'usps_first_class'
        })
      })

      const result = await response.json()

      if (result.success) {
        alert(
          `✅ Letter Sent Successfully!\n\n` +
          `Your letter is on its way!\n\n` +
          `Expected Delivery: ${result.expectedDeliveryDate}\n` +
          `Tracking: ${result.trackingUrl}\n` +
          `Cost: $${result.cost?.toFixed(2)}\n\n` +
          `${mockInmates[0].name} will receive your letter in 3-5 days! ❤️`
        )
        
        // Clear form
        setSubject('')
        setBody('')
        setScanResult(null)
      } else {
        alert(`Error sending letter: ${result.error}`)
      }
    } catch (error) {
      console.error('Send error:', error)
      alert('Failed to send letter. Please try again.')
    }
  }

  const getSeverityColor = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50'
      case 'medium': return 'text-yellow-600 bg-yellow-50'
      case 'low': return 'text-blue-600 bg-blue-50'
    }
  }

  const characterCount = body.length
  const maxChars = mockFacility.maxMessageLength

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/dashboard" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">New Message</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* AI Scanning Info Banner */}
        <div className="mb-6 bg-primary-50 border border-primary-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Sparkles className="h-5 w-5 text-primary-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-primary-900 mb-1">AI-Powered Compliance Check</h3>
              <p className="text-sm text-primary-700">
                Our AI will scan your letter to make sure it follows facility rules. This helps your message get approved faster!
              </p>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          {/* Recipient Selection */}
          <div className="mb-6">
            <label htmlFor="inmate" className="block text-sm font-medium text-gray-700 mb-2">
              Send to
            </label>
            <select
              id="inmate"
              value={selectedInmate}
              onChange={(e) => setSelectedInmate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Select a contact</option>
              {mockInmates.map((inmate) => (
                <option key={inmate.id} value={inmate.id}>
                  {inmate.name} - {inmate.inmateNumber} ({inmate.facility})
                </option>
              ))}
            </select>
          </div>

          {selectedInmate && (
            <>
              {/* Facility Rules */}
              <div className="mb-6 bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Facility Rules</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Max length: {maxChars} characters</li>
                  <li>• Approval time: ~{mockFacility.approvalTimeHours} hours</li>
                  <li>• Prohibited: {mockFacility.prohibitedTopics.join(', ')}</li>
                </ul>
              </div>

              {/* Subject */}
              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Thinking of you"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              {/* Message Body */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="body" className="block text-sm font-medium text-gray-700">
                    Your Message
                  </label>
                  <div className="flex items-center space-x-2">
                    {!quickScanResult.isClean && (
                      <span className="text-xs text-yellow-600">
                        ⚠️ {quickScanResult.issueCount} potential issue{quickScanResult.issueCount > 1 ? 's' : ''}
                      </span>
                    )}
                    <span className={`text-sm ${characterCount > maxChars ? 'text-red-600 font-semibold' : 'text-gray-500'}`}>
                      {characterCount} / {maxChars}
                    </span>
                  </div>
                </div>
                <textarea
                  id="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Hi, I hope you're doing well. I wanted to let you know that I'm thinking of you and missing you. The family is all good..."
                  rows={12}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono text-sm"
                />
              </div>

              {/* Writing Tips */}
              <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2 text-sm">✍️ Writing Tips</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Be positive and encouraging</li>
                  <li>• Share family updates and good news</li>
                  <li>• Ask questions to encourage responses</li>
                  <li>• Avoid discussing legal matters or facility operations</li>
                </ul>
              </div>

              {/* AI Scan Button */}
              <div className="mb-6">
                <button
                  onClick={handleAIScan}
                  disabled={!body.trim() || scanning}
                  className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {scanning ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Scanning your letter...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      <span>Scan Letter with AI</span>
                    </>
                  )}
                </button>
              </div>

              {/* Scan Results */}
              {scanResult && (
                <div className="mb-6">
                  <div className={`rounded-lg p-6 ${scanResult.passed ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                    <div className="flex items-start space-x-3 mb-4">
                      {scanResult.passed ? (
                        <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                      ) : (
                        <AlertCircle className="h-6 w-6 text-red-600 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <h3 className={`font-semibold text-lg mb-1 ${scanResult.passed ? 'text-green-900' : 'text-red-900'}`}>
                          {scanResult.passed ? 'Message looks good!' : 'Issues found'}
                        </h3>
                        <p className={`text-sm ${scanResult.passed ? 'text-green-700' : 'text-red-700'}`}>
                          Compliance Score: {scanResult.score}/100
                        </p>
                      </div>
                    </div>

                    {/* Violations */}
                    {scanResult.violations.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-red-900 mb-2">⛔ Must Fix:</h4>
                        <ul className="space-y-2">
                          {scanResult.violations.map((violation: string, idx: number) => (
                            <li key={idx} className="text-sm text-red-800 bg-red-100 rounded px-3 py-2">
                              {violation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Warnings */}
                    {scanResult.warnings.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Warnings:</h4>
                        <ul className="space-y-2">
                          {scanResult.warnings.map((warning: string, idx: number) => (
                            <li key={idx} className="text-sm text-yellow-800 bg-yellow-100 rounded px-3 py-2">
                              {warning}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Flagged Phrases */}
                    {scanResult.flaggedPhrases.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">🔍 Flagged Content:</h4>
                        <div className="space-y-2">
                          {scanResult.flaggedPhrases.map((phrase: FlaggedPhrase, idx: number) => (
                            <div key={idx} className={`rounded px-3 py-2 ${getSeverityColor(phrase.severity)}`}>
                              <span className="font-mono font-semibold">"{phrase.text}"</span>
                              <span className="text-sm ml-2">- {phrase.reason}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Suggestions */}
                    {scanResult.suggestions.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">💡 Suggestions:</h4>
                        <ul className="space-y-1">
                          {scanResult.suggestions.map((suggestion: string, idx: number) => (
                            <li key={idx} className="text-sm text-gray-700">
                              • {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Send Button */}
              <button
                onClick={handleSend}
                disabled={!scanResult || !scanResult.passed}
                className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
                <span>Send Message</span>
              </button>

              {!scanResult && (
                <p className="text-sm text-gray-500 text-center mt-2">
                  Please scan your letter before sending
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}


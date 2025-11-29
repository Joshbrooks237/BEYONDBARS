'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, DollarSign, AlertCircle, CreditCard } from 'lucide-react'

const mockInmates = [
  {
    id: '1',
    name: 'John Doe',
    inmateNumber: 'A12345',
    facility: 'California State Prison, Los Angeles County',
    facilityId: 'facility_1',
    commissaryFeePercent: 3.5
  }
]

export default function SendMoneyPage() {
  const [selectedInmate, setSelectedInmate] = useState('')
  const [amount, setAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('card')
  
  const selectedContact = mockInmates.find(i => i.id === selectedInmate)
  const amountNum = parseFloat(amount) || 0
  const fee = selectedContact ? (amountNum * selectedContact.commissaryFeePercent) / 100 : 0
  const total = amountNum + fee

  const handleSend = async () => {
    if (!selectedInmate || amountNum < 5) {
      alert('Please select a contact and enter at least $5')
      return
    }

    const paymentMethodNames: Record<string, string> = {
      'cashapp': 'Cash App',
      'paypal': 'PayPal',
      'venmo': 'Venmo',
      'card': 'Credit/Debit Card',
      'bank': 'Bank Account'
    }

    alert(
      `Success! 🎉\n\n` +
      `Amount: $${amountNum.toFixed(2)}\n` +
      `Fee: $${fee.toFixed(2)}\n` +
      `Total: $${total.toFixed(2)}\n\n` +
      `Payment Method: ${paymentMethodNames[paymentMethod]}\n` +
      `To: ${selectedContact?.name}\n\n` +
      `Funds will be available in their commissary account within 24-48 hours. ❤️`
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/wallet" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Wallet</span>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">Send Money</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Info Banner */}
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <DollarSign className="h-5 w-5 text-green-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-green-900 mb-1">Send Commissary Funds</h3>
              <p className="text-sm text-green-700">
                Funds are typically available within 24-48 hours. Your loved one can use them for snacks, hygiene items, and other essentials.
              </p>
            </div>
          </div>
        </div>

        {/* Send Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* Recipient */}
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
                  {inmate.name} - {inmate.inmateNumber}
                </option>
              ))}
            </select>
          </div>

          {selectedContact && (
            <>
              {/* Facility Info */}
              <div className="mb-6 bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Facility Information</h3>
                <p className="text-sm text-gray-700 mb-2">{selectedContact.facility}</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Fee: {selectedContact.commissaryFeePercent}%</li>
                  <li>• Minimum: $5.00</li>
                  <li>• Maximum: $500.00 per transaction</li>
                  <li>• Processing time: 24-48 hours</li>
                </ul>
              </div>

              {/* Amount */}
              <div className="mb-6">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">$</span>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    min="5"
                    max="500"
                    step="0.01"
                    className="w-full border border-gray-300 rounded-lg pl-8 pr-4 py-3 text-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                {amountNum > 0 && amountNum < 5 && (
                  <p className="mt-2 text-sm text-red-600">Minimum amount is $5.00</p>
                )}
                {amountNum > 500 && (
                  <p className="mt-2 text-sm text-red-600">Maximum amount is $500.00 per transaction</p>
                )}
              </div>

              {/* Quick Amount Buttons */}
              <div className="mb-6">
                <p className="text-sm text-gray-700 mb-2">Quick amounts:</p>
                <div className="grid grid-cols-4 gap-2">
                  {[10, 25, 50, 100].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setAmount(amt.toString())}
                      className="btn-secondary text-sm py-2"
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fee Breakdown */}
              {amountNum >= 5 && amountNum <= 500 && (
                <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Transaction Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Amount:</span>
                      <span className="font-medium text-gray-900">${amountNum.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Processing fee ({selectedContact.commissaryFeePercent}%):</span>
                      <span className="font-medium text-gray-900">${fee.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-blue-200 pt-2 flex justify-between">
                      <span className="font-semibold text-gray-900">Total:</span>
                      <span className="font-bold text-gray-900 text-lg">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Method */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Payment Method
                </label>
                <div className="space-y-3">
                  {/* Cash App */}
                  <button
                    onClick={() => setPaymentMethod('cashapp')}
                    className={`w-full border-2 rounded-lg p-4 text-left transition-colors ${
                      paymentMethod === 'cashapp'
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white ${
                          paymentMethod === 'cashapp' ? 'bg-green-500' : 'bg-gray-400'
                        }`}>
                          $
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Cash App</p>
                          <p className="text-sm text-gray-600">Instant • Popular choice</p>
                        </div>
                      </div>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-medium">
                        Recommended
                      </span>
                    </div>
                  </button>

                  {/* PayPal */}
                  <button
                    onClick={() => setPaymentMethod('paypal')}
                    className={`w-full border-2 rounded-lg p-4 text-left transition-colors ${
                      paymentMethod === 'paypal'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white ${
                        paymentMethod === 'paypal' ? 'bg-blue-600' : 'bg-gray-400'
                      }`}>
                        P
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">PayPal</p>
                        <p className="text-sm text-gray-600">Instant • Buyer protection</p>
                      </div>
                    </div>
                  </button>

                  {/* Venmo */}
                  <button
                    onClick={() => setPaymentMethod('venmo')}
                    className={`w-full border-2 rounded-lg p-4 text-left transition-colors ${
                      paymentMethod === 'venmo'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white ${
                        paymentMethod === 'venmo' ? 'bg-blue-500' : 'bg-gray-400'
                      }`}>
                        V
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Venmo</p>
                        <p className="text-sm text-gray-600">Instant • Easy to use</p>
                      </div>
                    </div>
                  </button>
                  
                  {/* Credit/Debit Card */}
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`w-full border-2 rounded-lg p-4 text-left transition-colors ${
                      paymentMethod === 'card'
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <CreditCard className={`h-6 w-6 ${
                        paymentMethod === 'card' ? 'text-primary-600' : 'text-gray-400'
                      }`} />
                      <div>
                        <p className="font-medium text-gray-900">Credit/Debit Card</p>
                        <p className="text-sm text-gray-600">Visa, Mastercard, Amex, Discover</p>
                      </div>
                    </div>
                  </button>
                  
                  {/* Bank Account */}
                  <button
                    onClick={() => setPaymentMethod('bank')}
                    className={`w-full border-2 rounded-lg p-4 text-left transition-colors ${
                      paymentMethod === 'bank'
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <DollarSign className={`h-6 w-6 ${
                        paymentMethod === 'bank' ? 'text-primary-600' : 'text-gray-400'
                      }`} />
                      <div>
                        <p className="font-medium text-gray-900">Bank Account (ACH)</p>
                        <p className="text-sm text-gray-600">Lower fees • Takes 2-3 days</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Security Notice */}
              <div className="mb-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-700">
                      <strong>Secure Payment:</strong> All transactions are encrypted and processed securely. Your payment information is never stored on our servers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Send Button */}
              <button
                onClick={handleSend}
                disabled={amountNum < 5 || amountNum > 500}
                className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <DollarSign className="h-5 w-5" />
                <span>Send ${total.toFixed(2)}</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}


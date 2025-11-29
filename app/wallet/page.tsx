import Link from 'next/link'
import { Heart, User, DollarSign, ArrowUpRight, ArrowDownRight, Plus } from 'lucide-react'

const transactions = [
  {
    id: '1',
    type: 'commissary',
    to: 'John Doe',
    amount: 50.00,
    fee: 1.75,
    status: 'completed',
    date: '2025-11-27'
  },
  {
    id: '2',
    type: 'commissary',
    to: 'John Doe',
    amount: 25.00,
    fee: 0.88,
    status: 'completed',
    date: '2025-11-15'
  },
]

export default function WalletPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-bold text-gray-900">BeyondBars</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
              <Link href="/messages" className="text-gray-600 hover:text-gray-900">
                Messages
              </Link>
              <Link href="/wallet" className="text-primary-600 font-medium">
                Wallet
              </Link>
              <Link href="/profile" className="text-gray-600 hover:text-gray-900">
                <User className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Commissary Wallet</h1>
          <p className="text-gray-600">Send money to your loved ones' commissary accounts</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Balance & Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Balance Card */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6 shadow-lg">
              <p className="text-green-100 mb-2">Available Balance</p>
              <p className="text-4xl font-bold mb-4">$0.00</p>
              <Link href="/wallet/add-funds" className="block w-full bg-white text-green-600 hover:bg-gray-50 font-semibold py-2 px-4 rounded-lg text-center transition-colors">
                Add Funds
              </Link>
            </div>

            {/* Quick Send */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Send</h3>
              <Link 
                href="/wallet/send"
                className="flex items-center justify-center space-x-2 w-full btn-primary"
              >
                <DollarSign className="h-5 w-5" />
                <span>Send Money</span>
              </Link>
            </div>

            {/* Fee Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">💡 About Fees</h4>
              <p className="text-sm text-blue-800 mb-2">
                Fees vary by facility (typically 2.5-3.5%). We're transparent about all costs.
              </p>
              <p className="text-xs text-blue-700">
                No hidden charges. What you see is what you pay.
              </p>
            </div>
          </div>

          {/* Transaction History */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Transaction History</h2>

              {transactions.length === 0 ? (
                <div className="text-center py-12">
                  <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-4">No transactions yet</p>
                  <Link href="/wallet/send" className="btn-primary inline-block">
                    Send Your First Payment
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {transactions.map((transaction) => (
                    <div 
                      key={transaction.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className={`mt-1 p-2 rounded-full ${
                            transaction.type === 'commissary' 
                              ? 'bg-green-100' 
                              : 'bg-blue-100'
                          }`}>
                            <ArrowUpRight className={`h-5 w-5 ${
                              transaction.type === 'commissary'
                                ? 'text-green-600'
                                : 'text-blue-600'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-semibold text-gray-900">
                                  Commissary to {transaction.to}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                  {new Date(transaction.date).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                  })}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-gray-900">
                                  ${transaction.amount.toFixed(2)}
                                </p>
                                <p className="text-xs text-gray-500">
                                  +${transaction.fee.toFixed(2)} fee
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-3">
                              <span className={`text-xs px-2 py-1 rounded ${
                                transaction.status === 'completed'
                                  ? 'bg-green-100 text-green-700'
                                  : transaction.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-red-100 text-red-700'
                              }`}>
                                {transaction.status}
                              </span>
                              <p className="text-xs text-gray-500">
                                Total: ${(transaction.amount + transaction.fee).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


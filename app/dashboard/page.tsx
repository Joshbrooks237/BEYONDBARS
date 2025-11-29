import Link from 'next/link'
import { Heart, MessageCircle, DollarSign, User, Plus, Send, Clock } from 'lucide-react'

// Mock data
const contacts = [
  {
    id: '1',
    name: 'John Doe',
    inmateNumber: 'A12345',
    facility: 'California State Prison, Los Angeles County',
    lastMessageDate: '2 days ago',
    relationship: 'Brother'
  },
]

const recentMessages = [
  {
    id: '1',
    to: 'John Doe',
    subject: 'Thinking of you',
    status: 'delivered',
    date: '2 days ago'
  },
]

export default function DashboardPage() {
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
              <Link href="/dashboard" className="text-primary-600 font-medium">
                Dashboard
              </Link>
              <Link href="/messages" className="text-gray-600 hover:text-gray-900">
                Messages
              </Link>
              <Link href="/wallet" className="text-gray-600 hover:text-gray-900">
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
          <p className="text-gray-600">Stay connected with your loved ones</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link href="/messages/new" className="bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3 mb-3">
              <Send className="h-8 w-8" />
              <h3 className="text-xl font-semibold">Send a Letter</h3>
            </div>
            <p className="text-primary-100">Write and send a message with AI compliance checking</p>
          </Link>

          <Link href="/messages/kids" className="bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3 mb-3">
              <MessageCircle className="h-8 w-8" />
              <h3 className="text-xl font-semibold">Kids Mode 👦👧</h3>
            </div>
            <p className="text-pink-100">Easy mode for children to write to their parent</p>
            <p className="text-pink-200 text-xs mt-2">También en Español →</p>
          </Link>

          <Link href="/messages/parents" className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3 mb-3">
              <Heart className="h-8 w-8" />
              <h3 className="text-xl font-semibold">Parents Mode 💙</h3>
            </div>
            <p className="text-indigo-100">Guidance for parents with youth in juvenile facilities</p>
          </Link>

          <Link href="/wallet/send" className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3 mb-3">
              <DollarSign className="h-8 w-8" />
              <h3 className="text-xl font-semibold">Send Money</h3>
            </div>
            <p className="text-green-100">Add funds to a commissary account</p>
          </Link>

          <Link href="/contacts/new" className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3 mb-3">
              <Plus className="h-8 w-8" />
              <h3 className="text-xl font-semibold">Add Contact</h3>
            </div>
            <p className="text-purple-100">Connect with someone new</p>
          </Link>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Contacts */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Your Contacts</h2>
                <Link href="/contacts/new" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  + Add New
                </Link>
              </div>

              {contacts.length === 0 ? (
                <div className="text-center py-12">
                  <User className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-4">No contacts yet</p>
                  <Link href="/contacts/new" className="btn-primary inline-block">
                    Add Your First Contact
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {contacts.map((contact) => (
                    <div key={contact.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{contact.name}</h3>
                          <p className="text-sm text-gray-600 mb-1">
                            ID: {contact.inmateNumber} • {contact.relationship}
                          </p>
                          <p className="text-sm text-gray-500">{contact.facility}</p>
                          <p className="text-xs text-gray-400 mt-2">Last message: {contact.lastMessageDate}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Link 
                            href={`/messages/new?contact=${contact.id}`}
                            className="btn-primary text-sm py-2 px-3"
                          >
                            <MessageCircle className="h-4 w-4 inline mr-1" />
                            Message
                          </Link>
                          <Link 
                            href={`/wallet/send?contact=${contact.id}`}
                            className="btn-secondary text-sm py-2 px-3"
                          >
                            <DollarSign className="h-4 w-4 inline mr-1" />
                            Send $
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Messages</h2>
              
              {recentMessages.length === 0 ? (
                <div className="text-center py-8">
                  <MessageCircle className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">No messages yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentMessages.map((message) => (
                    <div key={message.id} className="border-l-4 border-primary-500 pl-3 py-2">
                      <p className="font-medium text-gray-900 text-sm">{message.subject}</p>
                      <p className="text-xs text-gray-600">To: {message.to}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">{message.date}</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          {message.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* AI Scanner Promo */}
            <div className="bg-gradient-to-br from-primary-50 to-blue-50 border border-primary-200 rounded-lg p-6">
              <div className="text-center">
                <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">AI Letter Scanner</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Our AI scans every letter to make sure it follows facility rules. No more rejected messages!
                </p>
                <Link href="/messages/new" className="btn-primary text-sm">
                  Try It Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


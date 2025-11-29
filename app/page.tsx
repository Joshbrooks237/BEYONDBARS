import Link from 'next/link'
import { Heart, MessageCircle, DollarSign, Shield, Users } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-bold text-gray-900">BeyondBars</span>
            </div>
            <div className="flex space-x-4">
              <Link href="/login" className="btn-secondary">
                Sign In
              </Link>
              <Link href="/register" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Stay Connected with Your Loved Ones
            </h1>
            <p className="text-xl mb-8 text-primary-100 max-w-3xl mx-auto">
              A simple, dignified way to send messages and support to those in California prisons and juvenile facilities. 
              Because everyone deserves to maintain their connections.
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/register" className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
                Start Now
              </Link>
              <Link href="/facilities" className="bg-primary-700 hover:bg-primary-600 text-white font-semibold py-3 px-8 rounded-lg border-2 border-white transition-colors duration-200">
                Find a Facility
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Everything You Need to Stay in Touch
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<MessageCircle className="h-12 w-12 text-primary-600" />}
              title="Send Messages"
              description="Easy, compliant messaging to California prisons and juvenile facilities"
            />
            <FeatureCard
              icon={<Heart className="h-12 w-12 text-pink-600" />}
              title="Kids Mode 👧👦"
              description="Simple, safe mode for children to write to their parents"
            />
            <FeatureCard
              icon={<DollarSign className="h-12 w-12 text-primary-600" />}
              title="Commissary Wallet"
              description="Use Cash App, PayPal, Venmo, or cards to send money instantly"
            />
            <FeatureCard
              icon={<Shield className="h-12 w-12 text-primary-600" />}
              title="Fully Compliant"
              description="All communications follow CDCR and facility guidelines"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Create Account"
              description="Sign up and verify your identity for security and compliance"
            />
            <StepCard
              number="2"
              title="Add Contacts"
              description="Add your loved ones with their facility and inmate information"
            />
            <StepCard
              number="3"
              title="Stay Connected"
              description="Send messages, photos, and commissary funds easily"
            />
          </div>
        </div>
      </section>

      {/* Family-First Spotlight */}
      <section className="py-20 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Special Modes for Families
            </h2>
            <p className="text-xl text-gray-700">
              Every family member deserves support
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Kids Mode */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-pink-500">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                👧👦 Kids Mode
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                For children writing to their incarcerated parent
              </p>
          
              <ul className="space-y-4 text-gray-700 mb-6">
                <li className="flex items-start">
                  <span className="text-2xl mr-3">❤️</span>
                  <span><strong>Pre-written templates</strong> like "I Love You", "I Miss You"</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">🎨</span>
                  <span><strong>Simple interface</strong> with big text and bright colors</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">✅</span>
                  <span><strong>Always compliant</strong> - pre-approved messages</span>
                </li>
              </ul>
              <div className="bg-pink-50 border-2 border-pink-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <strong>2.7 million children</strong> have an incarcerated parent. 
                  Kids Mode helps them stay connected.
                </p>
              </div>
            </div>

            {/* Parents Mode */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-blue-500">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                💙 Parents Mode
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                For parents with youth in juvenile facilities
              </p>
              <ul className="space-y-4 text-gray-700 mb-6">
                <li className="flex items-start">
                  <span className="text-2xl mr-3">💪</span>
                  <span><strong>Guidance templates</strong> showing unconditional love and support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">📖</span>
                  <span><strong>What to say (and not say)</strong> to help your child heal</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">🌟</span>
                  <span><strong>Hope-focused messaging</strong> for difficult times</span>
                </li>
              </ul>
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  Your child needs your love now more than ever. Parents Mode helps 
                  you write messages that heal, encourage, and build hope.
                </p>
              </div>
            </div>
          </div>

          {/* Example Messages Side by Side */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-6 border-2 border-pink-200">
              <p className="text-gray-600 text-sm mb-2 font-semibold">Kids Mode Example:</p>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4" style={{fontFamily: 'Comic Sans MS, cursive'}}>
                  <p className="text-gray-800 leading-relaxed">
                    Dear Dad,<br/><br/>
                    I love you so much! I got an A on my test. I wish you could see it!<br/><br/>
                    Love, Sarah ❤️
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl p-6 border-2 border-blue-200">
              <p className="text-gray-600 text-sm mb-2 font-semibold">Parents Mode Example:</p>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                  <p className="text-gray-800 leading-relaxed">
                    Dear Marcus,<br/><br/>
                    I love you. That will never change. You are my son and nothing can break that bond.<br/><br/>
                    I'm proud of you for finishing that class. Keep going. I believe in you.<br/><br/>
                    Love, Mom
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spanish Language Support */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-emerald-50 border-y-2 border-green-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              🇲🇽 Disponible en Español 🇺🇸
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              We serve California's diverse families. Kids Mode and Parents Mode are available in Spanish, 
              because every family deserves to connect in their own language.
            </p>
            <div className="bg-white rounded-lg shadow-md p-6 inline-block">
              <p className="text-gray-800 mb-2">
                <span className="font-semibold">Modo Niños:</span> Para que los niños escriban a sus padres
              </p>
              <p className="text-gray-800">
                <span className="font-semibold">Modo Padres:</span> Para padres con hijos en centros juveniles
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Built with Dignity and Compliance
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            We believe that maintaining family connections is a human right. Our platform is designed 
            to make communication simple while respecting all California Department of Corrections and 
            Rehabilitation (CDCR) guidelines and facility-specific rules.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <TrustBadge title="Secure" description="Bank-level encryption" />
            <TrustBadge title="Compliant" description="CDCR approved process" />
            <TrustBadge title="Transparent" description="No hidden fees" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-primary-400" />
                <span className="text-xl font-bold text-white">BeyondBars</span>
              </div>
              <p className="text-sm">
                Connecting families with dignity and respect.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Services</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/messages" className="hover:text-white">Messaging</Link></li>
                <li><Link href="/wallet" className="hover:text-white">Commissary</Link></li>
                <li><Link href="/facilities" className="hover:text-white">Facilities</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/compliance" className="hover:text-white">Compliance</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
            <p>&copy; 2025 BeyondBars. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="text-center p-6">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 text-white text-2xl font-bold rounded-full mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function TrustBadge({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}


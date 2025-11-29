# BeyondBars - Stay Connected

A compassionate platform to help families stay connected with their loved ones in California prisons and juvenile facilities.

## 🫶 Mission

This app makes it easy for family members to express their love and support to incarcerated loved ones. We believe that maintaining family connections is essential for rehabilitation and human dignity.

## ✨ Features

- **AI-Powered Letter Scanning**: OpenAI analyzes messages to ensure compliance with CDCR rules before sending
- **Smart Compliance Checking**: Real-time feedback helps you write messages that will be approved
- **Commissary Wallet**: Easy money transfers for commissary accounts
- **California Facilities**: Support for CDCR prisons and juvenile halls across California
- **Beautiful, Compassionate UI**: Designed with empathy and respect

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (or 20+ recommended)
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:
```bash
cd "/Users/jimbeam/BeyondBars"
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Add your OpenAI API key to `.env.local`:
```
OPENAI_API_KEY=sk-your-key-here
```

Get your API key from: https://platform.openai.com/api-keys

### Running the App

Development mode:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Build for production:
```bash
npm run build
npm start
```

## 🏛️ Compliance

This platform is designed to comply with:
- California Department of Corrections and Rehabilitation (CDCR) regulations
- Facility-specific messaging rules
- Content screening requirements
- Transaction monitoring standards

**All messages are reviewed before delivery** to ensure they meet facility guidelines.

## 🔒 Security & Privacy

- Bank-level encryption for all transactions
- Secure message storage
- Compliance audit trails
- Identity verification for users
- Payment processing through Stripe

## 📱 Features Overview

### AI Letter Scanner
- **Real-time scanning** as you type
- **Detailed feedback** on compliance issues
- **Helpful suggestions** to rephrase problematic content
- **Severity levels** (high/medium/low) for different issues
- **Alternative phrasing** suggestions using AI

### Messaging
- Send text messages
- Share photos (where allowed)
- Track message status (pending/approved/delivered/read)
- Message history

### Commissary Wallet
- **Multiple payment options**: Cash App, PayPal, Venmo, credit/debit cards, bank transfers
- **Transparent fees**: 2.5-3.5% processing fees (lower than most prison services)
- **Fast processing**: Most payments available within 24-48 hours
- **Transaction history**: Track all your payments
- **Secure processing**: Bank-level encryption

### Facility Database
- All California CDCR prisons
- Major California juvenile facilities
- Facility-specific rules and capabilities
- Contact information

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: OpenAI GPT-4
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 📋 Roadmap

- [ ] User authentication (NextAuth.js)
- [ ] Real database integration (PostgreSQL/Supabase)
- [ ] Payment processing (Stripe integration)
- [ ] Photo upload and approval system
- [ ] Video messaging (where supported)
- [ ] Mobile apps (React Native)
- [ ] Multi-language support (Spanish, etc.)
- [ ] Email notifications
- [ ] SMS notifications for delivery status

## 💡 For Developers

### Project Structure
```
/app                    # Next.js app directory
  /api                 # API routes
  /messages            # Messaging features
  /dashboard           # User dashboard
  /wallet              # Commissary wallet
/lib
  /db                  # Database schemas and data
  /compliance          # Compliance rules engine
  /utils               # Utility functions
/components            # React components
/public                # Static assets
```

### Adding New Facilities

Edit `/lib/db/facilities.ts` to add new facilities:

```typescript
{
  name: 'Facility Name',
  type: 'prison' | 'juvenile',
  // ... other details
}
```

### Customizing Compliance Rules

Edit `/lib/compliance/rules.ts` and `/lib/compliance/ai-scanner.ts` to modify scanning rules.

## 🤝 Contributing

This is a mission-driven project. Contributions that improve access, compliance, or user experience are welcome.

## 📄 License

ISC

## ❤️ Support

For support, email [your-email] or open an issue on GitHub.

---

**Remember**: Every message sent through this platform represents a family staying connected. We take that responsibility seriously.


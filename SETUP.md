# Setup Guide - BeyondBars

## Quick Start 🚀

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure OpenAI API Key

You need an OpenAI API key for the AI letter scanner to work.

1. Go to https://platform.openai.com/api-keys
2. Create a new API key
3. Create a `.env.local` file in the project root:

```bash
# Copy the example file
cp .env.local.example .env.local
```

4. Edit `.env.local` and add your key:
```
OPENAI_API_KEY=sk-your-actual-key-here
```

### 3. Run the Development Server
```bash
npm run dev
```

Open http://localhost:3000 in your browser! 🎉

---

## Features Available

### ✅ Working Now
- **Beautiful landing page** with family-focused messaging
- **AI Letter Scanner** - OpenAI scans messages for CDCR compliance
- **California Facilities Database** - 9 prisons and juvenile halls
- **Commissary Wallet** - Multiple payment options:
  - Cash App (recommended)
  - PayPal
  - Venmo
  - Credit/Debit Cards
  - Bank Transfers (ACH)
- **Real-time compliance checking** as you type
- **Smart suggestions** to rephrase problematic content
- **Fee transparency** - see exactly what you're paying

### 🔜 Coming Soon
- User authentication (login/signup)
- Real database (currently using mock data)
- Actual payment processing integration
- Photo upload and approval
- Message delivery tracking
- Email/SMS notifications

---

## Payment Methods Explained

### Why Cash App & PayPal?
Most prison commissary services (JPay, GTL, etc.) charge **5-10% fees**. We're different:

| Method | Fee | Processing Time | Best For |
|--------|-----|-----------------|----------|
| **Cash App** | 2.5% | Instant | Most people ⭐ |
| **Venmo** | 2.5% | Instant | Young families |
| **PayPal** | 2.9% | Instant | Buyer protection |
| **Credit Card** | 2.9% | Instant | Building credit |
| **Bank (ACH)** | 0.8% | 2-3 days | Large amounts |

**Example**: Send $50 to commissary
- Other services: $50 + $5 fee = $55
- Prison Love (Cash App): $50 + $1.25 fee = $51.25
- **You save $3.75!**

---

## AI Letter Scanner

The AI scanner helps families avoid rejected messages by:

1. **Checking for prohibited content** (gang activity, escape plans, drugs, weapons)
2. **Giving you a compliance score** (0-100)
3. **Highlighting problematic phrases** with severity levels
4. **Suggesting better wording** that's still loving and supportive
5. **Real-time feedback** as you type

### Example:
❌ **Bad**: "Can't wait for you to escape this place"
✅ **Good**: "Can't wait for your release date"

The AI helps you say what you mean in a way that won't get flagged!

---

## California Facilities Included

### CDCR Prisons
1. California State Prison, Los Angeles County (Lancaster)
2. San Quentin State Prison
3. California Institution for Men (Chino)
4. California Institution for Women (Frontera)
5. Pelican Bay State Prison

### Juvenile Facilities
1. Los Angeles County Juvenile Hall - Central
2. Alameda County Juvenile Justice Center
3. San Diego County Juvenile Detention Facility
4. Orange County Juvenile Hall

Each facility has specific rules programmed in!

---

## Development Tips

### File Structure
```
/app
  /page.tsx              → Landing page
  /dashboard/page.tsx    → User dashboard
  /messages/new/page.tsx → Send a letter (with AI scanner)
  /wallet/
    page.tsx            → Transaction history
    send/page.tsx       → Send money
  /api
    /scan-letter        → OpenAI integration
    /process-payment    → Payment processing

/lib
  /db
    schema.ts           → Data models
    facilities.ts       → California facilities
  /compliance
    rules.ts            → Compliance validation
    ai-scanner.ts       → AI scanning logic
  /payments
    integrations.ts     → Payment methods
```

### Testing the AI Scanner

1. Go to http://localhost:3000/messages/new
2. Select a contact
3. Write a message
4. Click "Scan Letter with AI"

Try these test messages:

**Should Pass (Score ~95):**
```
Hey, I hope you're doing well. I miss you so much and 
think about you every day. The family is good, mom sends 
her love. Stay strong and keep your head up. We're 
counting down the days until you're home. Love you!
```

**Should Warn (Score ~70):**
```
Hey man, can't wait to party when you get out. I'll bring 
the good stuff. Hit me up at 555-1234 when you can call.
```

**Should Fail (Score ~40):**
```
Yo bro, the gang misses you. We're planning to help you 
escape next week. Bring a weapon just in case.
```

---

## Environment Variables

### Required
- `OPENAI_API_KEY` - For AI letter scanning

### Optional (for future features)
- `DATABASE_URL` - PostgreSQL connection
- `STRIPE_SECRET_KEY` - Payment processing
- `STRIPE_PUBLISHABLE_KEY` - Frontend payments
- `NEXTAUTH_SECRET` - Authentication
- `NEXTAUTH_URL` - Auth callback URL

---

## Deployment

### Recommended: Vercel

1. Push code to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

The app will be live at `your-app.vercel.app`

### Other Options
- Netlify
- Railway
- Render
- AWS Amplify

---

## Support & Contributing

This is a mission-driven project to help families stay connected.

**Questions?** Open an issue on GitHub

**Want to help?** Contributions welcome! Focus areas:
- Adding more facilities
- Improving AI suggestions
- Better payment integrations
- Mobile apps
- Translations (Spanish, etc.)

---

## Legal & Compliance

⚖️ **Important**: This app helps families communicate compliantly. All messages must follow CDCR rules:

- ✅ Letters of love and support
- ✅ Family updates
- ✅ Encouragement and hope
- ❌ Gang content
- ❌ Escape plans
- ❌ Criminal activity
- ❌ Contraband discussion

**All messages are reviewed before delivery** to ensure compliance with facility rules.

---

Built with ❤️ for families who need to stay connected.


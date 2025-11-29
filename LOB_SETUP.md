# 📬 Lob Mail Integration - Setup Guide

## What is Lob?

**Lob** is an API for sending physical mail programmatically. It's like Stripe for postal mail.

**What it does**:
1. You send HTML/PDF via API
2. Lob prints it professionally
3. Lob stuffs it in an envelope
4. Lob stamps and mails it
5. USPS delivers it in 3-5 days

**Perfect for**: Sending letters to prisons!

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Sign Up for Lob

1. Go to: https://www.lob.com
2. Click "Get Started Free"
3. Sign up (email + password)
4. Verify email

**Free tier includes:**
- $50 in credit (60+ free letters!)
- Test mode (unlimited fake letters)
- No credit card required to start

---

### Step 2: Get Your API Key

1. Log into Lob Dashboard
2. Go to: Settings → API Keys
3. Copy your **Test API Key** (starts with `test_`)
4. Later, get **Live API Key** for production

---

### Step 3: Add to BeyondBars

Add to your `.env.local`:

```bash
# Lob API Key
LOB_API_KEY=test_your_key_here
```

For production, use live key:
```bash
LOB_API_KEY=live_your_key_here
```

---

### Step 4: Test It!

**Test Mode** (FREE, no actual mail sent):
```typescript
// Uses test_ key
// Creates letter in Lob dashboard
// Shows you preview
// Doesn't actually mail
```

**Live Mode** ($0.69 per letter):
```typescript
// Uses live_ key
// Actually prints and mails
// Costs $0.69 (B&W) or $0.99 (color)
// Delivers in 3-5 days
```

---

## 💰 Pricing

### Lob Costs:

| Service | Speed | B&W | Color |
|---------|-------|-----|-------|
| **First Class** | 3-5 days | $0.69 | $0.99 |
| **Standard** | 7-10 days | $0.53 | $0.83 |

**Includes**:
- ✅ Printing (professional quality)
- ✅ Paper & envelope
- ✅ Postage (USPS)
- ✅ Tracking
- ✅ Address verification

**Your pricing to users**:
- Option 1: Charge $1.50/letter (50% margin)
- Option 2: Charge $0.99 + pass through Lob fee
- Option 3: Free letters, make money on commissary fees

---

## 📝 How It Works in BeyondBars

### User Flow:

1. **User writes message** in your app
2. **AI scans** for compliance ✅
3. **User clicks "Send"**
4. **Your backend**:
   - Formats message as nice letter
   - Calls Lob API
   - Passes:
     - Inmate name & number
     - Facility address
     - Message content
     - Sender name
5. **Lob**:
   - Generates PDF
   - Prints letter
   - Stuffs envelope
   - Stamps it
   - Hands to USPS
6. **USPS delivers** in 3-5 days
7. **Inmate receives** physical letter! 📬

---

## 🧪 Testing

### Send a Test Letter to Yourself:

```typescript
import { sendTestLetter } from '@/lib/mail/lob-sender'

const result = await sendTestLetter(
  'This is a test message!',
  {
    name: 'Your Name',
    line1: '123 Your Street',
    city: 'Your City',
    state: 'CA',
    zip: '12345'
  }
)

console.log('Letter sent!', result)
```

**In test mode**: Letter shows in dashboard but doesn't mail  
**In live mode**: You'll receive it in 3-5 days!

---

## 📊 What You Get

### Tracking Info:

```json
{
  "success": true,
  "letterId": "ltr_abc123",
  "expectedDeliveryDate": "2024-12-05",
  "trackingUrl": "https://lob.com/track/ltr_abc123",
  "cost": 0.69
}
```

### Tracking Events:

- ✅ In Transit
- ✅ In Local Area
- ✅ Processed for Delivery
- ✅ Delivered

---

## 🎨 Letter Formatting

Your letters look professional:

```
                                        November 29, 2025
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

To: John Doe
Inmate #A12345
California State Prison, Los Angeles County


Subject: Thinking of You

Hi John,

I hope you're doing well. I miss you so much and think 
about you every day. The family is all good - everyone 
sends their love.

Keep your head up and stay strong. We're counting down 
the days until you're home.

I love you!


With love,
Maria

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    Letter sent via BeyondBars - Keeping families connected
```

**Looks great! Professional and clean.**

---

## ⚙️ Configuration Options

### Letter Options:

```typescript
{
  color: false,              // B&W = $0.69, Color = $0.99
  doubleSided: false,        // One page is enough usually
  mailType: 'usps_first_class', // or 'usps_standard' (slower, cheaper)
}
```

### Address Verification:

Lob auto-verifies addresses:
- ✅ Catches typos
- ✅ Standardizes format
- ✅ Adds ZIP+4
- ✅ Prevents bad addresses

---

## 🔐 Security

### Best Practices:

1. **Never expose API key** in frontend
   - Keep in `.env.local`
   - Only use in backend API routes

2. **Validate user input**
   - Check message content
   - Verify addresses
   - Rate limit sends

3. **Log all sends**
   - Track who sent what
   - Monitor for abuse
   - Compliance audit trail

---

## 📈 Scaling

### How many letters can you send?

**Lob limits**: None! Send millions if you want.

**Your limits**:
- API calls per second: 150/sec
- Concurrent requests: 50

**Cost at scale**:
- 100 letters/day = $2,070/month
- 1,000 letters/day = $20,700/month
- Lob offers volume discounts

---

## 🚨 Common Issues

### Issue: "Address verification failed"
**Fix**: Use full, correct address. Lob is strict.

### Issue: "Insufficient funds"
**Fix**: Add credit to Lob account or verify payment method.

### Issue: "Invalid HTML"
**Fix**: Check letter template formatting.

### Issue: "Letter rejected by facility"
**Fix**: Not Lob's fault - facility rejected content. Improve AI scanning.

---

## 🎯 Production Checklist

Before going live:

- [ ] Test with test API key
- [ ] Send test letter to yourself
- [ ] Verify it arrives correctly
- [ ] Switch to live API key
- [ ] Add payment method to Lob
- [ ] Set up webhooks for tracking
- [ ] Monitor costs
- [ ] Set up alerts for failures

---

## 📞 Lob Support

- **Dashboard**: https://dashboard.lob.com
- **Docs**: https://docs.lob.com
- **Support**: support@lob.com
- **Status**: https://status.lob.com

---

## 💡 Pro Tips

### Tip 1: Batch Sending
Send multiple letters at once to save API calls:
```typescript
const letters = await Promise.all(
  messages.map(msg => sendLetter(msg))
)
```

### Tip 2: Preview Letters
Lob gives you preview URLs - show users before sending!

### Tip 3: Custom Envelopes
Lob supports custom return addresses, logos, even window envelopes.

### Tip 4: Track Everything
Use Lob webhooks to get real-time delivery updates.

---

## 🎉 You're Ready!

Your BeyondBars app can now:
1. ✅ Take messages from families
2. ✅ Scan with AI for compliance
3. ✅ Format as professional letters
4. ✅ Print and mail via Lob
5. ✅ Deliver to prisons
6. ✅ Track delivery

**You just built a REAL prison communication system!** 🚀

---

## Next Steps

1. **Get Lob API key**: https://www.lob.com
2. **Add to `.env.local`**: `LOB_API_KEY=test_your_key`
3. **Test send**: Try the new "Send" button in your app!
4. **Go live**: Switch to live key and start helping families! ❤️


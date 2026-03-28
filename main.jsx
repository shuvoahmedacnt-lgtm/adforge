# ⚡ AdForge AI — $10K Ad Creative Generator

Generate professional, platform-optimized ad creatives powered by Grok-3.  
3 copy variants + psychology insights + visual direction. In seconds.

---

## 🗂 Project Structure

```
adforge/
├── api/
│   └── generate-ad.js        ← Vercel Serverless Function (Grok API call lives here)
├── src/
│   ├── components/
│   │   ├── Header.jsx         ← Top navigation bar
│   │   ├── AdForm.jsx         ← Left panel — brief input form
│   │   └── AdPreview.jsx      ← Right panel — live creative preview
│   ├── pages/
│   │   ├── CreatePage.jsx     ← Main create layout (form + preview)
│   │   └── LibraryPage.jsx    ← Saved ads library
│   ├── store/
│   │   └── useAdStore.js      ← Zustand global state
│   ├── lib/
│   │   └── constants.js       ← Platforms, tones, palette presets
│   ├── styles/
│   │   └── index.css          ← Full design system (dark luxury theme)
│   ├── App.jsx
│   └── main.jsx
├── public/
├── index.html
├── vite.config.js
├── vercel.json                ← Vercel routing config
├── .env.example               ← Copy to .env.local
└── package.json
```

---

## 🚀 Setup & Deploy

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variable

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
GROK_API_KEY=xai-your-actual-grok-api-key
```

Get your Grok API key from: https://console.x.ai/

### 3. Run locally

```bash
npm run dev
```

> ⚠️ For local API testing, install Vercel CLI:
> ```bash
> npm i -g vercel
> vercel dev
> ```
> This runs the `/api/generate-ad.js` serverless function locally on port 3000.

### 4. Deploy to Vercel

```bash
# Option A: Vercel CLI
vercel deploy --prod

# Option B: Push to GitHub, connect repo in vercel.com dashboard
```

### 5. Add Environment Variable in Vercel

Go to: **Vercel Dashboard → Your Project → Settings → Environment Variables**

Add:
| Key | Value |
|-----|-------|
| `GROK_API_KEY` | `xai-your-key-here` |

---

## ✨ Features

| Feature | Details |
|---------|---------|
| **AI Model** | Grok-3 (latest) via xAI API |
| **Platforms** | Instagram, Facebook, Google Ads, LinkedIn, X/Twitter, YouTube |
| **Ad Formats** | 3–4 formats per platform with exact pixel dimensions |
| **Copy Variants** | 3 variants per generation (Pain Point, Aspiration, Social Proof angles) |
| **Brand Colors** | 3-color picker + 8 preset palettes |
| **Tone Options** | 8 creative tones (Bold, Luxury, Urgent, Playful, etc.) |
| **Insights** | Platform strategy + Psychology trigger + Copywriting rationale |
| **Library** | Persistent local storage — save, search, delete, reload ads |
| **Backend** | Vercel Edge Function — API key never exposed to client |

---

## 🔒 Security

- API key is stored **only** in Vercel environment variables
- All Grok API calls happen **server-side** in `/api/generate-ad.js`
- Client never sees the API key

---

## 🛠 Tech Stack

- **Frontend**: React 18 + Vite
- **State**: Zustand (with localStorage persistence for library)
- **Styling**: Custom CSS design system (Syne + DM Sans fonts)
- **Backend**: Vercel Edge Functions (serverless)
- **AI**: xAI Grok-3 API

---

## 📦 Build for Production

```bash
npm run build
```

Output goes to `/dist` — Vercel handles this automatically on deploy.

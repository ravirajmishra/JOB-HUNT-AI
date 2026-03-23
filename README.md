# JobAI Pro — Deployment Guide

## Project structure

```
jobai/
├── index.html        ← The entire frontend app
├── vercel.json       ← Vercel routing config
├── api/
│   ├── gemini.js     ← Serverless proxy for Gemini API
│   └── jsearch.js    ← Serverless proxy for JSearch/RapidAPI
└── README.md
```

---

## API Key Security — What to use and when

| Scenario | Approach | Keys visible to users? |
|---|---|---|
| Just you, local file | Type keys in the setup screen | No — only in your browser localStorage |
| Deployed on Vercel (personal) | Environment Variables | No — keys stay on Vercel's servers |
| Shared with others | Environment Variables | No — proxy hides keys from all users |
| Hardcoded in HTML | ❌ Never do this | Yes — anyone can steal them |

---

## Option A: Run locally (simplest)

Just open `index.html` in your browser. On the setup screen, type your API keys. They get stored in `localStorage` on your machine only — never sent anywhere except the AI APIs.

---

## Option B: Deploy to Vercel with environment variables (recommended)

### Step 1 — Push to GitHub

Create a new GitHub repo and push this entire folder:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/jobai.git
git push -u origin main
```

### Step 2 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New → Project"**
3. Import your GitHub repo
4. Click **Deploy** (no build settings needed)

### Step 3 — Add environment variables

In your Vercel project dashboard:
1. Go to **Settings → Environment Variables**
2. Add these variables:

| Key | Value |
|---|---|
| `GEMINI_API_KEY` | Your Gemini API key from aistudio.google.com |
| `RAPIDAPI_KEY` | Your RapidAPI key from rapidapi.com |
| `GEMINI_MODEL` | `gemini-2.0-flash-lite` (or your preferred model) |

3. Click **Save** and **Redeploy**

### That's it. Your app is live at `your-project.vercel.app`

When deployed, the app automatically detects it's running on Vercel and routes all AI calls through `/api/gemini` and `/api/jsearch` — your actual keys never reach the browser.

---

## How the proxy works (for the curious)

```
Browser → /api/gemini (your Vercel server) → Gemini API
                ↑
         Key lives here, in env var
         Browser never sees it
```

Without the proxy:
```
Browser → Gemini API directly (key visible in DevTools Network tab)
```

---

## Get your free API keys

**Gemini (AI)**
→ https://aistudio.google.com/app/apikey
→ Sign in with Google → Create API Key
→ Free tier: 1500 requests/day on Flash Lite

**RapidAPI / JSearch (Job search)**
→ https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch
→ Subscribe to Basic (free) plan
→ 500 requests/month free = ~15-20 job searches/day

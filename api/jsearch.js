// api/jsearch.js — Vercel serverless function
// Your RAPIDAPI_KEY lives in Vercel env vars, never exposed to browser

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const rapidKey = process.env.RAPIDAPI_KEY;

  if (!rapidKey) {
    return res.status(500).json({ error: 'RAPIDAPI_KEY not configured on server' });
  }

  try {
    const { query, page = '1', num_pages = '2', date_posted = 'week' } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'query parameter is required' });
    }

    const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(query)}&page=${page}&num_pages=${num_pages}&date_posted=${date_posted}`;

    const upstream = await fetch(url, {
      headers: {
        'X-RapidAPI-Key': rapidKey,
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
      },
    });

    const data = await upstream.json();

    if (!upstream.ok) {
      return res.status(upstream.status).json(data);
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

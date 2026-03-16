// api/search.js
export default async function handler(req, res) {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: "No query provided" });

    // The Disguise: Tells Roblox this request is coming from a normal Chrome browser
    const headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "application/json",
        "Origin": "https://www.roblox.com"
    };

    try {
        // Attempt 1: Direct to Roblox with browser headers
        let url = `https://users.roblox.com/v1/users/search?keyword=${encodeURIComponent(query)}&limit=24`;
        let response = await fetch(url, { headers });
        let data = await response.json();

        // Attempt 2: If Roblox blocked Vercel's IP, silently failover to proxy
        if (!data.data) {
            url = `https://users.roproxy.com/v1/users/search?keyword=${encodeURIComponent(query)}&limit=24`;
            response = await fetch(url, { headers });
            data = await response.json();
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to communicate with Database" });
    }
}

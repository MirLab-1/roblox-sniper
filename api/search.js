export default async function handler(req, res) {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: "No query provided" });

    const targetUrl = `https://users.roblox.com/v1/users/search?keyword=${encodeURIComponent(query)}&limit=24`;

    // Server-to-Server Rotation: These nodes strip the CAPTCHA before Vercel reads it
    const proxies = [
        `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(targetUrl)}`,
        `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`,
        `https://users.roproxy.com/v1/users/search?keyword=${encodeURIComponent(query)}&limit=24`
    ];

    for (let url of proxies) {
        try {
            const response = await fetch(url);
            if (!response.ok) continue; // If Node 1 is blocked, instantly hit Node 2
            
            const data = await response.json();
            
            // Verify we actually got Roblox data, not a security page
            if (data && data.data) {
                return res.status(200).json(data);
            }
        } catch (e) {
            continue;
        }
    }
    
    // If all fail, throw an error so the frontend knows it's a network issue, not a missing player
    res.status(500).json({ error: "Global proxy network offline" });
}

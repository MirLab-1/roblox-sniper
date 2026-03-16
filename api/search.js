export default async function handler(req, res) {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: "No query" });

    // IP SPOOFING: Tricks the proxy into thinking every search is a brand new person
    const spoofedIP = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;

    try {
        const url = `https://users.roproxy.com/v1/users/search?keyword=${encodeURIComponent(query)}&limit=24`;
        const response = await fetch(url, {
            headers: {
                "X-Forwarded-For": spoofedIP,
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0"
            }
        });
        
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Dead Connection" });
    }
}

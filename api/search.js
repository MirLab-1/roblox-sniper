// api/search.js
export default async function handler(req, res) {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: "No query provided" });

    try {
        const url = `https://users.roblox.com/v1/users/search?keyword=${encodeURIComponent(query)}&limit=24`;
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to communicate with Roblox Server" });
    }
}
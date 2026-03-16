// api/thumbnails.js
export default async function handler(req, res) {
    const { userIds } = req.query;
    if (!userIds) return res.status(400).json({ error: "No IDs provided" });

    const headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "application/json",
        "Origin": "https://www.roblox.com"
    };

    try {
        let url = `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userIds}&size=150x150&format=Png&isCircular=true`;
        let response = await fetch(url, { headers });
        let data = await response.json();

        if (!data.data) {
            url = `https://thumbnails.roproxy.com/v1/users/avatar-headshot?userIds=${userIds}&size=150x150&format=Png&isCircular=true`;
            response = await fetch(url, { headers });
            data = await response.json();
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch avatars" });
    }
}

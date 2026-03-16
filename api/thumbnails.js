// api/thumbnails.js
export default async function handler(req, res) {
    const { userIds } = req.query;
    if (!userIds) return res.status(400).json({ error: "No IDs provided" });

    try {
        const url = `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userIds}&size=150x150&format=Png&isCircular=true`;
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch avatars" });
    }
}
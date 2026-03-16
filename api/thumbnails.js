export default async function handler(req, res) {
    const { userIds } = req.query;
    if (!userIds) return res.status(400).json({ error: "No IDs provided" });

    const targetUrl = `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userIds}&size=150x150&format=Png&isCircular=true`;

    const proxies = [
        `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(targetUrl)}`,
        `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`,
        `https://thumbnails.roproxy.com/v1/users/avatar-headshot?userIds=${userIds}&size=150x150&format=Png&isCircular=true`
    ];

    for (let url of proxies) {
        try {
            const response = await fetch(url);
            if (!response.ok) continue;
            
            const data = await response.json();
            
            if (data && data.data) {
                return res.status(200).json(data);
            }
        } catch (e) {
            continue;
        }
    }

    res.status(500).json({ error: "Failed to pull image data" });
}

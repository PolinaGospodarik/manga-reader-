// // api/proxy.js
// export default async function handler(req, res) {
//     const targetUrl = 'https://api.mangadex.org' + req.url.replace(/^\/api/, '');
//     try {
//         const response = await fetch(targetUrl, {
//             method: req.method,
//             headers: req.headers,
//             body: req.method === 'POST' || req.method === 'PUT' ? req.body : undefined,
//         });
//         const data = await response.json();
//         res.status(response.status).json(data);
//     } catch (error) {
//         res.status(500).json({ error: 'Ошибка при запросе к API' });
//     }
// }

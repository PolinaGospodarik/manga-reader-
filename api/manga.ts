import axios from 'axios';

export default async function handler(req:any, res:any) {
    // Строим URL с параметрами запроса
    const externalApiUrl = `https://api.mangadex.org/manga${req.url?.replace('/api/manga', '')}`;

    try {
        // Выполняем запрос к внешнему API
        const response = await axios.get(externalApiUrl);

        console.log("не хуй");
        res.status(200).json(response.data);
    } catch (error) {
        console.log("хуй");
        res.status(500).json({ message: 'Ошибка при обработке запроса' });
    }
}


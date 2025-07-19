import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'ID de guilde manquant' });
    }

    try {
        const response = await axios.get(`http://localhost:5000/api/guilds/${id}`, {
            headers: {
                Authorization: `Bearer ${process.env.API_TOKEN ? process.env.API_TOKEN : ''}`,
            },
        });

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Impossible de récupérer les infos de guilde' });
    }
}

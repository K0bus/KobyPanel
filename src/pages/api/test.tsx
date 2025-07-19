import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await axios.get('http://localhost:5000/api/guilds/123456');
        res.status(200).json(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('🔴 Axios error:', error.message);

            if (error.response) {
                console.error('🔴 Backend responded with:', error.response.data);
                res.status(error.response.status).json({
                    error: 'Erreur du backend',
                    details: error.response.data,
                });
            } else if (error.request) {
                console.error('🔴 Aucune réponse reçue du backend');
                res.status(502).json({
                    error: 'Aucune réponse reçue du backend',
                });
            } else {
                console.error('🔴 Erreur lors de la configuration de la requête');
                res.status(500).json({
                    error: 'Erreur de configuration Axios',
                });
            }
        } else {
            console.error('🔴 Erreur inconnue:', error);
            res.status(500).json({ error: 'Erreur inconnue' });
        }
    }
}

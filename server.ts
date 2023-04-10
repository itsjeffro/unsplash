import 'dotenv/config';
import express from 'express';
import ViteExpress from 'vite-express';
import axios from 'axios';

const app = express();

app.get('/search', async (req, res) => {
    const { page, query } = req.query;

    const response = await axios.get(
        `https://api.unsplash.com/search/photos?page=${page || 1}&query=${query}`,
        {
            headers: {
                'Authorization': `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
            },
        }
    );

    res.status(200).json(response.data);
});

ViteExpress.listen(app, 3000, () => console.log('Server is listening...'));

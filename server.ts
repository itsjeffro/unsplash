import 'dotenv/config';
import express, { Request, Response } from 'express';
import ViteExpress from 'vite-express';
import axios from 'axios';

const app = express();

type QueryParams = {
  page: string;
  query: string;
};

app.get('/search', async (req: Request<{}, {}, {}, QueryParams>, res: Response) => {
  const { page, query }  = req.query;

  const queryParams = new URLSearchParams({
    per_page: '20',
    page: page || '1',
    query: query || null,
  });

  try {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?${queryParams.toString()}`,
      {
          headers: {
              'Authorization': `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
          },
      }
    );

    res.status(200).json(response.data);
  } catch (exception) {
    res.status(400).json({ message: 'Something went wrong! Maybe you forgot to set your env keys?' });
  }
});

ViteExpress.listen(app, 3000, () => console.log('Server is listening...'));

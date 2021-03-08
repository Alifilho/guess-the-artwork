import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: 'Missing params' });

    const newArtist = await prisma.artist.create({
      data: { name },
    });

    res.status(200).json({ newArtist });
  }

  if (req.method === 'DELETE') {
    await prisma.artist.deleteMany({});
    return res.status(200).json({ message: 'Database cleared' });
  }

  if (req.method === 'GET') {
    const artworks = await prisma.artist.findMany({});
    return res.status(200).json({ artworks });
  }
};

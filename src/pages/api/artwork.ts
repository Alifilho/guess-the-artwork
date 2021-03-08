import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { name, imageUrl, age, period } = req.body;
    const { artistId } = req.query;

    if (!name || !imageUrl || !age || !period || !artistId)
      return res.status(400).json({ message: 'Missing params' });

    const newArtwork = await prisma.artwork.create({
      data: { name, imageUrl, age, period, artistId: Number(artistId) },
    });

    res.status(200).json({ newArtwork });
  }

  if (req.method === 'GET') {
    const artworks = await prisma.artwork.findMany({});
    return res.status(200).json({ artworks });
  }
};

import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { name, imageUrl, age, period, artistName } = req.body;

    if (!name || !imageUrl || !age || !period || !artistName)
      return res.status(400).json({ message: 'Missing params' });

    const newArtist = await prisma.artist.create({
      data: { name: artistName },
    });

    const newArtwork = await prisma.artwork.create({
      data: { name, imageUrl, age, period, artistId: newArtist.id },
    });

    res.status(200).json({ newArtwork });
  }
};

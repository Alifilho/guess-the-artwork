import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const newArtist = await prisma.artist.create({
      data: { name: 'Leonardo da Vinci' },
    });
    const response = await prisma.artist.findFirst();
    res.status(200).json({ message: { response, newArtist } });
  }
};

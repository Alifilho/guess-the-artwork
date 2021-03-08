import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const countArtworks = await prisma.artwork.count();

    let randomArtwork = Math.floor(Math.random() * countArtworks);

    if (randomArtwork === 0) randomArtwork++;

    const artwork = await prisma.artwork.findUnique({
      where: { id: randomArtwork },
    });

    const countArtists = await prisma.artist.count();

    const artists = [];

    const correctArtist = await prisma.artist.findUnique({
      where: { id: artwork?.artistId },
    });

    artists.push(correctArtist);

    while (artists.length < 4) {
      const randomId = Math.floor(Math.random() * countArtists);

      if (!artists.find((artist) => artist?.id === randomId)) {
        const otherArtist = await prisma.artist.findUnique({
          where: { id: randomId },
        });

        if (otherArtist) artists.push(otherArtist);
      }
    }

    res.status(200).json({ artwork, artists });
  }
};

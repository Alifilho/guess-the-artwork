import { FC, useEffect, useState } from 'react';

import { Flex, Image, Button, Heading, Text, useToast } from '@chakra-ui/react';

import api from '@/services/api';

import { Artist } from '@/interfaces/models/Artist';
import { Artwork } from '@/interfaces/models/Artwork';

import { GameProps } from '@/interfaces/components/game';

const Game: FC<GameProps> = ({ artists, artwork }: GameProps) => {
  console.log({ artists, artwork });

  const [answer, setAnswer] = useState(artwork.artistId);
  const [currentArtists, setCurrentArtists] = useState<Array<Artist>>(artists);
  const [currentArtwork, setCurrentArtwork] = useState<Artwork>(artwork);
  const [score, setScore] = useState(0);

  const toast = useToast();

  const selectArtist = (artist: Artist) => {
    if (artist.id === answer) {
      toast({
        title: 'Correct Answer',
        status: 'success',
        duration: 5000,
        position: 'top',
      });
      getNextRound(true);
    } else {
      toast({
        title: 'Error Answer',
        status: 'error',
        duration: 5000,
        position: 'top',
      });
      getNextRound(false);
    }
  };

  const getNextRound = async (isAnswerRight: boolean) => {
    const { artwork, artists } = (await api.get('/game')).data;

    setCurrentArtists(artists);
    setCurrentArtwork(artwork);

    if (isAnswerRight) {
      setScore(score + 1);
    } else {
      setScore(0);
    }
  };

  useEffect(() => {
    setScore(0);
  }, []);

  useEffect(() => {
    localStorage.setItem('score', JSON.stringify(score));
  }, [score]);

  return (
    <Flex w="100vw" h="100vh" justify="center">
      <Flex direction="column" align="center" mt="15vh">
        <Heading>Guess the Artwork</Heading>
        <Image src={currentArtwork.imageUrl} alt="Image" />
        <Flex mt="2.5vh">
          {currentArtists.map((artist) => (
            <Button mx="1vw" onClick={() => selectArtist(artist)}>
              {artist.name}
            </Button>
          ))}
        </Flex>
        <Flex>
          <Text>Score </Text> {score}
        </Flex>
      </Flex>
    </Flex>
  );
};

export async function getStaticProps() {
  const { artwork, artists } = (await api.get('/game')).data;

  return { props: { artwork, artists } };
}

export default Game;

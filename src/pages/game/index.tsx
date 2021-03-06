import { FC, useState } from 'react';

import { Flex, Image, Button, Heading, useToast } from '@chakra-ui/react';

const art = {
  artistName: 'Jackson Pollock',
  imageUrl:
    'https://d32dm0rphc51dk.cloudfront.net/NwSWV2ah9kkXAuSxCkYvsw/large.jpg',
  name: 'Untitled, 1075',
  age: '1944',
};

const artists = [
  'Leonard da Vinci',
  'Tarsila do Amaral',
  'Pablo Picasso',
  'Jackson Pollock',
];
const Game: FC = () => {
  const [answer] = useState('Jackson Pollock');

  const toast = useToast();

  const selectArtist = (name: string) => {
    if (name === answer) {
      toast({
        title: 'Correct Answer',
        status: 'success',
        duration: 5000,
        position: 'top',
      });
    } else {
      toast({
        title: 'Error Answer',
        status: 'error',
        duration: 5000,
        position: 'top',
      });
    }
  };

  return (
    <Flex w="100vw" h="100vh" justify="center">
      <Flex direction="column" align="center" mt="15vh">
        <Heading>Guess the Artwork</Heading>
        <Image src={art.imageUrl} alt="Image" />
        <Flex mt="2.5vh">
          {artists.map((item) => (
            <Button key={item} mx="1vw" onClick={() => selectArtist(item)}>
              {item}
            </Button>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Game;

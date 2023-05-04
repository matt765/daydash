import { Button, Flex } from '@chakra-ui/react';
import Image from 'next/image';

import snakeImage from '../../assets/images/snake.png';

interface SnakeButtonProps {
  onClick: () => void;
}

export const SnakeButton = ({ onClick }: SnakeButtonProps) => (
  <Flex
    position="fixed"
    left="1rem"
    top="0"
    height="100%"
    w="7rem"
    alignItems="center">
    <Button
      variant="round"
      w="7rem"
      h="7rem"
      onClick={onClick}
      sx={{
        '& svg': {
          width: '40px',
          height: '50px',
          fill: 'weatherIcon',
        },
      }}>
      <Image src={snakeImage} alt="Weather Icon" width={50} height={50} />
    </Button>
  </Flex>
);

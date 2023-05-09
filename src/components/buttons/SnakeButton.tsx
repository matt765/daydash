import { SnakeIcon } from '@/assets/icons/SnakeIcon';
import { Button, Flex, Icon } from '@chakra-ui/react';

interface SnakeButtonProps {
  onClick: () => void;
}

export const SnakeButton = ({ onClick }: SnakeButtonProps) => (
  <Flex
    position="fixed"
    left="1rem"
    top="0"
    height="100%"
    w="6rem"
    alignItems="center">
    <Button
      variant="round"
      w="6rem"
      h="6rem"
      onClick={onClick}
      sx={{
        '& svg': {
          width: '35px',
          height: '40px',
          fill: 'weatherIcon',
        },
      }}>
      <Icon as={SnakeIcon} boxSize={7} />
    </Button>
  </Flex>
);

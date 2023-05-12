import { SnakeIcon } from '@/assets/icons/SnakeIcon';
import { ViewType } from '@/hooks/useHomepage';
import { Button, Flex, Icon } from '@chakra-ui/react';

interface SnakeButtonProps {
  handleToggleView: (view: ViewType, deviceType: 'mobile' | 'desktop') => void;
  desktopView: ViewType;
}

export const SnakeButton = ({
  handleToggleView,
  desktopView,
}: SnakeButtonProps) => {
  const toggleView = () => {
    handleToggleView(
      desktopView === 'notepad' ? 'dashboard' : 'notepad',
      'desktop'
    );
  };
  return (
    <Flex
      position="fixed"
      left="1rem"
      top="0"
      height="100%"
      w="6rem"
      display={{ base: 'none', lg: 'flex' }}
      alignItems="center">
      <Button
        variant="round"
        w="6rem"
        h="6rem"
        onClick={toggleView}
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
};

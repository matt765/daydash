import { Button, Flex, Icon, Tooltip } from '@chakra-ui/react';

import { NotepadEditIcon } from '@/assets/icons/NotepadEditIcon';
import { SettingsIcon } from '@/assets/icons/SettingsIcon';
import { HomeIcon } from '@/assets/icons/HomeIcon';
import { ViewType } from '@/hooks/useHomepage';

interface SideButtonsProps {
  desktopView: ViewType;
  handleToggleView: (view: ViewType, deviceType: 'mobile' | 'desktop') => void;
  openDrawer: () => void;
}

export const SideButtons = ({
  desktopView,
  handleToggleView,
  openDrawer,
}: SideButtonsProps) => {
  const toggleView = () => {
    handleToggleView(
      desktopView === 'notepad' ? 'dashboard' : 'notepad',
      'desktop'
    );
  };
  return (
    <Flex
      position="fixed"
      direction="column"
      bottom="2rem"
      right={{ lg: '1rem', xl: '2rem' }}
      sx={{
        '& svg': {
          stroke: 'sideButtonIcon',
          width: '30px',
          height: '30px',
        },
      }}
      gap="1rem">
      <Tooltip
        label={desktopView === 'notepad' ? 'Show dashboard' : 'Show notepad'}
        fontSize="md"
        placement="left"
        px="0.7rem"
        py="0.4rem"
        borderRadius="5px"
        color="primaryText"
        mb="0.3rem"
        bg="sideButtonBg">
        <Button
          variant="round"
          onClick={toggleView}
          sx={{
            '& svg': {
              fill: 'sideButtonIcon',
              width: '22px',
              height: '22px',
            },
          }}>
          <Icon
            as={desktopView === 'notepad' ? HomeIcon : NotepadEditIcon}
            boxSize={7}
          />
        </Button>
      </Tooltip>
      <Tooltip
        label="Settings"
        fontSize="md"
        placement="left"
        px="0.7rem"
        py="0.4rem"
        borderRadius="5px"
        color="primaryText"
        mb="0.3rem"
        bg="sideButtonBg">
        <Button variant="round" onClick={openDrawer}>
          <Icon as={SettingsIcon} boxSize={7} />
        </Button>
      </Tooltip>
    </Flex>
  );
};

import { Button, Flex, Icon } from '@chakra-ui/react';

import { NotepadEditIcon } from '@/assets/icons/NotepadEditIcon';
import { SettingsIcon } from '@/assets/icons/SettingsIcon';
import { HomeIcon } from '@/assets/icons/HomeIcon';

interface SideButtonsProps {
  view: string;
  handleToggleView: () => void;
  openDrawer: () => void;
}

export const SideButtons = ({
  view,
  handleToggleView,
  openDrawer,
}: SideButtonsProps) => (
  <Flex
    position="fixed"
    direction="column"
    bottom="2rem"
    right="2rem"
    sx={{
      '& svg': {
        stroke: 'sideButtonIcon',
        width: '30px',
        height: '30px',
      },
    }}
    gap="1rem">
    <Button
      variant="round"
      onClick={handleToggleView}
      sx={{
        '& svg': {
          fill: 'sideButtonIcon',
          width: '22px',
          height: '22px',
        },
      }}>
      <Icon as={view === 'notepad' ? HomeIcon : NotepadEditIcon} boxSize={7} />
    </Button>
    <Button variant="round" onClick={openDrawer}>
      <Icon as={SettingsIcon} boxSize={7} />
    </Button>
  </Flex>
);

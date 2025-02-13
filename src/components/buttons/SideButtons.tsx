import React from 'react';
import { Button, Flex, Icon, Tooltip } from '@chakra-ui/react';
import { NotepadEditIcon } from '@/assets/icons/NotepadEditIcon';
import { SettingsIcon } from '@/assets/icons/SettingsIcon';
import { HomeIcon } from '@/assets/icons/HomeIcon';
import { SnakeIcon } from '@/assets/icons/SnakeIcon';
import { ViewType } from '@/hooks/useHomepage';

interface SideButtonsProps {
  desktopView: ViewType;
  handleToggleView: (view: ViewType, deviceType: 'mobile' | 'desktop') => void;
  openDrawer: () => void;
  showSnakeButton: boolean;
}

export const SideButtons = ({
  desktopView,
  handleToggleView,
  openDrawer,
  showSnakeButton,
}: SideButtonsProps) => {
  const handleViewChange = (newView: ViewType) => {
    handleToggleView(
      desktopView === newView ? 'dashboard' : newView,
      'desktop'
    );
  };

  return (
    <Flex
      position="fixed"
      left="1rem"
      top="0"
      height="100%"
      direction="column"
      justify="center"
      gap="0.7rem"
      display={{ base: 'none', xl: 'flex' }}
      sx={{
        '& svg': {
          width: '30px',
          height: '30px',
        },
      }}>
      <Tooltip
        label={desktopView === 'dashboard' ? 'Current view' : 'Show dashboard'}
        fontSize="md"
        placement="right"
        px="0.7rem"
        py="0.4rem"
        borderRadius="5px"
        color="primaryText"
        bg="sideButtonBg">
        <Button
          variant="round"
          width="4rem"
          height="4rem"
          onClick={() => handleViewChange('dashboard')}
          sx={{
            '& svg': {
              fill: desktopView === 'dashboard' ? 'mainColor' : 'rgb(255,255,255,0.6)',
              width: '27px',
              height: '27px',
            },
          }}>
          <Icon as={HomeIcon} boxSize={7} />
        </Button>
      </Tooltip>

      <Tooltip
        label={desktopView === 'notepad' ? 'Current view' : 'Show notepad'}
        fontSize="md"
        placement="right"
        px="0.7rem"
        py="0.4rem"
        borderRadius="5px"
        color="primaryText"
        bg="sideButtonBg">
        <Button
          variant="round"
          width="4rem"
          height="4rem"
          onClick={() => handleViewChange('notepad')}
          sx={{
            '& svg': {
              fill: desktopView === 'notepad' ? 'mainColor' : 'rgb(255,255,255,0.6)',
              width: '22px',
              height: '22px',
            },
          }}>
          <Icon as={NotepadEditIcon} boxSize={7} />
        </Button>
      </Tooltip>

      {showSnakeButton && (
        <Tooltip
          label={desktopView === 'snake' ? 'Current view' : 'Show snake game'}
          fontSize="md"
          placement="right"
          px="0.7rem"
          py="0.4rem"
          borderRadius="5px"
          color="primaryText"
          bg="sideButtonBg">
          <Button
            variant="round"
            width="4rem"
            height="4rem"
            onClick={() => handleViewChange('snake')}
            sx={{
              '& svg': {
                fill: desktopView === 'snake' ? 'mainColor' : 'rgb(255,255,255,0.6)',
                width: '20px',
                height: '20px',
              },
            }}>
            <Icon as={SnakeIcon} boxSize={7} />
          </Button>
        </Tooltip>
      )}

      <Tooltip
        label="Settings"
        fontSize="md"
        placement="right"
        px="0.7rem"
        py="0.4rem"
        borderRadius="5px"
        color="primaryText"
        bg="sideButtonBg">
        <Button
          variant="round"
          width="4rem"
          height="4rem"
          onClick={openDrawer}
          sx={{
            '& svg': {
              stroke: 'secondaryText',
              width: '22px',
              height: '22px',
            },
          }}>
          <Icon as={SettingsIcon} boxSize={7} />
        </Button>
      </Tooltip>
    </Flex>
  );
};

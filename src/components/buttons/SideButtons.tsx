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
    handleToggleView(newView, 'desktop');
  };

  return (
    <Flex
      position="fixed"
      left="0.5rem"
      top="0"
      height="100%"
      direction="column"
      justify="center"
      gap="0.5rem"
      display={{ base: 'none', lg: 'flex' }}
      sx={{
        '& svg': {
          width: '30px',
          height: '30px',
        },
      }}>
      <Tooltip
        label="Dashboard"
        fontSize="md"
        placement="right"
        px="0.7rem"
        py="0.4rem"
        borderRadius="5px"
        color="primaryText"
        bg="sideButtonBg">
        <Button
          variant="round"
          width={{ base: '3.5rem', '3xl': '4rem' }}
          height={{ base: '3.5rem', '3xl': '4rem' }}
          onClick={() => handleViewChange('dashboard')}
          sx={{
            '& svg': {
              fill:
                desktopView === 'dashboard'
                  ? 'mainColor'
                  : 'rgb(255,255,255,0.6)',
              width: { base: '22px', '3xl': '25px' },
              height: { base: '22px', '3xl': '25px' },
            },
          }}>
          <Icon as={HomeIcon} boxSize={7} />
        </Button>
      </Tooltip>

      <Tooltip
        label="Notepad"
        fontSize="md"
        placement="right"
        px="0.7rem"
        py="0.4rem"
        borderRadius="5px"
        color="primaryText"
        bg="sideButtonBg">
        <Button
          variant="round"
          width={{ base: '3.5rem', '3xl': '4rem' }}
          height={{ base: '3.5rem', '3xl': '4rem' }}
          onClick={() => handleViewChange('notepad')}
          sx={{
            '& svg': {
              fill:
                desktopView === 'notepad'
                  ? 'mainColor'
                  : 'rgb(255,255,255,0.6)',
              width: { base: '19px', '3xl': '22px' },
              height: { base: '19px', '3xl': '22px' },
            },
          }}>
          <Icon as={NotepadEditIcon} boxSize={7} />
        </Button>
      </Tooltip>

      {showSnakeButton && (
        <Tooltip
          label="Snake"
          fontSize="md"
          placement="right"
          px="0.7rem"
          py="0.4rem"
          borderRadius="5px"
          color="primaryText"
          bg="sideButtonBg">
          <Button
            variant="round"
            width={{ base: '3.5rem', '3xl': '4rem' }}
            height={{ base: '3.5rem', '3xl': '4rem' }}
            onClick={() => handleViewChange('snake')}
            sx={{
              '& svg': {
                fill:
                  desktopView === 'snake'
                    ? 'mainColor'
                    : 'rgb(255,255,255,0.6)',
                width: { base: '18px', '3xl': '22px' },
                height: { base: '18px', '3xl': '22px' },
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
          width={{ base: '3.5rem', '3xl': '4rem' }}
          height={{ base: '3.5rem', '3xl': '4rem' }}
          onClick={openDrawer}
          sx={{
            '& svg': {
              stroke: 'secondaryText',
              width: { base: '25px', '3xl': '27px' },
              height: { base: '25px', '3xl': '27px' },
            },
          }}>
          <Icon as={SettingsIcon} boxSize={7} />
        </Button>
      </Tooltip>
    </Flex>
  );
};

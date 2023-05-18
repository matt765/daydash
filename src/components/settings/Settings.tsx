import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
} from '@chakra-ui/react';

import { ClearAllData } from '../modals/ClearAllDataModal';
import { EditUserData } from '../modals/EditUserDataModal';
import { SettingsContent } from './SettingsContent';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  btnRef: React.RefObject<HTMLButtonElement>;
  onEditUserData: () => void;
  onEditUserDataClose: () => void;
  onClearAllData: () => void;
  onClearAllDataClose: () => void;
  isDrawerContentVisible: boolean;
  setIsDrawerContentVisible: (value: boolean) => void;
  isEditUserDataOpen: boolean;
  isClearAllDataOpen: boolean;
}

export const Settings = ({
  isOpen,
  onClose,
  btnRef,
  onEditUserData,
  onEditUserDataClose,
  onClearAllData,
  onClearAllDataClose,
  isDrawerContentVisible,
  setIsDrawerContentVisible,
  isEditUserDataOpen,
  isClearAllDataOpen,
}: SettingsProps) => {
  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}>
        <DrawerOverlay
          onClick={() => {
            onClose();
            onEditUserDataClose();
            onClearAllDataClose();
          }}
        />
        {isDrawerContentVisible && (
          <DrawerContent
            sx={{
              backgroundColor: 'settingsBg',
              color: 'white',
            }}
            pb="1rem"
            backdropFilter="blur(24px)"
            h={{ base: 'calc(100% - 5rem)', lg: '100%' }}
            maxW={{ base: '100vw', md: '20rem' }}>
            <DrawerCloseButton
              mt="0.8rem"
              sx={{
                '& svg': {
                  width: '16px',
                  height: '16px',
                },
              }}
            />
            <DrawerBody padding="0" overflow="hidden" height="100%">
              <SettingsContent
                onEditUserData={onEditUserData}
                onClearAllData={onClearAllData}
                onCloseSettings={() => setIsDrawerContentVisible(false)}
              />
            </DrawerBody>
          </DrawerContent>
        )}
      </Drawer>
      <Box
        sx={{
          '& input': {
            backgroundColor: 'introInputBg',
            outline: 'none !important',
            borderColor: 'rgb(255,255,255,0)',
            outlineWidth: '0px !important',
            boxShadow: 'none !important',
            borderWidth: '1px !important',
            '&:hover': {
              borderColor: 'mainColor !important',
            },
            '&:active, &:focus, &:focus-visible': {
              backgroundColor: 'introInputHoverBg',
              borderColor: 'mainColor !important',
            },
          },
        }}>
        {isEditUserDataOpen && (
          <EditUserData
            onClose={() => {
              onEditUserDataClose();
              onClose();
            }}
          />
        )}
        {isClearAllDataOpen && (
          <ClearAllData
            onClose={() => {
              onClearAllDataClose();
              onClose();
            }}
          />
        )}
      </Box>
    </>
  );
};

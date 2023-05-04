import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { useState } from 'react';

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
}: SettingsProps) => {
  return (
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
            backgroundColor: 'rgb(40, 49, 62)',
            color: 'white',
          }}
          pb="1rem"
          >
          <DrawerCloseButton
            mt="0.8rem"
            sx={{
              '& svg': {
                width: '16px',
                height: '16px',
              },
            }}
          />
          <DrawerBody padding="0" overflow="hidden" height="100%" >
            <SettingsContent
              onEditUserData={onEditUserData}
              onClearAllData={onClearAllData}
              onCloseSettings={() => setIsDrawerContentVisible(false)}
            />
          </DrawerBody>
        </DrawerContent>
      )}
    </Drawer>
  );
};

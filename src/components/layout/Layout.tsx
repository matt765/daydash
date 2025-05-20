'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { Flex, useMediaQuery } from '@chakra-ui/react';
import { SideButtons } from '@/components/layout/SideButtons';
import { Settings } from '@/components/settings/Settings';
import { MobileNavigation } from '@/components/layout/MobileNavigation';
import { Loader } from '@/components/common/Loader';
import { useHomepage, ViewType } from '@/hooks/useHomepage';
import { useRouter } from 'next/router';
import { useUserStoreWrapper } from '@/store/userStore';
import { PageWrapper } from '../common/PageWrapper';
import { useNotepadStore } from '@/store/notepadStore';
import { NotepadAlert } from '../modals/NotepadAlert';

interface LayoutProps {
  children: ReactNode;
  currentView?: string;
  requiresAuth?: boolean;
  mobileView?: string;
  handleViewChange?: (view: ViewType, deviceType: 'mobile' | 'desktop') => void;
}

export const Layout = ({ children }: LayoutProps) => {
  const {
    name,
    city,
    onSettingsPanelOpen,
    onSettingsPanelClose,
    onEditUserDataOpen,
    onEditUserDataClose,
    onClearAllDataOpen,
    onClearAllDataClose,
    isSettingsPanelOpen,
    isEditUserDataOpen,
    isClearAllDataOpen,
    btnRef,
    showSnakeButton,
    isDrawerContentVisible,
    setIsDrawerContentVisible,
    getBackgroundImage,
    isBgImageLoaded,
    mobileView,
    handleViewChange,
  } = useHomepage();

  const { isMounted } = useUserStoreWrapper();

  const isUserDataPresent = name && city;

  const [isDesktop] = useMediaQuery('(min-width: 1280px)');

  const { isModalVisible, setIsModalVisible, setIsNotepadModalConfirmed } =
    useNotepadStore();

  if (!isMounted || !isBgImageLoaded) {
    return (
      <Flex w="100vw" h="100vh" justify="center" alignItems="center">
        <Loader />
      </Flex>
    );
  }

  const handleModalClose = (save: boolean) => {
    setIsModalVisible(false);
    if (save) {
      setIsNotepadModalConfirmed(true);
    }
  };

  return (
    <Flex
      w="100%"
      h="100vh"
      justify="center"
      alignItems="center"
      bgImage={getBackgroundImage()}
      bgColor="homepageBg"
      bgRepeat="no-repeat"
      position="relative"
      bgSize="cover">
      <Flex w="100%" h="100%" justify="center" alignItems="center">
        {isDesktop ? (
          <Flex
            w={{ lg: '60rem', xl: '56rem', '3xl': '68rem' }}
            h={{ lg: '43rem', xl: '38rem', '3xl': '47rem' }}
            justify="center"
            alignItems="center">
            {isUserDataPresent ? (
              <PageWrapper>{children}</PageWrapper>
            ) : (
              children
            )}
          </Flex>
        ) : (
          <Flex
            pb={isUserDataPresent ? '5rem' : '0'}
            w="100%"
            h="100%"
            justify="center"
            alignItems="center">
            {isUserDataPresent ? (
              <PageWrapper>{children}</PageWrapper>
            ) : (
              children
            )}
          </Flex>
        )}
      </Flex>
      {isUserDataPresent && isDesktop && (
        <SideButtons
          openDrawer={() => {
            onSettingsPanelOpen();
            setIsDrawerContentVisible(true);
          }}
          showSnakeButton={showSnakeButton}
        />
      )}
      <Settings
        isOpen={isSettingsPanelOpen}
        onClose={onSettingsPanelClose}
        btnRef={btnRef}
        onEditUserData={onEditUserDataOpen}
        onEditUserDataClose={onEditUserDataClose}
        onClearAllData={onClearAllDataOpen}
        onClearAllDataClose={onClearAllDataClose}
        isDrawerContentVisible={isDrawerContentVisible}
        setIsDrawerContentVisible={setIsDrawerContentVisible}
        isEditUserDataOpen={isEditUserDataOpen}
        isClearAllDataOpen={isClearAllDataOpen}
      />
      {!isDesktop && isUserDataPresent && (
        <MobileNavigation
          openDrawer={() => {
            if (isSettingsPanelOpen) {
              onSettingsPanelClose();
              setIsDrawerContentVisible(false);
            } else {
              onSettingsPanelOpen();
              setIsDrawerContentVisible(true);
            }
          }}
          isSettingsPanelOpen={isSettingsPanelOpen}
          onSettingsPanelClose={onSettingsPanelClose}
          mobileView={mobileView}
          onEditUserDataClose={onEditUserDataClose}
          onClearAllDataClose={onClearAllDataClose}
          handleViewChange={handleViewChange}
        />
      )}
      {isModalVisible && <NotepadAlert handleModalClose={handleModalClose} />}
    </Flex>
  );
};

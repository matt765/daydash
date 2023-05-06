import {
  DrawerOverlay,
  Flex,
  Modal,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useState, useRef, useEffect } from 'react';

import { Dashboard } from '@/views/dashboard/Dashboard';
import { useUserStoreWrapper } from '@/store/userStore';
import { Intro } from '@/views/intro/Intro';
import { Notepad } from '@/views/notepad/Notepad';
import { SideButtons } from '@/components/sideButtons/SideButtons';
import { Settings } from '@/components/settings/Settings';
import { SnakeGame } from '@/views/snake/Snake';
import { SnakeButton } from '@/components/sideButtons/SnakeButton';
import useSettingsStore from '@/store/settingsStore';
import { Loader } from '@/components/loader/Loader';
import { EditUserData } from '@/components/modals/EditUserDataModal';
import { ClearAllData } from '@/components/modals/ClearAllDataModal';

type ViewType = 'intro' | 'dashboard' | 'notepad' | 'snake' | 'loading';

export default function Home() {
  const { name, city, isMounted } = useUserStoreWrapper();
  const [view, setView] = useState<ViewType>('loading');

  const {
    isOpen: isSettingsPanelOpen,
    onOpen: onSettingsPanelOpen,
    onClose: onSettingsPanelClose,
  } = useDisclosure();
  const {
    isOpen: isEditUserDataOpen,
    onOpen: onEditUserDataOpen,
    onClose: onEditUserDataClose,
  } = useDisclosure();
  const {
    isOpen: isClearAllDataOpen,
    onOpen: onClearAllDataOpen,
    onClose: onClearAllDataClose,
  } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  const showSnakeButton = useSettingsStore((state) => state.showSnakeButton);
  const [isDrawerContentVisible, setIsDrawerContentVisible] = useState(false);

  const handleToggleNotepadView = () => {
    setViewWithLocalStorage(view === 'notepad' ? 'dashboard' : 'notepad');
  };
  const handleToggleSnakeView = () => {
    setViewWithLocalStorage(view === 'snake' ? 'dashboard' : 'snake');
  };
  const setViewWithLocalStorage = (newView: ViewType) => {
    localStorage.setItem('currentView', newView);
    setView(newView);
  };
  useEffect(() => {
    if (isMounted) {
      const savedView = localStorage.getItem('currentView');
      if (name && city) {
        setViewWithLocalStorage((savedView as ViewType) || 'dashboard');
      } else {
        setViewWithLocalStorage('intro');
      }
    }
  }, [isMounted, name, city]);

  return (
    <>
      <Head>
        <title>DayDash</title>
        <meta
          name="description"
          content="Dashboard application designed to be an alternative to default starting page in browser"
        />
        <meta name="viewport" content="width=device-width, minimum-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        w="100%"
        h="100vh"
        justify="center"
        alignItems="center"
        bgImage="url(bg.jpg)"
        bgRepeat="no-repeat"
        bgAttachment="fixed"
        bgSize="cover">
        <Flex w="68rem" h="47rem" justify="center" alignItems="center">
          {view === 'loading' && <Loader />}
          {view === 'intro' && (
            <Intro
              setView={setView}
              onDataSaved={() => setViewWithLocalStorage('dashboard')}
            />
          )}
          {view === 'dashboard' && <Dashboard />}
          {view === 'notepad' && <Notepad />}
          {view === 'snake' && <SnakeGame />}
        </Flex>
      </Flex>
      {name && city && (
        <SideButtons
          view={view}
          handleToggleView={handleToggleNotepadView}
          openDrawer={() => {
            onSettingsPanelOpen();
            setIsDrawerContentVisible(true);
          }}
        />
      )}
      {showSnakeButton && name && city && (
        <SnakeButton onClick={handleToggleSnakeView} />
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
      />
      {isEditUserDataOpen && (
        <EditUserData
          onClose={() => {
            onEditUserDataClose();
            onSettingsPanelClose();
          }}
        />
      )}
      {isClearAllDataOpen && (
        <ClearAllData
          onClose={() => {
            onClearAllDataClose();
            onSettingsPanelClose();
          }}
        />
      )}
    </>
  );
}

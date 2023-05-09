import {
  DrawerOverlay,
  Flex,
  Modal,
  ModalOverlay,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useState, useRef, useEffect } from 'react';

import { Dashboard } from '@/views/dashboard/Dashboard';
import { useUserStoreWrapper } from '@/store/userStore';
import { Intro } from '@/views/intro/Intro';
import { Notepad } from '@/views/notepad/Notepad';
import { SideButtons } from '@/components/buttons/SideButtons';
import { Settings } from '@/components/settings/Settings';
import { SnakeGame } from '@/views/snake/Snake';
import { SnakeButton } from '@/components/buttons/SnakeButton';
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
  const { colorMode } = useColorMode();
  const theme = useSettingsStore((state) => state.theme);
  const [themeAndColorModeReady, setThemeAndColorModeReady] = useState(false);

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
  const preloadImages = (imageURLs: string[]) => {
    imageURLs.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  };
  const isImageVisible = useSettingsStore((state) => state.isImageVisible);

  useEffect(() => {
    if (isMounted) {
      preloadImages(['postap.png', 'mountains.jpg', 'cyberpunk.png', 'fairytale.png']);
      const savedView = localStorage.getItem('currentView');
      if (name && city) {
        setViewWithLocalStorage((savedView as ViewType) || 'dashboard');
      } else {
        setViewWithLocalStorage('intro');
      }

      setThemeAndColorModeReady(true);
    }
  }, [isMounted, name, city, theme, colorMode]);

  const getBackgroundImage = () => {
    if (themeAndColorModeReady && isImageVisible) {
      if (theme === 'basicTheme' && colorMode === 'dark') {
        return 'url(cyberpunk.png)';
      } else if (theme === 'basicTheme' && colorMode === 'light') {
        return 'url(mountains.jpg)';
      } else if (theme === 'extendedTheme' && colorMode === 'dark') {
        return 'url(fairytale.png)';
      } else if (theme === 'extendedTheme' && colorMode === 'light') {
        return 'url(postap.png)';
      }
    }
  };
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
        bgImage={getBackgroundImage()}
        bgColor='homepageBg'
        bgRepeat="no-repeat"
        bgAttachment="fixed"
        position="relative"
        bgSize="cover">
        <Flex w="100%" h="100%" justify="center" alignItems="center">
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

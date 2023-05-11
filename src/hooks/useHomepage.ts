import { useState, useRef, useEffect } from 'react';
import { useColorMode, useDisclosure } from '@chakra-ui/react';

import { useUserStoreWrapper } from '@/store/userStore';
import useSettingsStore from '@/store/settingsStore';

type ViewType = 'intro' | 'dashboard' | 'notepad' | 'snake' | 'loading';

export const useHomepage = () => {
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
      preloadImages([
        'postap.png',
        'mountains.jpg',
        'cyberpunk.png',
        'fairytale.png',
      ]);
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

  return {
    view,
    setView,
    name,
    city,
    handleToggleNotepadView,
    handleToggleSnakeView,
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
    setViewWithLocalStorage,
  };
};

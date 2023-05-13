import { useState, useRef, useEffect } from 'react';
import { useColorMode, useDisclosure } from '@chakra-ui/react';

import { useUserStoreWrapper } from '@/store/userStore';
import useSettingsStore from '@/store/settingsStore';

export type ViewType = 'intro' | 'dashboard' | 'notepad' | 'snake' | 'loading' | 'mobileHome' | 'mobileWeather' | 'mobilePlanner' | 'notepad' | 'settings';

export const useHomepage = () => {
  const { name, city, isMounted } = useUserStoreWrapper();
  const [view, _setView] = useState<ViewType>('loading');
  const [mobileView, setMobileView] = useState<ViewType>('loading');
  const [desktopView, setDesktopView] = useState<ViewType>('loading');

  const setView = (view: string) => {
    _setView(view as ViewType);
  };
  const handleViewChange = (view: ViewType, deviceType: 'mobile' | 'desktop') => {
    if (deviceType === 'desktop') {
      setDesktopView(view);
    } else {
      setMobileView(view);
    }
  };
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
  const [isBgImageLoaded, setIsBgImageLoaded] = useState(false);

  const handleToggleNotepadView = () => {
    setViewWithLocalStorage(view === 'notepad' ? 'dashboard' : 'notepad');
  };

  const handleToggleSnakeView = () => {
    setViewWithLocalStorage(view === 'snake' ? 'dashboard' : 'snake');
  };

  const setViewWithLocalStorage = (newView: ViewType) => {
    if (newView !== 'intro') { // only save to localStorage if view isn't 'intro'
      localStorage.setItem('currentView', newView);
    }
    setView(newView);
  };
  const preloadImages = (imageURLs: string[]) => {
    imageURLs.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  };
  const preloadImage = (imageURL: string) => {
    const img = new Image();
    img.src = imageURL.slice(4, -1); // removes 'url(' at the start and ')' at the end
    img.onload = () => {
      setIsBgImageLoaded(true);
    };
    img.onerror = () => {
      setIsBgImageLoaded(true);
    };
  };

  const isImageVisible = useSettingsStore((state) => state.isImageVisible);

  useEffect(() => {
    if (isMounted) {
      const savedView = localStorage.getItem('currentView');
      if (name && city && name !== "" && city !== "") {     
        setDesktopView('dashboard')
        setMobileView('mobileHome')
      } else {
        setDesktopView('intro')
        setMobileView('intro')
      }

      preloadImage(getBackgroundImage());
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
    return 'url(default.png)';
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
    isBgImageLoaded,
    handleViewChange,
    mobileView,
    desktopView
  };
};

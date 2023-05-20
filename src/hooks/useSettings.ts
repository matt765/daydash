// hooks/useSettings.ts
import { useColorMode } from '@chakra-ui/react';
import { useState } from 'react';

import useSettingsStore, {
  WelcomeSectionContentType,
} from '@/store/settingsStore';

export const useSettings = () => {
  const {
    isFullPlannerVisible,
    setFullPlannerVisible,
    useFahrenheit,
    setUseFahrenheit,
    welcomeSectionContent,
    setWelcomeSectionContent,
    showSnakeButton,
    setShowSnakeButton,
    theme,
    setTheme,
  } = useSettingsStore((state) => state);

  const { colorMode, setColorMode } = useColorMode();
  const [themeValue, setThemeValue] = useState(`${colorMode}_${theme}`);

  const handleUseFahrenheitChange = () => {
    setUseFahrenheit(!useFahrenheit);
  };

  const handleFullPlannerVisibleChange = () => {
    setFullPlannerVisible(!isFullPlannerVisible);
  };

  const handleShowSnakeButtonChange = () => {
    setShowSnakeButton(!showSnakeButton);
  };

  const handleRadioChange = (newValue: string) => {
    setWelcomeSectionContent(newValue as WelcomeSectionContentType);
  };

  // This solution will likely be refactored if ChakraUI will introduce native support for more than 2 color modes.
  const handleThemeChange = (newTheme: string) => {
    const [newColorMode, newThemeName] = newTheme.split('_');
    setColorMode(newColorMode);
    setTheme(newThemeName);
    setThemeValue(newTheme);
  };

  return {
    theme,
    themeValue,
    setThemeValue,
    colorMode,
    isFullPlannerVisible,
    useFahrenheit,
    welcomeSectionContent,
    showSnakeButton,
    handleUseFahrenheitChange,
    handleFullPlannerVisibleChange,
    handleShowSnakeButtonChange,
    handleRadioChange,
    handleThemeChange,
  };
};

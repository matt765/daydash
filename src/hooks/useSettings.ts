// hooks/useSettings.ts
import { useColorMode } from '@chakra-ui/react';
import useSettingsStore, { WelcomeSectionContentType } from '@/store/settingsStore';

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
  } = useSettingsStore((state) => state);

  const { colorMode, toggleColorMode } = useColorMode();

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

  const handleThemeChange = (newTheme: string) => {
    if (newTheme === 'light' || newTheme === 'dark') {
      toggleColorMode();
    }
  };

  return {
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

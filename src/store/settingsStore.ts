import create from 'zustand';

import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from '@/utils/localStorageUtils';

export type WelcomeSectionContentType = 'did_you_know' | 'quotes';

type SettingsState = {
  isFullPlannerVisible: boolean;
  setFullPlannerVisible: (isFullPlannerVisible: boolean) => void;
  welcomeSectionContent: WelcomeSectionContentType;
  setWelcomeSectionContent: (
    welcomeSectionContent: WelcomeSectionContentType
  ) => void;
  sliderValue: number;
  setSliderValue: (value: number) => void;
  showSnakeButton: boolean;
  setShowSnakeButton: (showSnakeButton: boolean) => void;
  useFahrenheit: boolean;
  setUseFahrenheit: (useFahrenheit: boolean) => void;
  resetSettings: () => void;
};

export const useSettingsStore = create<SettingsState>((set) => {
  const setAndStore = <K extends keyof SettingsState>(
    key: K,
    value: SettingsState[K]
  ) => {
    saveToLocalStorage(key, value);
    set({ [key]: value } as Pick<SettingsState, K>);
  };

  return {
    isFullPlannerVisible: loadFromLocalStorage('isFullPlannerVisible', false),
    setFullPlannerVisible: (value: boolean) =>
      setAndStore('isFullPlannerVisible', value),
    welcomeSectionContent: loadFromLocalStorage(
      'welcomeSectionContent',
      'did_you_know'
    ),
    setWelcomeSectionContent: (value: WelcomeSectionContentType) =>
      setAndStore('welcomeSectionContent', value),
    sliderValue: loadFromLocalStorage('sliderValue', 40),
    setSliderValue: (value: number) => setAndStore('sliderValue', value),
    showSnakeButton: loadFromLocalStorage('showSnakeButton', true),
    setShowSnakeButton: (value: boolean) =>
      setAndStore('showSnakeButton', value),
    useFahrenheit: loadFromLocalStorage('useFahrenheit', false),
    setUseFahrenheit: (value: boolean) => setAndStore('useFahrenheit', value),
    resetSettings: () => {
      setAndStore('isFullPlannerVisible', false);
      setAndStore('welcomeSectionContent', 'did_you_know');
      setAndStore('sliderValue', 40);
      setAndStore('showSnakeButton', true);
      setAndStore('useFahrenheit', false);
    },
  };
});

export default useSettingsStore;

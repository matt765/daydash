import { create } from 'zustand';
import { ViewType } from '@/hooks/useHomepage';

interface MobileViewState {
  mobileView: ViewType;
  setMobileView: (view: ViewType) => void;
}

export const useMobileViewStore = create<MobileViewState>((set) => ({
  mobileView: 'mobileHome',
  setMobileView: (view) => {
    localStorage.setItem('currentMobileView', view);
    set({ mobileView: view });
  },
}));

import create from 'zustand';

import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from '@/utils/localStorageUtils';


export const plannerItemsDefault = [
  {
    text: 'Finish front-end project',
    isCrossed: false,
  },
  {
    text: 'Fix a printer',
    isCrossed: false,
  },
  {
    text: 'Buy new music album',
    isCrossed: false,
  },
  {
    text: 'Sort old photos',
    isCrossed: true,
  },
  {
    text: 'Feed the cat',
    isCrossed: false,
  },
];

interface PlannerItem {
  text: string;
  isCrossed: boolean;
}

type PlannerStore = {
  plannerItems: PlannerItem[];
  setPlannerItems: (items: PlannerItem[]) => void;
};

const LOCAL_STORAGE_KEY = 'plannerItems';

export const usePlannerStore = create<PlannerStore>((set) => ({
  plannerItems: loadFromLocalStorage(LOCAL_STORAGE_KEY, plannerItemsDefault),
  setPlannerItems: (items) => {
    saveToLocalStorage(LOCAL_STORAGE_KEY, items);
    set({ plannerItems: items });
  },
}));

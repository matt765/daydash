import create from 'zustand';

import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from '@/utils/localStorageUtils';

type SnakeStoreState = {
  record: number;
  setRecord: (record: number) => void;
};

export const useSnakeStore = create<SnakeStoreState>((set) => ({
  record: loadFromLocalStorage('snakeStoreRecord', 0),
  setRecord: (record) => {
    saveToLocalStorage('snakeStoreRecord', record);
    set({ record });
  },
}));


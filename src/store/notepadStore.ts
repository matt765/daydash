import create from 'zustand';

import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from '@/utils/localStorageUtils';

interface NotepadStore {
  storeNote: string;
  setStoreNote: (newText: string) => void;
}

const LOCAL_STORAGE_KEY = 'notepadStoreNote';

export const useNotepadStore = create<NotepadStore>((set) => ({
  storeNote: loadFromLocalStorage(LOCAL_STORAGE_KEY, ''),
  setStoreNote: (newText: string) => {
    saveToLocalStorage(LOCAL_STORAGE_KEY, newText);
    set({ storeNote: newText });
  },
}));

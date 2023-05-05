import create from 'zustand';

import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from '@/utils/localStorageUtils';

interface NotepadStore {
  storeNote: string;
  setStoreNote: (newText: string) => void;
  isNotepadModalConfirmed: boolean;
  setIsNotepadModalConfirmed: (value: boolean) => void;
}

const LOCAL_STORAGE_KEY = 'notepadStoreNote';
const LOCAL_STORAGE_CONFIRMED_KEY = 'isNotepadModalConfirmed';

export const useNotepadStore = create<NotepadStore>((set) => ({
  storeNote: loadFromLocalStorage(LOCAL_STORAGE_KEY, ''),
  setStoreNote: (newText: string) => {
    saveToLocalStorage(LOCAL_STORAGE_KEY, newText);
    set({ storeNote: newText });
  },
  isNotepadModalConfirmed: loadFromLocalStorage(LOCAL_STORAGE_CONFIRMED_KEY, false),
  setIsNotepadModalConfirmed: (value: boolean) => {
    saveToLocalStorage(LOCAL_STORAGE_CONFIRMED_KEY, value);
    set({ isNotepadModalConfirmed: value });
  },
}));

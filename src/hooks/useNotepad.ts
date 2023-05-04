import { useEffect, useRef, useState } from 'react';

import { useNotepadStore } from '@/store/notepadStore';
import { useClickOutside } from '@/hooks/useClickOutside';

export const useNotepad = () => {
  const [editing, setEditing] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { storeNote, setStoreNote } = useNotepadStore();

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.value = storeNote;
    }
  }, [storeNote]);

  const handleBoxClick = () => {
    if (!editing) {
      setEditing(true);
    }
  };

  const handleSave = () => {
    if (textAreaRef.current) {
      const updatedNote = textAreaRef.current.value;
      setStoreNote(updatedNote);
      setEditing(false);
      setIsModified(false);
    }
  };

  const handleTextChange = () => {
    if (textAreaRef.current && textAreaRef.current.value !== storeNote) {
      setIsModified(true);
    } else {
      setIsModified(false);
    }
  };

  useClickOutside(textAreaRef, () => {
    if (editing && textAreaRef.current) {
      const updatedNote = textAreaRef.current.value;
      setStoreNote(updatedNote);
      setIsModified(false);
      setEditing(false);
    }
  });

  return {
    textAreaRef,
    editing,
    isModified,
    handleBoxClick,
    handleSave,
    handleTextChange,
  };
};

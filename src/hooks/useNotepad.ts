import { useEffect, useRef, useState } from 'react';

import { useNotepadStore } from '@/store/notepadStore';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useColorMode } from '@chakra-ui/react';

export const useNotepad = () => {
  const [editing, setEditing] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [hovered, setHovered] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const {
    storeNote,
    setStoreNote,
    isNotepadModalConfirmed,
    setIsNotepadModalConfirmed,
    isModalVisible,
    setIsModalVisible,
  } = useNotepadStore();

  useEffect(() => {
    if (!isNotepadModalConfirmed) {
      setIsModalVisible(true);
    }
  }, [isNotepadModalConfirmed, setIsModalVisible]);

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
  const handleModalClose = (save: boolean) => {
    setIsModalVisible(false);
    if (save) {
      setIsNotepadModalConfirmed(true);
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
  const { colorMode } = useColorMode();
  return {
    textAreaRef,
    editing,
    isModified,
    handleBoxClick,
    handleSave,
    handleTextChange,
    handleModalClose,
    isModalVisible,
    colorMode,
    hovered,
    setHovered,
    storeNote,
  };
};

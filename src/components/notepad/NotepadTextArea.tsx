import { Textarea } from '@chakra-ui/react';

interface NotepadTextAreaProps {
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
  handleBoxClick: () => void;
  handleTextChange: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const NotepadTextArea = ({
  textAreaRef,
  handleBoxClick,
  handleTextChange,
  onMouseEnter,
  onMouseLeave,
}: NotepadTextAreaProps) => {
  return (
    <Textarea
      ref={textAreaRef}
      w={{ base: '-0.3rem', '3xl': '0' }}
      h="100%"
      borderWidth="1px !important"
      borderStyle="solid"
      borderColor="notepadBorder !important"
      bg="transparent"
      resize="none"
      onClick={handleBoxClick}
      onChange={handleTextChange}
      p={6}
      fontSize={{ base: '1rem', '3xl': '1.2rem' }} 
      color="primaryText"
      outline="none !important"
      _focusVisible={{ outline: 'none' }}
      transition="0.5s"
      placeholder="Write here anything you want..."
      _placeholder={{
        color: 'notepadPlaceholder',
      }}
      fontFamily="Quicksand"
      maxLength={5000}
      letterSpacing="0.3px"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
};

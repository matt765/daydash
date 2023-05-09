import { Textarea } from '@chakra-ui/react';

interface NotepadTextAreaProps {
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
  handleBoxClick: () => void;
  handleTextChange: () => void;
}

export const NotepadTextArea = ({
  textAreaRef,
  handleBoxClick,
  handleTextChange,
}: NotepadTextAreaProps) => {
  return (
    <Textarea
      ref={textAreaRef}
      w="100%"
      h="100%"
      borderWidth="1px !important"
      borderStyle="solid"
      borderColor="notepadBorder !important"
      bg="transparent"
      resize="none"
      onClick={handleBoxClick}
      onChange={handleTextChange}
      p={6}
      fontSize="xl"
      fontWeight="bold"
      color="primaryText"
      outline="none !important"
      _focusVisible={{ outline: 'none' }}
      transition="0.5s"
      placeholder="Write here anything you want..."
      _placeholder={{
        color: 'notepadPlaceholder',
      }}
      fontFamily="Roboto"
      maxLength={5000}
    />
  );
};

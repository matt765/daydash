import { Box, Icon, Button, Flex } from '@chakra-ui/react';

import { NotepadEditIcon } from '@/assets/icons/NotepadEditIcon';
import { ContentBox } from '@/theme/components/contentBox';
import { useNotepad } from '@/hooks/useNotepad';
import { NotepadTextArea } from '@/components/notepad/NotepadTextArea';
import { NotepadAlert } from '@/components/modals/NotepadAlert';

export const Notepad = () => {
  const {
    textAreaRef,
    editing,
    isModified,
    handleBoxClick,
    handleSave,
    handleTextChange,
    isModalVisible,
    handleModalClose,
  } = useNotepad();

  return (
    <ContentBox
      w="100%"
      h="100%"
      position="relative"
      display="flex"
      flexDirection="column"
      transition="0.5s"
      p="2rem"
      _hover={{
        '& svg': {
          fill: 'plannerItemIconHover',
        },
      }}>
      {!editing && (
        <Box
          position="absolute"
          top="45%"
          left="50%"
          transform="translate(-50%, -50%)"
          cursor="pointer"
          sx={{
            '& svg': {
              width: '80px',
              height: '80px',
              fill: 'plannerItemIcon',
            },
          }}>
          <Icon as={NotepadEditIcon} boxSize={7} transition="0.5s" />
        </Box>
      )}
      <NotepadTextArea
        textAreaRef={textAreaRef}
        handleBoxClick={handleBoxClick}
        handleTextChange={handleTextChange}
      />
      <Flex w="100%" justify="flex-end" mt="2rem">
        <Button
          variant="transparent"
          w="14rem"
          h="3rem"
          onClick={handleSave}
          bg={isModified ? 'transparentButtonHoverBg' : 'transparent'}
          _hover={{
            backgroundColor: 'rgb(161, 192, 241, 0.2)',
          }}
          _active={{
            bg: 'notepadButtonActiveBg',
          }}
          transition="0.5s">
          Save
        </Button>
      </Flex>
      {isModalVisible && <NotepadAlert handleModalClose={handleModalClose} />}
    </ContentBox>
  );
};

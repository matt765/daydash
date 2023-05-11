import { Box, Icon, Button, Flex, useColorMode } from '@chakra-ui/react';

import { NotepadEditIcon } from '@/assets/icons/NotepadEditIcon';
import { ContentBox } from '@/theme/components/contentBox';
import { useNotepad } from '@/hooks/useNotepad';
import { NotepadTextArea } from '@/components/notepad/NotepadTextArea';
import { NotepadAlert } from '@/components/modals/NotepadAlert';
import { CheckIcon } from '@/assets/icons/CheckIcon';
import { useState } from 'react';

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
  const [hovered, setHovered] = useState(false);

  const { colorMode } = useColorMode();
  return (
    <>
      <ContentBox
        w="100%"
        h="100%"
        display="flex"
        flexDirection="column"
        transition="0.5s"
        p="2rem"
        backdropFilter={colorMode === 'dark' ? 'blur(24px)' : ''}>
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
                fill: hovered ? 'notepadIconHover' : 'notepadIcon',
              },
            }}>
            <Icon
              as={NotepadEditIcon}
              boxSize={7}
              transition="0.5s"
              className="notepad-main-icon"
            />
          </Box>
        )}
        <NotepadTextArea
          textAreaRef={textAreaRef}
          handleBoxClick={handleBoxClick}
          handleTextChange={handleTextChange}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        />
        <Flex w="100%" justify="flex-end" mt="2rem">
          <Button
            variant="transparent"
            w="14rem"
            h="3rem"
            onClick={handleSave}
            bg={isModified ? 'transparentButtonBg' : 'transparent'}
            _hover={{
              backgroundColor: 'transparentButtonHoverBg',
             
            }}
            _active={{
              bg: 'notepadButtonActiveBg',
            }}
            transition="0.5s">
            {!isModified && (
              <Flex
                justify="center"
                alignItems="center"
                mr="0.2rem"
                ml="-0.5rem"
                fill="rgb(255,255,255,0.6) !important">
                <Icon as={CheckIcon} />
              </Flex>
            )}
            Save
          </Button>
        </Flex>
      </ContentBox>
      {isModalVisible && <NotepadAlert handleModalClose={handleModalClose} />}
    </>
  );
};

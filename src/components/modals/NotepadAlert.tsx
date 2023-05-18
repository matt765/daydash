import { useRef } from 'react';
import { Box, Button, Flex, Text, useOutsideClick } from '@chakra-ui/react';

import { ContentBox } from '@/theme/components/contentBox';

interface NotepadAlertProps {
  handleModalClose: (save: boolean) => void;
}
export const NotepadAlert = ({ handleModalClose }: NotepadAlertProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useOutsideClick({
    ref: wrapperRef,
    handler: () => handleModalClose(false),
  });

  const handleConfirm = () => {
    handleModalClose(true);
  };

  return (
    <Flex
      position="fixed"
      w="100vw"
      h="100vh"
      zIndex="9999"
      top="0"
      left="0"
      justify="center"
      alignItems="center"
      bg="rgb(0,0,0,0.4)">
      <Box h={{ base: '100%', md: 'unset' }} ref={wrapperRef}>
        <ContentBox
          display="flex"
          flexDirection="column"
          w={{ base: '100%', md: '37rem' }}
          h={{ base: '100%', md: '21rem' }}
          alignItems="center"
          textAlign="center"
          p="3rem"
          bgColor="modalBg"
          borderWidth="1px"
          justifyContent={{ base: 'flex-start', md: 'center' }}
          pt={{ base: '4.5rem', md: '3rem' }}
          borderStyle="solid"
          borderColor="modalBorder"
          backdropFilter="blur(24px)"
          borderRadius={{ base: '', md: '30px' }}
          position="relative"
          boxShadow="unset"
          sx={{
            '& *': {
              fontFamily: 'Heebo',
            },
          }}>
          <Flex w="100%" justify="center" mb="0rem" direction="column">
            <Text
              variant="dataModalSubtitle"
              fontSize="1.3rem"
              fontFamily="Quicksand"
              fontWeight="600"
              mb="1rem"
              textAlign="left">
              Important:
            </Text>
            <Text
              variant="dataModalSubtitle"
              fontSize="1.2rem"
              mb="2rem"
              textAlign="left"
              fontWeight="400"
              fontFamily="Quicksand">
              Please remember that both your task list and notepad data are
              stored in the browser's local storage. This means that the data is
              not accessible outside of your browser and will disappear if the
              local storage is cleared.
            </Text>
          </Flex>
          <Flex w="100%" justify="flex-end" mt="-0.5rem" gap="1rem">
            <Button
              variant="solid"
              bg="coloredButtonBg"
              onClick={handleConfirm}
              height="3rem"
              borderRadius="10px"
              w="10rem"
              _hover={{ bg: 'coloredButtonHoverBg' }}>
              I understand
            </Button>
          </Flex>
        </ContentBox>
      </Box>
    </Flex>
  );
};

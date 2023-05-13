import { ContentBox } from '@/theme/components/contentBox';
import { clearAllData } from '@/utils/clearAllData';
import {
  Button,
  Flex,
  Input,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { useState } from 'react';

interface ClearAllDataProps {
  onClose: () => void;
}

export const ClearAllData = ({ onClose }: ClearAllDataProps) => {
  const [value, setValue] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value === 'yes' || value === 'Yes') {
      clearAllData();
      onClose();
    } else {
      setShowError(true);
    }
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
      pointerEvents="none"
      alignItems="center">
      <ContentBox
        overflow={{ base: "auto", md: "hidden" }}
        display="flex"
        flexDirection="column"
        pointerEvents="auto"
        w={{ base: '100%', md: '36rem' }}
        h={{ base: '100%', md: '32rem' }}
        justifyContent={{ base: 'flex-start', md: 'center' }}
        alignItems="center"
        textAlign="center"
        p="2.5rem"
        pb={{ base: '7rem', md: '2.5rem' }}
        boxShadow="unset"
        bgColor="modalBg"
        borderWidth="1px"
        borderStyle="solid"
        borderColor="modalBorder"
        backdropFilter="blur(24px)"
        borderRadius={{ base: '', md: '30px' }}
        position="relative"
        sx={{
          '& *': {
            fontFamily: 'Heebo',
          },
        }}>
        <form onSubmit={handleSubmit}>
          <Flex
            w="100%"
            justify="center"
            mb="0.5rem"
            mt="0rem"
            direction="column"
            alignItems="flex-start"
            textAlign="left"
            sx={{
              '& *': {
                fontFamily: 'Heebo',
                fontWeight: '500',
              },
            }}
            px={{ base: '2rem', md: 'unset' }}>
            <Text color="red.400" fontSize="1.6rem" mb="0.5rem">
              Warning!
            </Text>
            <Text variant="dataModalSubtitle" mb="0.6rem">
              All dashboard data in your browser will be cleared. That includes:
            </Text>
            <UnorderedList mb="0.5rem">
              <ListItem>User name and location</ListItem>
              <ListItem>Task list</ListItem>
              <ListItem>Notepad</ListItem>
              <ListItem>Settings</ListItem>
              <ListItem>Snake game record</ListItem>
            </UnorderedList>
            <Text mb="1rem" mt="0.5rem">
              Please write "yes" to confirm
            </Text>
          </Flex>

          <Flex
            direction="column"
            px={{ base: '2rem', md: 'unset' }}
            sx={{
              '& *': {
                fontFamily: 'Heebo',
                fontWeight: '500',
              },
            }}>
            <Flex
              gap="1rem"
              sx={{
                '& input': {
                  borderWidth: 0,
                  backgroundColor: 'plannerInputBg',
                  '&:hover': {
                    backgroundColor: 'plannerInputHoverBg',
                  },
                },
              }}>
              <Input
                placeholder="Are you sure?"
                _placeholder={{ color: 'secondaryText' }}
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  if (showError) {
                    setShowError(false);
                  }
                }}
                required
              />
            </Flex>
            <Text
              color="red.400"
              fontSize="sm"
              mt="1rem"
              opacity={showError ? '1' : '0'}>
              Please write 'yes' to confirm
            </Text>
            <Flex
              w="100%"
              justify="center"
              mt="1rem"
              gap="1rem"
              sx={{
                '& *': {
                  fontFamily: 'Heebo',
                  fontWeight: '500',
                },
              }}>
              <Button
                variant="transparent"
                height="3rem"
                borderRadius="10px"
                w="10rem"
                _hover={{ bg: 'transparentButtonHoverBg' }}
                onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="solid"
                height="3rem"
                borderRadius="10px"
                w="10rem"
                isDisabled={showError}
                bg="coloredButtonBg"
                _hover={{ bg: 'coloredButtonHoverBg' }}>
                Accept
              </Button>
            </Flex>
          </Flex>
        </form>
      </ContentBox>
    </Flex>
  );
};

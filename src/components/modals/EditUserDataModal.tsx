import { Button, Flex, Input, Text } from '@chakra-ui/react';

import { useEditUserData } from '@/hooks/useEditUserData';
import { ContentBox } from '@/theme/components/contentBox';
import { useWeatherStore } from '@/store/weatherStore';
import { Loader } from '../loader/Loader';

interface EditUserDataProps {
  onClose: () => void;
}

export const EditUserData = ({ onClose }: EditUserDataProps) => {
  const {
    name,
    city,
    setNameInput,
    setCityInput,
    handleSubmit,
    isSubmitting,
    isError,
  } = useEditUserData(onClose);

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
        display="flex"
        pointerEvents="auto"
        flexDirection="column"
        w={{ base: '100%', md: '36rem' }}
        h={{ base: '100%', md: '18rem' }}
        justifyContent="flex-start"
        alignItems="center"
        textAlign="center"
        p="2rem"
        pt={{ base: '3rem', md: '3rem' }}
        bgColor="modalBg"
        borderWidth="1px"
        borderStyle="solid"
        borderColor="modalBorder"
        backdropFilter="blur(24px)"
        borderRadius={{ base: "", md: "30px" }}
        position="relative"
        boxShadow="unset"
        sx={{
          '& *': {
            fontFamily: 'Heebo',
          },
        }}>
        <form onSubmit={handleSubmit}>
          <Flex w="100%" justify="center" mb="0.5rem">
            <Text variant="dataModalSubtitle" fontSize="1.6rem" mb="1.5rem" px={{ base: "1rem", md: "unset"}}>
              Please enter your name and location
            </Text>
          </Flex>
          <Flex direction="column">
            <Flex
              gap="1rem"
              direction={{ base: 'column', md: 'row' }}
              px={{ base: '2rem', md: '0' }}
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
                placeholder="Name"
                _placeholder={{ color: 'secondaryText' }}
                value={name}
                onChange={(e) => setNameInput(e.target.value)}
                required
                maxLength={10}
              />
              <Input
                placeholder="City"
                _placeholder={{ color: 'secondaryText' }}
                value={city}
                onChange={(e) => setCityInput(e.target.value)}
                required
              />
            </Flex>
            {isError && (
              <Flex
                color="red.400"
                w="100%"
                justify="center"
                mt="0.7rem"
                mb="-1.5rem">
                City not found. Please try again.
              </Flex>
            )}
            <Flex
              w="100%"
              justify="center"
              mt="2.5rem"
              gap={{ base: '0.5rem', sm: '1rem' }}
              direction={{ base: 'row', sm: 'row' }}
              alignItems={{ base: 'center', sm: 'unset' }}>
              <Button
                variant="transparent"
                height="3rem"
                borderRadius="10px"
                onClick={onClose}
                w="10rem"
                _hover={{ bg: 'transparentButtonHoverBg' }}>
                Cancel
              </Button>
              <Button
                variant="solid"
                bg="coloredButtonBg"
                height="3rem"
                borderRadius="10px"
                type="submit"
                w="10rem"
                _hover={{ bg: 'coloredButtonHoverBg' }}>
                {isSubmitting ? <Loader isSmall /> : 'Accept'}
              </Button>
            </Flex>
          </Flex>
        </form>
      </ContentBox>
    </Flex>
  );
};

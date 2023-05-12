import useSettingsStore from '@/store/settingsStore';
import { Flex, BoxProps, useColorMode } from '@chakra-ui/react';
import { Ref } from 'react';

interface ContentBoxProps extends BoxProps {
  children: React.ReactNode;
  ref?: Ref<HTMLDivElement>;
}

export const ContentBox = ({ children, ref, ...props }: ContentBoxProps) => {
  const { colorMode } = useColorMode();
  const theme = useSettingsStore((state) => state.theme);

  const boxShadowStyle =
    colorMode === 'light' && theme === 'basicTheme'
      ? { boxShadow: { base: "", lg: '0 3px 8px rgba(0,0,0,.74)' } }
      : {};

  return (
    <Flex
      bg="contentBg"
      padding="1rem"
      borderRadius="15px"
      {...boxShadowStyle}
      ref={ref}
      borderWidth={colorMode === 'light' ? '0px' : '0px'}
      borderColor="contentBorder"
      borderStyle="solid"
      {...props}>
      {children}
    </Flex>
  );
};

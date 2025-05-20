import { Flex, BoxProps, useColorMode, useMediaQuery } from '@chakra-ui/react';
import { Ref, ReactNode } from 'react';
import useSettingsStore from '@/store/settingsStore';
import { usePathname } from 'next/navigation';

interface PageWrapperProps extends BoxProps {
  children: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  ref,
  ...props
}: PageWrapperProps) => {
  const { colorMode } = useColorMode();
  const theme = useSettingsStore((state) => state.theme);
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  const boxShadowStyle =
    colorMode === 'light' && theme === 'basicTheme' && !isHomepage
      ? { boxShadow: { base: '', lg: '0 3px 8px rgba(0,0,0,.74)' } }
      : {};

  const [isDesktop] = useMediaQuery('(min-width: 1280px)');

  if (!isDesktop) {
    return (
      <Flex width="100%" height="100%">
        {children}
      </Flex>
    );
  }

  return (
    <Flex width="100%" height="100%" justify="center" align="center">
      <Flex
        bg={isHomepage ? 'rgb(255,255,255,0)' : 'contentBg'}
        padding={isHomepage ? '0' : '2.5rem'}
        borderRadius="15px"
        flexDirection="column"
        w={{ base: '90vw', md: '80vw', xl: '100%' }}
        h={{ base: '80vh', md: '80vh', xl: '100%' }}
        {...boxShadowStyle}
        ref={ref}
        borderWidth={colorMode === 'light' ? '0px' : '0px'}
        borderColor="contentBorder"
        borderStyle="solid"
        backdropFilter={colorMode === 'dark' && !isHomepage ? 'blur(24px)' : ''}
        {...props}>
        {children}
      </Flex>
    </Flex>
  );
};

import { Flex, BoxProps } from '@chakra-ui/react';
import { Ref } from 'react';

interface ContentBoxProps extends BoxProps {
  children: React.ReactNode;
  ref?: Ref<HTMLDivElement>;
}

export const ContentBox = ({ children, ref, ...props }: ContentBoxProps) => {
  return (
    <Flex
      bg="contentBg"
      padding="1rem"
      borderRadius="15px"
      boxShadow="0 3px 8px rgba(0,0,0,.74)"
      ref={ref}
      // backdropFilter="blur(24px)"
      {...props}
    >
      {children}
    </Flex>
  );
};

import React from 'react';
import { Box, keyframes, CSSObject, Flex } from '@chakra-ui/react';

const spinAnimation = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

interface LoaderProps {
  isSmall?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ isSmall = false }) => {
  const size = isSmall ? 35 : 80;
  const origin = size / 2;
  const barWidth = isSmall ? 2.65 : 6;
  const barHeight = isSmall ? 7.25 : 18;
  const barLeft = origin - barWidth / 2;

  return (
    <Flex w="100%" h="100%" justify="center" alignItems="center">
      <Flex position="relative" w={`${size}px`} h={`${size}px`}>
        {Array.from({ length: 12 }).map((_, index) => (
          <Box
            key={index}
            as="div"
            __css={
              {
                transformOrigin: `${origin}px ${origin}px`,
                animation: `${spinAnimation} 1.2s linear infinite`,
                animationDelay: `${-1.1 + index * 0.1}s`,
                transform: `rotate(${index * 30}deg)`,
              } as CSSObject
            }>
            <Box
              as="span"
              position="absolute"
              top="3px"
              left={`${barLeft}px`}
              width={`${barWidth}px`}
              height={`${barHeight}px`}
              borderRadius="20%"
              backgroundColor="rgb(171, 180, 208)"
            />
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};

import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

import { Button } from './components/button';
import { Text } from './components/text';

export const generateTheme = (colors: any) => {
  const config: ThemeConfig = {
    initialColorMode: 'light',
    useSystemColorMode: false,
  };

  return extendTheme({
    config,
    breakpoints: {
      sm: '30em', // 480px
      md: '48em', // 768px
      lg: '62em', // 992px
      xl: '80em', // 1280px
      '2xl': '96em', // 1536px
      '3xl': '110em', // 1760px
    },
    semanticTokens: {
      colors: {
        ...colors,
      },
    },
    styles: {
      global: {
        body: {
          color: 'primaryText',
          padding: 0,
          margin: 0,
        },
        html: {
          scrollBehavior: 'smooth',
          padding: 0,
          margin: 0,
        },
        '*': {
          boxSizing: 'border-box',
          maxWidth: '100vw',
          fontFamily: 'Quicksand',
          scrollbarWidth: 'thin',
          scrollbarColor: 'red',
          '&::-webkit-scrollbar': {
            width: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgb(255,255,255,0.1)',
            _hover: {
              background: 'rgb(255,255,255,0.1)',
            },
            borderRadius: '30px',
            border: 'none',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
        },
        ':root': {
          scrollbarColor: 'rgb(255,255,255,0.1) rgba(255, 255, 255, 0.0)',
          scrollbarWidth: 'thin',
        },
      },
    },
    components: {
      Text,
      Button,
    },
  });
};

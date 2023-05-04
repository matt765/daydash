import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { colors } from './colors';
import { Button } from './components/button';
import { Text } from './components/text';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

export const theme = extendTheme({
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
          background: 'rgba(120, 168, 231, 0.25)',
          _hover: {
            background: 'rgba(120, 168, 231, 0.5)',
          },
          borderRadius: '30px',
          border: 'none',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },    
      },
      ':root': {
        scrollbarColor: 'rgba(120, 168, 231, 0.25) rgba(255, 255, 255, 0)',
        scrollbarWidth: 'thin',
      },
    },
  },
  components: {
    Text,
    Button,
  },
});

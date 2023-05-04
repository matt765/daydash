import { ComponentStyleConfig } from '@chakra-ui/react';

export const Button: ComponentStyleConfig = {
  variants: {
    transparent: {
      bg: 'transparentButtonBg',
      borderColor: 'transparentButtonBorder',
      borderStyle: 'solid',
      borderWidth: '1px',
      borderRadius: '10px',
      _hover: {
        bg: 'transparentButtonHoverBg',
      },
      _active: {
        bg: 'transparentButtonActiveBg',
      },
    },
    round: {
      bg: 'sideButtonBg',
      borderRadius: '50%',
      borderWidth: '1px',
      borderColor: 'rgb(255,255,255,0.15)',
      borderStyle: 'solid',
      width: '3.5rem',
      height: '3.5rem',
      padding: "0",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      _hover: {
        bg: 'sideButtonHoverBg',
      },
      _active: {
        bg: 'sideButtonHoverBg',
      },
    },
    settingsUserData: {
      bg: 'transparentButtonBg',
      borderColor: 'transparentButtonBorder',
      borderStyle: 'solid',
      borderWidth: '1px',
      borderRadius: '10px',
      fontSize: "0.9rem",
      paddingBottom: "0.1rem",
      _hover: {
        bg: 'transparentButtonHoverBg',
      },
      _active: {
        bg: 'transparentButtonActiveBg',
      },
    }
  },
};

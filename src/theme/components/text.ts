import type { ComponentStyleConfig } from '@chakra-ui/react';

export const Text: ComponentStyleConfig = {
  variants: {
    // First row, upper left
    welcomeTitle: {
      fontSize: { base: "3.3rem", lg: "3rem"},
      fontWeight: 400,
      color: 'primaryText',
      lineHeight: { base: "4rem", lg: "3.5rem"},
    },
    welcomePrimary: {
      fontSize: { base: "1.5rem", lg: "1rem"},
      fontWeight: 400,
      color: 'welcomePrimaryText',
    },
    welcomeSecondary: {
      fontSize: { base: "1.5rem", lg: "1rem"},
      fontWeight: 400,
      color: 'welcomeSecondaryText',
    },
    // First row, upper right
    weatherCity: {
      fontSize: '2rem',
      fontWeight: 400,
      color: 'primaryText',
    },
    weatherCountry: {
      fontSize: '2rem',
      fontWeight: 400,
      color: 'weatherCountryText',
    },
    weatherTemperature: {
      fontSize: '3rem',
      fontWeight: 400,
      color: 'primaryText',
    },
    weatherDesc: {
      fontSize: '1rem',
      fontWeight: 400,
      color: 'weatherDescText',
    },
    weatherParameterTitle: {
      fontSize: '1rem',
      fontWeight: 400,
      color: 'primaryText',
    },
    weatherParameterValue: {
      fontSize: '1.25rem',
      fontWeight: 400,
      color: 'primaryText',
      letterSpacing: '0.5px',
    },
    weatherBoxDate: {
      fontSize: '0.75rem',
      fontWeight: 400,
      color: 'primaryText',
      lineHeight: '1.25rem',
    },
    weatherBoxValue: {
      fontSize: '0.75rem',
      fontWeight: 400,
      color: 'primaryText',
      lineHeight: '1.25rem',
    },
    // Second row
    plannerPlaceholder: {
      fontSize: '1rem',
      fontWeight: 400,
      color: 'secondaryText',
      lineHeight: '1.5rem',
    },
    plannerButton: {
      fontSize: '1rem',
      fontWeight: 400,
      color: 'primaryText',
    },
    plannerItem: {
      fontSize: '1.25rem',
      fontWeight: 400,
      color: 'primaryText',
    },
    plannerItemCrossed: {
      fontSize: '1.25rem',
      fontWeight: 400,
      color: 'secondaryText',
    },
    // User data
    dataModalTitle: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: 'primaryText',
      letterSpacing: '0.5px',
    },
    dataModalTitleColored: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: 'mainColor',
      letterSpacing: '0.5px',
    },
    dataModalSubtitle: {
      fontSize: '1.1rem',
      fontWeight: 500,
      color: 'secondaryText',      
    },
  },
};

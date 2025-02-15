import type { ComponentStyleConfig } from '@chakra-ui/react';

export const Text: ComponentStyleConfig = {
  variants: {
    // Greeting
    welcomeTitle: {
      fontSize: { base: '3.4rem', 'xl': '2.5rem', '3xl': '3rem' },
      fontWeight: 400,
      color: 'primaryText',
      lineHeight: { base: '3.4rem', 'xl': '2.7rem', '3xl': '3.5rem' },
    },
    welcomePrimary: {
      fontSize: { base: '1.3rem', 'xl': '0.85rem', '3xl': '1rem' },
      fontWeight: 400,
      color: 'welcomePrimaryText',
    },
    welcomeSecondary: {
      fontSize: { base: '1.3rem', 'xl': '0.85rem', '3xl': '1rem' },
      fontWeight: 400,
      color: 'welcomeSecondaryText',
    },
    // Weather forecast
    weatherCity: {
      fontSize:  { base: '1.5rem', '3xl': '2rem' },
      fontWeight: 400,
      color: 'primaryText',
    },
    weatherCountry: {
      fontSize: '2rem',
      fontWeight: 400,
      color: 'weatherCountryText',
    },
    weatherTemperature: {
      fontSize: { base: '2.5rem', '3xl': '3rem' },
      fontWeight: 400,
      color: 'primaryText',
    },
    weatherDesc: {
      fontSize: { base: '0.9rem', '3xl': '1rem' },
      fontWeight: 400,
      color: 'weatherDescText',
    },
    weatherParameterTitle: {
      fontSize:  { base: '0.9rem', '3xl': '1rem' },
      fontWeight: 400,
      color: 'primaryText',
    },
    weatherParameterValue: {
      fontSize: { base: '1rem', '3xl': '1.25rem' },
      fontWeight: 400,
      color: 'primaryText',
      letterSpacing: '0.5px',
    },
    weatherBoxDate: {
      fontSize: { base: '0.6rem', '3xl': '0.75rem' },
      fontWeight: 400,
      color: 'primaryText',
      lineHeight: { base: '1rem', '3xl': '1.25rem' },
    },
    weatherBoxValue: {
      fontSize: { base: '0.6rem', '3xl': '0.75rem' },
      fontWeight: 400,
      color: 'primaryText',
      lineHeight: '1.25rem',
    },
    // Planner
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
      fontSize:  { base: '1rem', '3xl': '1.25rem' },
      fontWeight: 400,
      color: 'primaryText',
      lineHeight:  { base: '1.8rem', '3xl': '1.25rem' },
    },
    plannerItemCrossed: {
      fontSize:  { base: '1rem', '3xl': '1.25rem' },
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

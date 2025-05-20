'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/react';
import { useState, useEffect } from 'react';

import '@fontsource/roboto/100.css';
import '@fontsource/quicksand';
import '@fontsource/heebo/600.css';
import '@fontsource/heebo/500.css';
import '@fontsource/heebo/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/400.css';

import { generateTheme } from '@/theme/generateTheme';
import { extendedColors } from '@/theme/extendedColors';
import { colors } from '@/theme/colors';
import useSettingsStore from '@/store/settingsStore';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const theme = useSettingsStore((state) => state.theme);
  const basicTheme = generateTheme(colors);
  const extendedTheme = generateTheme(extendedColors);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider
        theme={theme === 'basicTheme' ? basicTheme : extendedTheme}>
        {children}
        <Analytics />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

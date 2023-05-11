import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import '@fontsource/roboto/100.css';
import '@fontsource/quicksand';
import '@fontsource/heebo/600.css';
import '@fontsource/heebo/500.css';
import '@fontsource/heebo/400.css';
import { generateTheme } from '@/theme/generateTheme';
import { extendedColors } from '@/theme/extendedColors';
import { colors } from '@/theme/colors';
import useSettingsStore from '@/store/settingsStore';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const theme = useSettingsStore((state) => state.theme);
  const basicTheme = generateTheme(colors);
  const extendedTheme = generateTheme(extendedColors);

  return (
    <QueryClientProvider client={queryClient}>
      {/* @ts-ignore */}
      <ChakraProvider
        theme={theme === 'basicTheme' ? basicTheme : extendedTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

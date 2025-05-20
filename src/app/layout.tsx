import { Providers } from '@/services/providers';
import { Layout } from '../components/layout/Layout';

export const metadata = {
  title: 'MistyLoop',
  description:
    'Application designed to be an alternative to default starting page in the browser',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}

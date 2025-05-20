'use client';

import { useMediaQuery } from '@chakra-ui/react';
import { Homepage } from '@/components/views/homepage/Homepage';
import { Intro } from '@/components/views/intro/Intro';
import { MobileView } from '@/components/layout/MobileView';
import { useUserStoreWrapper } from '@/store/userStore';

export default function Home() {
  const { name, city } = useUserStoreWrapper();
  const [isDesktop] = useMediaQuery('(min-width: 1280px)');
  const [isMobile] = useMediaQuery('(max-width: 1279px)');

  if (!name || !city) {
    return <Intro />;
  }

  return (
    <>
      {isDesktop && <Homepage />}
      {isMobile && <MobileView />}
    </>
  );
}

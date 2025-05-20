'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStoreWrapper } from '@/store/userStore';
import { Flex } from '@chakra-ui/react';
import { Loader } from '@/components/common/Loader';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { name, city, isMounted } = useUserStoreWrapper();
  const router = useRouter();

  useEffect(() => {
    if (isMounted && (!name || !city)) {
      router.replace('/');
    }
  }, [name, city, isMounted, router]);

  if (!isMounted) {
    return (
      <Flex w="100%" h="100%" justify="center" alignItems="center">
        <Loader />
      </Flex>
    );
  }

  if (!name || !city) {
    return null;
  }

  return <>{children}</>;
};

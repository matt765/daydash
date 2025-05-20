import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import useCurrentDate from '@/hooks/useCurrentDate';
import useSettingsStore from '@/store/settingsStore';
import { useUserStore } from '@/store/userStore';
import { fetchFact } from '@/services/fetchFact';
import { fetchQuote } from '@/services/fetchQuote';

export const useWelcome = () => {
  const userName = useUserStore((state) => state.name);
  const { dayOfWeek, dayOfMonth, monthName, year } = useCurrentDate();
  const [contentMode, setContentMode] = useState('did_you_know');

  const [isRefetchingContent, setIsRefetchingContent] = useState(false);
  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    data: fact,
  } = useQuery({
    queryKey: ['fact'],
    queryFn: fetchFact,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const {
    isLoading: isLoadingQuote,
    error: errorQuote,
    data: quoteData,
  } = useQuery({
    queryKey: ['quote'],
    queryFn: fetchQuote,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const quote = quoteData?.quote || '';
  const author = quoteData?.author || '';

  const [refreshCooldown, setRefreshCooldown] = useState(false);

  const refetchContent = async () => {
    if (refreshCooldown) {
      return;
    }
    setIsRefetchingContent(true);
    setRefreshCooldown(true);

    const sleep = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    try {
      await Promise.all([
        contentMode === 'did_you_know'
          ? queryClient.invalidateQueries({ queryKey: ['fact'] })
          : queryClient.invalidateQueries({ queryKey: ['quote'] }),
        sleep(1500),
      ]);
    } catch (error) {
      console.error('Error refetching content:', error);
    } finally {
      setIsRefetchingContent(false);
      setRefreshCooldown(false);
    }
  };

  const welcomeSectionContent = useSettingsStore(
    (state) => state.welcomeSectionContent
  );

  useEffect(() => {
    setContentMode(welcomeSectionContent);
  }, [welcomeSectionContent]);

  return {
    userName,
    dayOfWeek,
    dayOfMonth,
    monthName,
    year,
    contentMode,
    isLoading,
    error,
    fact,
    isLoadingQuote,
    errorQuote,
    quote,
    author,
    isRefetchingContent,
    refetchContent,
  };
};

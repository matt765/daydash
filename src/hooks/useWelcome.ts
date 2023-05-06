// hooks/useWelcome.ts
import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import useCurrentDate from '@/hooks/useCurrentDate';
import useSettingsStore from '@/store/settingsStore';
import { useUserStore } from '@/store/userStore';
const fetchFact = async () => {
  let data;
  do {
    const response = await fetch(
      'https://uselessfacts.jsph.pl/random.json?language=en'
    );
    data = await response.json();
  } while (data.text.length > 130 || data.text.length < 35);
  return data.text;
};

const fetchQuote = async () => {
  let data;
  const category = 'happiness';
  do {
    const response = await fetch(`/api/quotes?category=${category}`);
    data = await response.json();
  } while (data[0].quote.length > 125 || data[0].quote.length < 35);
  return { quote: data[0].quote, author: data[0].author };
};

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
  } = useQuery('fact', fetchFact, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const {
    isLoading: isLoadingQuote,
    error: errorQuote,
    data: { quote, author } = {},
  } = useQuery('quote', fetchQuote, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
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
          ? queryClient.invalidateQueries('fact')
          : queryClient.invalidateQueries('quote'),
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

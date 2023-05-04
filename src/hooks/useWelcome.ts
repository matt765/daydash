// hooks/useWelcome.ts
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

import useCurrentDate from '@/hooks/useCurrentDate';
import useSettingsStore from '@/store/settingsStore';
import { useUserStore } from '@/store/userStore';

const fetchFact = async () => {
  const response = await fetch(
    'https://uselessfacts.jsph.pl/random.json?language=en'
  );
  const data = await response.json();
  return data.text;
};

const fetchQuote = async () => {
  const category = 'happiness';
  const response = await fetch(`/api/quotes?category=${category}`);
  const data = await response.json();
  return { quote: data[0].quote, author: data[0].author };
};

export const useWelcome = () => {
  const userName = useUserStore((state) => state.name);

  const { dayOfWeek, dayOfMonth, monthName, year } = useCurrentDate();
  const [contentMode, setContentMode] = useState('did_you_know');
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
  };
};

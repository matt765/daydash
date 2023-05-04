import { useState, useEffect } from 'react';

export const useCurrentDate = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60 * 1000); // Update every minute

    return () => {
      clearInterval(timer);
    };
  }, []);

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const dayOfWeek = daysOfWeek[currentDate.getDay()];

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const monthName = monthNames[currentDate.getMonth()];
  const dayOfMonth = currentDate.getDate();
  const year = currentDate.getFullYear();

  return {
    dayOfWeek,
    dayOfMonth,
    monthName,
    year,
  };
};

export default useCurrentDate;

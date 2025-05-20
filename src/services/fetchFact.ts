export const fetchFact = async () => {
  let data;
  do {
    const response = await fetch('/api/facts');
    data = await response.json();
  } while (data.text.length > 130 || data.text.length < 35);
  return data.text;
};

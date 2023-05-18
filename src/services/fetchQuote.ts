export const fetchQuote = async () => {
  let data;
  const category = 'happiness';
  do {
    const response = await fetch(`/api/quotes?category=${category}`);
    data = await response.json();
  } while (data[0].quote.length > 125 || data[0].quote.length < 35);
  return { quote: data[0].quote, author: data[0].author };
};

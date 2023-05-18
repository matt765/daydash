export const fetchFact = async () => {
  let data;
  do {
    const response = await fetch(
      'https://uselessfacts.jsph.pl/random.json?language=en'
    );
    data = await response.json();
  } while (data.text.length > 130 || data.text.length < 35);
  return data.text;
};

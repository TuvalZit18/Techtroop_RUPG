const kanyeAPI = {
  getQuote: async () => {
    const response = await fetch("https://api.kanye.rest/");

    if (!response.ok) {
      throw new Error("Failed to fetch Kanye quote");
    }

    const data = await response.json();

    return data.quote;
  },
};

export default kanyeAPI;

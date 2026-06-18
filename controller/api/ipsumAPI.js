const ipsumAPI = {
  getAbout: async () => {
    const response = await fetch(
      "https://baconipsum.com/api/?type=meat-and-filler&paras=2",
    );

    if (!response.ok) {
      throw new Error("Failed to fetch about text");
    }

    const data = await response.json();

    // API returns array of paragraphs → join into one string
    return data.join(" ");
  },
};

export default ipsumAPI;

const userAPI = {
  async getUsers(count = 7) {
    const res = await fetch(`https://randomuser.me/api/?results=${count}`);

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await res.json();

    return data.results.map((user) => ({
      firstName: user.name.first,
      lastName: user.name.last,
      city: user.location.city,
      state: user.location.state,

      picture: {
        large: user.picture.large,
        medium: user.picture.medium,
        thumbnail: user.picture.thumbnail,
      },
    }));
  },
};

export default userAPI;

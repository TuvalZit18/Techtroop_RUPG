const createModel = () => {
  let userPages = [];

  const addUserPage = (page) => userPages.push(page);

  const getUserPages = () => structuredClone(userPages);

  return {
    addUserPage,
    getUserPages,
  };
};

const userModel = createModel();

export default userModel;

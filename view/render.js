// view/render.js

export const renderMainUser = (user) => {
  document.querySelector(".profile-hero-card-avatar").src = user.picture.large;

  document.querySelector(".profile-hero-card-username").textContent =
    `${user.firstName} ${user.lastName}`;

  document.querySelector(
    ".profile-hero-card-location-container span:last-child",
  ).textContent = `${user.city}, ${user.state}`;
};

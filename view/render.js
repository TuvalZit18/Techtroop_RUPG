// view/render.js

export const renderMainUser = (user) => {
  document.querySelector(".profile-hero-card-avatar").src = user.picture.large;

  document.querySelector(".profile-hero-card-username").textContent =
    `${user.firstName} ${user.lastName}`;

  document.querySelector(
    ".profile-hero-card-location-container span:last-child",
  ).textContent = `${user.city}, ${user.state}`;
};

export const renderPokemonCard = (pokemon) => {
  document.querySelector(".pokemon-level").textContent = `LV.${pokemon.level}`;

  document.querySelector(".pokemon-name").textContent = pokemon.name;

  document.querySelector(".pokemon-type").textContent = Array.isArray(
    pokemon.type,
  )
    ? pokemon.type[0]
    : pokemon.type;

  document.querySelector(".pokemon-description").textContent =
    pokemon.description;

  document.querySelector(".pokemon-image").src = pokemon.image;
};

export const renderQuote = (quote) => {
  document.querySelector(".kanye-quote-text").textContent = quote;
};

export const renderAbout = (about) => {
  document.querySelector(".aboutMe-card-footer-text").textContent = about;
};

export const renderProfileCard = (user) => {
  document.querySelector(".profile-hero-card-avatar").src = user.picture.large;

  document.querySelector(".profile-hero-card-username").textContent =
    `${user.firstName} ${user.lastName}`;

  document.querySelector(
    ".profile-hero-card-location-container span:last-child",
  ).textContent = `${user.city}, ${user.state}`;
};

export const renderFriends = (friends) => {
  const container = document.querySelector(".friends-grid");

  container.innerHTML = "";

  document.querySelector(".friends-container-header-text").textContent =
    `Friends (${friends.length})`;

  friends.forEach((friend) => {
    const friendCard = document.createElement("div");
    friendCard.classList.add("friend-card-container");

    friendCard.innerHTML = `
      <div class="friend-card-avatar-container">
        <img class="friend-card-avatar" src="${friend.picture.large}" />
        <div class="friend-status"></div>
      </div>
      <span class="friend-card-name-text">
        ${friend.firstName} ${friend.lastName}
      </span>
    `;

    container.appendChild(friendCard);
  });
};

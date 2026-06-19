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

  const card = document.querySelector(".pokemon-card-container");
  const type = document.querySelector(".pokemon-type");
  if (Array.isArray(pokemon.type)) {
    type.textContent = pokemon.type[0];

    card.className = card.className.replace(/\btype-\w+\b/g, "").trim();
    card.classList.add(`type-${pokemon.type[0]}`);
  } else {
    type.textContent = pokemon.type;

    card.className = card.className.replace(/\btype-\w+\b/g, "").trim();
    card.classList.add(`type-${pokemon.type}`);
  }
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
export const renderSavedUsersDropdown = (pages) => {
  const container = document.querySelector(".saved-users-dropdown-content");
  const triggerContainer = document.querySelector(
    ".saved-users-dropdown-container",
  );

  container.innerHTML = "";
  triggerContainer.classList.toggle("disabled", pages.length === 0);

  document.querySelector('[data-action="clear"]').disabled = pages.length === 0;

  pages.forEach((page) => {
    const li = document.createElement("li");
    li.textContent = `${page.mainUser.firstName} ${page.mainUser.lastName}`;
    li.dataset.id = page.id;
    container.appendChild(li);
  });
};
export const renderDropdownLabel = (firstName, lastName) => {
  const label = document.querySelector(".saved-users-dropdown-container-text");
  const triggerContainer = document.querySelector(
    ".saved-users-dropdown-container",
  );

  label.textContent = `${firstName} ${lastName}`;
  triggerContainer.classList.add("has-selection");
};
const getInitials = (firstName, lastName) => {
  return `${firstName[0]}${lastName[0]}`.toUpperCase();
};

export const renderHeaderUser = (user) => {
  const avatar = document.querySelector(".header-right-current-user-avatar");
  const title = document.querySelector(".header-right-current-user-title");

  avatar.src = user.picture.large;
  title.textContent = getInitials(user.firstName, user.lastName);
};

export const renderUserPage = (userPage) => {
  renderProfileCard(userPage.mainUser);
  renderPokemonCard(userPage.pokemon);
  renderQuote(userPage.quote);
  renderAbout(userPage.about);
  renderFriends(userPage.friends);
  renderHeaderUser(userPage.mainUser);
};

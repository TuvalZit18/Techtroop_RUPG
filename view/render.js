// view/render.js

/**
 * Renders the main user's avatar, name, and location into the profile hero card.
 * @param {Object} user - User object with picture, firstName, lastName, city, and state.
 * @returns {void}
 */
export const renderMainUser = (user) => {
  document.querySelector(".profile-hero-card-avatar").src = user.picture.large;

  document.querySelector(".profile-hero-card-username").textContent =
    `${user.firstName} ${user.lastName}`;

  document.querySelector(
    ".profile-hero-card-location-container span:last-child",
  ).textContent = `${user.city}, ${user.state}`;
};

/**
 * Renders the pokemon card, including level, name, type, type color class, description, and image.
 * @param {Object} pokemon - Pokemon object with level, name, type (string or array), description, and image.
 * @returns {void}
 */
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

/**
 * Renders the Kanye quote text into the quote card.
 * @param {string} quote - The quote text to display.
 * @returns {void}
 */
export const renderQuote = (quote) => {
  document.querySelector(".kanye-quote-text").textContent = quote;
};

/**
 * Renders the about me text into the about card.
 * @param {string} about - The about me text to display.
 * @returns {void}
 */
export const renderAbout = (about) => {
  document.querySelector(".aboutMe-card-footer-text").textContent = about;
};

/**
 * Renders the main user's avatar, name, and location into the profile hero card.
 * @param {Object} user - User object with picture, firstName, lastName, city, and state.
 * @returns {void}
 */
export const renderProfileCard = (user) => {
  document.querySelector(".profile-hero-card-avatar").src = user.picture.large;

  document.querySelector(".profile-hero-card-username").textContent =
    `${user.firstName} ${user.lastName}`;

  document.querySelector(
    ".profile-hero-card-location-container span:last-child",
  ).textContent = `${user.city}, ${user.state}`;
};

/**
 * Renders the list of friend cards into the friends grid and updates the friends count header.
 * @param {Object[]} friends - Array of friend user objects, each with picture, firstName, and lastName.
 * @returns {void}
 */
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

/**
 * Renders the saved pages dropdown list and toggles the disabled state of the dropdown
 * trigger and clear button based on whether any pages exist.
 * @param {Object[]} pages - Array of saved userPage objects, each with id and mainUser.
 * @returns {void}
 */
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

/**
 * Updates the dropdown trigger label with the selected user's name and marks it as having a selection.
 * @param {string} firstName - The selected user's first name.
 * @param {string} lastName - The selected user's last name.
 * @returns {void}
 */
export const renderDropdownLabel = (firstName, lastName) => {
  const label = document.querySelector(".saved-users-dropdown-container-text");
  const triggerContainer = document.querySelector(
    ".saved-users-dropdown-container",
  );

  label.textContent = `${firstName} ${lastName}`;
  triggerContainer.classList.add("has-selection");
};

/**
 * Builds a two-letter initials string from a first and last name.
 * @param {string} firstName - The user's first name.
 * @param {string} lastName - The user's last name.
 * @returns {string} The uppercase two-letter initials.
 */
const getInitials = (firstName, lastName) => {
  return `${firstName[0]}${lastName[0]}`.toUpperCase();
};

/**
 * Renders the current user's avatar and initials into the header.
 * @param {Object} user - User object with picture, firstName, and lastName.
 * @returns {void}
 */
export const renderHeaderUser = (user) => {
  const avatar = document.querySelector(".header-right-current-user-avatar");
  const title = document.querySelector(".header-right-current-user-title");

  avatar.src = user.picture.large;
  title.textContent = getInitials(user.firstName, user.lastName);
};

/**
 * Renders an entire user page by delegating to all individual section render functions.
 * @param {Object} userPage - Full page object with mainUser, pokemon, quote, about, and friends.
 * @returns {void}
 */
export const renderUserPage = (userPage) => {
  renderProfileCard(userPage.mainUser);
  renderPokemonCard(userPage.pokemon);
  renderQuote(userPage.quote);
  renderAbout(userPage.about);
  renderFriends(userPage.friends);
  renderHeaderUser(userPage.mainUser);
};

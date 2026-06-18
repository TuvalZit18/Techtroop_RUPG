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

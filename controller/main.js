import userAPI from "./api/userAPI.js";
import pokemonAPI from "./api/pokemonAPI.js";
import kanyeAPI from "./api/kanyeAPI.js";
import ipsumAPI from "./api/ipsumAPI.js";
import userModel from "../model/user.js";
import {
  renderUserPage,
  renderSavedUsersDropdown,
  renderDropdownLabel,
} from "../view/render.js";
import {} from "../view/render.js";
let selectedPageId = null;
let currentPage = null;
document.addEventListener("DOMContentLoaded", () => {
  init();
});

const init = () => {
  bindEvents();
};

const bindEvents = () => {
  document.addEventListener("click", (e) => {
    const action = e.target.closest("[data-action]")?.dataset.action;

    if (!action) return;

    if (action === "generate") {
      handleGenerate();
    }

    if (action === "save") {
      handleSave();
    }

    if (action === "load") {
      handleLoad();
    }
  });
  document
    .querySelector(".saved-users-dropdown")
    .addEventListener("click", toggleDropdown);

  document
    .querySelector(".saved-users-dropdown-content")
    .addEventListener("click", handleDropdownSelect);

  document
    .querySelector(".saved-users-dropdown-container")
    .addEventListener("click", handleDropdownToggle);
};
const handleGenerate = async () => {
  try {
    const [users, pokemon, quote, about] = await Promise.all([
      userAPI.getUsers(7),
      pokemonAPI.getRandomPokemon(),
      kanyeAPI.getQuote(),
      ipsumAPI.getAbout(),
    ]);

    const userPage = {
      id: crypto.randomUUID(),
      mainUser: users[0],
      friends: users.slice(1),
      pokemon,
      quote,
      about,
    };

    currentPage = userPage;

    renderUserPage(userPage);

    document.querySelector('[data-action="save"]').disabled = false;
  } catch (error) {
    console.error("Error generating user page:", error);
  }
};
const handleSave = () => {
  if (!currentPage) return;

  const existingPages = JSON.parse(localStorage.getItem("userPages")) || [];

  const updatedPages = [...existingPages, currentPage];

  const uniquePages = updatedPages.filter(
    (page, index, arr) => arr.findIndex((p) => p.id === page.id) === index,
  );

  localStorage.setItem("userPages", JSON.stringify(uniquePages));

  renderSavedUsersDropdown(uniquePages);
};
const handleLoad = () => {
  if (!selectedPageId) {
    console.warn("No profile selected to load");
    return;
  }

  const pages = JSON.parse(localStorage.getItem("userPages")) || [];

  const selectedPage = pages.find((page) => page.id === selectedPageId);
  if (!selectedPage) return;

  currentPage = selectedPage;

  userModel.addUserPage(selectedPage);
  renderUserPage(selectedPage);

  document.querySelector('[data-action="save"]').disabled = false;
};

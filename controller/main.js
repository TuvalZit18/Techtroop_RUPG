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
let selectedPageId = null;
let currentPage = null;
document.addEventListener("DOMContentLoaded", () => {
  init();
});

const init = () => {
  bindEvents();
  loadSavedPagesUI();
  document.querySelector('[data-action="save"]').disabled = true;
};

const bindEvents = () => {
  document.addEventListener("click", (e) => {
    const action = e.target.closest("[data-action]")?.dataset.action;

    if (!action) return;

    switch (action) {
      case "generate":
        handleGenerate();
        break;
      case "save":
        handleSave();
        break;
      case "load":
        handleLoad();
        break;
      case "clear":
        handleClear();
        break;
    }
  });
  document.addEventListener("click", (e) => {
    const dropdownWrapper = document.querySelector(".saved-users-dropdown");
    const dropdownContent = document.querySelector(
      ".saved-users-dropdown-content",
    );

    if (!dropdownWrapper.contains(e.target)) {
      dropdownContent.classList.remove("open");
      dropdownWrapper.classList.remove("open");
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

  document
    .querySelector(".clear-selection-icon")
    .addEventListener("click", (e) => {
      e.stopPropagation();
      handleClearSelection();
    });
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

const handleClear = () => {
  localStorage.removeItem("userPages");
  renderSavedUsersDropdown([]);
  handleClearSelection();
};
const toggleDropdown = (e) => {
  e.currentTarget.classList.toggle("open");
};

const handleDropdownSelect = (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  const id = li.dataset.id;

  const pages = JSON.parse(localStorage.getItem("userPages")) || [];

  const selectedPage = pages.find((page) => page.id === id);
  if (!selectedPage) return;

  selectedPageId = id;

  renderDropdownLabel(
    selectedPage.mainUser.firstName,
    selectedPage.mainUser.lastName,
  );

  document
    .querySelector(".saved-users-dropdown-content")
    .classList.remove("open");
};

const handleDropdownToggle = () => {
  const pages = JSON.parse(localStorage.getItem("userPages")) || [];
  if (pages.length === 0) return;

  const dropdown = document.querySelector(".saved-users-dropdown-content");
  const isOpen = dropdown.classList.contains("open");

  if (isOpen) {
    dropdown.classList.remove("open");
    return;
  }

  if (selectedPageId) {
    handleClearSelection();
  }

  dropdown.classList.add("open");
};

const loadSavedPagesUI = () => {
  const pages = JSON.parse(localStorage.getItem("userPages")) || [];
  if (pages.length === 0) {
    handleGenerate();
  } else {
    renderSavedUsersDropdown(pages);

    const lastPage = pages.length > 1 ? pages[pages.length - 1] : pages[0];
    currentPage = lastPage;
    selectedPageId = lastPage.id;
    renderUserPage(lastPage);
    renderDropdownLabel(
      lastPage.mainUser.firstName,
      lastPage.mainUser.lastName,
    );

    document.querySelector('[data-action="save"]').disabled = false;
  }
};
const handleClearSelection = () => {
  selectedPageId = null;

  const label = document.querySelector(".saved-users-dropdown-container-text");
  const triggerContainer = document.querySelector(
    ".saved-users-dropdown-container",
  );

  label.textContent = "Select a saved profile...";
  triggerContainer.classList.remove("has-selection");
};

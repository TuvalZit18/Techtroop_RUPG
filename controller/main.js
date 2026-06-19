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
};

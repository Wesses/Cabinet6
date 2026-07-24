import { AMBER_THEME_ALIASES, AQUA_THEME_ALIASES, COOL_THEME_ALIASES, EMERALD_THEME_ALIASES, FUCHSIA_THEME_ALIASES, GREEN_THEME_ALIASES, INDIGO_THEME_ALIASES, LIME_THEME_ALIASES, ORANGE_THEME_ALIASES, PURPLE_THEME_ALIASES, ROSE_THEME_ALIASES, TEAL_THEME_ALIASES, WARM_THEME_ALIASES } from "./constants";

export const applyTheme = () => {
  const alias = import.meta.env.VITE_ALIAS;
  const root = document.documentElement;

  if (WARM_THEME_ALIASES.includes(alias)) {
    root.classList.add("theme-warm");
  } else if (COOL_THEME_ALIASES.includes(alias)) {
    root.classList.add("theme-cool");
  } else if (GREEN_THEME_ALIASES.includes(alias)) {
    root.classList.add("theme-green");
  } else if (TEAL_THEME_ALIASES.includes(alias)) {
    root.classList.add("theme-teal");
  } else if (PURPLE_THEME_ALIASES.includes(alias)) {
    root.classList.add("theme-purple");
  } else if (ORANGE_THEME_ALIASES.includes(alias)) {
    root.classList.add("theme-orange");
  } else if (AQUA_THEME_ALIASES.includes(alias)) {
    root.classList.add("theme-aqua");
  } else if (INDIGO_THEME_ALIASES.includes(alias)) {
    root.classList.add("theme-indigo");
  } else if (AMBER_THEME_ALIASES.includes(alias)) {
    root.classList.add("theme-amber");
  } else if (ROSE_THEME_ALIASES.includes(alias)) {
    root.classList.add("theme-rose");
  } else if (FUCHSIA_THEME_ALIASES.includes(alias)) {
    root.classList.add("theme-fuchsia");
  } else if (LIME_THEME_ALIASES.includes(alias)) {
    root.classList.add("theme-lime");
  } else if (EMERALD_THEME_ALIASES.includes(alias)) {
    root.classList.add("theme-emerald");
  }
};

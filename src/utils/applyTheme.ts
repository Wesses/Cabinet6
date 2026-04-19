import { COOL_THEME_ALIASES, WARM_THEME_ALIASES } from "./constants";

export const applyTheme = () => {
  const alias = import.meta.env.VITE_ALIAS;
  const root = document.documentElement;

  if (WARM_THEME_ALIASES.includes(alias)) {
    root.classList.add("theme-warm");
  } else if (COOL_THEME_ALIASES.includes(alias)) {
    root.classList.add("theme-cool");
  }
};

import Cookies from "js-cookie";
import { onMainPage } from './onMainPage';

export const getToken = () => {
  const tokenString = Cookies.get(import.meta.env.VITE_TOKEN_NAME);

  if (!tokenString) {
    onMainPage();
    throw "no-token";
  }

  let token;
  try {
    token = JSON.parse(tokenString);

    return token;
  } catch {
    Cookies.remove(import.meta.env.VITE_TOKEN_NAME, {
      path: import.meta.env.BASE_URL,
    });
    // Без об'єкта помилки: текст SyntaxError містить фрагмент токена
    console.error("Помилка парсинга токена");
    throw "invalid-token";
  }
};

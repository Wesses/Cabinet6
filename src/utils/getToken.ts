import Cookies from 'js-cookie';


export const getToken = () => {
  const tokenString = Cookies.get(import.meta.env.VITE_TOKEN_NAME);

  if (!tokenString) {
    throw "no-token";
  }

  let token;
  try {
    token = JSON.parse(tokenString);

    return token;
  } catch (error) {
    Cookies.remove(import.meta.env.VITE_TOKEN_NAME, {
      path: import.meta.env.VITE_BASE_URL,
    });
    console.error("Помилка парсинга токена:", error);
    throw "invalid-token";
  }
}
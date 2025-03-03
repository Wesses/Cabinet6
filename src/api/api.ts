/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import Cookies from "js-cookie";
import { history } from "@/utils/history";
import { localStorages } from "@/utils/constants";
import { getToken } from '@/utils/getToken';

axios.defaults.baseURL = "https://communal.in.ua/Cabinet6api/";
const authenticate = "api/Authenticate";
const news = "/api/News";
const organizationData = "/api/OrganizationData";
const personalacconts = "/api/Personalacconts";
const baseName = import.meta.env.BASE_URL;

axios.interceptors.response.use(
  (r) => r,
  (error) => {
    if (error.response?.status === 401) {
      if (history.navigate) {
        history.navigate("/login");
      }
      localStorage.removeItem(localStorages.USER_DATA);
    }

    throw error;
  }
);

export const postLoginReq = async (data: object) => {
  try {
    const response = await axios.post(authenticate + "/login", data);

    if (response.statusText !== "OK") {
      throw new Error(response.statusText);
    }

    Cookies.set(
      import.meta.env.VITE_TOKEN_NAME,
      JSON.stringify(response.data),
      { expires: 1 / 24, path: import.meta.env.VITE_BASE_URL }
    );

    return response.data;
  } catch (e: any) {
    console.error("Помилка при виконанні запиту:", e);
    throw e.response?.statusText || "Unknown error";
  }
};

export const postRegistrationReq = async (data: object) => {
  try {
    const response = await axios.post(authenticate + "/register", data);

    if (response.statusText !== "OK") {
      throw new Error(response.statusText);
    }

    return response.data;
  } catch (e: any) {
    console.error("Помилка при виконанні запиту:", e);
    throw e.response?.statusText || "Unknown error";
  }
};

export const getNews = async () => {
  try {
    const response = await axios.get(news + baseName);

    if (response.statusText !== "OK") {
      throw new Error(response.statusText);
    }

    return response.data;
  } catch (e: any) {
    console.error("Помилка при виконанні запиту:", e);
    throw e.response?.statusText || "Unknown error";
  }
};

export const getOrganizationData = async () => {
  try {
    const response = await axios.get(organizationData + baseName);

    if (response.statusText !== "OK") {
      throw new Error(response.statusText);
    }

    return response.data;
  } catch (e: any) {
    console.error("Помилка при виконанні запиту:", e);
    throw e.response?.statusText || "Unknown error";
  }
};

export const getPersonalacconts = async () => {
  const token = getToken();

  try {
    const response = await axios.get(personalacconts + baseName, {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });

    if (response.statusText !== "OK") {
      throw new Error(response.statusText);
    }

    return response.data;
  } catch (e: any) {
    Cookies.remove(import.meta.env.VITE_TOKEN_NAME, {
      path: import.meta.env.VITE_BASE_URL,
    });
    console.error("Помилка при виконанні запиту:", e);
    throw e.response?.statusText || "Unknown error";
  }
};

// export const refreshTokenReq = async () => {
//   const tokenString = Cookies.get(import.meta.env.VITE_TOKEN_NAME);

//   if (!tokenString) {
//     return "no-token";
//   }

//   let token;
//   try {
//     token = JSON.parse(tokenString);
//   } catch (error) {
//     Cookies.remove(import.meta.env.VITE_TOKEN_NAME);
//     console.error("Помилка парсинга токена:", error);
//     return "invalid-token";
//   }

//   try {
//     console.log({accessToken: token.token, refreshToken: token.refreshToken});

//     const response = await axios.post(authenticate + "/refresh-token", {accessToken: token.token, refreshToken: token.refreshToken});

//     if (response.statusText !== "OK") {
//       throw new Error(response.statusText);
//     }

//     return response.statusText;
//   } catch (e: any) {
//     Cookies.remove(import.meta.env.VITE_TOKEN_NAME);
//     console.error("Помилка при виконанні запиту:", e);
//     throw e.response?.statusText || "Unknown error";
//   }
// };

export const postPersonalacconts = async (pwd: string) => {
  const token = getToken();

  try {
    const response = await axios.post(
      personalacconts,
      { pwd, organizationAlias: import.meta.env.VITE_ALIAS },
      {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      }
    );

    if (response.statusText !== "Created") {
      throw new Error(response.statusText);
    }

    return response.data;
  } catch (e: any) {
    console.error("Помилка при виконанні запиту:", e);

    throw e?.response?.status || "Unknown error";
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import Cookies from 'js-cookie';

axios.defaults.baseURL = "https://communal.in.ua/Cabinet6api/";
const authenticate = "api/Authenticate";
const news = "/api/News";
const organizationData = "/api/OrganizationData";
const personalacconts = "/api/Personalacconts";
const baseName = import.meta.env.BASE_URL;

export const loginReq = async (data: object) => {
  try {
    const response = await axios.post(authenticate + "/login", data);

    if (response.statusText !== "OK") {
      throw new Error(response.statusText);
    }

    Cookies.set(import.meta.env.VITE_TOKEN_NAME, JSON.stringify(response.data), { expires: 1, path: '' });

    return response.data;
  } catch (e: any) {
    console.error('Помилка при виконанні запиту:', e);
    throw e.response?.statusText || 'Unknown error';
  }
};

export const registrationReq = async (data: object) => {
  try {
    const response = await axios.post(authenticate + "/register", data);

    if (response.statusText !== "OK") {
      throw new Error(response.statusText);
    }

    return response.data;
  } catch (e: any) {
    console.error('Помилка при виконанні запиту:', e);
    throw e.response?.statusText || 'Unknown error';
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
    console.error('Помилка при виконанні запиту:', e);
    throw e.response?.statusText || 'Unknown error';
  }
}

export const getOrganizationData = async () => {
  try {
    const response = await axios.get(organizationData + baseName);

    if (response.statusText !== "OK") {
      throw new Error(response.statusText);
    }

    return response.data;
  } catch (e: any) {
    console.error('Помилка при виконанні запиту:', e);
    throw e.response?.statusText || 'Unknown error';
  }
}

export const getPersonalacconts = async () => {
  const tokenString = Cookies.get(import.meta.env.VITE_TOKEN_NAME);

  if (!tokenString) {
    return 'no-token';
  }

  let token;
  try {
    token = JSON.parse(tokenString);
  } catch (error) {
    console.error('Ошибка парсинга токена:', error);
    return 'invalid-token';
  }

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
    console.error('Помилка при виконанні запиту:', e);
    throw e.response?.statusText || 'Unknown error';
  }
};

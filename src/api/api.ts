/* eslint-disable @typescript-eslint/no-explicit-any */
import getBasename from '@/utils';
import axios from "axios";
import Cookies from 'js-cookie';

axios.defaults.baseURL = "https://communal.in.ua/Cabinet6api/";
const authenticate = "api/Authenticate";
const news = "/api/News";

export const loginReq = async (data: object) => {
  try {
    const response = await axios.post(authenticate + "/login", data);

    if (response.statusText !== "OK") {
      throw new Error(response.statusText);
    }

    Cookies.set('Token', JSON.stringify(response.data), { expires: 1, path: '' });

    return response.data;
  } catch (e: any) {
    throw e.response.statusText;
  }
};

export const getNews = async () => {
  try {
    const response = await axios.get(news + getBasename());

    if (response.statusText !== "OK") {
      throw new Error(response.statusText);
    }

    return response.data;
  } catch (e: any) {
    throw e.response.statusText;
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import Cookies from 'js-cookie';

axios.defaults.baseURL = "https://communal.in.ua/Cabinet6api/";
const authenticate = "api/Authenticate";
const news = "/api/News";
const organizationData = "/api/OrganizationData";
const baseName = import.meta.env.BASE_URL;

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

export const registrationReq = async (data: object) => {
  try {
    const response = await axios.post(authenticate + "/register", data);

    if (response.statusText !== "OK") {
      throw new Error(response.statusText);
    }

    return response.data;
  } catch (e: any) {
    console.log(e);
    
    throw e.response.statusText;
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
    throw e.response.statusText;
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
    throw e.response.statusText;
  }
}

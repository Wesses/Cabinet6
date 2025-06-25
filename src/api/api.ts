/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import Cookies from "js-cookie";
import { getToken } from "@/utils/getToken";
import { onMainPage } from "@/utils/onMainPage";

axios.defaults.baseURL = "https://communal.in.ua/Cabinet6api/";
const authenticate = "api/Authenticate";
const news = "/api/News";
const organizationData = "/api/OrganizationData";
const personalacconts = "/api/Personalacconts";
const abonentCard = "/api/AbonentCard";
const archiv = "/api/Arhiv";
const oplata = "/api/Oplata";
const invoice = "/api/Invoice";
const wmShow = "/api/VmPokaz";
const baseName = import.meta.env.BASE_URL;

axios.interceptors.response.use(
  (r) => r,
  (error) => {
    if (error.response?.status === 401) {
      onMainPage();
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
    throw e?.response?.status || "Unknown error";
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

    throw e.status || "Unknown error";
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

export const postPersonalaccont = async (pwd: string) => {
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

export const deletePersonalaccont = async (id: number) => {
  const token = getToken();

  try {
    const response = await axios.delete(personalacconts + "/" + id, {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });

    if (response.statusText !== "No Content") {
      throw new Error(response.statusText);
    }

    return response.data;
  } catch (e: any) {
    console.error("Помилка при виконанні запиту:", e);

    throw e?.response?.status || "Unknown error";
  }
};

export const getAbonentCardData = async (PersonalaccontsId: number) => {
  const token = getToken();

  try {
    const response = await axios.get(abonentCard + "/" + PersonalaccontsId, {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });

    if (response.statusText !== "OK") {
      throw new Error(response.statusText);
    }

    return response.data;
  } catch (e: any) {
    console.error("Помилка при виконанні запиту:", e);

    throw e?.response?.status || "Unknown error";
  }
};

export const getArchivData = async (PersonalaccontsId: number) => {
  const token = getToken();

  try {
    const response = await axios.get(archiv + "/" + PersonalaccontsId, {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });

    if (response.statusText !== "OK") {
      throw new Error(response.statusText);
    }

    return response.data;
  } catch (e: any) {
    console.error("Помилка при виконанні запиту:", e);

    throw e?.response?.status || "Unknown error";
  }
};

export const getOplataData = async (PersonalaccontsId: number) => {
  const token = getToken();

  try {
    const response = await axios.get(oplata + "/" + PersonalaccontsId, {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });

    if (response.statusText !== "OK") {
      throw new Error(response.statusText);
    }

    return response.data;
  } catch (e: any) {
    console.error("Помилка при виконанні запиту:", e);

    throw e?.response?.status || "Unknown error";
  }
};

export const getInvoiceBlob = async (
  PersonalaccontsId: number,
  utilityService: string,
  useCurrentMonth: number
) => {
  const token = getToken();

  try {
    const response = await axios.get(
      invoice +
        "/" +
        PersonalaccontsId +
        "/" +
        utilityService +
        "/" +
        +useCurrentMonth,
      {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
        responseType: "blob",
      }
    );

    if (response.statusText !== "OK") {
      throw new Error(response.statusText);
    }

    const disposition = response.headers["content-disposition"];
    let fileName = "invoice.pdf";

    if (disposition) {
      let match = disposition.match(/filename\*\s*=\s*UTF-8''([^;]+)/i);
      if (match && match[1]) {
        fileName = decodeURIComponent(match[1]);
      } else {
        match = disposition.match(/filename\s*=\s*"?([^";]+)"?/i);
        if (match && match[1]) {
          fileName = match[1];
        }
      }
    }

    return { blob: response.data, fileName };
  } catch (e: any) {
    console.error("Помилка при виконанні запиту:", e);

    throw e?.response?.status || "Unknown error";
  }
};

export const getWMShowData = async (PersonalaccontsId: number) => {
  const token = getToken();

  try {
    const response = await axios.get(wmShow + "/" + PersonalaccontsId, {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });

    if (response.statusText !== "OK") {
      throw new Error(response.statusText);
    }

    return response.data;
  } catch (e: any) {
    console.error("Помилка при виконанні запиту:", e);

    throw e?.response?.status || "Unknown error";
  }
};

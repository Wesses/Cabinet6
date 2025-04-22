import Cookies from "js-cookie";
import { localStorages } from "./constants";
import { history } from "@/utils/history";

export const onMainPage = () => {
  Cookies.remove(import.meta.env.VITE_TOKEN_NAME, {
    path: import.meta.env.VITE_BASE_URL,
  });
  localStorage.removeItem(localStorages.USER_DATA);
  if (history.navigate) {
    history.navigate("/login");
  }
};

import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useContext } from "react";
import { localStorages } from "@/utils/constants";
import { UserContext } from "@/contexts/UserContext";
import LocaleButton from "./LocaleButton";
import { useTranslation } from "react-i18next";

export const CabinetHeader = () => {
  const navigate = useNavigate();
  const { username, companyName } = useContext(UserContext);
  const { t } = useTranslation();

  const handleLogout = () => {
    Cookies.remove(import.meta.env.VITE_TOKEN_NAME, {
      path: import.meta.env.VITE_BASE_URL,
    });
    navigate("/login");
    localStorage.removeItem(localStorages.USER_DATA);
  };

  return (
    <header className="sticky top-0 w-full bg-zinc-900 py-6 px-6 flex justify-between items-center shadow-lg">
      <div className="flex items-center gap-4">
        <p className="text-white text-xl font-bold">{companyName}</p>
        <p className="text-gray-500 text-base">({username})</p>
      </div>

      <div className="flex flex-row items-center gap-x-4">
        <LocaleButton isLabel={false} />

        <Button
          className="bg-white text-zinc-900 hover:bg-gray-300 transition-all duration-300 rounded-md"
          onClick={handleLogout}
        >
          <div>{t("button_left_cabinet")}</div>
        </Button>
      </div>
    </header>
  );
};

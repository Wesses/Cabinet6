import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useContext } from "react";
import { izmteploTag, localStorages } from "@/utils/constants";
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
    <header className="sticky top-0 w-full bg-zinc-900 py-6 px-6 flex sm:flex-row sm:justify-between sm:gap-0 sm:items-center shadow-lg z-10 flex-col gap-2 justify-center max-h-[100px]">
      <div className="flex items-center justify-between gap-4 ite sm:items-center sm:justify-normal">
        {import.meta.env.VITE_ALIAS === izmteploTag && (
          <div className="rounded-full bg-slate-700 size-10 sm:size-20">
            <img
              src={`${import.meta.env.VITE_BASE_URL}/izmteplo_logo.png`}
              alt="logo"
              className="size-10 sm:size-20"
            />
          </div>
        )}

        <p className="text-base font-bold text-white md:text-xl">
          {companyName}
        </p>
        <p className="text-sm text-gray-500 md:text-base">({username})</p>
      </div>

      <div className="flex flex-row items-center justify-between sm:justify-normal gap-x-4">
        <LocaleButton isLabel={false} />

        <Button
          className="transition-all duration-300 bg-white rounded-md text-zinc-900 hover:bg-gray-300"
          onClick={handleLogout}
        >
          {t("button_left_cabinet")}
        </Button>
      </div>
    </header>
  );
};

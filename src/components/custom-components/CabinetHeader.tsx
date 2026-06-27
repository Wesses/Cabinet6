import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useContext } from "react";
import { chteTag, izmteploTag, localStorages } from "@/utils/constants";
import izmteploLogoSrc from '@/assets/izmteplo/izmteplo_logo.png';
import chteLogoSrc from '@/assets/chte/chte_logo.png';
import { UserContext } from "@/contexts/UserContext";
import LocaleButton from "./LocaleButton";
import { useTranslation } from "react-i18next";
import { postLogoutReq } from "@/api/api";

export const CabinetHeader = () => {
  const navigate = useNavigate();
  const { username, companyName } = useContext(UserContext);
  const { t } = useTranslation();

  const handleLogout = () => {
    postLogoutReq();
    Cookies.remove(import.meta.env.VITE_TOKEN_NAME, {
      path: import.meta.env.VITE_BASE_URL,
    });
    localStorage.removeItem(localStorages.USER_DATA);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 w-full bg-primary py-6 px-6 flex sm:flex-row sm:justify-between sm:gap-0 sm:items-center shadow-lg z-10 flex-col gap-2 justify-center max-h-[100px]">
      <div className="flex items-center justify-between gap-4 ite sm:items-center sm:justify-normal">
        {import.meta.env.VITE_ALIAS === izmteploTag && (
          <div className="rounded-full bg-primary-foreground/10 size-10 sm:size-20">
            <img
              src={izmteploLogoSrc}
              alt="logo"
              className="size-10 sm:size-20"
            />
          </div>
        )}
        {import.meta.env.VITE_ALIAS === chteTag && (
          <div className="rounded bg-primary-foreground/10 h-10 flex items-center px-2">
            <img
              src={chteLogoSrc}
              alt="logo"
              className="h-8 w-auto object-contain"
            />
          </div>
        )}

        <p className="text-base font-bold text-primary-foreground md:text-xl">
          {companyName}
        </p>
        <p className="text-sm text-primary-foreground/60 md:text-base">({username})</p>
      </div>

      <div className="flex flex-row items-center justify-between sm:justify-normal gap-x-4">
        <LocaleButton isLabel={false} />

        <Button
          className="transition-all duration-300 bg-primary-foreground rounded-md text-foreground hover:bg-primary-foreground/80"
          onClick={handleLogout}
        >
          {t("button_left_cabinet")}
        </Button>
      </div>
    </header>
  );
};

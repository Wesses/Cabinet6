import LoginForm from "@/components/custom-components/LoginForm";
import NewsList from "@/components/custom-components/NewsList";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useContext, useEffect, useState } from "react";
import { getOrganizationData } from "@/api/api";
import { OrganizationDataT } from "@/types";
import Cookies from "js-cookie";
import { UserContext } from "@/contexts/UserContext";
import LocaleButton from "@/components/custom-components/LocaleButton";
import { useTranslation } from "react-i18next";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [organizationData, setOrganizationData] =
    useState<OrganizationDataT | null>(null);
  const [isError, setIsError] = useState(false);
  const { handleSetCompanyName } = useContext(UserContext);
  const { t } = useTranslation();

  const handleRegistrationPage = () => {
    navigate("/registration");
  };

  useEffect(() => {
    getOrganizationData()
      .then((r) => {
        setOrganizationData(r);
        handleSetCompanyName(r.name);
      })
      .catch((e) => {
        setIsError(true);
        console.log(e);
      });

    if (Cookies.get(import.meta.env.VITE_TOKEN_NAME)) {
      navigate("/cabinet");
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col lg:flex-row lg:min-h-[500px]">
      <div className="w-full lg:w-1/2 h-1/3 md:h-1/2 lg:h-full relative bg-zinc-900 rounded-b-xl lg:rounded-b-none min-h-[200px] lg:max-w-none">
        <div className="absolute text-white z-10 top-4 left-4 flex lg:flex-col flex-row gap-y-2 gap-x-8 lg:gap-x-0 items-center lg:items-baseline">
          {isError ? (
            <h1>{t("server_error")}</h1>
          ) : (
            <>
              {organizationData ? (
                <>
                  <h1 className="text-2xl xl:text-3xl font-bold">
                    {organizationData.name}
                  </h1>
                  <p className="hidden sm:block">
                    {organizationData.description +
                      t("address_label") +
                      " " +
                      organizationData.contactAddress}
                  </p>
                  <p>
                    {t("phone_number_label") +
                      " " +
                      organizationData.contactPhone}
                  </p>
                </>
              ) : (
                <>
                  <Skeleton className="h-[30px] w-[500px] bg-slate-300" />
                  <Skeleton className="h-[20px] w-3/4 hidden sm:block bg-slate-300" />
                  <Skeleton className="h-[20px] w-[200px] bg-slate-300" />
                </>
              )}
            </>
          )}
        </div>

        <div className="lg:hidden absolute bottom-4 w-full flex justify-center">
          <Drawer>
            <DrawerTrigger className="w-full" asChild>
                <Button className="text-black w-4/5 bg-white hover:bg-gray-300 max-w-[400px] lg:max-w-none">
                  {t("news")}
                </Button>
            </DrawerTrigger>
            <DrawerContent className="h-full rounded-none">
              <DrawerHeader>
                <DrawerTitle>{t("news")}</DrawerTitle>
              </DrawerHeader>
                <NewsList />
              <DrawerFooter>
                <DrawerClose asChild className="flex justify-center">
                  <div>
                    <Button>{t("close")}</Button>
                  </div>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>

        <div className="lg:block hidden h-full">
          <NewsList />
        </div>
      </div>

      <div className="w-full lg:w-1/2 h-full flex items-center justify-center relative mb-2 lg:mb-0 min-h-[500px]">
        <div className="absolute top-4 right-4 flex flex-row items-center">
          <LocaleButton isLabel={true} />

          <Button
            className="hidden lg:block"
            variant="ghost"
            onClick={handleRegistrationPage}
          >
            {t("register_button")}
          </Button>
        </div>

        <LoginForm />
      </div>
    </div>
  );
};

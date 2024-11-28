import LoginForm from "@/components/custom-components/LoginForm";
import NewsList from "@/components/NewsList";
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
import { useEffect, useState } from "react";
import { getOrganizationData } from "@/api/api";
import { OrganizationDataT } from "@/types";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [organizationData, setOrganizationData] =
    useState<OrganizationDataT | null>(null);
  const [isError, setIsError] = useState(false);

  const handleRegistrationPage = () => {
    navigate("/registration");
  };

  useEffect(() => {
    getOrganizationData()
      .then(setOrganizationData)
      .catch(() => setIsError(true));
  }, []);

  return (
    <div className="w-full h-full flex flex-col xl:flex-row xl:min-h-[500px]">
      <div className="w-full xl:w-1/2 h-1/3 md:h-1/2 xl:h-full relative bg-zinc-900 rounded-b-xl xl:rounded-b-none min-h-[200px] xl:max-w-none">
        <div className="absolute text-white z-10 top-4 left-4 flex xl:flex-col flex-row gap-y-2 gap-x-8 xl:gap-x-0 items-center xl:items-baseline">
          {isError ? (
            <h1>Помилка серверу</h1>
          ) : (
            <>
              {organizationData ? (
                <>
                  <h1 className="text-2xl xl:text-3xl font-bold">
                    {organizationData.name}
                  </h1>
                  <p className="hidden sm:block">
                    {organizationData.description +
                      ". За адресою: " +
                      organizationData.contactAddress}
                  </p>
                  <p>{"Номер телефону: " + organizationData.contactPhone}</p>
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

        <div className="xl:hidden absolute bottom-4 w-full flex justify-center">
          <Drawer>
            <DrawerTrigger className="w-full" asChild>
              <Button className="text-black w-4/5 bg-purple-600 hover:bg-purple-700 max-w-[400px] xl:max-w-none">
                Новини
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-full rounded-none">
              <DrawerHeader>
                <DrawerTitle>Новини</DrawerTitle>
              </DrawerHeader>
              <NewsList />
              <DrawerFooter>
                <DrawerClose>
                  <Button>Закрити</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>

        <div className="xl:block hidden h-full">
          <NewsList />
        </div>
      </div>

      <div className="w-full xl:w-1/2 h-full flex items-center justify-center relative mb-2 xl:mb-0 min-h-[500px]">
        <Button
          className="absolute top-4 right-4 hidden xl:block"
          variant="ghost"
          onClick={handleRegistrationPage}
        >
          Зареєструватися
        </Button>

        <LoginForm />
      </div>
    </div>
  );
};

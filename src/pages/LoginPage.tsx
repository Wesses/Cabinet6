import LoginForm from "@/components/custom-components/LoginForm";
import NewsList from "@/components/NewsList";
import { Button } from "@/components/ui/button";
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

export const LoginPage = () => {
  const navigate = useNavigate();

  const handleRegistrationPage = () => {
    navigate("/registration");
  };

  return (
    <div className="w-full h-full flex flex-col xl:flex-row">
      <div className="w-full xl:w-1/2 h-1/4 md:h-1/3 xl:h-full relative bg-zinc-900 rounded-b-xl xl:rounded-b-none">
        <div className="absolute text-white z-10 top-4 left-4 flex xl:flex-col flex-row gap-y-2 gap-x-8 xl:gap-x-0 items-center xl:items-baseline">
          <h1 className="text-2xl xl:text-3xl font-bold">Company Name</h1>
          <p className="hidden sm:block">Description... .... ...</p>
          <p>+3899999999</p>
        </div>

        <div className="xl:hidden absolute bottom-4 w-full flex justify-center">
          <Drawer>
            <DrawerTrigger className="w-full" asChild>
              <Button className="text-black w-4/5 bg-purple-600 hover:bg-purple-700 max-w-[400px]">Новини</Button>
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

        <div className='xl:block hidden h-full'>
          <NewsList />
        </div>
      </div>

      <div className="w-full xl:w-1/2 h-full flex items-center justify-center relative mb-2 xl:mb-0">
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

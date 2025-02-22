import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";

export const CabinetHeader = () => {
  const navigate = useNavigate();

  const handleDeleteCookies = () => {
    Cookies.remove(import.meta.env.VITE_TOKEN_NAME, { path: "" });
    navigate("/login");
  };

  return (
    <header className="sticky top-0 left-0 w-full bg-zinc-900 py-6 px-5 flex justify-end">
        <Button 
          className="bg-white text-zinc-900 hover:bg-gray-300"
          onClick={handleDeleteCookies}

        >
          Вийти з кабінету
        </Button>
    </header>
  );
};

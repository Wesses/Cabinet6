import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useContext } from "react";
import { localStorages } from '@/utils/constants';
import { UserContext } from '@/contexts/UserContext';

export const CabinetHeader = () => {
  const navigate = useNavigate();
  const { username, companyName } = useContext(UserContext);

  const handleDeleteCookies = () => {
    Cookies.remove(import.meta.env.VITE_TOKEN_NAME, {
      path: import.meta.env.VITE_BASE_URL,
    });
    navigate("/login");
    localStorage.removeItem(localStorages.USER_DATA);
  };

  return (
    <header className="sticky top-0 w-full bg-zinc-900 py-4 px-6 flex justify-between items-center shadow-lg">
      <div className="flex items-center gap-4">
        <p className="text-white text-xl font-bold">{companyName}</p>
        <p className="text-gray-300 text-sm">({username})</p>
      </div>

      <Button
        className="bg-white text-zinc-900 hover:bg-gray-300 transition-all duration-300 px-4 py-2 rounded-md"
        onClick={handleDeleteCookies}
      >
        Вийти з кабінету
      </Button>
    </header>
  );
};

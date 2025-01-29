import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

import NewCabinet from "@/components/custom-components/NewCabinet";

const CabinetPage = () => {
  const navigate = useNavigate();

  const handleDeleteCookies = () => {
    Cookies.remove(import.meta.env.VITE_TOKEN_NAME, { path: "" });
    navigate("/login");
  };

  return (
    <div className="w-full h-full flex flex-col">
      <NewCabinet />

      <div className="w-1/6 mx-1">
        <div className="">Login successful</div>
        <Button onClick={handleDeleteCookies}>clear cookie</Button>
      </div>
    </div>
  );
};

export default CabinetPage;

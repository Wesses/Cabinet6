import { CabinetHeader } from "@/components/custom-components/CabinetHeader";
import { Outlet } from "react-router";

export const PrivateRoutes = () => {
  return (
    <div className="flex flex-col h-screen w-full">
      <CabinetHeader />

      <Outlet />
    </div>
  );
};

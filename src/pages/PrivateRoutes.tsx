import { CabinetHeader } from "@/components/custom-components/CabinetHeader";
import { Outlet } from "react-router";

export const PrivateRoutes = () => {
  return (
    <div>
      <CabinetHeader />

      <Outlet />
    </div>
  );
};

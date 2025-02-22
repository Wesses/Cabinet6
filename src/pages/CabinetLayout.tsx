import { CabinetHeader } from "@/components/custom-components/CabinetHeader";
import { Outlet } from "react-router";

export const CabinetLayout = () => {
  return (
    <div>
      <CabinetHeader />

      <Outlet />
    </div>
  );
};

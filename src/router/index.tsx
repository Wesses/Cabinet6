import App from "@/App";
import { LoginPage } from "@/pages/LoginPage";
import CabinetPage from "@/pages/CabinetPage";
import { RegistrationPage } from "@/pages/RegistrationPage";
import { createBrowserRouter } from "react-router-dom";
import InvoicePage from '@/pages/InvoicePage';
import { PrivateRoutes } from '@/pages/PrivateRoutes';

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "registration",
        element: <RegistrationPage />,
      },
      {
        path: "cabinet",
        element: <PrivateRoutes />,
        children: [
          {
            index: true,
            element: <CabinetPage />,
          },
          {
            path: ":id",
            element: <InvoicePage />,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

export default router;

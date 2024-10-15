import App from "@/App";
import { LoginPage } from "@/pages/LoginPage";
import CabinetPage from '@/pages/CabinetPage';
import { RegistrationPage } from "@/pages/RegistrationPage";
import { createBrowserRouter } from "react-router-dom";

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
        element: <CabinetPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes, {
  basename: '/kiliya',
});

export default router;

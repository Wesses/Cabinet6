import App from "@/App";
import { LoginPage } from "@/pages/LoginPage";
import CabinetPage from "@/pages/CabinetPage";
import { RegistrationPage } from "@/pages/RegistrationPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import { createBrowserRouter } from "react-router-dom";
import InvoicePage from '@/pages/InvoicePage';
import { PrivateRoutes } from '@/pages/PrivateRoutes';
import RouteErrorFallback from "@/components/custom-components/RouteErrorFallback";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <RouteErrorFallback />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
        errorElement: <RouteErrorFallback />,
      },
      {
        path: "registration",
        element: <RegistrationPage />,
        errorElement: <RouteErrorFallback />,
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage />,
        errorElement: <RouteErrorFallback />,
      },
      {
        path: "reset-password",
        element: <ResetPasswordPage />,
        errorElement: <RouteErrorFallback />,
      },
      {
        path: "cabinet",
        element: <PrivateRoutes />,
        errorElement: <RouteErrorFallback />,
        children: [
          {
            index: true,
            element: <CabinetPage />,
            errorElement: <RouteErrorFallback />,
          },
          {
            path: ":id",
            element: <InvoicePage />,
            errorElement: <RouteErrorFallback />,
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

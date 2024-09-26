import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import ScreenWrapper from './components/ScreenWrapper';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ScreenWrapper>
      <RouterProvider router={router} />
    </ScreenWrapper>
  </StrictMode>
);
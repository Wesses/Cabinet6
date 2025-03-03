import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { UserProvider } from "./contexts/UserProvider";
import { history } from './utils/history';

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  history.navigate = useNavigate();
  history.location = useLocation();

  useEffect(() => {
    if (pathname === "/") {
      navigate("/login");
    }
  }, [pathname]);

  return (
    <>
      <UserProvider>
        <Outlet />
        <Toaster
          position="bottom-right"
          className="pointer-events-auto"
          duration={3000}
          closeButton
        />
      </UserProvider>
    </>
  );
}

export default App;

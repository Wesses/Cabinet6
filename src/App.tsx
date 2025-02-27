import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Toaster } from 'sonner';

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === "/") {
      navigate("/login");
    }
  }, [pathname]);

  return (
    <>
      <Outlet />
      <Toaster
        position="bottom-right"
        className="pointer-events-auto"
        duration={3000}
        closeButton
      />
    </>
  );
}

export default App;

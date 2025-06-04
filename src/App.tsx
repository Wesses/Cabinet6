import { useEffect, useMemo, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { UserProvider } from "./contexts/UserProvider";
import { history } from './utils/history';

const TABLET_SCREEN_WIDTH = 640;

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  history.navigate = useNavigate();
  history.location = useLocation();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const toastPosition = useMemo(() => {
    return screenWidth >= TABLET_SCREEN_WIDTH ? 'bottom-right' : 'top-left'
  }, [screenWidth]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
          position={toastPosition}
          className="pointer-events-auto"
          duration={3000}
          closeButton
        />
      </UserProvider>
    </>
  );
}

export default App;

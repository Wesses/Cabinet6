import { useEffect } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function App() {
  const {pathname} = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === "/") {
      navigate('/login');
    }
  }, [pathname])

  return  <Outlet />;
}

export default App;

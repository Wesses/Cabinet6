import { Link, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

function App() {
  const {pathname} = useLocation();

  return <>{pathname === "/" ? <Link to="/login">Login</Link> : <Outlet />}</>;
}

export default App;

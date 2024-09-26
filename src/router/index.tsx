import App from '@/App';
import { LoginPage } from '@/pages/LoginPage';
import { RegistrationPage } from '@/pages/RegistrationPage';
import { createBrowserRouter } from 'react-router-dom';

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/registration",
    element: <RegistrationPage />,
  },
];

const router = createBrowserRouter(routes, {
  basename: "/kiliya/", 
});

export default router;

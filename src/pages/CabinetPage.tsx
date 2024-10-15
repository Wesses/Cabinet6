import { Button } from '@/components/ui/button';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';

const CabinetPage = () => {
  const navigate = useNavigate();

  const handleDeleteCookies = () => {
    Cookies.remove('Token', { path: '' });
    navigate('/login');
  }

  return (
    <>
      <div>Login successful</div>
      <Button onClick={handleDeleteCookies}>clear cookie</Button>
    </>
  );
};

export default CabinetPage;

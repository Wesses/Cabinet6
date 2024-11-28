// import { Button } from '@/components/ui/button';
// import Cookies from 'js-cookie';
// import { useNavigate } from 'react-router';

// import CabinetForm from '@/components/custom-components/CabinetForm';
import Autocomplete from '@/components/custom-components/Autocomplete';

const CabinetPage = () => {
  // const navigate = useNavigate();

  // const handleDeleteCookies = () => {
  //   Cookies.remove('Token', { path: '' });
  //   navigate('/login');
  // }

  return (
    <div className="w-full h-full flex flex-col xl:flex-row">
      <Autocomplete />
    </div>
  );
};

export default CabinetPage;

{/* <>
<div>Login successful</div>
<Button onClick={handleDeleteCookies}>clear cookie</Button>
</> */}
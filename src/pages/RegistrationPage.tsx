import RegistrationForm from '@/components/custom-components/RegistrationForm';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router';

export const RegistrationPage = () => {
  const navigate = useNavigate();
  
  const handleLoginPage = () => {
    navigate('/login');
  }

  return (
    <div className="w-full h-full flex justify-center items-center">

      <div className="w-1/2 h-full flex items-center justify-center">
        <Button 
        className="absolute top-4 right-4 hidden xl:block" 
        variant="ghost"
        onClick={handleLoginPage}
        >
          Увійти</Button>

        <RegistrationForm />
      </div>
    </div>
  );
};
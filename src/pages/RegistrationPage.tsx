import LocaleButton from '@/components/custom-components/LocaleButton';
import RegistrationForm from "@/components/custom-components/RegistrationForm";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router";

export const RegistrationPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLoginPage = () => {
    navigate("/login");
  };

  return (
    <div className="w-full h-full flex justify-center items-center overflow-y-auto">
      <div className="w-1/2 h-full flex items-center justify-center">
      <div className="absolute top-4 right-4 flex flex-row items-center">
      <LocaleButton isLabel={true}/>

      <Button
          className="hidden xl:block"
          variant="ghost"
          onClick={handleLoginPage}
        >
          {t("button_login")}
        </Button>
      </div>
        <RegistrationForm />
      </div>
    </div>
  );
};

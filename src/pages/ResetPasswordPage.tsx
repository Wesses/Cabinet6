import LocaleButton from "@/components/custom-components/LocaleButton";
import ResetPasswordForm from "@/components/custom-components/ResetPasswordForm";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex justify-center items-center overflow-y-auto">
      <div className="w-1/2 h-full flex items-center justify-center">
        <div className="absolute top-4 right-4 flex flex-row items-center">
          <LocaleButton isLabel={true} />
          <Button
            className="hidden xl:block"
            variant="ghost"
            onClick={() => navigate("/login")}
          >
            {t("button_login")}
          </Button>
        </div>
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPasswordPage;

import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { onMainPage } from "@/utils/onMainPage";

function ErrorBlock() {
   const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-1 justify-center items-center w-full h-full">
      <h1>{t("error_refresh")}</h1>
      <div className="flex flex-row gap-2">
        <Button onClick={() => window.location.reload()}>{t("refresh")}</Button>
        <Button onClick={onMainPage}>{t("on_main_page")}</Button>
      </div>
    </div>
  );
}

export default ErrorBlock;

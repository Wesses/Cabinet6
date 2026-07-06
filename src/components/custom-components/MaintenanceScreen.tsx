import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ServerCog } from "lucide-react";

// Full-screen overlay shown on HTTP 503 (planned DB maintenance during the
// month-transition procedures). No buttons: the page silently reloads once a
// minute, so it disappears on its own once the server is back.
const MaintenanceScreen = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const id = setTimeout(() => window.location.reload(), 60000);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background px-6">
      <div className="flex flex-col items-center gap-5 text-center max-w-[460px]">
        <ServerCog className="w-16 h-16 sm:w-20 sm:h-20 text-primary" />

        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          {t("maintenance_title")}
        </h1>

        <div className="space-y-3 text-sm sm:text-base text-muted-foreground">
          <p>{t("maintenance_line1")}</p>
          <p>{t("maintenance_line2")}</p>
          <p className="font-medium text-foreground">{t("maintenance_line3")}</p>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceScreen;

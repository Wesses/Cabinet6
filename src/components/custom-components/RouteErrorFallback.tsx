import { useRouteError } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TriangleAlert } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { onMainPage } from "@/utils/onMainPage";

// Route-level error boundary (React Router `errorElement`). Rendered in place
// of whichever route threw, so ancestor layouts (e.g. CabinetHeader) keep
// rendering instead of the whole app going blank. Reuses the same copy and
// recovery actions as ErrorBlock.tsx (the existing fetch-error fallback) for
// consistency, plus logs the caught error for diagnostics — most crashes here
// come from third-party browser extensions (translators) corrupting the live
// DOM, which a full reload (not SPA navigation) reliably recovers from.
const RouteErrorFallback = () => {
  const { t } = useTranslation();
  const error = useRouteError();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col gap-3 justify-center items-center min-h-[60vh] px-6 text-center">
      <TriangleAlert className="w-16 h-16 sm:w-20 sm:h-20 text-destructive" />
      <h1>{t("error_refresh")}</h1>
      <div className="flex flex-row gap-2">
        <Button onClick={() => window.location.reload()}>{t("refresh")}</Button>
        <Button onClick={onMainPage}>{t("on_main_page")}</Button>
      </div>
    </div>
  );
};

export default RouteErrorFallback;

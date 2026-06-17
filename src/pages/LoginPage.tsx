import LoginForm from "@/components/custom-components/LoginForm";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import { getOrganizationData } from "@/api/api";
import { OrganizationDataT } from "@/types";
import Cookies from "js-cookie";
import { UserContext } from "@/contexts/UserContext";
import LocaleButton from "@/components/custom-components/LocaleButton";
import { useTranslation } from "react-i18next";
import {
  CURRENT_PAGE_PARAM_KEY,
  belvkTag,
  izmteploTag,
  izmvkTag,
  rozdilnaTag,
} from "@/utils/constants";
import PaymentGif from "@/components/custom-components/izmteploComponents/PaymentGif";
import ViberBotRefs from "@/components/custom-components/izmvkComponents/ViberBotRefs";
import BelvkContent from "@/components/custom-components/belvkComponents/BelvkContent";
import RozdilnaContent from "@/components/custom-components/rozdilnaComponents/RozdilnaContent";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [organizationData, setOrganizationData] =
    useState<OrganizationDataT | null>(null);
  const [isError, setIsError] = useState(false);
  const { handleSetCompanyName } = useContext(UserContext);
  const { t } = useTranslation();

  const handleRegistrationPage = () => {
    navigate("/registration");
  };

  useEffect(() => {
    getOrganizationData()
      .then((r) => {
        setOrganizationData(r);
        handleSetCompanyName(r.name);
      })
      .catch((e) => {
        setIsError(true);
        console.error(e);
      });

    if (Cookies.get(import.meta.env.VITE_TOKEN_NAME)) {
      navigate(`/cabinet?${CURRENT_PAGE_PARAM_KEY}=1`);
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col lg:flex-row lg:min-h-[500px]">
      <div className="w-full lg:w-1/2 h-1/3 md:h-1/2 lg:h-full relative bg-primary rounded-b-xl lg:rounded-b-none min-h-[200px] lg:max-w-none overflow-hidden flex flex-col">
        <div className="z-10 flex flex-row items-center px-4 pt-4 pb-2 text-primary-foreground bg-primary lg:flex-col gap-y-2 gap-x-8 lg:gap-x-0 lg:items-baseline lg:absolute lg:top-0 lg:left-0 lg:right-0">
          {isError ? (
            <h1>{t("server_error")}</h1>
          ) : (
            <>
              {organizationData ? (
                <>
                  <h1 className="text-xl font-bold lg:text-2xl xl:text-3xl whitespace-nowrap">
                    {organizationData.name ?? "-"}
                  </h1>
                  <p className="hidden text-sm md:text-base sm:block">
                    {(organizationData.description ?? "-") +
                      t("address_label") +
                      " " +
                      (organizationData.contactAddress ?? "-")}
                  </p>
                  <p className="text-sm md:text-base">
                    {t("phone_number_label") +
                      " " +
                      (organizationData.contactPhone ?? "-")}
                  </p>
                </>
              ) : (
                <>
                  <Skeleton className="h-[30px] w-[500px] bg-primary-foreground/20" />
                  <Skeleton className="h-[20px] w-3/4 hidden sm:block bg-primary-foreground/20" />
                  <Skeleton className="h-[20px] w-[200px] bg-primary-foreground/20" />
                </>
              )}
            </>
          )}
        </div>
        <div className="flex-1 min-h-0">
          {import.meta.env.VITE_ALIAS === izmteploTag && <PaymentGif />}
          {import.meta.env.VITE_ALIAS === izmvkTag && <ViberBotRefs />}
          {import.meta.env.VITE_ALIAS === belvkTag && <BelvkContent />}
          {import.meta.env.VITE_ALIAS === rozdilnaTag && <RozdilnaContent />}

        </div>
      </div>

      <div className="w-full lg:w-1/2 h-full flex items-center justify-center relative mb-2 lg:mb-0 min-h-[500px]">
        <div className="absolute flex flex-row items-center top-4 right-4">
          <LocaleButton isLabel={true} />

          <Button
            className="hidden lg:block"
            variant="ghost"
            onClick={handleRegistrationPage}
          >
            {t("register_button")}
          </Button>
        </div>

        <LoginForm />
      </div>
    </div>
  );
};

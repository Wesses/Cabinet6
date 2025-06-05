import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useMemo, useState } from "react";
import {
  ArchiveItemT,
  getAbonentCardT,
  OplataItemT,
  ServicesValuesT,
  TabsNamesT,
} from "@/types";
import { getAbonentCardData, getArchivData, getOplataData } from "@/api/api";
import { useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import InvoiceDataTab from "@/components/custom-components/InvoiceServicesTabs/InvoiceDataTab";
import WaterSupplyTab from "@/components/custom-components/InvoiceServicesTabs/WaterSupplyTab";
import WaterSupplyAbplPodachaTab from "@/components/custom-components/InvoiceServicesTabs/WaterSupplyAbplPodachaTab";
import WaterSupplyAbplStokiTab from "@/components/custom-components/InvoiceServicesTabs/WaterSupplyAbplStokiTab";
import { useSearchParams } from "react-router-dom";
import { CURRENT_PAGE_PARAM_KEY, SEARCH_PARAM_TAB_KEY, TabsNamesValues } from "@/utils/constants";
import { ArrowLeftToLine, Printer } from "lucide-react";
import { cn } from "@/lib/utils";
import ErrorBlock from "@/components/custom-components/ErrorBlock";
import { useTranslation } from "react-i18next";
import RentDataTab from "@/components/custom-components/InvoiceServicesTabs/RentDataTab";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import PrintInvoiceForm from "@/components/custom-components/PrintInvoiceForm";

const CabinetPage = () => {
  const [abonentCardData, setAbonentCardData] =
    useState<getAbonentCardT | null>(null);
  const [archivData, setArchivData] = useState<ArchiveItemT[]>([]);
  const [rentOplataData, setRentOplata] = useState<OplataItemT[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setIsError(false);
    if (!searchParams.has(SEARCH_PARAM_TAB_KEY)) {
      setSearchParams({ [SEARCH_PARAM_TAB_KEY]: TabsNamesT.Invoice_data });
    }

    if (id) {
      setIsLoading(true);
      (async () => {
        try {
          const [abonentCardPromiseData, archivPromiseData, oplataPromiseData] =
            await Promise.all([
              getAbonentCardData(+id),
              getArchivData(+id),
              getOplataData(+id),
            ]);
          setAbonentCardData(abonentCardPromiseData);
          setArchivData(archivPromiseData);
          setRentOplata(oplataPromiseData);
        } catch {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, []);

  const isWaterSupply = useMemo(
    () =>
      abonentCardData
        ? abonentCardData.services.includes(ServicesValuesT.water) &&
          Boolean(abonentCardData?.voda?.vodaPodacha ||
            abonentCardData?.voda?.vodaStoki ||
            abonentCardData?.voda?.vodaPoliv)
        : false,
    [abonentCardData]
  );

  const isWaterSupplyFee = useMemo(
    () =>
      isWaterSupply && abonentCardData?.vodaAbplPodacha.vodaAbplPodacha === 1,
    [abonentCardData]
  );

  const isWaterSupplyDrainage = useMemo(
    () => isWaterSupply && abonentCardData?.vodaAbplStoki.vodaAbplStoki === 1,
    [abonentCardData]
  );

  const isRentData = useMemo(
    () =>
      abonentCardData ? abonentCardData.services.includes(ServicesValuesT.rent) : false,
    [abonentCardData]
  );

  const handlSetSearchParams = (value: string) => {
    if (searchParams.get(SEARCH_PARAM_TAB_KEY) === value) return;

    setSearchParams({ [SEARCH_PARAM_TAB_KEY]: value });
  };

  const tabListParams = [
    {
      value: TabsNamesT.Invoice_data,
      label: t("invoice"),
      condition: true,
      tab_component: (
        <InvoiceDataTab abonentInvoiceData={{ ...abonentCardData }} />
      ),
    },
    {
      value: TabsNamesT.Water_supply,
      label: t("water_supply"),
      condition: isWaterSupply,
      tab_component: (
        <WaterSupplyTab
          waterSupplyData={abonentCardData?.voda}
          archivData={archivData}
          rentOplataData={rentOplataData}
        />
      ),
    },

    {
      value: TabsNamesT.Water_supply_fee,
      label: t("water_supply_subscription_fee"),
      condition: isWaterSupplyFee,
      tab_component: (
        <WaterSupplyAbplPodachaTab
          waterSupplyAbplPodachaRowData={{
            ...abonentCardData?.vodaAbplPodacha,
          }}
          archivData={archivData}
          rentOplataData={rentOplataData}
        />
      ),
    },

    {
      value: TabsNamesT.Water_supply_drainage,
      label: t("subscription_fee_for_water_disposal"),
      condition: isWaterSupplyDrainage,
      tab_component: (
        <WaterSupplyAbplStokiTab
          waterSupplyAbplStokiRowData={{
            ...abonentCardData?.vodaAbplStoki,
          }}
          archivData={archivData}
          rentOplataData={rentOplataData}
        />
      ),
    },
    {
      value: TabsNamesT.Rent_data,
      label: t("rent"),
      condition: isRentData,
      tab_component: (
        <RentDataTab
          rentOplataData={rentOplataData}
          kvartplata={abonentCardData?.kvartplata}
          archivData={archivData}
        />
      ),
    },
  ];

  const getCurrentTabsServices = (tabListParams: {
    value: TabsNamesT;
    label: string;
    condition: boolean;
    tab_component: JSX.Element;
}[]) => {
  const allSrvices = tabListParams.filter(({condition}) => condition).map(({ value }) => TabsNamesValues[value])
  const existingUniqueServices = [...new Set(allSrvices)];

  return existingUniqueServices;
};

  const hadnleBackToCabinet = () => {
    navigate(`/cabinet?${CURRENT_PAGE_PARAM_KEY}=1`);
  };

  const isContent = !isLoading && !isError;

  return (
    <div className="px-5 py-2 flex-1 h-full w-full">
      <div
        className={cn(
          {
            "xl:w-3/4 w-full md:max-w-fit max-w-none": isContent,
            "items-center h-full w-full": isError,
          },
          "flex flex-col gap-y-2 h-fit"
        )}
      >
        <div className="flex items-center justify-start gap-x-2 w-full">
          <Button
            className="bg-gray-300 hover:bg-gray-500 text-zinc-900 transition-all duration-300 rounded-md h-8"
            onClick={hadnleBackToCabinet}
          >
            <div className="flex w-full justify-start items-center gap-x-2">
              <ArrowLeftToLine />
              <p className="sm:block hidden">{t("back_to_list")}</p>
            </div>
          </Button>

          {isLoading && (
            <Skeleton className="h-8 bg-slate-300 sm:w-[153px] w-[56px]" />
          )}

          <AlertDialog
            open={open}
            onOpenChange={(isOpen) => {
              setOpen(isOpen);
            }}
          >
            <AlertDialogTrigger asChild>
              <Button
                className={cn("h-8 hidden", {
                  "flex items-center justify-center": isContent,
                })}
              >
                <div className="flex w-full justify-start items-center gap-x-2">
                  <Printer />
                  <p className="sm:block hidden">{t("print_account")}</p>
                </div>
              </Button>
            </AlertDialogTrigger>
            <PrintInvoiceForm onClose={() => setOpen(false)} open={open} currentServices={getCurrentTabsServices(tabListParams)} />
          </AlertDialog>
        </div>

        {isLoading && (
          <div className="w-full h-full">
            <Skeleton className="w-full md:w-3/4 lg:w-1/2 h-[40px] mb-2 bg-slate-300" />
            <Skeleton className="w-full md:w-3/4 lg:w-1/2 h-[300px] mb-2 bg-slate-300" />
            <Skeleton className="w-full md:w-3/4 lg:w-1/2 h-[100px] bg-slate-300" />
          </div>
        )}

        {isError && <ErrorBlock />}

        {isContent && (
          <Tabs
            className="w-full md:min-w-[700px] h-full"
            value={
              searchParams.get(SEARCH_PARAM_TAB_KEY) || TabsNamesT.Invoice_data
            }
          >
            <TabsList className="w-full flex justify-start sticky top-[88px] z-10 overflow-x-auto whitespace-nowrap max-w-fit">
              {tabListParams.map(({ value, label, condition }) =>
                condition ? (
                  <TabsTrigger
                    key={value}
                    value={value}
                    onClick={() => handlSetSearchParams(value)}
                  >
                    {label}
                  </TabsTrigger>
                ) : null
              )}
            </TabsList>

            {tabListParams.map(({ value, condition, tab_component }) =>
              condition ? (
                <TabsContent key={value} value={value}>
                  {tab_component}
                </TabsContent>
              ) : null
            )}
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default CabinetPage;

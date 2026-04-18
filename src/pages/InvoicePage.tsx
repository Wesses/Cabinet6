import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useMemo, useState } from "react";
import {
  ArchiveItemT,
  getAbonentCardT,
  OplataItemT,
  ServicesValuesT,
  TabsNamesT,
  WmShowDataT,
} from "@/types";
import {
  getAbonentCardData,
  getArchivData,
  getOplataData,
  getWMShowData,
} from "@/api/api";
import { useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import InvoiceDataTab from "@/components/custom-components/InvoiceServicesTabs/InvoiceDataTab";
import WaterSupplyTab from "@/components/custom-components/InvoiceServicesTabs/WaterSupplyTab";
import WaterSupplyAbplPodachaTab from "@/components/custom-components/InvoiceServicesTabs/WaterSupplyAbplPodachaTab";
import WaterSupplyAbplStokiTab from "@/components/custom-components/InvoiceServicesTabs/WaterSupplyAbplStokiTab";
import { useSearchParams } from "react-router-dom";
import {
  CURRENT_PAGE_PARAM_KEY,
  izmteploTag,
  SEARCH_PARAM_TAB_KEY,
  TabsNamesValues,
} from "@/utils/constants";
import { ArrowLeftToLine, Printer } from "lucide-react";
import { cn } from "@/lib/utils";
import ErrorBlock from "@/components/custom-components/ErrorBlock";
import { useTranslation } from "react-i18next";
import RentDataTab from "@/components/custom-components/InvoiceServicesTabs/RentDataTab";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import PrintInvoiceForm from "@/components/custom-components/PrintInvoiceForm";
import HeatingSupplyTab from "@/components/custom-components/InvoiceServicesTabs/HeatingSupplyTab";
import HeatingSupplyAbplOtopTab from "@/components/custom-components/InvoiceServicesTabs/HeatingSupplyAbplOtopTab";

const CabinetPage = () => {
  const [abonentCardData, setAbonentCardData] =
    useState<getAbonentCardT | null>(null);
  const [archivData, setArchivData] = useState<ArchiveItemT[]>([]);
  const [rentOplataData, setRentOplata] = useState<OplataItemT[]>([]);
  const [wmShowData, setWmShowData] = useState<WmShowDataT[]>([]);
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
            
          if (abonentCardPromiseData?.voda?.vodaAbSchetchikiKolvo || abonentCardPromiseData?.teploOtop?.teploschetId) {
            const wMShowData = await getWMShowData(+id);

            setWmShowData(wMShowData);
            
          }

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
      !!abonentCardData?.services?.includes(ServicesValuesT.water) &&
      Boolean(
        abonentCardData?.voda?.vodaPodacha ||
        abonentCardData?.voda?.vodaStoki ||
        abonentCardData?.voda?.vodaPoliv,
      ),
    [abonentCardData],
  );

  const isWaterSupplyFee = useMemo(
    () =>
      isWaterSupply && abonentCardData?.vodaAbplPodacha?.vodaAbplPodacha === 1,
    [abonentCardData],
  );

  const isWaterSupplyDrainage = useMemo(
    () => isWaterSupply && abonentCardData?.vodaAbplStoki?.vodaAbplStoki === 1,
    [abonentCardData],
  );

  const isHeatingSupply = useMemo(
    () =>
      !!abonentCardData?.services?.includes(ServicesValuesT.heating) &&
      !!abonentCardData?.teploOtop,
    [abonentCardData],
  );

    const isHeatingSupplySubscribtionFee = useMemo(
    () =>
      !!abonentCardData?.services?.includes(ServicesValuesT.heating) &&
      !!abonentCardData?.otopAbpl,
    [abonentCardData],
  );

  const isRentData = useMemo(
    () =>
      !!abonentCardData?.services?.includes(ServicesValuesT.rent) &&
      !!abonentCardData?.kvartplata,
    [abonentCardData],
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
          wmShowData={wmShowData}
        />
      ),
    },

    {
      value: TabsNamesT.Water_supply_fee,
      label: t("water_supply_subscription_fee"),
      condition: isWaterSupplyFee,
      tab_component: (
        <WaterSupplyAbplPodachaTab
          waterSupplyAbplPodachaRowData={abonentCardData?.vodaAbplPodacha ?? {}}
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
      value: TabsNamesT.Heating_supply,
      label: t("heating_supply"),
      condition: isHeatingSupply,
      tab_component: (
        <HeatingSupplyTab
          tableData={abonentCardData?.teploOtop}
          archivData={archivData}
          rentOplataData={rentOplataData}
          wmShowData={wmShowData}
        />
      ),
    },

    {
      value: TabsNamesT.Heating_supply_subscription_fee,
      label: t("heating_subscription_fee"),
      condition: isHeatingSupplySubscribtionFee,
      tab_component: (
        <HeatingSupplyAbplOtopTab
          HeatingSupplyAbplOtop={{
            ...abonentCardData?.otopAbpl,
          }}
          archivData={archivData}
          rentOplataData={rentOplataData}
        />
      ),
    },

    {
      value: TabsNamesT.Rent_data,
      label: import.meta.env.VITE_ALIAS === izmteploTag ? t("ovds") : t("rent"),
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

  const getCurrentTabsServices = (
    tabListParams: {
      value: TabsNamesT;
      label: string;
      condition: boolean;
      tab_component: JSX.Element;
    }[],
  ) => {
    const allSrvices = tabListParams
      .filter(({ condition }) => condition)
      .map(({ value }) => TabsNamesValues[value]);
    const existingUniqueServices = [...new Set(allSrvices)];

    return existingUniqueServices;
  };

  const hadnleBackToCabinet = () => {
    navigate(`/cabinet?${CURRENT_PAGE_PARAM_KEY}=1`);
  };

  const isContent = !isLoading && !isError;

  return (
    <div className="flex-1 w-full h-full px-5 py-2">
      <div
        className={cn(
          {
            "xl:w-3/4 w-full md:max-w-fit max-w-none": isContent,
            "items-center h-full w-full": isError,
          },
          "flex flex-col gap-y-2 h-fit",
        )}
      >
        <div className="flex items-center justify-start w-full gap-x-2">
          <Button
            className="h-8 transition-all duration-300 bg-gray-300 rounded-md hover:bg-gray-500 text-zinc-900"
            onClick={hadnleBackToCabinet}
          >
            <div className="flex items-center justify-start w-full gap-x-2">
              <ArrowLeftToLine />
              <p className="hidden sm:block">{t("back_to_list")}</p>
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
                <div className="flex items-center justify-start w-full gap-x-2">
                  <Printer />
                  <p className="hidden sm:block">{t("print_account")}</p>
                </div>
              </Button>
            </AlertDialogTrigger>
            <PrintInvoiceForm
              onClose={() => setOpen(false)}
              open={open}
              currentServices={getCurrentTabsServices(tabListParams)}
            />
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
            <TabsList className="w-full flex justify-start sticky top-[108px] z-10 overflow-x-auto whitespace-nowrap max-w-fit">
              {tabListParams.map(({ value, label, condition }) =>
                condition ? (
                  <TabsTrigger
                    key={value}
                    value={value}
                    onClick={() => handlSetSearchParams(value)}
                  >
                    {label}
                  </TabsTrigger>
                ) : null,
              )}
            </TabsList>

            {tabListParams.map(({ value, condition, tab_component }) =>
              condition ? (
                <TabsContent key={value} value={value}>
                  {tab_component}
                </TabsContent>
              ) : null,
            )}
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default CabinetPage;

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Fragment, useEffect, useMemo, useState } from "react";
import { getAbonentCardT, TabsNamesT } from "@/types";
import { getAbonentCardData } from "@/api/api";
import { useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import InvoiceDataTab from "@/components/custom-components/InvoiceServicesTabs/InvoiceDataTab";
import WaterSupplyTab from "@/components/custom-components/InvoiceServicesTabs/WaterSupplyTab";
import { onMainPage } from "@/utils/onMainPage";
import WaterSupplyAbplPodachaTab from "@/components/custom-components/InvoiceServicesTabs/WaterSupplyAbplPodachaTab";
import WaterSupplyAbplStokiTab from "@/components/custom-components/InvoiceServicesTabs/WaterSupplyAbplStokiTab";
import { useSearchParams } from "react-router-dom";
import { CURRENT_PAGE_PARAM_KEY } from "@/utils/constants";
import { ArrowLeftToLine } from "lucide-react";
import { cn } from '@/lib/utils';

const SEARCH_PARAM_TAB_KEY = "tab";

const CabinetPage = () => {
  const [abonentCardData, setAbonentCardData] =
    useState<getAbonentCardT | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    setIsError(false);
    if (!searchParams.get(SEARCH_PARAM_TAB_KEY)) {
      setSearchParams({ [SEARCH_PARAM_TAB_KEY]: TabsNamesT.Invoice_data });
    }

    if (id) {
      setIsLoading(true);
      getAbonentCardData(+id)
        .then(setAbonentCardData)
        .catch(() => {
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  const isWaterSupply = useMemo(
    () => (abonentCardData ? abonentCardData.services.includes("ВОДА") : false),
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

  const handlSetSearchParams = (value: string) => {
    setSearchParams({ [SEARCH_PARAM_TAB_KEY]: value });
  };

  const tabListParams = useMemo(
    () => [
      {
        value: TabsNamesT.Invoice_data,
        label: "Особовий рахунок",
        condition: true,
        tab_component: (
          <InvoiceDataTab abonentInvoiceData={{ ...abonentCardData }} />
        ),
      },
      {
        value: TabsNamesT.Water_supply,
        label: "Водопостачання",
        condition: isWaterSupply,
        tab_component: (
          <WaterSupplyTab
            waterSupplyData={abonentCardData?.voda}
          />
        ),
      },

      {
        value: TabsNamesT.Water_supply_fee,
        label: "Абон.плата по водопостачанню",
        condition: isWaterSupplyFee,
        tab_component: (
          <WaterSupplyAbplPodachaTab
            waterSupplyAbplPodachaRowData={{
              ...abonentCardData?.vodaAbplPodacha,
            }}
          />
        ),
      },

      {
        value: TabsNamesT.Water_supply_drainage,
        label: "Абон.плата по водовідведенню",
        condition: isWaterSupplyDrainage,
        tab_component: (
          <WaterSupplyAbplStokiTab
            waterSupplyAbplStokiRowData={{
              ...abonentCardData?.vodaAbplStoki,
            }}
          />
        ),
      },
    ],
    [abonentCardData, isWaterSupply, isWaterSupplyFee, isWaterSupplyDrainage]
  );

  const hadnleBackToCabinet = () => {
    navigate(`/cabinet?${CURRENT_PAGE_PARAM_KEY}=1`);
  };

  const isContent = !isLoading && !isError;

  return (
    <div className="px-5 py-2 flex-1 h-full w-full">
      {isLoading && (
        <div className="w-full h-full">
          <Skeleton className="w-1/6 h-8 min-w-[200px] mb-2 bg-slate-300" />
          <Skeleton className="md:w-1/2 w-full h-[40px] mb-2 bg-slate-300" />
          <Skeleton className="md:w-1/2 w-full h-5/6 bg-slate-300" />
        </div>
      )}

      <div className={cn({"md:w-1/2 md:min-w-[700px]": isContent,
        "items-center h-full": isError,
      }, "flex flex-col gap-y-1 w-full")}>
        <Button
          className="bg-gray-300 hover:bg-gray-500  text-zinc-900 transition-all duration-300 rounded-md h-8 w-1/3 min-w-[200px]"
          onClick={hadnleBackToCabinet}
        >
          <div className="flex w-auto justify-center items-center gap-x-2">
            <ArrowLeftToLine />
            <p>Повернутися до списку</p>
          </div>
        </Button>

        {isError && (
          <div className="flex flex-col gap-1 justify-center items-center w-full h-full">
            <h1>Сталася попилка оновіть сторінку</h1>
            <div className="flex flex-row gap-2">
              <Button onClick={() => window.location.reload()}>Оновити</Button>
              <Button onClick={onMainPage}>На головну</Button>
            </div>
          </div>
        )}

        {isContent && (
          <Tabs
            className="w-full md:min-w-[700px] h-full"
            value={
              searchParams.get(SEARCH_PARAM_TAB_KEY) || TabsNamesT.Invoice_data
            }
          >
            <TabsList className="w-full flex justify-start sticky sm:top-24 top-32 z-10 overflow-x-auto whitespace-nowrap">
              {tabListParams.map(({ value, label, condition }) => (
                <Fragment key={value}>
                  {condition && (
                    <TabsTrigger
                      value={value}
                      onClick={() => handlSetSearchParams(value)}
                    >
                      {label}
                    </TabsTrigger>
                  )}
                </Fragment>
              ))}
            </TabsList>

            {tabListParams.map(({ value, condition, tab_component }) => (
              <Fragment key={value}>
                {condition && (
                  <TabsContent value={value}>{tab_component}</TabsContent>
                )}
              </Fragment>
            ))}
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default CabinetPage;

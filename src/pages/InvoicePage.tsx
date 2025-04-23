import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useMemo, useState } from "react";
import { getAbonentCardT, WaterSupplyDataT, TabsNamesT } from "@/types";
import { getAbonentCardData } from "@/api/api";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import InvoiceDataTab from "@/components/custom-components/InvoiceServicesTabs/InvoiceDataTab";
import WaterSupplyTab from "@/components/custom-components/InvoiceServicesTabs/WaterSupplyTab";
import { onMainPage } from "@/utils/onMainPage";
import WaterSupplyAbplPodachaTab from "@/components/custom-components/InvoiceServicesTabs/WaterSupplyAbplPodachaTab";
import WaterSupplyAbplStokiTab from "@/components/custom-components/InvoiceServicesTabs/WaterSupplyAbplStokiTab";
import { useSearchParams } from "react-router-dom";

const SEARCH_PARAM_TAB_KEY = "tab";

const getWaterSupplyData = (rowData: WaterSupplyDataT | undefined) => {
  const cookedData = [];
  if (!rowData) {
    return [];
  }

  if (rowData.vodaPodacha) {
    cookedData.push(
      [
        "Кількість побутових водомірів",
        rowData.vodaAbSchetchikiKolvo,
      ],
      ["Тариф на подачу води, (грн./м³)", rowData.tsenaPodacha]
    );
  }

  if (rowData.vodaStoki) {
    cookedData.push(["Тариф на водовідведення, (грн./м³)", rowData.tsenaStoki]);
  }

  if (rowData.vodaPoliv) {
    cookedData.push(
      ["Кількість водомірів на полив", rowData.polivSchetchikiKolvo],
      ["Площа поливу в (м²)", rowData.ploshadPolivaM2],
      ["Тариф на полив, (грн./м³)", rowData.tsenaPoliv]
    );
  }

  return cookedData;
};

const CabinetPage = () => {
  const [abonentCardData, setAbonentCardData] =
    useState<getAbonentCardT | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

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
          <InvoiceDataTab abonentInvoiceInfo={{ ...abonentCardData }} />
        ),
      },
      {
        value: TabsNamesT.Water_supply,
        label: "Водопостачання",
        condition: isWaterSupply,
        tab_component: (
          <WaterSupplyTab
            waterSupplyData={getWaterSupplyData(abonentCardData?.voda)}
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

  return (
    <div className="px-5 py-3 flex-1 h-full w-full">
      {isLoading && (
        <div className="w-full h-full">
          <Skeleton className="md:w-1/2 w-full h-[40px] mb-2 bg-slate-300" />
          <Skeleton className="md:w-1/2 w-full h-5/6 bg-slate-300" />
        </div>
      )}

      {isError && (
        <div className="flex flex-col gap-1 justify-center items-center w-full h-full">
          <h1>Сталася попилка оновіть сторінку</h1>
          <div className="flex flex-row gap-2">
            <Button onClick={() => window.location.reload()}>Оновити</Button>
            <Button onClick={onMainPage}>На головну</Button>
          </div>
        </div>
      )}

      {!isLoading && !isError && (
        <Tabs
          className="md:w-1/2 w-full md:min-w-[700px] h-full"
          value={searchParams.get(SEARCH_PARAM_TAB_KEY) || TabsNamesT.Invoice_data}
        >
          <TabsList className="w-full flex justify-start sticky sm:top-24 top-32 z-10 overflow-x-auto whitespace-nowrap">
            {tabListParams.map(({ value, label, condition }) => (
              <>
                {condition && (
                  <TabsTrigger
                    value={value}
                    onClick={() => handlSetSearchParams(value)}
                  >
                    {label}
                  </TabsTrigger>
                )}
              </>
            ))}
          </TabsList>

          {tabListParams.map(({ value, condition, tab_component }) => (
            <>
              {condition && (
                <TabsContent value={value}>{tab_component}</TabsContent>
              )}
            </>
          ))}
        </Tabs>
      )}
    </div>
  );
};

export default CabinetPage;

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useMemo, useState } from "react";
import { getAbonentCardT, WaterSupplyDataT } from "@/types";
import { getAbonentCardData } from "@/api/api";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import InvoiceDataTab from "@/components/custom-components/InvoiceServicesTabs/InvoiceDataTab";
import WaterSupplyTab from "@/components/custom-components/InvoiceServicesTabs/WaterSupplyTab";
import { onMainPage } from "@/utils/onMainPage";
import WaterSupplyAbplPodachaTab from "@/components/custom-components/InvoiceServicesTabs/WaterSupplyAbplPodachaTab";
import WaterSupplyDrainageTab from "@/components/custom-components/InvoiceServicesTabs/WaterSupplyAbplStokiTab";

const getWaterSupplyData = (rowData: WaterSupplyDataT | undefined) => {
  const cookedData = [];
  if (!rowData) {
    return [];
  }

  if (rowData.vodaPodacha) {
    cookedData.push(
      ["Ціна на подачу води в грн./м³.", rowData.tsenaPodacha],
      [
        "Кількість водяних лічильників у абонента",
        rowData.vodaAbSchetchikiKolvo,
      ]
    );
  }

  if (rowData.vodaStoki) {
    cookedData.push(["Ціна на водні стоки в грн./м³.", rowData.tsenaStoki]);
  }

  if (rowData.vodaPoliv) {
    cookedData.push(
      ["Ціна на подачу води в м²", rowData.ploshadPolivaM2],
      ["Ціна за полив грн./м³.", rowData.tsenaPoliv],
      ["Кількість лічильників для поливу", rowData.polivSchetchikiKolvo]
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

  useEffect(() => {
    setIsError(false);

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
          defaultValue="invoice-data"
          className="md:w-1/2 w-full md:min-w-[700px] h-full"
        >
          <TabsList className="w-full flex justify-start sticky sm:top-24 top-32 z-10 overflow-x-auto whitespace-nowrap">
            <TabsTrigger value="invoice-data">Особовий рахунок</TabsTrigger>

            {isWaterSupply && (
              <TabsTrigger value="water-supply">Водопостачання</TabsTrigger>
            )}

            {isWaterSupplyFee && (
              <TabsTrigger value="water-supply-fee">
                Абон.плата по водопостачанню
              </TabsTrigger>
            )}

            {isWaterSupplyDrainage && (
              <TabsTrigger value="water-supply-drainage">
                Абон.плата по водовідведенню
              </TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="invoice-data">
            <InvoiceDataTab abonentInvoiceInfo={{ ...abonentCardData }} />
          </TabsContent>

          {isWaterSupply && (
            <TabsContent value="water-supply">
              <WaterSupplyTab
                waterSupplyData={getWaterSupplyData(abonentCardData?.voda)}
              />
            </TabsContent>
          )}

          {isWaterSupplyFee && (
            <TabsContent value="water-supply-fee">
              <WaterSupplyAbplPodachaTab waterSupplyAbplPodachaRowData={{...abonentCardData?.vodaAbplPodacha}}/>
            </TabsContent>
          )}

          {isWaterSupplyDrainage && (
            <TabsContent value="water-supply-drainage">
              <WaterSupplyDrainageTab waterSupplyAbplStokiRowData={{...abonentCardData?.vodaAbplStoki}}/>
            </TabsContent>
          )}
        </Tabs>
      )}
    </div>
  );
};

export default CabinetPage;

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useMemo, useState } from "react";
import { getAbonentCardT } from "@/types";
import { getAbonentCardData } from "@/api/api";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import InvoiceDataTab from "@/components/custom-components/InvoiceServicesTabs/InvoiceDataTab";
import WaterSupplyTab from "@/components/custom-components/InvoiceServicesTabs/WaterSupplyTab";
import { onMainPage } from "@/utils/onMainPage";

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
          <TabsList className="w-full flex justify-start sticky sm:top-24 top-32 z-10">
            <TabsTrigger value="invoice-data">Особовий рахунок</TabsTrigger>
            {isWaterSupply && (
              <TabsTrigger value="water-supply">Водопостачання</TabsTrigger>
            )}
            <TabsTrigger value="water-supply-fee">Абон.плата по водопостачанню</TabsTrigger>
          </TabsList>
          <TabsContent value="invoice-data">
            <InvoiceDataTab abonentInvoiceInfo={{ ...abonentCardData }} />
          </TabsContent>
          {isWaterSupply && (
            <TabsContent value="water-supply">
              <WaterSupplyTab waterSupplyData={{ ...abonentCardData?.voda }} />
            </TabsContent>
          )}
        </Tabs>
      )}
    </div>
  );
};

export default CabinetPage;

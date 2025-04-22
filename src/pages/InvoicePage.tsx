import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { getAbonentCardT } from "@/types";
import { getAbonentCardData } from "@/api/api";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import InvoiceDataTab from "@/components/custom-components/InvoiceServices/InvoiceDataTab";
import WaterSupplyTab from "@/components/custom-components/InvoiceServices/WaterSupplyTab";
import { onMainPage } from '@/utils/onMainPage';

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
            <Button
              onClick={onMainPage}
            >
              На головну
            </Button>
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
            <TabsTrigger value="water-supply">Водопостачання</TabsTrigger>
          </TabsList>
          <TabsContent value="invoice-data">
            <InvoiceDataTab abonentInvoiceInfo={{ ...abonentCardData }} />
          </TabsContent>
          <TabsContent value="water-supply">
            <WaterSupplyTab waterSupplyData={{ ...abonentCardData?.voda }} />
          </TabsContent>
          {/* <TabsContent value="vodaAbplPodacha">
            <Card>
              <CardContent className="p-4">
                <h2 className="text-2xl font-semibold mb-4">
                  Данні по vodaAbplPodacha
                </h2>
                <div className="overflow-auto w-full">
                  <Table className="min-w-[700px] border border-muted rounded-xl">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-base font-semibold">
                          Поле
                        </TableHead>
                        <TableHead className="text-base font-semibold">
                          Значення
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(data.vodaAbplPodacha).map(
                        ([key, value]) => {
                          if (Array.isArray(value)) return null;
                          return (
                            <TableRow key={key}>
                              <TableCell className="font-medium">
                                {key}
                              </TableCell>
                              <TableCell>{value?.toString()}</TableCell>
                            </TableRow>
                          );
                        }
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent> */}
          {/* <TabsContent value="vodaAbplStoki">
            <Card>
              <CardContent className="p-4">
                <h2 className="text-2xl font-semibold mb-4">
                  Данні по vodaAbplStoki
                </h2>
                <div className="overflow-auto w-full">
                  <Table className="min-w-[700px] border border-muted rounded-xl">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-base font-semibold">
                          Поле
                        </TableHead>
                        <TableHead className="text-base font-semibold">
                          Значення
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(data.vodaAbplStoki).map(
                        ([key, value]) => {
                          if (Array.isArray(value)) return null;
                          return (
                            <TableRow key={key}>
                              <TableCell className="font-medium">
                                {key}
                              </TableCell>
                              <TableCell>{value?.toString()}</TableCell>
                            </TableRow>
                          );
                        }
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent> */}
          {/* <TabsContent value="kvartplata">
            <Card>
              <CardContent className="p-4">
                <h2 className="text-2xl font-semibold mb-4">
                  Данні по квартплаті
                </h2>
                <div className="overflow-auto w-full">
                  <Table className="min-w-[700px] border border-muted rounded-xl">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-base font-semibold">
                          Поле
                        </TableHead>
                        <TableHead className="text-base font-semibold">
                          Значення
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(data.kvartplata).map(([key, value]) => {
                        if (Array.isArray(value)) return null;
                        return (
                          <TableRow key={key}>
                            <TableCell className="font-medium">{key}</TableCell>
                            <TableCell>{value?.toString()}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent> */}
        </Tabs>
      )}
    </div>
  );
};

export default CabinetPage;

import { ArchiveItemT, WaterSupplyDataT } from "@/types";
import SimpleTable from "../SimpleTable";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { getArchivData } from "@/api/api";
import { useParams } from "react-router";
import ErrorBlock from "../ErrorBlock";
import Spinner from "../Spinner";

const getWaterSupplyData = (rowData: WaterSupplyDataT | undefined) => {
  const cookedData = [];
  if (!rowData) {
    return [];
  }

  if (rowData.vodaPodacha) {
    cookedData.push(
      ["Кількість побутових водомірів", rowData.vodaAbSchetchikiKolvo],
      ["Тариф на подачу води (грн./м³)", rowData.tsenaPodacha]
    );
  }

  if (rowData.vodaStoki) {
    cookedData.push(["Тариф на водовідведення (грн./м³)", rowData.tsenaStoki]);
  }

  if (rowData.vodaPoliv) {
    cookedData.push(
      ["Кількість водомірів на полив", rowData.polivSchetchikiKolvo],
      ["Площа поливу (м²)", rowData.ploshadPolivaM2],
      ["Тариф на полив (грн./м³)", rowData.tsenaPoliv]
    );
  }

  return cookedData;
};

const getFiltredArchiveData = (archiveRowData: ArchiveItemT[]) => {
  return archiveRowData.map((item) => [
    ["Дата", item.saldoNVoda],
    ["Борг на початок нарахування", item.nachislVoda],
    ["Повернення(перерахунок)", item.vozvratVoda],
    ["Оплата", item.oplataVoda],
    ["Субсидія(пільги)", item.subsVoda],
    ["Борг на кінець", item.saldoKVoda],
  ]);
};

type Props = {
  waterSupplyData: WaterSupplyDataT | undefined;
};

function WaterSupplyTab({ waterSupplyData }: Props) {
  const [archivData, setArchivData] = useState<ArchiveItemT[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setIsError(false);

    if (id) {
      setIsLoading(true);
      getArchivData(+id)
        .then(setArchivData)
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    }
  }, []);

  const isContent = !isError && !isLoading;
  return (
    <div className="flex flex-col gap-y-2">
      <SimpleTable data={getWaterSupplyData(waterSupplyData)} />

      <Accordion
        type="single"
        collapsible
        className="p-4 border border-muted rounded-xl"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Розрахунки</AccordionTrigger>
          <AccordionContent>
          {isError && <ErrorBlock />}
          {isLoading && <Spinner />}
          {isContent && (
            
              getFiltredArchiveData(archivData).map((tableData) => (
                <SimpleTable data={tableData} />
              ))
            
          )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default WaterSupplyTab;

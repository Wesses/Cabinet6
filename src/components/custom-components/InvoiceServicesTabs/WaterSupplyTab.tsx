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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

const tableHeads = [
  "Дата",
  "Залишок за нарахуванням за водопостачання",
  "Борг на початок нарахування",
  "Повернення(перерахунок)",
  "Оплата",
  "Субсидія(пільги)",
  "Борг на кінець",
];

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

  
  const isContent = !isError && !isLoading && archivData.length;
  const isntContent = !isError && !isLoading && !archivData.length;

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
            {isntContent && (
              <p className="text-black py-2 px-4 text-[40px] font-semibold">
                Немає розрахунків
              </p>
            )}
            {isContent && (
              <Table>
                <TableCaption>Список ваших розрахунків</TableCaption>
                <TableHeader>
                  <TableRow>
                    {tableHeads.map(elem => (
                      <TableHead key={elem}>{elem}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {archivData.map(row => (
                    <TableRow key={row.idx}>
                        <TableCell className="font-medium text-center">{row.mes}</TableCell>
                        <TableCell className="font-medium text-left">{row.saldoNVoda}</TableCell>
                        <TableCell className="font-medium text-left">{row.nachislVoda}</TableCell>
                        <TableCell className="font-medium text-center">{row.vozvratVoda}</TableCell>
                        <TableCell className="font-medium text-center">{row.oplataVoda}</TableCell>
                        <TableCell className="font-medium text-center">{row.subsVoda}</TableCell>
                        <TableCell className="font-medium text-left">{row.saldoKVoda}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default WaterSupplyTab;

import { Card, CardContent } from "@/components/ui/card";
import { WaterSupplyDataT } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Props = {
  waterSupplyData: WaterSupplyDataT;
};

function WaterSupplyTab({ waterSupplyData }: Props) {
  const accordionValues = [
    {
      label: "Подача води",
      value: waterSupplyData.vodaPodacha,
      key: "vodaPodacha",
      data: [
        ["Ціна на подачу води в грн./м³.", waterSupplyData.tsenaPodacha],
        [
          "Кількість водяних лічильників у абонента",
          waterSupplyData.vodaAbSchetchikiKolvo,
        ],
      ],
    },

    {
      label: "Обсяг стічних вод",
      value: waterSupplyData.vodaStoki,
      key: "vodaStoki",
      data: [
        ["Ціна на водні стоки в грн./м³.", waterSupplyData.tsenaStoki],
      ],
    },
    {
      label: "Вода на полив",
      value: waterSupplyData.vodaPoliv,
      key: "vodaPoliv",
      data: [
        ["Ціна на подачу води в м²", waterSupplyData.ploshadPolivaM2],
        [
          "Ціна за полив грн./м³.",
          waterSupplyData.tsenaPoliv,
        ],
        ["Кількість лічильників для поливу", waterSupplyData.polivSchetchikiKolvo]
      ],
    },
  ];
console.log(accordionValues);

  return (
    <div>
      <Card>
        <CardContent className="p-4">
          <h2 className="md:text-2xl text-xl font-semibold mb-4">Водопостачання</h2>
          <div className="overflow-auto w-full">
            <Accordion type="multiple">
              {accordionValues.map(({label, value, key, data}) => (
                <AccordionItem value={key} >
                  <AccordionTrigger className="disabled:hover:no-underline">{label} {!value && "Відсутнє"}</AccordionTrigger>
                  <AccordionContent>{data}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default WaterSupplyTab;

{
  /* <div>
<Card>
  <CardContent className="p-4">
    <h2 className="text-2xl font-semibold mb-4">Данні по воді</h2>
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
          {Object.entries(data.voda).map(([key, value]) => {
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

<Card>
  <CardContent className="p-4">
    <h2 className="text-xl font-semibold mb-4">Водомеры</h2>
    <div className="overflow-auto w-full">
      <Table className="min-w-[700px] border border-muted rounded-xl">
        <TableHeader>
          <TableRow>
            <TableHead className="text-base font-semibold">
              Індекс
            </TableHead>
            <TableHead className="text-base font-semibold">
              Номер лічильника
            </TableHead>
            <TableHead className="text-base font-semibold">
              Номер пломби
            </TableHead>
            <TableHead className="text-base font-semibold">
              Серійний номер
            </TableHead>
            <TableHead className="text-base font-semibold">
              Дата перевірки
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.voda.vodomerArray.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.idx}</TableCell>
              <TableCell>{item.vodaNSchetchika}</TableCell>
              <TableCell>{item.nomPlombi}</TableCell>
              <TableCell>{item.snSchet}</TableCell>
              <TableCell>
                {new Date(item.dataProvSchet).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </CardContent>
</Card>

<Card>
  <CardContent className="p-4">
    <h2 className="text-xl font-semibold mb-4">Счетчики полива</h2>
    <div className="overflow-auto w-full">
      <Table className="min-w-[700px] border border-muted rounded-xl">
        <TableHeader>
          <TableRow>
            <TableHead className="text-base font-semibold">
              Індекс
            </TableHead>
            <TableHead className="text-base font-semibold">
              Номер лічильника
            </TableHead>
            <TableHead className="text-base font-semibold">
              Номер пломби
            </TableHead>
            <TableHead className="text-base font-semibold">
              Серійний номер
            </TableHead>
            <TableHead className="text-base font-semibold">
              Дата перевірки
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.voda.polivVodomerArray.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.idx}</TableCell>
              <TableCell>{item.vodaNSchetchika}</TableCell>
              <TableCell>{item.nomPlombi}</TableCell>
              <TableCell>{item.snSchet}</TableCell>
              <TableCell>
                {new Date(item.dataProvSchet).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </CardContent>
</Card>
</div> */
}

import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

type Props = {
  waterSupplyData: (string | number | undefined)[][];
};

function WaterSupplyTab({ waterSupplyData }: Props) {

  return (
    <Card>
      <CardContent className="p-4">
        <div className="hidden md:block overflow-auto w-full">
          <Table className="border border-muted rounded-xl">
            <TableBody>
            {waterSupplyData.map(([label, value]) => (
              <TableRow key={label} className="text-base">
                <TableCell className="font-medium">{label}</TableCell>
                <TableCell>{value || "-"}</TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="md:hidden space-y-4">
          {waterSupplyData.map(([label, value]) => (
            <div
              key={label}
              className="border border-muted rounded-lg p-3 bg-white shadow-sm"
            >
              <p className="text-sm text-gray-500">{label}</p>
              <p className="text-base font-medium text-zinc-900">
                {value || "-"}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default WaterSupplyTab;
{/* <Card>
<CardContent className="p-4">
  <div className="overflow-auto w-full">
    <Accordion type="multiple">
      {accordionValues.map(({ label, value, key, data }) => (
        <AccordionItem value={key}>
          <AccordionTrigger className="w-full" disabled={!value}>
            <div className="flex justify-between w-full px-4 font-medium">
              <p className="hover:underline font-bold md:text-lg text-base">{label}</p>
              <p
                className={cn({
                  "text-red-500": !value,
                  "text-green-500": value,
                }, "md:text-base text-sm")}
              >
                {value ? "Розгорнути" : "Послуга відсутня"}
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Table className="border border-muted rounded-xl">
              <TableBody>
                {data.map(([label, value]) => (
                  <TableRow key={label} className="md:text-base text-sm flex justify-between">
                    <TableCell className="font-medium">
                      {label}
                    </TableCell>
                    <TableCell>{value || "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
</CardContent>
</Card>
</div> */}

// const accordionValues = [
//   {
//     label: "Подача води",
//     value: waterSupplyData.vodaPodacha,
//     key: "vodaPodacha",
//     data: [
//       ["Ціна на подачу води в грн./м³.", waterSupplyData.tsenaPodacha],
//       [
//         "Кількість водяних лічильників у абонента",
//         waterSupplyData.vodaAbSchetchikiKolvo,
//       ],
//     ],
//   },

//   {
//     label: "Обсяг стічних вод",
//     value: waterSupplyData.vodaStoki,
//     key: "vodaStoki",
//     data: [["Ціна на водні стоки в грн./м³.", waterSupplyData.tsenaStoki]],
//   },
//   {
//     label: "Вода на полив",
//     value: waterSupplyData.vodaPoliv,
//     key: "vodaPoliv",
//     data: [
//       ["Ціна на подачу води в м²", waterSupplyData.ploshadPolivaM2],
//       ["Ціна за полив грн./м³.", waterSupplyData.tsenaPoliv],
//       [
//         "Кількість лічильників для поливу",
//         waterSupplyData.polivSchetchikiKolvo,
//       ],
//     ],
//   },
// ];
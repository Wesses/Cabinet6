import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { AbonentInvoiceInfo } from "@/types";

type Props = {
  abonentInvoiceInfo: AbonentInvoiceInfo;
};

const InvoiceDataTab = ({ abonentInvoiceInfo }: Props) => {
  const gatheredData = [
    ["Особовий рахунок", abonentInvoiceInfo.ls],
    ["ФІО", abonentInvoiceInfo.fio],
    ["Адреса", abonentInvoiceInfo.addres],
    ["Номер телефону", abonentInvoiceInfo.telefon],
    ["Електронна пошта", abonentInvoiceInfo.email],
    ["Кількість мешканців", abonentInvoiceInfo.kolGil],
    ["Площа (м²)", abonentInvoiceInfo.ploshadM2],
  ];

  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="text-2xl font-semibold mb-4">
          Параметри особового рахунку
        </h2>
        <div className="hidden md:block overflow-auto w-full">
          <Table className="min-w-[700px] border border-muted rounded-xl">
            <TableBody>
            {gatheredData.map(([label, value]) => (
              <TableRow>
                <TableCell className="font-medium">{label}</TableCell>
                <TableCell>{value || "-"}</TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="md:hidden space-y-4">
          {gatheredData.map(([label, value]) => (
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
};

export default InvoiceDataTab;

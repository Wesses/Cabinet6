import { AbonentInvoiceInfoT } from "@/types";
import SimpleTable from '../SimpleTable';

type Props = {
  abonentInvoiceData: AbonentInvoiceInfoT;
};

const InvoiceDataTab = ({ abonentInvoiceData }: Props) => {
  const gatheredData = [
    ["Особовий рахунок", abonentInvoiceData.ls],
    ["ФІО", abonentInvoiceData.fio],
    ["Адреса", abonentInvoiceData.addres],
    ["Номер телефону", abonentInvoiceData.telefon],
    ["Електронна пошта", abonentInvoiceData.email],
    ["Кількість мешканців", abonentInvoiceData.kolGil],
    ["Площа (м²)", abonentInvoiceData.ploshadM2],
  ];

  return (
    <SimpleTable data={gatheredData} />
  );
};

export default InvoiceDataTab;

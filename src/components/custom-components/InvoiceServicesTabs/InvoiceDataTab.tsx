import { AbonentInvoiceInfoT } from "@/types";
import SimpleTable from '../SimpleTable';
import { useTranslation } from 'react-i18next';

type Props = {
  abonentInvoiceData: AbonentInvoiceInfoT;
};

const InvoiceDataTab = ({ abonentInvoiceData }: Props) => {
  const { t } = useTranslation();

  const gatheredData = [
    [t("invoice"), abonentInvoiceData.ls],
    [t("full_name"), abonentInvoiceData.fio],
    [t("address"), abonentInvoiceData.addres],
    [t("phone_number_label_2"), abonentInvoiceData.telefon],
    [t("form_email"), abonentInvoiceData.email],
    [t("inhabitants_number"), abonentInvoiceData.kolGil],
    [t("area_m2"), abonentInvoiceData.ploshadM2],
  ];

  return (
    <SimpleTable data={gatheredData} />
  );
};

export default InvoiceDataTab;

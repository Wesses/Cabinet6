import {
  ArchiveItemT,
  OplataItemT,
  TeploOtopT,
  AnySupplyRentEnum,
  OtopShowDataT,
  CertainFieldsHeatingSupplyEnum,
} from "@/types";
import SimpleTable from "../SimpleTable";
import { useTranslation } from "react-i18next";
import { formatYesNo } from "@/utils/formatYesNo";
import AccordionForTabs from "./AccordionForTabs";
import { getDataForTab } from "@/utils/getValidDataFunctions";
import { HEATING_SUPPLY_OTOP_TAG_VALUES } from "@/utils/constants";

enum HeatingSupplyArchiveEnum {
  mes = "mes",
  saldoNOtop = "saldoNVoda",
  nachislOtop = "nachislVoda",
  vozvratOtop = "vozvratVoda",
  oplataOtop = "oplataVoda",
  subsOtop = "subsVoda",
  saldoKOtop = "saldoKVoda",
}

type Props = {
  tableData: TeploOtopT | undefined;
  archivData: ArchiveItemT[];
  rentOplataData: OplataItemT[];
  otopShowData: OtopShowDataT[];
};

const HeatingSupplyTab = ({
  tableData,
  archivData,
  rentOplataData,
  otopShowData,
}: Props) => {
  const { t } = useTranslation();

  const refineTableData = tableData
    ? [
        ["Підключено до опалення", formatYesNo(tableData.otoplenie, t)],
        [
          "Нараховувати умовно-постійну частину (тех.обслугов.)",
          formatYesNo(tableData.otopObsluga, t),
        ],
        ["Опалювальна площа", tableData.ploshadOtopM2],
        [
          "Нараховувати за місця загального користування",
          formatYesNo(tableData.otopMop, t),
        ],
        ["Назва тарифу", tableData.nOtoplenieTarifa],
        ["Ціна гігакалорії", tableData.tsenaGigaKal],
        ["Вартість опалення за м² без лічильника", tableData.tarifOtopGrnM2],
        ["Вартість техобслуговування за м²", tableData.tarifObslugaGrnM2],
        ["Наявність теплолічильника", formatYesNo(tableData.teploschetId, t)],
        ["Назва теплолічильника", tableData.nTeploschet],
      ]
    : [];

  const accordionData = [
    {
      label: t("calculations"),
      accordValue: "archive",
      heads: [
        t("date"),
        t("begin_debt"),
        t("accrued"),
        t("return"),
        t("payment"),
        t("subsidy"),
        t("end_debt"),
      ],
      styles: ["font-bold text-center bg-gray-300"],
      data: getDataForTab<ArchiveItemT>(
        archivData,
        HeatingSupplyArchiveEnum,
        () => true,
      ),
    },
    {
      label: t("payment_no_uah"),
      accordValue: "oplata",
      heads: [t("date_of_rent"), t("rent_sum"), t("bank")],
      styles: ["font-bold text-center bg-gray-300"],
      data: getDataForTab<OplataItemT>(
        rentOplataData,
        AnySupplyRentEnum,
        ({ tag }) => HEATING_SUPPLY_OTOP_TAG_VALUES.includes(tag),
        [AnySupplyRentEnum.dataPerevoda],
      ),
    },
    {
      label: t("heat_meter_indications"),
      accordValue: "otopshow",
      heads: [
        t("period_start"),
        t("period_end"),
        t("meter_indications"),
        t("heat_volume"),
        t("heat_meter"),
      ],
      styles: ["font-bold text-center bg-gray-300", "capitalize"],
      data: getDataForTab<OtopShowDataT>(
        otopShowData,
        CertainFieldsHeatingSupplyEnum,
        () => true,
        [CertainFieldsHeatingSupplyEnum.dataKon, CertainFieldsHeatingSupplyEnum.dataNach],
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-y-2">
      <SimpleTable data={refineTableData} />

      <AccordionForTabs accordionData={accordionData} />
    </div>
  );
};

export default HeatingSupplyTab;

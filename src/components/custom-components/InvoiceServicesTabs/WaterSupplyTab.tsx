import {
  ArchiveItemT,
  OplataItemT,
  WaterSupplyDataT,
  WaterSupplyRentEnum,
  WmShowDataT,
} from "@/types";
import SimpleTable from "../SimpleTable";
import AccardionForWaterTabs from "./AccardionForWaterTabs";
import { useTranslation } from "react-i18next";
import { getDataForWaterTab } from "@/utils/getValidDataFunctions";
import { WATER_SUPPLY_TAG_VALUES } from "@/utils/constants";

enum WaterSupplyArchiveEnum {
  mes = "mes",
  saldoNVoda = "saldoNVoda",
  nachislVoda = "nachislVoda",
  vozvratVoda = "vozvratVoda",
  oplataVoda = "oplataVoda",
  subsVoda = "subsVoda",
  saldoKVoda = "saldoKVoda",
}

enum WaterSupplyWmShowEnum {
  data = "data",
  tipVm = "tipVm",
  vmPokaz = "vmPokaz",
  doc = "doc",
}

type Props = {
  waterSupplyData: WaterSupplyDataT | undefined;
  archivData: ArchiveItemT[];
  rentOplataData: OplataItemT[];
  wmShowData: WmShowDataT[];
};

function WaterSupplyTab({
  waterSupplyData,
  archivData,
  rentOplataData,
  wmShowData,
}: Props) {
  const { t } = useTranslation();

  const getWaterSupplyData = (rowData: WaterSupplyDataT | undefined) => {
    const cookedData = [];
    if (!rowData) {
      return [];
    }

    if (rowData.vodaPodacha) {
      cookedData.push(
        [t("vodaAbSchetchikiKolvo"), rowData.vodaAbSchetchikiKolvo],
        [t("tsenaPodacha"), rowData.tsenaPodacha]
      );
    }

    if (rowData.vodaStoki) {
      cookedData.push([t("tsenaStoki"), rowData.tsenaStoki]);
    }

    if (rowData.vodaPoliv) {
      cookedData.push(
        [t("polivSchetchikiKolvo"), rowData.polivSchetchikiKolvo],
        [t("ploshadPolivaM2"), rowData.ploshadPolivaM2],
        [t("tsenaPoliv"), rowData.tsenaPoliv]
      );
    }

    return cookedData;
  };

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
      data: getDataForWaterTab<ArchiveItemT>(
        archivData,
        WaterSupplyArchiveEnum,
        () => true
      ),
    },
    {
      label: t("payment_no_uah"),
      accordValue: "oplata",
      heads: [t("date_of_rent"), t("rent_sum"), t("bank")],
      styles: ["font-bold text-center bg-gray-300"],
      data: getDataForWaterTab<OplataItemT>(
        rentOplataData,
        WaterSupplyRentEnum,
        ({ tag }) => WATER_SUPPLY_TAG_VALUES.includes(tag),
        [WaterSupplyRentEnum.dataPerevoda]
      ),
    },
    {
      label: t("watermeters_count"),
      accordValue: "wmshow",
      heads: [t("indications_date"), t("watermeter_type"), t("indications"), t("description")],
      styles: ["font-bold text-center bg-gray-300", "capitalize"],
      data: getDataForWaterTab<WmShowDataT>(
        wmShowData,
        WaterSupplyWmShowEnum,
        () => true,
        [WaterSupplyWmShowEnum.data]
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-y-2">
      <SimpleTable data={getWaterSupplyData(waterSupplyData)} />

      <AccardionForWaterTabs accordionData={accordionData} />
    </div>
  );
}

export default WaterSupplyTab;

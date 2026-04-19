import {
  ArchiveItemT,
  OplataItemT,
  WaterSupplyDataT,
  AnySupplyRentEnum,
  WmShowDataT,
  AnySupplyWmShowEnum,
} from "@/types";
import SimpleTable from "../SimpleTable";
import AccordionForTabs from "./AccordionForTabs";
import { useTranslation } from "react-i18next";
import { getDataForTab } from "@/utils/getValidDataFunctions";
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
        [t("tsenaPodacha"), rowData.tsenaPodacha],
      );
    }

    if (rowData.vodaStoki) {
      cookedData.push([t("tsenaStoki"), rowData.tsenaStoki]);
    }

    if (rowData.vodaPoliv) {
      cookedData.push(
        [t("polivSchetchikiKolvo"), rowData.polivSchetchikiKolvo],
        [t("ploshadPolivaM2"), rowData.ploshadPolivaM2],
        [t("tsenaPoliv"), rowData.tsenaPoliv],
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
      styles: ["font-bold text-center bg-muted"],
      data: getDataForTab<ArchiveItemT>(
        archivData,
        WaterSupplyArchiveEnum,
        () => true,
      ),
    },
    {
      label: t("payment_no_uah"),
      accordValue: "oplata",
      heads: [t("date_of_rent"), t("rent_sum"), t("bank")],
      styles: ["font-bold text-center bg-muted"],
      data: getDataForTab<OplataItemT>(
        rentOplataData,
        AnySupplyRentEnum,
        ({ tag }) => WATER_SUPPLY_TAG_VALUES.includes(tag),
        [AnySupplyRentEnum.dataPerevoda],
      ),
    },
    {
      label: t("watermeters_indicators"),
      accordValue: "wmshow",
      heads: [
        t("indications_date"),
        t("watermeter_type"),
        t("indications"),
        t("description"),
      ],
      styles: ["font-bold text-center bg-muted", "capitalize"],
      data: getDataForTab<WmShowDataT>(
        wmShowData,
        AnySupplyWmShowEnum,
        () => true,
        [AnySupplyWmShowEnum.data],
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-y-2">
      <SimpleTable data={getWaterSupplyData(waterSupplyData)} />

      <AccordionForTabs accordionData={accordionData} />
    </div>
  );
}

export default WaterSupplyTab;

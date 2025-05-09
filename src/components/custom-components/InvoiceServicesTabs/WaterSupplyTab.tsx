import { ArchiveItemT, WaterSupplyDataT } from "@/types";
import SimpleTable from "../SimpleTable";
import AccardionForWaterTabs from "./AccardionForWaterTabs";
import { useTranslation } from "react-i18next";

enum WaterSupplyEnum {
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
};

function WaterSupplyTab({ waterSupplyData, archivData }: Props) {
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

  const tableStyles = [
    "font-bold text-center bg-gray-300",
    "font-medium text-right",
    "font-medium text-right",
    "font-medium text-right",
    "font-medium text-right",
    "font-medium text-right",
    "font-medium text-right",
  ];

  const tableHeads = [
    t("date"),
    t("begin_debt"),
    t("accrued"),
    t("return"),
    t("payment"),
    t("subsidy"),
    t("end_debt"),
  ];

  return (
    <div className="flex flex-col gap-y-2">
      <SimpleTable data={getWaterSupplyData(waterSupplyData)} />

      <AccardionForWaterTabs
        enumMap={WaterSupplyEnum}
        archivData={archivData}
        tableHeads={tableHeads}
        tableStyles={tableStyles}
      />
    </div>
  );
}

export default WaterSupplyTab;

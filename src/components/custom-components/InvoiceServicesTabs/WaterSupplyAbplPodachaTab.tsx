import { ArchiveItemT, VodaAbplPodachaDataT } from "@/types";
import SimpleTable from "../SimpleTable";
import AccardionForWaterTabs from "./AccardionForWaterTabs";
import { useTranslation } from "react-i18next";

enum WaterSupplyAbplPodachaEnum {
  mes = "mes",
  saldoNVodaAbplPodacha = "saldoNVodaAbplPodacha",
  nachislVodaAbplPodacha = "nachislVodaAbplPodacha",
  vozvratVodaAbplPodacha = "vozvratVodaAbplPodacha",
  oplataVodaAbplPodacha = "oplataVodaAbplPodacha",
  subsVodaAbplPodacha = "subsVodaAbplPodacha",
  saldoKVodaAbplPodacha = "saldoKVodaAbplPodacha",
}

type Props = {
  waterSupplyAbplPodachaRowData: VodaAbplPodachaDataT;
  archivData: ArchiveItemT[];
};

function WaterSupplyAbplPodachaTab({
  waterSupplyAbplPodachaRowData,
  archivData,
}: Props) {
  const { t } = useTranslation();

  const waterSupplyAbplPodachaCookedData = [
    [
      t("abplPodachaTsenaGrn"),
      waterSupplyAbplPodachaRowData.abplPodachaTsenaGrn,
    ],
  ];

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
      <SimpleTable data={waterSupplyAbplPodachaCookedData} />

      <AccardionForWaterTabs
        enumMap={WaterSupplyAbplPodachaEnum}
        archivData={archivData}
        tableHeads={tableHeads}
        tableStyles={tableStyles}
      />
    </div>
  );
}

export default WaterSupplyAbplPodachaTab;

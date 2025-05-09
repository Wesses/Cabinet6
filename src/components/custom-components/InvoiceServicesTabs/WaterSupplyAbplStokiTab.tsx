import { ArchiveItemT, VodaAbplStokiDataT } from "@/types";
import SimpleTable from "../SimpleTable";
import AccardionForWaterTabs from "./AccardionForWaterTabs";
import { useTranslation } from "react-i18next";

enum WaterSupplyAbplStokiEnum {
  mes = "mes",
  saldoNVodaAbplStoki = "saldoNVodaAbplStoki",
  nachislVodaAbplStoki = "nachislVodaAbplStoki",
  vozvratVodaAbplStoki = "vozvratVodaAbplStoki",
  oplataVodaAbplStoki = "oplataVodaAbplStoki",
  subsVodaAbplStoki = "subsVodaAbplStoki",
  saldoKVodaAbplStoki = "saldoKVodaAbplStoki",
}

type Props = {
  waterSupplyAbplStokiRowData: VodaAbplStokiDataT;
  archivData: ArchiveItemT[];
};

function WaterSupplyAbplStokiTab({
  waterSupplyAbplStokiRowData,
  archivData,
}: Props) {
  const { t } = useTranslation();

  const waterSupplyAbplPodachaCookedData = [
    [t("abplStokiTsenaGrn"), waterSupplyAbplStokiRowData.abplStokiTsenaGrn],
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
        enumMap={WaterSupplyAbplStokiEnum}
        archivData={archivData}
        tableHeads={tableHeads}
        tableStyles={tableStyles}
      />
    </div>
  );
}

export default WaterSupplyAbplStokiTab;

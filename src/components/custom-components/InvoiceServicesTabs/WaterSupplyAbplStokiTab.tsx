import { VodaAbplStokiDataT } from "@/types";
import SimpleTable from "../SimpleTable";

type Props = {
  waterSupplyAbplStokiRowData: VodaAbplStokiDataT;
};

function WaterSupplyAbplStokiTab({ waterSupplyAbplStokiRowData }: Props) {
  const waterSupplyAbplPodachaCookedData = [
    [
      "Абонентська плата за водовідведення (грн)",
      waterSupplyAbplStokiRowData.abplStokiTsenaGrn,
    ],
  ];

  return <SimpleTable data={waterSupplyAbplPodachaCookedData} />;
}

export default WaterSupplyAbplStokiTab;

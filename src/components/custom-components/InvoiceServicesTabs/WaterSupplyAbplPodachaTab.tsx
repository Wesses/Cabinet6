import { VodaAbplPodachaDataT } from "@/types";
import SimpleTable from "../SimpleTable";

type Props = {
  waterSupplyAbplPodachaRowData: VodaAbplPodachaDataT;
};

function WaterSupplyAbplPodachaTab({ waterSupplyAbplPodachaRowData }: Props) {
  const waterSupplyAbplPodachaCookedData = [
    [
      "Абонентська плата за подачу води (грн)",
      waterSupplyAbplPodachaRowData.abplPodachaTsenaGrn,
    ],
  ];

  return <SimpleTable data={waterSupplyAbplPodachaCookedData} />;
}

export default WaterSupplyAbplPodachaTab;

import { VodaAbplPodachaDataT } from "@/types";
import SimpleTable from "../SimpleTable";
import AccardionForWaterTabs from './AccardionForWaterTabs';
import { useTranslation } from 'react-i18next';

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
};

function WaterSupplyAbplPodachaTab({ waterSupplyAbplPodachaRowData }: Props) {
  const { t } = useTranslation();

  const waterSupplyAbplPodachaCookedData = [
    [
      t("abplPodachaTsenaGrn"),
      waterSupplyAbplPodachaRowData.abplPodachaTsenaGrn,
    ],
  ];
  return (
    <div className="flex flex-col gap-y-2">
      <SimpleTable data={waterSupplyAbplPodachaCookedData} />

      <AccardionForWaterTabs enumMap={WaterSupplyAbplPodachaEnum} />
    </div>
  );
}

export default WaterSupplyAbplPodachaTab;

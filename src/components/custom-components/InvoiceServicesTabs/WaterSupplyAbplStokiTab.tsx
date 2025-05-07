import { VodaAbplStokiDataT } from "@/types";
import SimpleTable from "../SimpleTable";
import AccardionForWaterTabs from './AccardionForWaterTabs';
import { useTranslation } from 'react-i18next';

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
};

function WaterSupplyAbplStokiTab({ waterSupplyAbplStokiRowData }: Props) {
  const { t } = useTranslation();

  const waterSupplyAbplPodachaCookedData = [
    [
      t("abplStokiTsenaGrn"),
      waterSupplyAbplStokiRowData.abplStokiTsenaGrn,
    ],
  ];

  return (
    <div className="flex flex-col gap-y-2">
      <SimpleTable data={waterSupplyAbplPodachaCookedData} />

      <AccardionForWaterTabs enumMap={WaterSupplyAbplStokiEnum} />
    </div>
  );
}

export default WaterSupplyAbplStokiTab;

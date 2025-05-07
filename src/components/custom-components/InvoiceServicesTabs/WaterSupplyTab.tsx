import { WaterSupplyDataT } from "@/types";
import SimpleTable from "../SimpleTable";
import AccardionForWaterTabs from './AccardionForWaterTabs';
import { useTranslation } from 'react-i18next';

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
};

function WaterSupplyTab({ waterSupplyData }: Props) {
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

  return (
    <div className="flex flex-col gap-y-2">
      <SimpleTable data={getWaterSupplyData(waterSupplyData)} />

      <AccardionForWaterTabs enumMap={WaterSupplyEnum} />
    </div>
  );
}

export default WaterSupplyTab;

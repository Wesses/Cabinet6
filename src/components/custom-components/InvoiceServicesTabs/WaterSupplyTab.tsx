import { WaterSupplyDataT } from "@/types";
import SimpleTable from "../SimpleTable";

const getWaterSupplyData = (rowData: WaterSupplyDataT | undefined) => {
  const cookedData = [];
  if (!rowData) {
    return [];
  }

  if (rowData.vodaPodacha) {
    cookedData.push(
      ["Кількість побутових водомірів", rowData.vodaAbSchetchikiKolvo],
      ["Тариф на подачу води (грн./м³)", rowData.tsenaPodacha]
    );
  }

  if (rowData.vodaStoki) {
    cookedData.push(["Тариф на водовідведення (грн./м³)", rowData.tsenaStoki]);
  }

  if (rowData.vodaPoliv) {
    cookedData.push(
      ["Кількість водомірів на полив", rowData.polivSchetchikiKolvo],
      ["Площа поливу (м²)", rowData.ploshadPolivaM2],
      ["Тариф на полив (грн./м³)", rowData.tsenaPoliv]
    );
  }

  return cookedData;
};

type Props = {
  waterSupplyData: WaterSupplyDataT | undefined;
};

function WaterSupplyTab({ waterSupplyData }: Props) {
  return <SimpleTable data={getWaterSupplyData(waterSupplyData)} />;
}

export default WaterSupplyTab;

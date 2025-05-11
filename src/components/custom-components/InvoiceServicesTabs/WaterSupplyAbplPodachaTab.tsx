import {
  ArchiveItemT,
  OplataItemT,
  VodaAbplPodachaDataT,
  WaterSupplyRentEnum,
} from "@/types";
import SimpleTable from "../SimpleTable";
import AccardionForWaterTabs from "./AccardionForWaterTabs";
import { useTranslation } from "react-i18next";
import { getDataForWaterTab } from "@/utils/getValidDataFunctions";
import { WATER_SUPPLY_PODACHA_TAG_VALUES } from "@/utils/constants";

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
  rentOplataData: OplataItemT[];
};

function WaterSupplyAbplPodachaTab({
  waterSupplyAbplPodachaRowData,
  archivData,
  rentOplataData,
}: Props) {
  const { t } = useTranslation();

  const waterSupplyAbplPodachaCookedData = [
    [
      t("abplPodachaTsenaGrn"),
      waterSupplyAbplPodachaRowData.abplPodachaTsenaGrn,
    ],
  ];

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
      styles: [
        "font-bold text-center bg-gray-300",
        "font-medium text-right",
        "font-medium text-right",
        "font-medium text-right",
        "font-medium text-right",
        "font-medium text-right",
        "font-medium text-right",
      ],
      data: getDataForWaterTab<ArchiveItemT>(
        archivData,
        WaterSupplyAbplPodachaEnum,
        () => true
      ),
    },
    {
      label: t("rent"),
      accordValue: "oplata",
      heads: [t("date_of_rent"), t("rent_sum"), t("bank")],
      styles: [
        "font-bold text-center bg-gray-300",
        "font-medium text-right",
        "font-medium text-right",
      ],
      data: getDataForWaterTab<OplataItemT>(
        rentOplataData,
        WaterSupplyRentEnum,
        ({ tag }) => WATER_SUPPLY_PODACHA_TAG_VALUES.includes(tag),
        [WaterSupplyRentEnum.dataPerevoda],
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-y-2">
      <SimpleTable data={waterSupplyAbplPodachaCookedData} />

      <AccardionForWaterTabs accordionData={accordionData} />
    </div>
  );
}

export default WaterSupplyAbplPodachaTab;

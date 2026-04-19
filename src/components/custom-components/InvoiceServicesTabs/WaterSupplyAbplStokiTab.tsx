import {
  ArchiveItemT,
  OplataItemT,
  VodaAbplStokiDataT,
  AnySupplyRentEnum,
} from "@/types";
import SimpleTable from "../SimpleTable";
import AccordionForTabs from "./AccordionForTabs";
import { useTranslation } from "react-i18next";
import { getDataForTab } from "@/utils/getValidDataFunctions";
import { WATER_SUPPLY_STOKI_TAG_VALUES } from "@/utils/constants";

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
  rentOplataData: OplataItemT[];
};

function WaterSupplyAbplStokiTab({
  waterSupplyAbplStokiRowData,
  archivData,
  rentOplataData,
}: Props) {
  const { t } = useTranslation();

  const waterSupplyAbplPodachaCookedData = [
    [t("abplStokiTsenaGrn"), waterSupplyAbplStokiRowData.abplStokiTsenaGrn],
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
      styles: ["font-bold text-center bg-muted"],
      data: getDataForTab<ArchiveItemT>(
        archivData,
        WaterSupplyAbplStokiEnum,
        () => true,
      ),
    },
    {
      label: t("payment_no_uah"),
      accordValue: "oplata",
      heads: [t("date_of_rent"), t("rent_sum"), t("bank")],
      styles: ["font-bold text-center bg-muted"],
      data: getDataForTab<OplataItemT>(
        rentOplataData,
        AnySupplyRentEnum,
        ({ tag }) => WATER_SUPPLY_STOKI_TAG_VALUES.includes(tag),
        [AnySupplyRentEnum.dataPerevoda],
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-y-2">
      <SimpleTable data={waterSupplyAbplPodachaCookedData} />

      <AccordionForTabs accordionData={accordionData} />
    </div>
  );
}

export default WaterSupplyAbplStokiTab;

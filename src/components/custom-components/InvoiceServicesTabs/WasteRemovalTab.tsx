import {
  ArchiveItemT,
  OplataItemT,
  VyvozOthodovT,
  AnySupplyRentEnum,
} from "@/types";
import SimpleTable from "../SimpleTable";
import AccordionForTabs from "./AccordionForTabs";
import { useTranslation } from "react-i18next";
import { getDataForTab } from "@/utils/getValidDataFunctions";
import { WASTE_REMOVAL_TAG_VALUES } from "@/utils/constants";

enum WasteRemovalArchiveEnum {
  mes = "mes",
  saldoNVyvozOthodov = "saldoNVyvozOthodov",
  nachislVyvozOthodov = "nachislVyvozOthodov",
  vozvratVyvozOthodov = "vozvratVyvozOthodov",
  oplataVyvozOthodov = "oplataVyvozOthodov",
  subsVyvozOthodov = "subsVyvozOthodov",
  saldoKVyvozOthodov = "saldoKVyvozOthodov",
}

type Props = {
  wasteRemovalData: VyvozOthodovT | undefined;
  kolGil: number | undefined;
  archivData: ArchiveItemT[];
  rentOplataData: OplataItemT[];
};

function WasteRemovalTab({
  wasteRemovalData,
  kolGil,
  archivData,
  rentOplataData,
}: Props) {
  const { t } = useTranslation();

  const wasteRemovalCookedData = [
    [t("tsenaTboZaM3"), wasteRemovalData?.tsenaTboZaM3],
    [t("normaTboM3"), wasteRemovalData?.normaTboM3],
    [t("kolGil"), kolGil],
    [t("vyvozOthodovDogTboM3"), wasteRemovalData?.vyvozOthodovDogTboM3],
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
        WasteRemovalArchiveEnum,
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
        ({ tag }) => WASTE_REMOVAL_TAG_VALUES.includes(tag),
        [AnySupplyRentEnum.dataPerevoda],
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-y-2">
      <SimpleTable
        data={wasteRemovalCookedData}
        debtValue={wasteRemovalData?.saldoNachVyvozOthodov}
        linkToPay={wasteRemovalData?.linkToPay}
      />

      <AccordionForTabs accordionData={accordionData} />
    </div>
  );
}

export default WasteRemovalTab;

import {
  ArchiveItemT,
  OplataItemT,
  VyvozOthodovAbplT,
  AnySupplyRentEnum,
} from "@/types";
import SimpleTable from "../SimpleTable";
import AccordionForTabs from "./AccordionForTabs";
import { useTranslation } from "react-i18next";
import { getDataForTab } from "@/utils/getValidDataFunctions";
import { WASTE_REMOVAL_ABPL_TAG_VALUES } from "@/utils/constants";

enum WasteRemovalAbplArchiveEnum {
  mes = "mes",
  // No trailing "l" here — mirrors the actual ArchiveItemT field name
  // (saldoNVyvozOthodovAbp), which is inconsistent with the rest of this
  // group (nachislVyvozOthodovAbpl etc. all have the "l"). Don't "fix" this
  // to match the pattern — it has to match the real API field exactly.
  saldoNVyvozOthodovAbp = "saldoNVyvozOthodovAbp",
  nachislVyvozOthodovAbpl = "nachislVyvozOthodovAbpl",
  vozvratVyvozOthodovAbpl = "vozvratVyvozOthodovAbpl",
  oplataVyvozOthodovAbpl = "oplataVyvozOthodovAbpl",
  subsVyvozOthodovAbpl = "subsVyvozOthodovAbpl",
  saldoKVyvozOthodovAbpl = "saldoKVyvozOthodovAbpl",
}

type Props = {
  wasteRemovalAbplData: VyvozOthodovAbplT | undefined;
  archivData: ArchiveItemT[];
  rentOplataData: OplataItemT[];
};

function WasteRemovalAbplTab({
  wasteRemovalAbplData,
  archivData,
  rentOplataData,
}: Props) {
  const { t } = useTranslation();

  const wasteRemovalAbplCookedData = [
    [t("tarifiVyvozAbplTsenaGrn"), wasteRemovalAbplData?.tarifiVyvozAbplTsenaGrn],
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
        WasteRemovalAbplArchiveEnum,
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
        ({ tag }) => WASTE_REMOVAL_ABPL_TAG_VALUES.includes(tag),
        [AnySupplyRentEnum.dataPerevoda],
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-y-2">
      <SimpleTable
        data={wasteRemovalAbplCookedData}
        debtValue={wasteRemovalAbplData?.saldoNachVyvozOthodovAbpl}
        linkToPay={wasteRemovalAbplData?.linkToPay}
      />

      <AccordionForTabs accordionData={accordionData} />
    </div>
  );
}

export default WasteRemovalAbplTab;

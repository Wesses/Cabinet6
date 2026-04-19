import {
  ArchiveItemT,
  OplataItemT,
  OtopAbplDataT,
  AnySupplyRentEnum,
} from "@/types";
import SimpleTable from "../SimpleTable";
import AccordionForTabs from "./AccordionForTabs";
import { useTranslation } from "react-i18next";
import { getDataForTab } from "@/utils/getValidDataFunctions";
import { HEATING_SUPPLY_ABPL_OTOP_TAG_VALUES } from "@/utils/constants";

enum HeatingSupplyAbplOtopEnum {
  mes = "mes",
  saldoNOtopAbpl = "saldoNOtopAbpl",
  nachislOtopAbpl = "nachislOtopAbpl",
  vozvratOtopAbpl = "vozvratOtopAbpl",
  oplataOtopAbpl = "oplataOtopAbpl",
  subsOtopAbpl = "subsOtopAbpl",
  saldoKOtopAbpl = "saldoKOtopAbpl",
}

type Props = {
  HeatingSupplyAbplOtop: OtopAbplDataT;
  archivData: ArchiveItemT[];
  rentOplataData: OplataItemT[];
};

function HeatingSupplyOtopAbpl({
  HeatingSupplyAbplOtop,
  archivData,
  rentOplataData,
}: Props) {
  const { t } = useTranslation();

  const heatingSupplyAbplCookedData = [
    [t("abplOtopTsenaGrn"), HeatingSupplyAbplOtop.otopAbplTsenaGrn],
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
        HeatingSupplyAbplOtopEnum,
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
        ({ tag }) => HEATING_SUPPLY_ABPL_OTOP_TAG_VALUES.includes(tag),
        [AnySupplyRentEnum.dataPerevoda],
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-y-2">
      <SimpleTable data={heatingSupplyAbplCookedData} />

      <AccordionForTabs accordionData={accordionData} />
    </div>
  );
}

export default HeatingSupplyOtopAbpl;

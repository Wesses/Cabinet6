import {
  ArchiveItemT,
  KvartplataT,
  OplataItemT,
  AnySupplyRentEnum,
} from "@/types";
import AccordionForTabs from "./AccordionForTabs";
import { useTranslation } from "react-i18next";
import { getDataForTab } from "@/utils/getValidDataFunctions";
import { izmteploTag, KVARTPLATA_TAG_VALUES } from "@/utils/constants";
import SimpleTable from "../SimpleTable";

const tsenaToKvplataMap: Record<string, string> = {
  tsenaTbo: "kvplataTbo",
  tsenaOvds: "kvplataOvds",
  tsenaDymovent: "kvplataDymovent",
  tsenaVygreb: "kvplataVygreb",
  tsenaTekrem: "kvplataTekrem",
  tsenaKnizh: "kvplataKnizh",
  tsenaUborter: "kvplataUborter",
  tsenaDetploshad: "kvplataDetploshad",
  tsenaZima: "kvplataZima",
  tsenaSvetobsh: "kvplataSvetobsh",
  tsenaDeratiz: "kvplataDeratiz",
  tsenaDezinsec: "kvplataDezinsec",
  tsenaUborlest: "kvplataUborlest",
  tsenaLiftTo: "kvplataLiftTo",
  tsenaLiftElectro: "kvplataLiftElectro",
  tsenaOvdsDisp: "kvplataOvdsDisp",
  tsenaOvdsElectro: "kvplataOvdsElectro",
  tsenaOvdsGaz: "kvplataOvdsGaz",
  tsenaRemVds: "kvplataRemVds",
  tsenaRemAvt: "kvplataRemAvt",
  tsenaRemElectro: "kvplataRemElectro",
  tsenaUprav: "kvplataUprav",
  tsenaRezerv: "kvplataRezerv",
};

enum RentDataArchiveEnum {
  mes = "mes",
  saldoNKvplata = "saldoNKvplata",
  nachislKvplata = "nachislKvplata",
  vozvratKvplata = "vozvratKvplata",
  oplataKvplata = "oplataKvplata",
  subsKvplata = "subsKvplata",
  saldoKKvplata = "saldoKKvplata",
}

type Props = {
  rentOplataData: OplataItemT[];
  kvartplata: KvartplataT | undefined;
  archivData: ArchiveItemT[];
};

const getKvartplataData = (
  kvartplata: KvartplataT | undefined,
  rentHeads: Record<string, string>,
) => {
  if (!kvartplata?.kvplata || !kvartplata) {
    return [];
  }

  const validKeys = Object.entries(
    tsenaToKvplataMap,
  ) as (keyof KvartplataT)[][];

  return validKeys
    .filter(([key, value]) => kvartplata[value] && kvartplata[key])
    .map(([key]) => [rentHeads[key], kvartplata[key]]);
};

const RentDataTab = ({ rentOplataData, kvartplata, archivData }: Props) => {
  const { t } = useTranslation();

  const RentHeads = {
    tsenaTbo: t("waste_removal"),
    tsenaOvds: t("indoor_network_maintenance"),
    tsenaDymovent: t("ventilation_maintenance"),
    tsenaVygreb: t("cesspit_cleaning"),
    tsenaTekrem: t("current_repair"),
    tsenaKnizh: t("booklet_production"),
    tsenaUborter: t("yard_cleaning"),
    tsenaDetploshad: t("playground_repair"),
    tsenaZima: t("winter_preparation"),
    tsenaSvetobsh: t("common_area_lighting"),
    tsenaDeratiz: t("deratization"),
    tsenaDezinsec: t("disinsection"),
    tsenaUborlest: t("staircase_cleaning"),
    tsenaLiftTo: t("elevator_maintenance"),
    tsenaLiftElectro: t("elevator_electricity"),
    tsenaOvdsDisp: t("dispatch_and_alarm_maintenance"),
    tsenaOvdsElectro: t("electrical_system_maintenance"),
    tsenaOvdsGaz: t("gas_network_maintenance"),
    tsenaRemVds: t("indoor_system_repair"),
    tsenaRemAvt: t("fire_automation_repair"),
    tsenaRemElectro: t("electrical_network_repair"),
    tsenaUprav: t("manager_fee"),
    tsenaRezerv: t("reserve_fund"),
  };

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
        RentDataArchiveEnum,
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
        ({ tag }) => KVARTPLATA_TAG_VALUES.includes(tag),
        [AnySupplyRentEnum.dataPerevoda],
      ),
    },
  ];

  const kvartptalaValidData = getKvartplataData(kvartplata, RentHeads);
  const rentSum = kvartptalaValidData.reduce((acc, [, value]) => acc + +value, 0);
  const totalLabel = import.meta.env.VITE_ALIAS === izmteploTag ? t("total_ovds_due") : t("total_payment_due");
  const tableData = kvartptalaValidData.length > 1
    ? [...kvartptalaValidData, [totalLabel, rentSum]]
    : kvartptalaValidData;

  return (
    <div className="flex flex-col gap-y-2">
      <SimpleTable
        data={tableData}
        debtValue={kvartplata?.saldoNachKvplata}
        linkToPay={kvartplata?.linkToPay}
      />
      <AccordionForTabs accordionData={accordionData} />
    </div>
  );
};

export default RentDataTab;

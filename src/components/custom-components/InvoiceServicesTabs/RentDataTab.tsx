import { KvartplataT, OplataItemT, WaterSupplyRentEnum } from "@/types";
import AccardionForWaterTabs from "./AccardionForWaterTabs";
import { useTranslation } from "react-i18next";
import { getDataForWaterTab } from "@/utils/getValidDataFunctions";
import { KVARTPLATA_TAG_VALUES } from "@/utils/constants";
import SimpleTable from "../SimpleTable";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

type Props = {
  rentOplataData: OplataItemT[];
  kvartplata: KvartplataT;
};

const getKvartplataData = (
  kvartplata: KvartplataT,
  rentHeads: Record<string, string>
) => {
  if (!kvartplata.kvplata) {
    return [];
  }

  const validKeys = Object.entries(
    tsenaToKvplataMap
  ) as (keyof KvartplataT)[][];

  return validKeys
    .filter(([, value]) => kvartplata[value])
    .map(([key]) => [rentHeads[key], kvartplata[key]]);
};

const RentDataTab = ({ rentOplataData, kvartplata }: Props) => {
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
      label: t("payment"),
      accordValue: "oplata",
      heads: [t("date_of_rent"), t("rent_sum"), t("bank")],
      styles: ["font-bold text-center bg-gray-300"],
      data: getDataForWaterTab<OplataItemT>(
        rentOplataData,
        WaterSupplyRentEnum,
        ({ tag }) => KVARTPLATA_TAG_VALUES.includes(tag),
        [WaterSupplyRentEnum.dataPerevoda]
      ),
    },
  ];

  const kvartptalaValidData = getKvartplataData(kvartplata, RentHeads);
  const rentSum = kvartptalaValidData.reduce(
    (acc, [, value]) => acc + +value,
    0
  );

  return (
    <div>
      <Accordion
        type="single"
        collapsible
        className="p-4 border border-muted rounded-xl mb-2"
      >
        <AccordionItem value="rent-data">
          <AccordionTrigger>
            <div className="w-full flex flex-row justify-between pr-2">
              <p>Ваша загальна сума до сплати</p>
              {rentSum}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <SimpleTable data={kvartptalaValidData} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <AccardionForWaterTabs accordionData={accordionData} />
    </div>
  );
};

export default RentDataTab;

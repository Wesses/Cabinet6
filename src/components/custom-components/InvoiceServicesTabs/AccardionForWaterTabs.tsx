import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SimpleMultiRowTable from "../SimpleMultiRowTable";
import { ArchiveItemT } from "@/types";
import { useTranslation } from "react-i18next";

type Props = {
  enumMap: Record<string, keyof ArchiveItemT>,
  archivData: ArchiveItemT[],
  tableHeads: string[],
  tableStyles: string[],
};

const AccardionForWaterTabs = ({ enumMap, archivData, tableHeads, tableStyles }: Props) => {
  const { t } = useTranslation();

  const getDataForWaterTab = (data: ArchiveItemT[]) => {
    const enumKeys = Object.keys(enumMap) as (keyof ArchiveItemT)[];

    return data.map((item) => {
      return { rows: enumKeys.map((key) => item[key]), index: item.idx };
    });
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="p-4 border border-muted rounded-xl"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>{t("calculations")}</AccordionTrigger>
        <AccordionContent>
          <SimpleMultiRowTable
            rowsData={getDataForWaterTab(archivData)}
            heads={tableHeads}
            styles={tableStyles}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AccardionForWaterTabs;

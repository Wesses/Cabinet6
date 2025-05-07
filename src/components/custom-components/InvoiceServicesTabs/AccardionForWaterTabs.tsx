import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ErrorBlock from "../ErrorBlock";
import Spinner from "../Spinner";
import SimpleMultiRowTable from "../SimpleMultiRowTable";
import { useEffect, useState } from "react";
import { ArchiveItemT } from "@/types";
import { useParams } from "react-router";
import { getArchivData } from "@/api/api";
import { useTranslation } from 'react-i18next';

const styles = [
  "font-bold text-center bg-gray-300",
  "font-medium text-right",
  "font-medium text-right",
  "font-medium text-right",
  "font-medium text-right",
  "font-medium text-right",
  "font-medium text-right",
];

type Props = {
  enumMap: Record<string, keyof ArchiveItemT>;
}

const AccardionForWaterTabs = ({ enumMap }: Props) => {
  const [archivData, setArchivData] = useState<ArchiveItemT[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { id } = useParams();
  const { t } = useTranslation();

  const getDataForWaterTab = (data: ArchiveItemT[]) => {
    const enumKeys = Object.keys(enumMap) as (keyof ArchiveItemT)[];
  
    return data.map((item) => {
      return {rows: enumKeys.map((key) => item[key]), index: item.idx};
    });
  };

  const tableHeads = [
    t("date"),
    t("begin_debt"),
    t("accrued"),
    t("return"),
    t("payment"),
    t("subsidy"),
    t("end_debt"),
  ];

  useEffect(() => {
    setIsError(false);

    if (id) {
      setIsLoading(true);
      getArchivData(+id)
        .then(setArchivData)
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    }
  }, []);

  const isContent = !isError && !isLoading && archivData.length;
  const isntContent = !isError && !isLoading && !archivData.length;

  return (
    <Accordion
      type="single"
      collapsible
      className="p-4 border border-muted rounded-xl"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>{t("calculations")}</AccordionTrigger>
        <AccordionContent>
          {isError && <ErrorBlock />}
          {isLoading && <Spinner />}
          {isntContent && (
            <p className="text-black py-2 px-4 text-[40px] font-semibold">
              {t("no_calculations")}
            </p>
          )}
          {isContent && (
            <SimpleMultiRowTable rowsData={getDataForWaterTab(archivData)} heads={tableHeads} styles={styles}/>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AccardionForWaterTabs;

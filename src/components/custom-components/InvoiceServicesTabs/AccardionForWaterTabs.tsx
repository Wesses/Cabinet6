import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SimpleMultiRowTable from "../SimpleMultiRowTable";

type Props = {
  accordionData: {
    label: string;
    accordValue: string;
    heads: string[];
    styles: string[];
    data: {
      rows: (string | number | Date)[];
      index: number;
    }[];
  }[];
};

const AccardionForWaterTabs = ({ accordionData }: Props) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="p-4 border border-muted rounded-xl"
    >
      {accordionData
        .filter(({ data }) => data.length)
        .map(({ accordValue, heads, styles, data, label }) => (
          <AccordionItem value={accordValue} key={accordValue}>
            <AccordionTrigger>{label}</AccordionTrigger>
            <AccordionContent>
              <SimpleMultiRowTable
                rowsData={data}
                heads={heads}
                styles={styles}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
    </Accordion>
  );
};

export default AccardionForWaterTabs;

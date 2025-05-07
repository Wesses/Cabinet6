import { cn } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type Props = {
  rowsData: {rows: (string | number | Date)[], index: number}[];
  heads: string[];
  styles: string[];
};

function SimpleMultiRowTable({ rowsData, heads, styles }: Props) {
  return (
    <Card className="border-white md:border-neutral-200">
      <CardContent>
        <Table className="hidden md:block">
          <TableHeader>
            <TableRow>
              {heads.map((head, i) => (
                <TableHead
                  key={head}
                  className={cn({
                    "bg-gray-200 font-bold": i === 0,
                    "text-right": i !== 0,
                  }, "md:text-xs lg:text-base")}
                >
                  {head}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rowsData.map(({rows, index}) => (
              <TableRow key={index}>
                {rows.map((text, i) => (
                  <TableCell className={cn(styles[i], "md:text-xs lg:text-base")} key={i}>
                    {"" + text}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="md:hidden flex flex-col gap-4">
          {rowsData.map(({rows, index}) => (
            <div
              key={index}
              className="border p-3 rounded-md shadow-sm bg-white"
            >
              {rows.map((cell, i) => (
                <div
                  key={i}
                  className="flex justify-between py-1 border-b last:border-b-0"
                >
                  <span className="font-medium text-gray-600">{heads[i]}</span>
                  <span >{"" + cell}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default SimpleMultiRowTable;

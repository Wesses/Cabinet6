import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "../ui/card";

type Props = {
  data: (string | number | undefined)[][];
};

const SimpleTable = ({ data }: Props) => {
  if (!data.length) return null;

  return (
    <Card className="max-w-[700px]">
      <CardContent className="p-4">
        <div className="hidden md:block overflow-auto w-full">
          <Table className="border border-muted rounded-xl">
            <TableBody>
              {data.map(([label, value]) => (
                <TableRow key={label} className="text-base">
                  <TableCell className="font-medium">{label}</TableCell>
                  <TableCell className="text-right">{value || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="md:hidden space-y-4">
          {data.map(([label, value]) => (
            <div
              key={label}
              className="border border-muted rounded-lg p-3 bg-white shadow"
            >
              <div className="text-sm text-gray-500">{label}</div>
              <div className="text-base font-semibold text-zinc-900">
                {value || "-"}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SimpleTable;

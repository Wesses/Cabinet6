import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { VodaAbplPodachaDataT } from '@/types';

type Props = {
  waterSupplyAbplPodachaRowData: VodaAbplPodachaDataT;
};

function WaterSupplyAbplPodachaTab({ waterSupplyAbplPodachaRowData }: Props) {
  const waterSupplyAbplPodachaCookedData = [["Абонентська плата за подачу води (грн)", waterSupplyAbplPodachaRowData.abplPodachaTsenaGrn]]

  return (
    <Card>
      <CardContent className="p-4">
        <div className="hidden md:block overflow-auto w-full">
          <Table className="border border-muted rounded-xl">
            <TableBody>
            {waterSupplyAbplPodachaCookedData.map(([label, value]) => (
              <TableRow key={label} className="text-base flex justify-between">
                <TableCell className="font-medium">{label}</TableCell>
                <TableCell>{value || "-"}</TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="md:hidden space-y-4">
          {waterSupplyAbplPodachaCookedData.map(([label, value]) => (
            <div
              key={label}
              className="border border-muted rounded-lg p-3 bg-white shadow-sm"
            >
              <p className="text-sm text-gray-500">{label}</p>
              <p className="text-base font-medium text-zinc-900">
                {value || "-"}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default WaterSupplyAbplPodachaTab;

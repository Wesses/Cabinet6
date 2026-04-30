import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "../ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CircleHelp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

type Props = {
  data: (string | number | undefined)[][];
  debtValue?: number;
};

const DebtLabel = ({ label, hint }: { label: string; hint: string }) => (
  <span className="flex items-center gap-1">
    {label}
    <Popover>
      <PopoverTrigger asChild>
        <CircleHelp className="w-4 h-4 text-blue-500 cursor-pointer shrink-0" />
      </PopoverTrigger>
      <PopoverContent className="w-64 text-sm">{hint}</PopoverContent>
    </Popover>
  </span>
);

const SimpleTable = ({ data, debtValue }: Props) => {
  const { t } = useTranslation();

  const hasDebt = debtValue !== undefined;
  const isOverpayment = hasDebt && debtValue <= 0;
  const isHighDebt = hasDebt && debtValue >= 500;

  if (!data.length && !hasDebt) return null;

  return (
    <Card className="max-w-[700px]">
      <CardContent className="p-4">
        <div className="hidden w-full overflow-auto md:block">
          <Table className="border border-muted rounded-xl">
            <TableBody>
              {hasDebt && (
                <TableRow className={cn("text-base", isHighDebt && "border border-destructive")}>
                  <TableCell className={cn("font-medium", isOverpayment && "text-green-600", isHighDebt && "text-destructive font-extrabold")}>
                    <DebtLabel label={isOverpayment ? t("overpayment") : t("debt")} hint={t("debt_hint")} />
                  </TableCell>
                  <TableCell className={cn("text-right font-semibold", isOverpayment && "text-green-600", isHighDebt && "text-destructive font-extrabold")}>
                    {debtValue}
                  </TableCell>
                </TableRow>
              )}
              {data.map(([label, value]) => (
                <TableRow key={label} className="text-base">
                  <TableCell className="font-medium">{label}</TableCell>
                  <TableCell className="text-right">{value || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="space-y-4 md:hidden">
          {hasDebt && (
            <div className={cn("p-3 border rounded-lg shadow border-border bg-card", isHighDebt && "border-destructive")}>
              <div className="text-sm text-muted-foreground">
                <DebtLabel label={isOverpayment ? t("overpayment") : t("debt")} hint={t("debt_hint")} />
              </div>
              <div className={cn("text-base font-semibold", isOverpayment && "text-green-600", isHighDebt && "text-destructive font-extrabold")}>
                {debtValue.toFixed(2)}
              </div>
            </div>
          )}
          {data.map(([label, value]) => (
            <div
              key={label}
              className="p-3 border rounded-lg shadow border-border bg-card"
            >
              <div className="text-sm text-muted-foreground">{label}</div>
              <div className="text-base font-semibold text-card-foreground">
                {(typeof value === "number" && value ? value.toFixed(2) : value) || "-"}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SimpleTable;

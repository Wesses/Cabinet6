import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "../ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CircleHelp, HandCoins } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

type Props = {
  data: (string | number | undefined)[][];
  debtValue?: number;
  linkToPay?: string;
  sectionTitle?: string;
  sectionUnit?: string;
  totalRow?: (string | number)[];
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

const SimpleTable = ({ data, debtValue, linkToPay, sectionTitle, sectionUnit, totalRow }: Props) => {
  const { t } = useTranslation();

  const hasDebt = debtValue !== undefined;
  const isOverpayment = hasDebt && debtValue <= 0;
  const isHighDebt = hasDebt && debtValue >= 500;
  const showPayLink = !!linkToPay && hasDebt && debtValue! > 1;

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
                    <div className="flex flex-col items-end gap-0.5">
                      {debtValue!.toFixed(2)}
                      {showPayLink && (
                        <a href={linkToPay} target="_blank" rel="noopener noreferrer"
                           className="flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline">
                          <HandCoins className="w-3.5 h-3.5" />
                          {t("pay_online")}
                        </a>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {sectionTitle && (
                <TableRow className="bg-muted">
                  <TableCell className="font-bold">{sectionTitle}</TableCell>
                  <TableCell className="text-right font-medium text-muted-foreground">{sectionUnit}</TableCell>
                </TableRow>
              )}
              {data.map(([label, value]) => (
                <TableRow key={label} className="text-base">
                  <TableCell className="font-medium">{label}</TableCell>
                  <TableCell className="text-right">{value || "-"}</TableCell>
                </TableRow>
              ))}
              {totalRow && (
                <TableRow className="text-base border-t-2 border-foreground/20">
                  <TableCell className="font-bold">{totalRow[0]}</TableCell>
                  <TableCell className="text-right font-bold">{totalRow[1] || "-"}</TableCell>
                </TableRow>
              )}
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
                {debtValue!.toFixed(2)}
              </div>
              {showPayLink && (
                <a href={linkToPay} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline mt-1">
                  <HandCoins className="w-3.5 h-3.5" />
                  {t("pay_online")}
                </a>
              )}
            </div>
          )}
          {sectionTitle && (
            <div className="flex items-baseline justify-between px-1 pt-1">
              <span className="text-base font-bold">{sectionTitle}</span>
              <span className="text-sm text-muted-foreground">{sectionUnit}</span>
            </div>
          )}
          {data.map(([label, value]) => (
            <div
              key={label}
              className="p-3 border rounded-lg shadow border-border bg-card"
            >
              <div className="text-sm text-muted-foreground">{label}</div>
              <div className="text-base font-semibold text-card-foreground">
                {(typeof value === "number" && value ? (Number.isInteger(value) ? value : value.toFixed(2)) : value) || "-"}
              </div>
            </div>
          ))}
          {totalRow && (
            <div className="p-3 border-2 rounded-lg shadow border-primary/30 bg-card">
              <div className="text-sm text-muted-foreground">{totalRow[0]}</div>
              <div className="text-base font-bold text-card-foreground">{totalRow[1] || "-"}</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SimpleTable;

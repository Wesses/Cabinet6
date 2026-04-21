import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { XIcon } from "lucide-react";
import { postVmPokaz } from "@/api/api";
import Spinner from "./Spinner";
import { useEffect, useState } from "react";
import { showCustomToast } from "@/utils/showCustomComponent";
import { useTranslation } from "react-i18next";
import { VmPokazPostT, WMListT } from "@/types";
import { useParams } from "react-router";

type Props = {
  wmListData: WMListT[];
  onClose: () => void;
  onSuccess?: () => void;
};

type SuspiciousItem = { item: WMListT; diff: number };

const formSchema = z.object({
  readings: z.array(z.object({ value: z.coerce.number().min(0) })),
});

const AddWatermeterForm = ({ wmListData, onClose, onSuccess }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingValues, setPendingValues] = useState<z.infer<typeof formSchema> | null>(null);
  const [suspiciousItems, setSuspiciousItems] = useState<SuspiciousItem[]>([]);
  const { t } = useTranslation();
  const { id } = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      readings: wmListData.map(() => ({ value: 0 })),
    },
  });

  const { fields } = useFieldArray({ control: form.control, name: "readings" });

  useEffect(() => {
    form.reset({ readings: wmListData.map(() => ({ value: 0 })) });
  }, [wmListData]);

  function doPost(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const body: VmPokazPostT = {
      personalaccontsId: +id!,
      novPokaz1: 0, novPokaz2: 0, novPokaz3: 0,
      novPokaz4: 0, novPokaz5: 0, novPokaz6: 0,
      novPokazPoliv1: 0, novPokazPoliv2: 0, novPokazPoliv3: 0,
      novPokazPoliv4: 0, novPokazPoliv5: 0, novPokazPoliv6: 0,
    };

    wmListData.forEach((item, i) => {
      const key = item.polivVm === 1
        ? `novPokazPoliv${item.idx}`
        : `novPokaz${item.idx}`;
      (body as unknown as Record<string, number>)[key] = values.readings[i].value;
    });

    (async () => {
      try {
        await postVmPokaz(body);
        showCustomToast(t("toast_successfully_created"), "bg-green-400");
        onSuccess?.();
        onClose();
      } catch {
        showCustomToast(t("toast_error_try_later"), "bg-red-400");
      } finally {
        setIsLoading(false);
      }
    })();
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    let hasErrors = false;
    values.readings.forEach((r, i) => {
      if (r.value < wmListData[i].posledPokazVm) {
        form.setError(`readings.${i}.value`, {
          message: `${t("reading_below_previous")} (${wmListData[i].posledPokazVm})`,
        });
        hasErrors = true;
      }
    });
    if (hasErrors) return;

    const suspicious = wmListData
      .map((item, i) => ({ item, diff: values.readings[i].value - item.posledPokazVm }))
      .filter(({ diff }) => diff > 50);

    if (suspicious.length > 0) {
      setSuspiciousItems(suspicious);
      setPendingValues(values);
      setShowConfirm(true);
      return;
    }

    doPost(values);
  }

  function handleConfirm() {
    setShowConfirm(false);
    if (pendingValues) doPost(pendingValues);
  }

  return (
    <AlertDialogContent className="w-full max-w-[700px]">
      <AlertDialogHeader>
        <div className="flex flex-row-reverse">
          <AlertDialogCancel onClick={onClose}>
            <XIcon />
          </AlertDialogCancel>
        </div>
        <AlertDialogTitle className="text-left">
          {t("add_meter_readings")}
        </AlertDialogTitle>
        <AlertDialogDescription className="sr-only">
          {t("add_meter_readings")}
        </AlertDialogDescription>
      </AlertDialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="pb-4">
          {/* Mobile */}
          <div className="space-y-4 sm:hidden">
            {fields.map((field, i) => {
              const meter = wmListData[i];
              return (
                <div key={field.id} className="p-3 space-y-2 text-sm border rounded-md bg-muted/20">
                  <p className="pb-2 mb-1 font-medium border-b">
                    {t(meter.polivVm === 1 ? "irrigation_meter" : "household_meter")} {meter.idx} — {meter.nSchetchika}
                  </p>
                  <div className="flex justify-between text-muted-foreground">
                    <span>{t("serial_number")}:</span>
                    <span>{meter.snSchet}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>{t("base_indications")}:</span>
                    <span>{meter.posledPokazVm}</span>
                  </div>
                  <FormField
                    control={form.control}
                    name={`readings.${i}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between gap-x-2">
                          <span className="text-muted-foreground">{t("new_indications")}:</span>
                          <FormControl>
                            <Input type="number" min={0} autoComplete="off" className="w-28" {...field} />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              );
            })}
          </div>

          {/* Desktop */}
          <table className="hidden w-full text-sm sm:table">
            <thead>
              <tr className="border-b bg-muted/50 text-muted-foreground">
                <th className="px-3 py-2 font-medium text-left">{t("watermeter_mark")}</th>
                <th className="px-3 py-2 font-medium text-left">{t("serial_number")}</th>
                <th className="px-3 py-2 font-medium text-left">{t("base_indications")}</th>
                <th className="px-3 py-2 font-medium text-left">{t("new_indications")}</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, i) => {
                const meter = wmListData[i];
                return (
                  <tr key={field.id} className="border-b transition-colors last:border-0 hover:bg-muted/30">
                    <td className="px-3 py-2">
                      {t(meter.polivVm === 1 ? "irrigation_meter" : "household_meter")} {meter.idx} — {meter.nSchetchika}
                    </td>
                    <td className="px-3 py-2">{meter.snSchet}</td>
                    <td className="px-3 py-2 font-medium">{meter.posledPokazVm}</td>
                    <td className="px-3 py-2">
                      <FormField
                        control={form.control}
                        name={`readings.${i}.value`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input type="number" min={0} autoComplete="off" className="w-28" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {wmListData.some((_, i) => form.formState.errors.readings?.[i]?.value) && (
            <div className="mt-3 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 space-y-1">
              {wmListData.map((meter, i) => {
                const error = form.formState.errors.readings?.[i]?.value;
                if (!error) return null;
                return (
                  <p key={i} className="text-sm text-destructive">
                    {t(meter.polivVm === 1 ? "irrigation_meter" : "household_meter")} {meter.idx}: {error.message}
                  </p>
                );
              })}
            </div>
          )}

          <Button
            className="flex items-center justify-center w-1/2 mx-auto mt-6 disabled:bg-primary/60"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : t("send")}
          </Button>
        </form>
      </Form>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("readings_large_diff_title")}</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div>
                <p className="mb-2">{t("readings_large_diff_description")}</p>
                <ul className="space-y-1 text-sm">
                  {suspiciousItems.map(({ item, diff }) => (
                    <li key={item.idx}>
                      {t(item.polivVm === 1 ? "irrigation_meter" : "household_meter")} {item.idx} — {item.nSchetchika}: <span className="font-bold italic">+{diff}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("close")}</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>{t("confirm")}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AlertDialogContent>
  );
};

export default AddWatermeterForm;

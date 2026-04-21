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
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
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
};

const formSchema = z.object({
  readings: z.array(z.object({ value: z.coerce.number().min(0) })),
});

const AddWatermeterForm = ({ wmListData, onClose }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
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

  function onSubmit(values: z.infer<typeof formSchema>) {
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
        onClose();
      } catch {
        showCustomToast(t("toast_error_try_later"), "bg-red-400");
      } finally {
        setIsLoading(false);
      }
    })();
  }

  return (
    <AlertDialogContent>
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="pb-4 space-y-4">
          {fields.map((field, i) => {
            const meter = wmListData[i];
            const label = `${t(meter.polivVm === 1 ? "irrigation_meter" : "household_meter")} ${meter.idx} — ${meter.nSchetchika}`;
            return (
              <FormField
                key={field.id}
                control={form.control}
                name={`readings.${i}.value`}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-x-4">
                      <span className="text-sm text-muted-foreground min-w-[200px]">
                        {label}
                      </span>
                      <FormControl>
                        <Input type="number" min={0} autoComplete="off" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}

          <Button
            className="w-1/2 disabled:bg-primary/60"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : t("send")}
          </Button>
        </form>
      </Form>
    </AlertDialogContent>
  );
};

export default AddWatermeterForm;

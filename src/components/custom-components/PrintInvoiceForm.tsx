"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { showCustomToast } from "@/utils/showCustomComponent";
import { XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useTranslation } from "react-i18next";
import { getInvoiceBlob } from "@/api/api";
import { useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ServicesValuesT } from '@/types';

type Props = {
  open: boolean;
  onClose: () => void;
  currentServices: string[];
};

export default function PrintInvoiceForm({
  open,
  onClose,
  currentServices,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { id } = useParams();

  const sericesLabels: Record<ServicesValuesT, string> = {
  [ServicesValuesT.invoice]: t("all_services"),
  [ServicesValuesT.water]: t("water"),
  [ServicesValuesT.rent]: t("rent"),
  };

  const formSchema = z.object({
    month: z.string({
      message: t("required"),
    }),
    service: z.string({
      message: t("required"),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      if (!id) {
        showCustomToast(t("error_refresh"), "bg-red-300");

        return;
      }

      const { blob, fileName } = await getInvoiceBlob(
        +id,
        values.service,
        +values.month
      );

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);

      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      showCustomToast(t("downloading"), "bg-green-400");
      onClose();
    } catch {
      showCustomToast(t("toast_error_try_later"), "bg-red-300");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (open) {
      form.reset();
    }
  }, [open]);

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <div className="flex flex-row-reverse">
          <AlertDialogCancel>
            <XIcon />
          </AlertDialogCancel>
        </div>
        <AlertDialogTitle className="text-left p-none">
          {t("print_invoice")}
        </AlertDialogTitle>
        <AlertDialogDescription className="text-left p-none">
          {t("choose_month_to_create")}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 flex flex-col px-14"
        >
          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("service")}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      className={field.value ? "text-black" : "text-gray-400"}
                    >
                      <SelectValue
                        placeholder={t("select_service_placeholder")}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {currentServices.map((value) => (
                      <SelectItem key={value} value={value}>
                        {sericesLabels[value as ServicesValuesT]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  {t("select_service_description")}
                </FormDescription>
                {form.formState.errors.service ? (
                  <FormMessage />
                ) : (
                  <div className="h-5" />
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="month"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>{t("month")}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    className="flex flex-col space-y-1"
                  >
                    {[
                      [t("prev_month"), "0"],
                      [t("cur_month"), "1"],
                    ].map((option, index) => (
                      <FormItem
                        className="flex items-center space-x-3 space-y-0"
                        key={index}
                      >
                        <FormControl>
                          <RadioGroupItem value={option[1]} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {option[0]}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormDescription>
                  {t("select_month_description")}
                </FormDescription>
                {form.formState.errors.month ? (
                  <FormMessage />
                ) : (
                  <div className="h-5" />
                )}
              </FormItem>
            )}
          />

          <Button
            className="w-full disabled:bg-gray-600"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : t("download")}
          </Button>
        </form>
      </Form>
    </AlertDialogContent>
  );
}

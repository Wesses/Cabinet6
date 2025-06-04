"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { useParams, useSearchParams } from "react-router-dom";
import { SEARCH_PARAM_TAB_KEY, TabsNamesT, TabsNamesValues } from "@/types";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function PrintInvoiceForm({ open, onClose }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { id } = useParams();

  const formSchema = z.object({
    month: z.string({
      message: t("required"),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const currentTab = searchParams.get(SEARCH_PARAM_TAB_KEY);

      if (!currentTab || !id) {
        showCustomToast(t("error_refresh"), "bg-red-300");

        return;
      }

      const { blob, fileName } = await getInvoiceBlob(
        +id,
        TabsNamesValues[currentTab as TabsNamesT],
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                {form.formState.errors.month ? (
                  <FormMessage />
                ) : (
                  <div className="h-5" />
                )}
              </FormItem>
            )}
          />

          <Button
            className="w-full disabled:bg-gray-600 max-w-"
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

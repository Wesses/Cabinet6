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
import { Input } from "@/components/ui/input";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { XIcon } from "lucide-react";
import { postPersonalaccont } from "@/api/api";
import Spinner from "./Spinner";
import { useState } from "react";
import { showCustomToast } from "@/utils/showCustomComponent";
import { useTranslation } from "react-i18next";
import { OrganizationDataT } from "@/types";

type Props = {
  getData: (successFunction: () => void) => void;
  lightInvoice: (invoice: number) => void;
  orgData?: OrganizationDataT | null;
};

const CabinetAddInvoiceForm = ({ getData, lightInvoice, orgData }: Props) => {
  const [isLoading, setIsloading] = useState(false);
  const { t } = useTranslation();

  const formSchema = z.object({
    pwd: z.string().min(2, {
      message: t("form_error_code_length"),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pwd: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsloading(true);

    (async () => {
      try {
        const newInvoice = await postPersonalaccont(values.pwd);
        showCustomToast(t("toast_successfully_created"), "bg-green-400");

        getData(() => lightInvoice(newInvoice.personalaccontsId));
      } catch (error) {
        if (error === 556) {
          form.setError("pwd", {
            type: "556",
            message: t("form_error_used_code_detail"),
          });
        } else {
          form.setError("pwd", {
            type: "401",
            message: t("form_error_input_another_code"),
          });
          if (error === 558) {
            showCustomToast(t("toast_incorect_code"), "bg-red-400");
          } else {
            showCustomToast(t("toast_error_try_later"), "bg-red-400");
          }
        }
      } finally {
        setIsloading(false);
      }
    })();
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <div className="flex flex-row-reverse">
          <AlertDialogCancel>
            <XIcon />
          </AlertDialogCancel>
        </div>

        <AlertDialogTitle className="text-left">
          {t("button_add_invoice")}
        </AlertDialogTitle>
        <AlertDialogDescription className="text-left">
          {t("add_incoive_part_1") + " "}
          <span className="text-orange-600 italic">
            {t("add_incoive_part_2")}
          </span>
          {", " + t("add_incoive_part_3")}
        </AlertDialogDescription>
        <p className="text-sm font-bold text-left text-foreground">
          {t("add_invoice_warning")}
        </p>
        {orgData?.contactPhone && (
          <p className="text-sm text-left text-foreground">{t("phone_number_label")} {orgData.contactPhone}</p>
        )}
        {orgData?.viberLinkAbon && (
          <a href={orgData.viberLinkAbon} className="text-sm text-left text-blue-500 hover:underline">{t("our_viber_bot")}</a>
        )}
      </AlertDialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-3xl mx-auto pb-10"
        >
          <FormField
            control={form.control}
            name="pwd"
            render={({ field }) => (
              <FormItem className="xl:w-[400px] md:w-[300px] w-[250px]">
                <FormLabel>{t("form_code_title")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("form_placeholder_code")}
                    type=""
                    {...field}
                    autoComplete="off"
                  />
                </FormControl>
                {form.formState.errors.pwd ? (
                  <FormMessage />
                ) : (
                  <div className="md:h-5 h-10" />
                )}
              </FormItem>
            )}
          />
          <Button
            className="w-full disabled:bg-primary/60"
            type="submit"
            disabled={isLoading || !form.formState.isValid}
          >
            {isLoading ? <Spinner /> : t("send")}
          </Button>
        </form>
      </Form>
    </AlertDialogContent>
  );
};

export default CabinetAddInvoiceForm;

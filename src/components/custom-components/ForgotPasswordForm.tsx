import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Separator } from "@radix-ui/react-separator";
import Spinner from "./Spinner";
import { postForgotPassword } from "@/api/api";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const ForgotPasswordForm = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const navigate = useNavigate();

  const formSchema = z.object({
    email: z.string().email({ message: t("form_error_email_invalid") }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    postForgotPassword(values.email)
      .then(() => setIsSent(true))
      .catch((e) => {
        const apiError = e as { status?: number | string; detail?: string | null };
        const status = apiError?.status;
        const detail = apiError?.detail;
        if (status === "NETWORK") {
          form.setError("email", { type: "network", message: t("error_no_response") });
        } else if (status === 429) {
          form.setError("email", { type: "429", message: t("error_too_many_requests") });
        } else {
          form.setError("email", {
            type: "server",
            message: detail ? t("error_server_detail_prefix") + detail : t("toast_error_try_later"),
          });
        }
      })
      .finally(() => setIsLoading(false));
  }

  if (isSent) {
    return (
      <div className="flex flex-col items-center gap-y-4 px-8 xl:px-0 py-4 mt-0 xl:mt-8 text-center">
        <div className="text-center">
          <h3 className="xl:text-2xl text-xl font-bold mb-2">{t("forgot_password_title")}</h3>
          <p className="text-muted-foreground xl:text-base text-sm">{t("forgot_password_success")}</p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/login")}
          className="w-full min-w-[300px] sm:min-w-[400px] max-w-[400px]"
        >
          {t("button_back")}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center gap-y-4 px-8 xl:px-0 py-4 mt-0 xl:mt-8">
      <div className="text-center">
        <h3 className="xl:text-2xl text-xl font-bold mb-2">{t("forgot_password_title")}</h3>
        <p className="text-muted-foreground xl:text-base text-sm">{t("forgot_password_second_title")}</p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 w-full min-w-[300px] sm:min-w-[400px] max-w-[400px]"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">{t("form_email")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    autoComplete="email"
                    className={cn({
                      "ring-2 ring-destructive ring-offset-2 focus-visible:ring-destructive":
                        form.formState.errors.email,
                    })}
                  />
                </FormControl>
                {form.formState.errors.email ? (
                  <FormMessage />
                ) : (
                  <div className="h-5" />
                )}
              </FormItem>
            )}
          />

          <Button
            className="w-full disabled:bg-primary/60"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : t("forgot_password_submit")}
          </Button>

          <div className="flex justify-center items-center gap-x-2">
            <Separator className="h-[1px] w-full" />
            <span className="uppercase text-muted-foreground text-sm whitespace-nowrap">
              {t("or_login")}
            </span>
            <Separator className="h-[1px] w-full" />
          </div>

          <Button
            className="w-full"
            variant="outline"
            onClick={() => navigate("/login")}
          >
            {t("button_login")}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
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
import Spinner from "./Spinner";
import { postResetPassword } from "@/api/api";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { showCustomToast } from "@/utils/showCustomComponent";

const ResetPasswordForm = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");

  const formSchema = z
    .object({
      newPassword: z
        .string()
        .min(6, t("form_error_password_length_6"))
        .refine((v) => /[0-9]/.test(v), { message: t("form_error_password_any_symbol") })
        .refine((v) => /[a-z]/.test(v), { message: t("form_error_password_any_lowercase_letter") })
        .refine((v) => /[A-Z]/.test(v), { message: t("form_error_password_any_uppercase_letter") })
        .refine((v) => /[^a-zA-Z0-9]/.test(v), { message: t("form_error_password_any_special_symbol") })
        .refine((v) => new Set(v).size >= 6, { message: t("form_error_password_more_special_symbols") }),
      confirmPassword: z.string().min(6, { message: t("form_error_confirm_password_length_6") }),
    })
    .superRefine(({ confirmPassword, newPassword }, ctx) => {
      if (confirmPassword !== newPassword) {
        ctx.addIssue({
          code: "custom",
          message: t("form_error_passwords_not_same"),
          path: ["confirmPassword"],
        });
      }
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  if (!userId || !token) {
    return <Navigate to="/forgot-password" replace />;
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setServerErrors([]);
    postResetPassword({
      userId: userId!,
      token: token!,
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
    })
      .then(() => {
        showCustomToast(t("reset_password_success"), "bg-green-600");
        navigate("/login");
      })
      .catch((e) => {
        const apiError = e as { status?: number | string; errors?: unknown };
        const { status, errors } = apiError;
        if (status === "NETWORK") {
          form.setError("newPassword", { type: "network", message: t("error_no_response") });
        } else if (status === 429) {
          form.setError("newPassword", { type: "429", message: t("error_too_many_requests") });
        } else if (errors) {
          const messages = Array.isArray(errors)
            ? (errors as string[])
            : Object.values(errors as Record<string, string[]>).flat();
          setServerErrors(messages);
        } else {
          form.setError("newPassword", { type: "server", message: t("toast_error_try_later") });
        }
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="flex flex-col justify-center items-center gap-y-4 px-8 xl:px-0 py-4 mt-0 xl:mt-8">
      <div className="text-center">
        <h3 className="xl:text-2xl text-xl font-bold mb-2">{t("reset_password_title")}</h3>
        <p className="text-muted-foreground xl:text-base text-sm">{t("reset_password_second_title")}</p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 w-full min-w-[300px] sm:min-w-[400px] max-w-[400px]"
        >
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">{t("form_new_password")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    autoComplete="new-password"
                    className={cn({
                      "ring-2 ring-destructive ring-offset-2 focus-visible:ring-destructive":
                        form.formState.errors.newPassword,
                    })}
                  />
                </FormControl>
                {form.formState.errors.newPassword ? (
                  <FormMessage />
                ) : (
                  <div className="h-5" />
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">{t("form_confirm_password")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    autoComplete="new-password"
                    className={cn({
                      "ring-2 ring-destructive ring-offset-2 focus-visible:ring-destructive":
                        form.formState.errors.confirmPassword,
                    })}
                  />
                </FormControl>
                {form.formState.errors.confirmPassword ? (
                  <FormMessage />
                ) : (
                  <div className="h-5" />
                )}
              </FormItem>
            )}
          />

          {serverErrors.length > 0 && (
            <ul className="text-sm text-destructive space-y-1">
              {serverErrors.map((msg, i) => <li key={i}>{msg}</li>)}
            </ul>
          )}

          <Button
            className="w-full disabled:bg-primary/60"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : t("reset_password_submit")}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;

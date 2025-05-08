import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

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
import { postRegistrationReq } from "@/api/api";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Spinner from "./Spinner";

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
import { useTranslation } from "react-i18next";
import { showCustomToast } from "@/utils/showCustomComponent";

const RegistrationForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAlerOpen, setIsAlertOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const formSchema = z
    .object({
      username: z.string().min(2, {
        message: t("form_error_username_length"),
      }),

      password: z
        .string()
        .min(6, t("form_error_password_length_6"))
        .refine((value) => /[0-9]/.test(value), {
          message: t("form_error_password_any_symbol"),
        })
        .refine((value) => /[a-z]/.test(value), {
          message: t("form_error_password_any_lowercase_letter"),
        })
        .refine((value) => /[A-Z]/.test(value), {
          message: t("form_error_password_any_uppercase_letter"),
        })
        .refine((value) => /[^a-zA-Z0-9]/.test(value), {
          message: t("form_error_password_any_special_symbol"),
        })
        .refine(
          (value) => {
            const uniqueChars = new Set(value).size;
            return uniqueChars >= 6;
          },
          {
            message: t("form_error_password_more_special_symbols"),
          }
        ),

      email: z.string().min(2, {
        message: t("form_error_email_length"),
      }),

      confirmPassword: z.string().min(6, {
        message: t("form_error_confirm_password_length_6"),
      }),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: t("form_error_passwords_not_same"),
          path: ["confirmPassword"],
        });
      }
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    postRegistrationReq(values)
      .then(() => {
        setIsAlertOpen(true);
      })
      .catch((errorCode) => {
        if (errorCode === 551) {
          showCustomToast(
            "Користувач з таким ім'ям вже існує, спробуйте інше.",
            "bg-red-400"
          );

          form.setError("username", {
            type: "551",
            message: "",
          });
          form.setError("password", {
            type: "551",
            message: "",
          });
          form.setError("confirmPassword", {
            type: "551",
            message: "",
          });
          form.setError("email", {
            type: "551",
            message: "",
          });

          return;
        }

        form.setError("username", {
          type: "552",
          message: t("form_error_service"),
        });
        form.setError("password", {
          type: "552",
          message: t("form_error_service"),
        });
        form.setError("confirmPassword", {
          type: "552",
          message: t("form_error_service"),
        });
        form.setError("email", {
          type: "552",
          message: t("form_error_service"),
        });
      })
      .finally(() => setIsLoading(false));
  }

  const handleLoginPage = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col justify-center items-center gap-y-4 px-8 xl:px-0 py-4 mt-0 xl:mt-8">
      <div className="text-center">
        <h3 className="xl:text-2xl text-xl font-bold mb-2">
          {t("register_title")}
        </h3>

        <p className="text-neutral-500 xl:text-base text-sm">
          {t("register_second_title")}
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 w-full min-w-[300px] sm:min-w-[400px] max-w-[400px]"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">
                  {t("form_username")}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    name="registration-username"
                    autoComplete="off"
                    id="registration-email"
                    className={cn({
                      "ring-2 ring-red-400 ring-offset-2 focus-visible:ring-red-400":
                        form.formState.errors.username,
                    })}
                  />
                </FormControl>
                {form.formState.errors.username ? (
                  <FormMessage />
                ) : (
                  <div className="h-5" />
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">{t("form_email")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    name="registration-email"
                    autoComplete="off"
                    id="registration-email"
                    type="email"
                    className={cn({
                      "ring-2 ring-red-400 ring-offset-2 focus-visible:ring-red-400":
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">
                  {t("form_password")}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    name="registration-password"
                    autoComplete="off"
                    id="registration-password"
                    type="password"
                    className={cn({
                      "ring-2 ring-red-400 ring-offset-2 focus-visible:ring-red-400":
                        form.formState.errors.password,
                    })}
                  />
                </FormControl>
                {form.formState.errors.password ? (
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
                <FormLabel className="text-black">
                  {t("form_confirm_password")}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    name="registration-confirm-password"
                    id="registration-confirm-password"
                    autoComplete="off"
                    className={cn({
                      "ring-2 ring-red-400 ring-offset-2 focus-visible:ring-red-400":
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

          <AlertDialog open={isAlerOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t("registration_success")}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t("registration_success_message")}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="xl: gap-2">
                <AlertDialogAction onClick={handleLoginPage}>
                  {t("button_to_login")}
                </AlertDialogAction>
                <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>
                  {t("button_stay_here")}
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button
            className="w-full disabled:bg-green-600"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : t("register_button")}
          </Button>

          <div className="flex justify-center items-center gap-x-2">
            <Separator className="bg-neutral-200 h-[1px] w-full" />
            <span className="uppercase text-neutral-500 text-sm whitespace-nowrap">
              {t("or_login")}
            </span>
            <Separator className="bg-neutral-200 h-[1px] w-full" />
          </div>

          <Button
            className="w-full"
            variant="outline"
            onClick={handleLoginPage}
          >
            {t("button_login")}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegistrationForm;

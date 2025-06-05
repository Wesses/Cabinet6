import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import Spinner from "./Spinner";
import { Separator } from "@radix-ui/react-separator";
import { useNavigate } from "react-router-dom";
import { postLoginReq } from "@/api/api";
import { useContext, useState } from "react";
import { cn } from "@/lib/utils";
import { UserContext } from "@/contexts/UserContext";
import { useTranslation } from "react-i18next";
import { CURRENT_PAGE_PARAM_KEY } from "@/utils/constants";

const LoginForm = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { handleSetUsername } = useContext(UserContext);

  const formSchema = z.object({
    username: z.string().min(2, {
      message: t("form_error_username_length"),
    }),

    password: z.string().min(2, {
      message: t("form_error_password_length"),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    postLoginReq(values)
      .then(() => {
        handleSetUsername(values.username);
        navigate(`/cabinet?${CURRENT_PAGE_PARAM_KEY}=1`);
      })
      .catch((e) => {
        if (e !== 401) {
          form.setError("username", {
            type: "500",
            message: t("toast_error_try_later"),
          });
          form.setError("password", {
            type: "500",
            message: t("toast_error_try_later"),
          });

          return;
        }    

        form.setError("username", {
          type: "401",
          message: t("form_error_login_or_pass"),
        });
        form.setError("password", {
          type: "401",
          message: t("form_error_login_or_pass"),
        });
      })
      .finally(() => setIsLoading(false));
  }

  const handleRegistrationPage = () => {
    navigate("/registration");
  };

  return (
    <div className="flex flex-col justify-center items-center gap-y-4 px-8 xl:px-0 py-4">
      <div className="text-center">
        <h3 className="xl:text-2xl text-xl font-bold mb-2">
          {t("login_title")}
        </h3>

        <p className="text-neutral-500 xl:text-base text-sm">
          {t("login_second_title")}
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
                    name="login-username"
                    autoComplete="login-username"
                    id="login-username"
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">
                  {t("form_password")}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    name="login-password"
                    autoComplete="login-password"
                    id="login-password"
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

          <Button
            className="w-full disabled:bg-green-600"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : t("login")}
          </Button>

          <div className="flex justify-center items-center gap-x-2">
            <Separator className="bg-neutral-200 h-[1px] w-full" />
            <span className="uppercase text-neutral-500 text-sm whitespace-nowrap">
              {t("or_register")}
            </span>
            <Separator className="bg-neutral-200 h-[1px] w-full" />
          </div>

          <Button
            className="w-full"
            variant="outline"
            onClick={handleRegistrationPage}
          >
            {t("register_button")}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;

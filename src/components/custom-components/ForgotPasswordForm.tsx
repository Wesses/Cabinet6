import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
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
import { Mail } from "lucide-react";
import Spinner from "./Spinner";
import { postForgotPassword } from "@/api/api";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const RESEND_LOCK_KEY = "forgot_pw_resend";
const RESEND_DELAY_MS = 60_000;

const MAIL_PROVIDERS: Record<string, { name: string; url: string }> = {
  "gmail.com": { name: "Gmail", url: "https://mail.google.com" },
  "ukr.net": { name: "Ukr.net", url: "https://mail.ukr.net" },
};

const getMailProvider = (email: string) => {
  const domain = email.split("@")[1]?.toLowerCase();
  return domain ? (MAIL_PROVIDERS[domain] ?? null) : null;
};

const saveLock = (email: string) => {
  const unlockAt = Date.now() + RESEND_DELAY_MS;
  localStorage.setItem(RESEND_LOCK_KEY, JSON.stringify({ email, unlockAt }));
  return unlockAt;
};

const ForgotPasswordForm = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [sentEmail, setSentEmail] = useState("");
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  // Restore state from localStorage on mount (survives page reload)
  useEffect(() => {
    const raw = localStorage.getItem(RESEND_LOCK_KEY);
    if (!raw) return;
    try {
      const { email, unlockAt } = JSON.parse(raw) as { email: string; unlockAt: number };
      const remaining = Math.ceil((unlockAt - Date.now()) / 1000);
      setSentEmail(email);
      setIsSent(true);
      if (remaining > 0) {
        setCountdown(remaining);
      } else {
        localStorage.removeItem(RESEND_LOCK_KEY);
      }
    } catch {
      localStorage.removeItem(RESEND_LOCK_KEY);
    }
  }, []);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

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
      .then(() => {
        saveLock(values.email);
        setSentEmail(values.email);
        setIsSent(true);
        setCountdown(60);
      })
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

  function handleResend() {
    setIsLoading(true);
    postForgotPassword(sentEmail)
      .then(() => {
        saveLock(sentEmail);
        setCountdown(60);
      })
      .finally(() => setIsLoading(false));
  }

  function handleBackToLogin() {
    localStorage.removeItem(RESEND_LOCK_KEY);
    navigate("/login");
  }

  if (isSent) {
    const provider = getMailProvider(sentEmail);
    return (
      <div className="flex flex-col items-center gap-5 px-4 py-6 w-full min-w-[300px] sm:min-w-[420px] max-w-[420px] text-center">
        <Mail className="w-16 h-16 sm:w-20 sm:h-20 text-primary" />

        <h2 className="text-2xl sm:text-3xl font-bold">{t("forgot_sent_title")}</h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          {t("forgot_sent_subtitle")}{" "}
          <span className="font-semibold text-foreground break-all">{sentEmail}</span>
        </p>

        <div className="bg-muted rounded-lg p-4 text-left w-full space-y-2">
          <p className="font-semibold text-base">{t("forgot_instruction_title")}</p>
          <ol className="list-decimal list-inside space-y-2 text-sm sm:text-base">
            <li>{t("forgot_instruction_1")}</li>
            <li>{t("forgot_instruction_2")}</li>
            <li>{t("forgot_instruction_3")}</li>
          </ol>
        </div>

        {provider && (
          <a
            href={provider.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button className="w-full h-12 text-base">
              {t("forgot_open_mail")} {provider.name}
            </Button>
          </a>
        )}

        <Button
          variant="outline"
          className="w-full"
          disabled={countdown > 0 || isLoading}
          onClick={handleResend}
        >
          {isLoading ? (
            <Spinner />
          ) : countdown > 0 ? (
            t("forgot_resend_in", { seconds: countdown })
          ) : (
            t("forgot_resend")
          )}
        </Button>

        <Button variant="ghost" className="w-full" onClick={handleBackToLogin}>
          {t("back_to_login")}
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

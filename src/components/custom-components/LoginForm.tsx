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
import { UserContext } from '@/contexts/UserContext';

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Ім'я користувача має містити принаймні 2 символи.",
  }),

  password: z.string().min(2, {
    message: "Пароль має бути не менше 2 символів.",
  }),
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { handleSetUsername } = useContext(UserContext);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    postLoginReq(values)
      .then(() => {
        handleSetUsername(values.username);
        navigate("/cabinet");
      })
      .catch(() => {
        form.setError("username", {
          type: "401",
          message: "Невірний логін або пароль.",
        });
        form.setError("password", {
          type: "401",
          message: "Невірний логін або пароль.",
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
          Увійдіть до свого облікового запису
        </h3>

        <p className="text-neutral-500 xl:text-base text-sm">
          Введіть ім'я користувача та пароль, щоб увійти у свій обліковий
          запис
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 w-full max-w-[400px]"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Ім'я користувача</FormLabel>
                <FormControl>
                  <Input
                    {...field}
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
                <FormLabel className="text-black">Пароль</FormLabel>
                <FormControl>
                  <Input
                    {...field}
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
            {isLoading ? <Spinner /> : "Вхід"}
          </Button>

          <div className="flex justify-center items-center gap-x-2">
            <Separator className="bg-neutral-200 h-[1px] w-full" />
            <span className="uppercase text-neutral-500 text-sm whitespace-nowrap">
              або зареєструватися
            </span>
            <Separator className="bg-neutral-200 h-[1px] w-full" />
          </div>

          <Button
            className="w-full"
            variant="outline"
            onClick={handleRegistrationPage}
          >
            Зареєструватися
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;

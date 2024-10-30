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
import { cn } from "@/lib/utils";

const formSchema = z
  .object({
    username: z.string().min(2, {
      message: "Ім'я користувача має містити принаймні 2 символи.",
    }),

    password: z.string().min(2, {
      message: "Пароль має бути не менше 2 символів.",
    }),

    email: z.string().min(2, {
      message: "Пошта має бути не менше 2 символів.",
    }),

    confirmPassword: z.string().min(2, {
      message: "Пароль має бути не менше 2 символів.",
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Паролі не збігаються",
        path: ["confirmPassword"],
      });
    }
  });

const RegistrationForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const handleLoginPage = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col justify-center items-center gap-y-4 px-8 xl:px-0 py-4 mt-0 xl:mt-8">
      <div className="text-center">
        <h3 className="xl:text-2xl text-xl font-bold mb-2">
          Зареєструвати новий обліковий запис
        </h3>

        <p className="text-neutral-500 xl:text-base text-sm">
          Введіть необхідні данні нижче, щоб зареєструвати свій обліковий запис
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Електронна пошта</FormLabel>
                <FormControl>
                  <Input
                    {...field}
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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Підтвердіть пароль</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
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

          <Button className="w-full" type="submit">
            Зареєструватися
          </Button>

          <div className="flex justify-center items-center gap-x-2">
            <Separator className="bg-neutral-200 h-[1px] w-full" />
            <span className="uppercase text-neutral-500 text-sm whitespace-nowrap">
              або увійдіть, якщо є аккаунт
            </span>
            <Separator className="bg-neutral-200 h-[1px] w-full" />
          </div>

          <Button
            className="w-full"
            variant="outline"
            onClick={handleLoginPage}
          >
            Увійти
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegistrationForm;

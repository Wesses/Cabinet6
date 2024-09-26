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
import { Separator } from "@radix-ui/react-separator";
import { useNavigate } from 'react-router';

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

  
  const navigate = useNavigate();

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const handleRegistrationPage = () => {
    navigate('/registration');
  }

  return (
    <div className="flex flex-col justify-center items-center gap-y-4 px-8 xl:px-0 py-4">
      <div className="flex flex-col items-center gap-y-2 text-center">
        <h3 className="xl:text-2xl text-xl font-bold">
          Увійдіть до свого облікового запису
        </h3>

        <p className="text-neutral-500 xl:text-base text-sm">
          Введіть свою електронну адресу нижче, щоб увійти у свій обліковий
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
                <FormLabel>Ім'я користувача</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                {form.formState.errors.password ? (
                  <FormMessage />
                ) : (
                  <div className="h-5" />
                )}
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit">
            Вхід
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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Cookies from "js-cookie";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import Autocomplete from "./Autocomplete";

const formSchema = z.object({
  settlement: z.string().min(2, {
    message: "Населений пункт обов'язковий.",
  }),

  street: z.string().min(2, {
    message: "Вулиця обов'язкова.",
  }),

  house: z.string().min(2, {
    message: "Номер будинку обов'язковий.",
  }),

  apartment: z.string().min(2, {
    message: "Номер квартири обов'язковий.",
  }),
});

const mockData = [
  "111",
  "222222222222222222222222222222222222",
  "333",
  "444",
  "555",
  "332",
];
//---------------------------------------------------------------------
const CabinetForm = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      settlement: "",
      street: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  useEffect(() => {
    if (Cookies.get("Token")) {
      navigate("/cabinet");
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-y-4 px-8 xl:px-0 py-4">
      <div className="text-center">
        <p className="text-neutral-500 xl:text-base text-sm">
          Введіть адресу і особовий рахунок (усі поля обов'язкові):
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full h-full flex flex-col"
        >
          <div className="w-full h-full flex flex-row gap-3">
            <FormField
              control={form.control}
              name="settlement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Населений пункт:</FormLabel>
                  <FormControl>
                    <Autocomplete
                      field={field}
                      className={cn({
                        "ring-2 ring-red-400 ring-offset-2 focus-visible:ring-red-400":
                          form.formState.errors.settlement,
                      })}
                      placeHolder="Населений пункт..."
                      data={mockData}
                    />
                  </FormControl>
                  {form.formState.errors.settlement ? (
                    <FormMessage />
                  ) : (
                    <div className="h-5" />
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Вулиця:</FormLabel>
                  <FormControl>
                    <Autocomplete
                      field={field}
                      className={cn({
                        "ring-2 ring-red-400 ring-offset-2 focus-visible:ring-red-400":
                          form.formState.errors.street,
                      })}
                      placeHolder="Вулиця..."
                      data={mockData}
                    />
                  </FormControl>
                  {form.formState.errors.street ? (
                    <FormMessage />
                  ) : (
                    <div className="h-5" />
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="house"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Будинок:</FormLabel>
                  <FormControl>
                    <Autocomplete
                      field={field}
                      className={cn({
                        "ring-2 ring-red-400 ring-offset-2 focus-visible:ring-red-400":
                          form.formState.errors.house,
                      })}
                      placeHolder="Будинок..."
                      data={mockData}
                    />
                  </FormControl>
                  {form.formState.errors.house ? (
                    <FormMessage />
                  ) : (
                    <div className="h-5" />
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="apartment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Квартира:</FormLabel>
                  <FormControl>
                    <Autocomplete
                      field={field}
                      className={cn({
                        "ring-2 ring-red-400 ring-offset-2 focus-visible:ring-red-400":
                          form.formState.errors.apartment,
                      })}
                      placeHolder="Квартира..."
                      data={mockData}
                    />
                  </FormControl>
                  {form.formState.errors.apartment ? (
                    <FormMessage />
                  ) : (
                    <div className="h-5" />
                  )}
                </FormItem>
              )}
            />
          </div>

          <Button className="disabled:bg-green-600" type="submit">
            "Вхід"
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CabinetForm;

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
import { postPersonalacconts } from "@/api/api";
import Spinner from "./Spinner";
import { useState } from "react";
import { showCustomToast } from "@/utils/showCustomComponent";

type Props = {
  getData: () => void;
  lightInvoice: (invoice: number) => void;
};

const formSchema = z.object({
  pwd: z.string().min(2, {
    message: "Код доступу має містити принаймні 2 символи.",
  }),
});

const CabinetAddInvoiceForm = ({ getData, lightInvoice }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pwd: "",
    },
  });
  const [isLoading, setIsloading] = useState(false);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsloading(true);

    (async () => {
      try {
        const newInvoice = await postPersonalacconts(values.pwd);
        showCustomToast("Успішно створенно", "bg-green-400");

        setTimeout(() => {
          getData();
          lightInvoice(newInvoice.paLs);
        }, 3000);
      } catch (error) {
        form.setError("pwd", {
          type: "401",
          message: "Введіть інший код доступу.",
        });

        if (error === 558) {
          showCustomToast(
            "Ви ввели не правильний код доступу, перевірте правильність вводу",
            "bg-red-400"
          );
        }

        if (error === 556) {
          showCustomToast(
            "Код доступу до особового рахунку вже був використаний, введіть інший",
            "bg-red-400"
          );
        }

        if (error !== 558 && error !== 556) {
          showCustomToast("Помилка, спробуйте пізніше", "bg-red-400");
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
          Додати особовий рахунок
        </AlertDialogTitle>
        <AlertDialogDescription className="text-left">
          Для того, щоб додати особовий рахунок, потрібно ввести{" "}
          <span className="text-orange-600 italic">
            код доступу до особового рахунку
          </span>{", "}
          який можна отримати від надавача комунальних послуг.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-3xl mx-auto pb-10 "
        >
          <FormField
            control={form.control}
            name="pwd"
            render={({ field }) => (
              <FormItem className="xl:w-[400px] md:w-[300px] w-[250px]">
                <FormLabel>Код доступу до особового рахунку</FormLabel>
                <FormControl>
                  <Input placeholder="Введіть код тут:" type="" {...field} autoComplete="off" />
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
            className="w-full disabled:bg-green-600"
            type="submit"
            disabled={isLoading || !form.formState.isValid}
          >
            {isLoading ? <Spinner /> : "Відправити"}
          </Button>
        </form>
      </Form>
    </AlertDialogContent>
  );
};

export default CabinetAddInvoiceForm;

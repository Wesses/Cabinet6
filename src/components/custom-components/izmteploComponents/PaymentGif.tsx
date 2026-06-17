import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

const PRIVAT_PAYMENT_URL =
  "https://next.privat24.ua/payments/form/%7B%22token%22%3A%2294edc806-4a1e-4688-90e7-69770cc62c05%22%7D";

const PaymentContent = () => (
  <div className="flex flex-col items-center lg:items-start lg:pl-4 w-full">
    <p className="mb-2 text-2xl font-bold">Сплатити</p>
    <a
      href={PRIVAT_PAYMENT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="w-[60%] max-w-[600px]"
    >
      <img
        src={`${import.meta.env.VITE_BASE_URL}/privat_ua.gif`}
        alt="Оплата через ПриватБанк"
        className="w-full cursor-pointer"
      />
    </a>

    <div className="mt-4 text-center lg:text-left max-w-[700px] space-y-2 px-4 text-sm">
      <p className="text-base font-bold">
        Реквізити для оплати наших послуг у будь-якому банку України:
      </p>

      <p>
        КОМУНАЛЬНЕ ПІДПРИЄМТСВО &quot;ТЕПЛОВІ МЕРЕЖІ
        ІЗМАЇЛТЕПЛОКОМУНЕНЕРГО&quot;
      </p>
      <p>Код згідно з ЄДРПОУ 05514413</p>

      <p className="font-bold">Послуга з постачання теплової енергії</p>
      <p>
        Розрахунковий рахунок:{" "}
        <span className="font-bold">UA843288450000026008301170168</span>
      </p>
      <p>у Філія Одеське ОУ АТ &quot;Ощадбанк&quot;, МФО 328845</p>

      <p className="font-bold">Плата за абонентське обслуговування</p>
      <p>
        Розрахунковий рахунок:{" "}
        <span className="font-bold">UA743288450000026006303170168</span>
      </p>
      <p>у Філія Одеське ОУ АТ &quot;Ощадбанк&quot;, МФО 328845</p>

      <p className="font-bold">
        Послуга з обслуговування внутрішньобудинкових мереж системи опалення
        (ОВБМ)
      </p>
      <p>
        Розрахунковий рахунок:{" "}
        <span className="font-bold">UA793288450000026007302170168</span>
      </p>
      <p>у Філія Одеське ОУ АТ &quot;Ощадбанк&quot;, МФО 328845</p>
    </div>
  </div>
);

const PaymentGif = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile: button opens dialog */}
      <div className="lg:hidden flex justify-center mt-auto pb-4 w-full">
        <Button
          className="w-4/5 max-w-[400px] bg-primary-foreground text-primary hover:bg-primary-foreground/80"
          onClick={() => setOpen(true)}
        >
          {t("payment_button")}
        </Button>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent className="h-dvh">
            <DrawerHeader className="flex flex-row items-center justify-between">
              <DrawerTitle>{t("payment_button")}</DrawerTitle>
              <DrawerClose asChild>
                <Button variant="ghost" size="sm">{t("close")}</Button>
              </DrawerClose>
            </DrawerHeader>
            <div className="overflow-y-auto px-4 pb-8">
              <PaymentContent />
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Desktop: full inline content */}
      <div
        className="hidden lg:block w-full h-full pt-40 pb-4 overflow-y-auto text-primary-foreground"
        style={{ direction: "rtl" }}
      >
        <div style={{ direction: "ltr" }}>
          <PaymentContent />
        </div>
      </div>
    </>
  );
};

export default PaymentGif;

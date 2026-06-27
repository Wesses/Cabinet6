import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import QRCode from "react-qr-code";
import chteLogoSrc from '@/assets/chte/chte_logo.png';
import privatGif from '@/assets/shared/privat_ua.gif';
import city24Src from '@/assets/chte/city24.png';
import mtbSrc from '@/assets/chte/mtb.jpg';
import vostokSrc from '@/assets/chte/vostok.jpg';

const VIBER_URL = "viber://pa?chatURI=chernomorsk_teplo";

const BANKS = [
  {
    name: "Приват24",
    url: "https://next.privat24.ua/payments/form/%7B%22token%22:%22851fe060-3bfb-4fed-a974-d0590bdcdedc%22%7D",
    img: privatGif,
  },
  {
    name: "City 24",
    url: "https://city24.ua/ua/default/search?text=%D0%A7%D0%9E%D0%A0%D0%9D%D0%9E%D0%9C%D0%9E%D0%A0%D0%A1%D0%AC%D0%9A%D0%A2%D0%95%D0%9F%D0%9B%D0%9E%D0%95%D0%9D%D0%95%D0%A0%D0%93%D0%9E&koshik=false",
    img: city24Src,
  },
  {
    name: "МТБ БАНК",
    url: "https://mtb.ua/mtb-360",
    img: mtbSrc,
  },
  {
    name: "VST Bank",
    url: "https://communality.vostok.bank/3219",
    img: vostokSrc,
  },
];

const Logo = () => (
  <div className="bg-primary-foreground/10 rounded p-1 w-fit self-center">
    <img
      src={chteLogoSrc}
      alt="Чорноморськтеплоенерго"
      className="h-16 w-auto object-contain"
    />
  </div>
);

const PaymentDetails = () => (
  <div className="text-sm space-y-1 max-w-[680px]">
    <p className="font-bold text-base">
      Реквізити для оплати наших послуг у будь-якому банку України:
    </p>
    <p>
      Комунальне підприємство «Чорноморськтеплоенерго» Чорноморської міської ради Одеської області
    </p>
    <p>Код згідно з ЄДРПОУ: <span className="font-semibold">31619819</span></p>
    <p>
      Р/рахунок <span className="font-semibold">UA743288450000026009300166558</span>{" "}
      (плата за послугу теплопостачання)
    </p>
    <p className="text-xs opacity-80">
      ПАТ «Державний Ощадний банк України», ТВБВ №10015/0510 філії Одеського управління, МФО 328845
    </p>
    <p>
      Р/рахунок <span className="font-semibold">UA413281680000026002000002020</span>{" "}
      (абонентське обслуговування)
    </p>
    <p className="text-xs opacity-80">ПАТ «Морський транспортний банк»</p>
  </div>
);

const BankLinks = () => (
  <div className="grid grid-cols-1 gap-2 w-full max-w-[320px]">
    {BANKS.map((bank) => (
      <a
        key={bank.name}
        href={bank.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-1 p-3 rounded-md border border-primary-foreground/30 hover:bg-primary-foreground/10 transition-colors"
      >
        <div className="bg-white rounded p-1 flex items-center justify-center h-20 w-full">
          <img src={bank.img} alt={bank.name} className="h-16 w-auto object-contain" />
        </div>
        <span className="text-sm text-primary-foreground text-center leading-tight">{bank.name}</span>
      </a>
    ))}
  </div>
);

const ChteContent = () => {
  const { t } = useTranslation();
  const [qrOpen, setQrOpen] = useState(false);
  const [banksOpen, setBanksOpen] = useState(false);

  return (
    <>
      {/* Mobile */}
      <div className="lg:hidden flex flex-col items-center mt-auto pb-4 gap-3 w-full">
        <Button
          className="w-4/5 max-w-[400px] bg-primary-foreground text-primary hover:bg-primary-foreground/80"
          onClick={() => setQrOpen(true)}
        >
          {t("our_viber_bot")}
        </Button>
        <Button
          className="w-4/5 max-w-[400px] bg-primary-foreground text-primary hover:bg-primary-foreground/80"
          onClick={() => setBanksOpen(true)}
        >
          {t("pay_online")}
        </Button>

        <AlertDialog open={qrOpen} onOpenChange={setQrOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <Logo />
              </AlertDialogTitle>
              <AlertDialogDescription className="sr-only">Viber QR</AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex flex-col items-center gap-2 py-4">
              <a href={VIBER_URL} target="_blank" rel="noopener noreferrer">
                <QRCode value={VIBER_URL} size={220} />
              </a>
              <span className="text-sm text-muted-foreground">{t("our_viber_bot")}</span>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>{t("close")}</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={banksOpen} onOpenChange={setBanksOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t("pay_online")}</AlertDialogTitle>
              <AlertDialogDescription className="sr-only">Оплата онлайн</AlertDialogDescription>
            </AlertDialogHeader>
            <div className="overflow-y-auto max-h-[60vh] flex justify-center py-4">
              <BankLinks />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>{t("close")}</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex w-full h-full pt-36 pb-4 overflow-y-auto text-primary-foreground flex-col gap-4 px-4">
        <Logo />

        <div className="flex-shrink-0 p-2 border rounded-md border-primary-foreground/40 w-fit">
          <a
            href={VIBER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1"
          >
            <QRCode value={VIBER_URL} size={100} />
            <span className="text-sm text-primary-foreground">{t("our_viber_bot")}</span>
          </a>
        </div>

        <PaymentDetails />

        <div>
          <p className="text-sm font-semibold mb-2">{t("pay_online")}:</p>
          <BankLinks />
        </div>
      </div>
    </>
  );
};

export default ChteContent;

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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import QRCode from "react-qr-code";

const VIBER_URL = "viber://pa?chatURI=bilvoda";
const WEBSITE_URL = "https://communal.in.ua/belvk/";

const ViberQR = () => (
  <div className="flex-shrink-0 p-2 border rounded-md border-primary-foreground/40 w-fit mx-auto">
    <a
      href={VIBER_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-1"
    >
      <QRCode value={VIBER_URL} size={100} />
      <span className="text-sm text-primary-foreground">{"Наш Viber чат"}</span>
    </a>
  </div>
);

const AnnouncementContent = () => (
  <div className="text-sm space-y-2 max-w-[680px]">
    <p className="font-bold text-base">
      До уваги абонентів КП «Біляївський водоканал»
    </p>
    <p>
      КП «Біляївський водоканал» повідомляє, що відповідно до рішень виконавчого комітету
      Біляївської міської ради від 09 січня 2025 року № 1 «Про коригування тарифу на послугу
      з централізованого водопостачання» та № 2 «Про коригування тарифу на послугу з
      централізованого водовідведення» з 01 лютого 2025 року встановлено тарифи на послуги з:
    </p>
    <ul className="list-none pl-2 space-y-1">
      <li>— централізованого водопостачання – <span className="font-semibold">37,94 грн. за 1 куб.м</span> (з ПДВ);</li>
      <li>— централізованого водовідведення – <span className="font-semibold">63,33 грн. за 1 куб.м</span> (з ПДВ).</li>
    </ul>
    <p>
      Враховуючи вищезазначене, просимо всіх абонентів надати показники вузлів обліку за
      січень 2025 року до 31 січня 2025 року зручним для Вас шляхом:
    </p>
    <ol className="list-decimal pl-5 space-y-1">
      <li>
        Внесення показників на сайті КП «Біляївський водоканал»:{" "}
        <a href={WEBSITE_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-80">
          {WEBSITE_URL}
        </a>
      </li>
      <li>
        Через Viber – чат-бот за посиланням:{" "}
        <a href={VIBER_URL} className="underline underline-offset-2 hover:opacity-80">
          {VIBER_URL}
        </a>
      </li>
      <li>
        Зателефонувавши за номером телефону абонентського відділу КП «Біляївський
        водоканал»: <span className="font-semibold">0687826850, (04852) 2-22-03</span>{" "}
        Пн-Чт, з 8.00 до 16.30, п&apos;ятниця з 8.00 до 15.30.
      </li>
      <li>
        Безпосередньо в абонентському відділі КП «Біляївський водоканал» Пн-Чт, з 8.00
        до 16.30, п&apos;ятниця з 8.00 до 15.30, а також:
        <ul className="list-none pl-3 mt-1 space-y-1">
          <li>— с. Кагарлик, вул. Центральна, 4 – 14, 28 січня з 08.00 до 12.00</li>
          <li>— с. Мирне, вул. Центральна, 96-в – 17, 24 січня з 08.00 до 12.00</li>
          <li>— с-ще працівників ВОС «Дністер», вул. Садова, 5 – 17, 24 січня з 08.00 до 12.00</li>
        </ul>
      </li>
      <li>
        31 січня 2025 року буде здійснено виїзд до с. Кагарлик, с. Мирне, с-ща Повстанське,
        с. Майори з 09.00 до 12.00:
        <ul className="list-none pl-3 mt-1 space-y-1">
          <li>— с-ще ВОС «Дністер», вул. Садова, 5</li>
          <li>— с. Кагарлик, вул. Центральна, 4</li>
          <li>— с. Мирне, вул. Центральна, 96-в</li>
          <li>— с. Майори, вул. Шкільна, 7Б</li>
          <li>— с-ще Повстанське, вул. Паркова, 1А</li>
        </ul>
      </li>
    </ol>
    <p>
      У разі відсутності інформації про показання вузла обліку, абоненту буде нараховано
      до сплати згідно середньомісячного споживання послуги за попередні 12 місяців.
    </p>
    <p className="font-semibold">Адміністрація КП «Біляївський водоканал»</p>
  </div>
);

const BelvkContent = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

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
          onClick={() => setOpen(true)}
        >
          Оголошення
        </Button>

        <AlertDialog open={qrOpen} onOpenChange={setQrOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t("our_viber_bot")}</AlertDialogTitle>
              <AlertDialogDescription className="sr-only">Viber QR</AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex justify-center py-4">
              <a href={VIBER_URL} target="_blank" rel="noopener noreferrer">
                <QRCode value={VIBER_URL} size={220} />
              </a>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>{t("close")}</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent className="h-dvh">
            <DrawerHeader className="flex flex-row items-center justify-between">
              <DrawerTitle>До уваги абонентів</DrawerTitle>
              <DrawerClose asChild>
                <Button variant="ghost" size="sm">{t("close")}</Button>
              </DrawerClose>
            </DrawerHeader>
            <div className="overflow-y-auto px-4 pb-8">
              <AnnouncementContent />
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex w-full h-full pt-36 pb-4 overflow-y-auto text-primary-foreground flex-col gap-4 px-4">
        <ViberQR />
        <AnnouncementContent />
      </div>
    </>
  );
};

export default BelvkContent;

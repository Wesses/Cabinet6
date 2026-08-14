import { useState } from "react";
import { TriangleAlert } from "lucide-react";
import QRCode from "react-qr-code";
import sbuEmblemSrc from "@/assets/shared/sbu_emblem.png";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

// Official SBU wartime scam-awareness notice. Text is deliberately hardcoded
// in Ukrainian (not run through i18n) to match how other official/legal
// copy is handled in this codebase — see the payment requisites in
// ChteContent.tsx / PaymentGif.tsx. Shared across whichever aliases opt in
// (currently brovoda, broteplo), so it lives at the top level of
// custom-components/ rather than under a single alias's folder.
const SBU_BOT_URL = "https://t.me/stop_russian_war_bot";

const BannerContent = () => (
  <div className="flex items-center gap-3 rounded-md border border-red-300 bg-red-50 p-3 text-red-800 shadow-sm">
    <div className="flex-1 text-xs sm:text-sm leading-snug">
      <p className="font-bold">
        Увага! СБУ наголошує: ми не комунікуємо з людьми через анонімні чати.
        Це ворожі агенти або шахраї!
      </p>
      <p className="mt-1 font-semibold">
        Отримали пропозицію? Негайно повідомте:
      </p>
      <ul className="mt-1 list-inside list-disc space-y-0.5">
        <li>
          Офіційний Бот СБУ в Telegram:{" "}
          <a
            href={SBU_BOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline"
          >
            @stop_russian_war_bot
          </a>
        </li>
        <li>
          Гаряча лінія СБУ:{" "}
          <span className="font-semibold">0 800 501 482</span>, короткий
          номер <span className="font-semibold">1516</span>
        </li>
        <li>
          Електронна пошта:{" "}
          <a
            href="mailto:callcenter@ssu.gov.ua"
            className="font-semibold underline"
          >
            callcenter@ssu.gov.ua
          </a>
        </li>
      </ul>
    </div>

    <div className="flex shrink-0 flex-col items-center gap-1">
      <a
        href={SBU_BOT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded bg-white p-1"
      >
        <QRCode value={SBU_BOT_URL} size={64} />
      </a>
      <img
        src={sbuEmblemSrc}
        alt="Герб СБУ"
        className="h-14 w-14 object-contain"
      />
    </div>
  </div>
);

const SbuWarningBanner = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile: the login panel is a short, non-scrolling strip here —
          the full card would get clipped, so show a compact alert button
          that opens a scrollable Drawer with the full notice instead. */}
      <div className="lg:hidden flex justify-center mt-auto pb-2 w-full px-3">
        <Button
          variant="outline"
          className="w-full max-w-[400px] border-red-300 bg-red-50 text-red-800 hover:bg-red-100"
          onClick={() => setOpen(true)}
        >
          <TriangleAlert className="mr-2 h-4 w-4" />
          Увага! Попередження СБУ
        </Button>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent className="max-h-[85dvh]">
            <DrawerHeader className="flex flex-row items-center justify-between">
              <DrawerTitle>Попередження СБУ</DrawerTitle>
              <DrawerClose asChild>
                <Button variant="ghost" size="sm">
                  Закрити
                </Button>
              </DrawerClose>
            </DrawerHeader>
            <div className="overflow-y-auto px-4 pb-4">
              <BannerContent />
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Desktop: full panel height available, show the notice inline. */}
      <div className="hidden lg:block w-full px-4 pt-40">
        <BannerContent />
      </div>
    </>
  );
};

export default SbuWarningBanner;

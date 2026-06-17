import { useState } from "react";
import { useTranslation } from "react-i18next";
import QRCode from "react-qr-code";
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

const VIBER_URL = "viber://pa?chatURI=rozdilnavoda";

function RozdilnaContent() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile */}
      <div className="lg:hidden flex flex-col items-center mt-auto pb-4 w-full">
        <Button
          className="w-4/5 max-w-[400px] bg-primary-foreground text-primary hover:bg-primary-foreground/80"
          onClick={() => setOpen(true)}
        >
          {t("our_viber_bot")}
        </Button>
        <AlertDialog open={open} onOpenChange={setOpen}>
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
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex flex-col items-center justify-center h-full gap-4 pt-40 text-primary-foreground">
        <div className="p-2 border rounded-md border-primary-foreground/40 w-fit">
          <a
            href={VIBER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1"
          >
            <QRCode value={VIBER_URL} size={100} />
            <span className="text-base text-primary-foreground">{t("our_viber_bot")}</span>
          </a>
        </div>
      </div>
    </>
  );
}

export default RozdilnaContent;

import { useTranslation } from "react-i18next";
import QRCode from "react-qr-code";

const VIBER_URL = "viber://pa?chatURI=rozdilnavoda";

function RozdilnaContent() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-row items-center justify-center h-full gap-4 pb-4 overflow-y-auto lg:flex-col lg:pt-40 text-primary-foreground">
      <div className="p-2 border rounded-md border-primary-foreground/40">
        <a
          href={VIBER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-row items-center gap-1 lg:flex-col"
        >
          <QRCode value={VIBER_URL} size={100} />
          <span className="text-base text-primary-foreground">{t("our_viber_bot")}</span>
        </a>
      </div>
    </div>
  );
}

export default RozdilnaContent;

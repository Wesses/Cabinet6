import { useTranslation } from "react-i18next";

const VIBER_URL = "viber://pa?chatURI=izmailvoda";
const PAYMENT_URL =
  "https://www.portmone.com.ua/r3/oplatyty-vodu-izmailske-vuvkh-odesa";
const QR_SRC =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH0AAAB9CAYAAACPgGwlAAADA0lEQVR4nO3WQY7DMAxD0dz/0p0LTAo5pCnV+QKyiy1KLwV6Xdf1mfIo1dXDnS/0tAcAHXQfCOiggw66p4c7Xxt6otwLdPeo3teVRcw8J4z7LOiggw66JzPoYhj3WdBF9OrA7iVMWlbivsSeQb8p0ENhlPfcBXoojPKeu0APhVHecxfooTCJBSo9uj5y0MUFKj1ABx100EEH3ZgZ9NxiHt+nzAv6wgJBBx307/fNCaMsEHTQQf9+3/NBlHL3VZblBknMWy3QQQcd9AFh3PeBDjro39C7HmVZv/he49MeoH35oIMOOuigg34C+r8JB1V1qcp9iY9yUo1PCLq/xicE3V/jE4Lur/EJQffXlViC+1kYriWLe45qj4WzoIMOOuiggw76CeiRJoEPJpFF6TFqf+7GkdCgS31BB11vHAkNutQX9DeiK4vuetyLSdSkjw100H/j6VqqUqCDDjronnzlHSqHE2e78nUhJQp00O/DgA466IuZ3WeVAv2N6O7QJy+/68fgLtAXzoL+AR100EEH3XfWXZF/71LAQR9HIl8ki3K4ejYyyCH5IlmUw9WzkUEOyRfJohyuno0Mcki+SBblcPVsZJBD8oWyeJelLCEB1zVvogfoNwU66KBPDKhkcc+hzJvoAfpNgX5p/96V5VfLvdSuD7DrgwYddNBBNy3LXaCDDrphV1digcp9GwYe3Tf0kYM+qS/ooIOeXH5XX9BB34Nenq6plIHd77k/GKWvdJ+UMFCggw466Nn3QA8V6BvQleHcT9fyu+ZQ3hPn6McGff09cY5+bNDX3xPn6McGff09cY5+bNDX3xPneN5EKTe6u4d7DuW+DT8Q0EEHHfRdBXr9PtBBz6EvXNgCouRzoycecVeggw466I7hxICggw768ejTz076YBb6gq6cBR100EH33Af6sLOgb0BXhnNXIou7x40J6NUCHXTQQZ/ZA3SxXofuLvfHlujhfhrnBR100EHfVcOWAHqihi0B9FOWkFhqYgfu2UAHHXTQQX+6VNBBn4X+BzAglVPHnkKhAAAAAElFTkSuQmCC";

function ViberBotRefs() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-row items-center justify-center h-full gap-4 pb-4 overflow-y-auto lg:flex-col lg:pt-40 text-primary-foreground">
      <div className="p-2 border rounded-md border-primary-foreground/40">
        <a
          href={VIBER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-row items-center gap-1 items fitems-center lg:flex-col"
        >
          <img
            src={QR_SRC}
            alt="Viber bot QR code"
            width={100}
            height={100}
            className="rounded-md"
          />
          <span className="text-base text-primary-foreground">{t("our_viber_bot")}</span>
        </a>
      </div>
      <a
        href={PAYMENT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-base underline text-primary-foreground underline-offset-2 hover:opacity-80"
      >
        {t("pay_online")}
      </a>
    </div>
  );
}

export default ViberBotRefs;

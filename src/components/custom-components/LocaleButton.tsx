import { useTranslation } from "react-i18next";
import { localStorages, locales } from "@/utils/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import uaFlag from "@/assets/flags/ua.svg";
import gbFlag from "@/assets/flags/gb.svg";
import ruFlag from "@/assets/flags/ru.svg";

const flagMap: Record<string, string> = { ua: uaFlag, gb: gbFlag, ru: ruFlag };

type Props = {
  isLabel: boolean;
};

const LocaleButton = ({ isLabel }: Props) => {
  const { i18n } = useTranslation();
  const { changeLanguage, language } = i18n;
  const { t } = useTranslation();

  const handleClick = (locale: string) => {
    changeLanguage(locale);
    localStorage.setItem(localStorages.LOCALE, locale);
  };

  const getContryCode = (cCode: string) => (cCode === "en" ? "gb" : cCode);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          { "bg-primary-foreground text-primary hover:bg-primary-foreground/80 uppercase": isLabel },
          "flex items-center gap-x-2 outline-none transition-all duration-300 rounded-md px-2 py-2"
        )}
      >
        <img src={flagMap[getContryCode(language)]} className="w-6 h-4 object-cover rounded-sm" alt={language} />
        {isLabel && language}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{t("button_choose_lang")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {Object.values(locales)
          .filter((locale) => locale !== language)
          .map((locale) => (
            <DropdownMenuItem
              className="uppercase"
              onClick={() => handleClick(locale)}
              key={locale}
            >
              <img src={flagMap[getContryCode(locale)]} className="w-6 h-4 object-cover rounded-sm" alt={locale} />

              {locale}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LocaleButton;

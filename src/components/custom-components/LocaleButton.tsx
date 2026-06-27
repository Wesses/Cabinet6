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

const flagMap: Record<string, string> = { ua: uaFlag, gb: gbFlag };

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

  const renderFlag = (locale: string) => {
    const flag = flagMap[getContryCode(locale)];
    if (!flag) return null;
    return <img src={flag} className="w-6 h-4 object-cover rounded-sm" alt={locale} />;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          { "bg-primary-foreground text-primary hover:bg-primary-foreground/80 uppercase": isLabel },
          "flex items-center gap-x-2 outline-none transition-all duration-300 rounded-md px-2 py-2"
        )}
      >
        {renderFlag(language)}
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
              {renderFlag(locale)}
              {locale}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LocaleButton;

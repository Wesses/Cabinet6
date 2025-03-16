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
import ReactCountryFlag from "react-country-flag";
import { cn } from '@/lib/utils';

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
          { "bg-white text-zinc-900 hover:bg-gray-300 uppercase": isLabel },
          "flex items-center gap-x-2 outline-none transition-all duration-300 rounded-md px-2 py-2"
        )}
      >
        <ReactCountryFlag
          className="emojiFlag"
          countryCode={getContryCode(language)}
          style={{
            fontSize: "1.5em",
            lineHeight: "1em",
          }}
          aria-label="United States"
        />
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
              <div className="rounded-full">
                <ReactCountryFlag
                  className="emojiFlag"
                  countryCode={getContryCode(locale)}
                  style={{
                    fontSize: "1.5em",
                    lineHeight: "1em",
                  }}
                  aria-label="United States"
                />
              </div>

              {locale}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LocaleButton;

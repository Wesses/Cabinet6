import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { EN, UA, RU } from './translations'
import { localStorages } from '@/utils/constants';

enum Locales {
  EN = "en",
  UA = "ua",
  RU = "ru",
}

const resources = {
  en: {
    translation: EN,
  },
  ua: {
    translation: UA,
  },
  ru: {
    translation: RU,
  },
};

const locale = localStorage.getItem(localStorages.LOCALE) || Locales.EN;

i18n.use(initReactI18next).init({
  resources,
  lng: locale,
});

export default i18n;

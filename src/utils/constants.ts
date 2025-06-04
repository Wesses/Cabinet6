import { ServicesValuesT, TabsNamesT } from '@/types';

export const localStorages = {
  USER_DATA: "user_data",
  LOCALE: "locale",
};

export const locales = {
  EN: "en",
  UA: "ua",
  // RU: "ru",
};

export const CURRENT_PAGE_PARAM_KEY = "currpage";

export const WATER_SUPPLY_TAG_VALUES = [
  "VODA_PODACHA",
  "VODA_STOKI",
  "VODA_DOMSCH_PODACHA",
  "VODA_DOMSCH_STOKI",
  "VODA_POLIV",
  "VODA_SCH_POLIV",
  "VODA_SCH_PODACHA",
  "VODA_SCH_STOKI",
];

export const WATER_SUPPLY_PODACHA_TAG_VALUES = ["VODA_ABPL_PODACHA"];

export const WATER_SUPPLY_STOKI_TAG_VALUES = ["VODA_ABPL_STOKI"];

export const KVARTPLATA_TAG_VALUES = ["KVPLATA"];

export const TabsNamesValues: Record<TabsNamesT, ServicesValuesT> = {
  [TabsNamesT.Invoice_data]: ServicesValuesT.invoice,
  [TabsNamesT.Water_supply]: ServicesValuesT.water,
  [TabsNamesT.Water_supply_fee]: ServicesValuesT.water,
  [TabsNamesT.Water_supply_drainage]: ServicesValuesT.water,
  [TabsNamesT.Rent_data]: ServicesValuesT.rent,
};

export const SEARCH_PARAM_TAB_KEY = "tab";

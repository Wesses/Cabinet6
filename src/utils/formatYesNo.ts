import type { TFunction } from "i18next";

export const formatYesNo = (value: unknown, t: TFunction): string =>
  t(value ? "yes" : "no");

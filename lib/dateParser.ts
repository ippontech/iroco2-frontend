import { DateTime, Settings } from "luxon";

Settings.defaultLocale = "fr";

export const isoToHuman = (isoDate: string) => {
  return DateTime.fromISO(isoDate).toLocaleString(DateTime.DATETIME_SHORT);
};

export const isoToHumanDayOnly = (isoDate: string) => {
  return DateTime.fromISO(isoDate).toLocaleString(DateTime.DATE_FULL);
};

export const durationBetween = (firstDate: string, secondDate: string) => {
  const firstDateConverted = DateTime.fromISO(firstDate);
  return DateTime.fromISO(secondDate).diff(firstDateConverted).as("seconds");
};

export const getTodayDate = () => {
  return DateTime.now().toFormat("yyyy-MM-dd");
};

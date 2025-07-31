import { DateTime, Settings } from "luxon";
import {
  isoToHuman,
  isoToHumanDayOnly,
  durationBetween,
  getTodayDate,
} from "./dateParser";

describe("isoToHuman", () => {
  beforeAll(() => {
    Settings.defaultZone = "Europe/Paris";
  });

  afterAll(() => {
    Settings.resetCaches();
  });

  it("should correctly convert ISO date to human-readable datetime", () => {
    const isoDate = "2025-01-22T14:30:00.000Z";
    const expected = "22/01/2025 15:30";
    const result = isoToHuman(isoDate);

    expect(result).toEqual(expected);
  });
});

describe("isoToHumanDayOnly", () => {
  beforeAll(() => {
    Settings.defaultZone = "Europe/Paris";
  });

  afterAll(() => {
    Settings.resetCaches();
  });

  it("should correctly convert ISO date to human-readable date (day only)", () => {
    const isoDate = "2025-01-22T14:30:00.000Z";
    const expected = "22 janvier 2025";
    const result = isoToHumanDayOnly(isoDate);

    expect(result).toEqual(expected);
  });
});

describe("durationBetween", () => {
  beforeAll(() => {
    Settings.defaultZone = "Europe/Paris";
  });

  afterAll(() => {
    Settings.resetCaches();
  });

  it("should correctly calculate the duration between two dates", () => {
    const firstDate = "2025-03-18";
    const secondDate = "2025-03-19";
    const expected = 86400;
    const result = durationBetween(firstDate, secondDate);

    expect(result).toEqual(expected);
  });
});

describe("getTodayDate", () => {
  beforeAll(() => {
    Settings.defaultZone = "Europe/Paris";

    const mockDate = DateTime.fromISO("2025-03-19T00:00:00");
    Settings.now = () => mockDate.toMillis();
  });

  afterAll(() => {
    Settings.resetCaches();
    Settings.now = () => Date.now();
  });

  it("should correctly return the date of today in string", () => {
    const expected = "2025-03-19";
    const result = getTodayDate();

    expect(result).toEqual(expected);
  });
});

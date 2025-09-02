/*
 * Copyright 2025 Ippon Technologies
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
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

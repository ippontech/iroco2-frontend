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
function mapNumber(
  data: string | number,
  multiplier: number,
  to: "string" | "number",
) {
  let dataNumber: number;
  if (typeof data === "string") {
    dataNumber = Number(data);
    if (isNaN(dataNumber)) throw new Error("not a number");
  } else {
    dataNumber = data;
  }
  const result = multiplier * dataNumber;
  switch (to) {
    case "number":
      return result;
    case "string":
      return result.toString();
  }
}
export function multiplyToString(data: string | number, multiplier: number) {
  return mapNumber(data, multiplier, "string") as string;
}

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

describe("getApiErrorMessageKey", () => {
  it.each([
    { statusCode: 400, expected: "apiErrors.badRequest" },
    { statusCode: 403, expected: "apiErrors.forbidden" },
    { statusCode: 404, expected: "apiErrors.notFound" },
    { statusCode: 401, expected: "apiErrors.unexpected" },
    { statusCode: 409, expected: "apiErrors.unexpected" },
    { statusCode: 500, expected: "apiErrors.unexpected" },
    { statusCode: 503, expected: "apiErrors.unexpected" },
  ])(
    "should return $expected for an API error with status $statusCode",
    ({ statusCode, expected }) => {
      const error = createError({
        statusCode,
        fatal: true,
      });

      expect(getApiErrorMessageKey(error)).toBe(expected);
    },
  );

  it("should return the unexpected error key for a network error", () => {
    const error = createError({
      message: "Network error",
      fatal: true,
      data: { noStatutCode: true },
    });

    expect(getApiErrorMessageKey(error)).toBe("apiErrors.unexpected");
  });

  it.each([
    { error: new Error("boom") },
    { error: { statusCode: "404" } },
    { error: "boom" },
    { error: null },
    { error: undefined },
  ])("should return the unexpected error key for $error", ({ error }) => {
    expect(getApiErrorMessageKey(error)).toBe("apiErrors.unexpected");
  });
});

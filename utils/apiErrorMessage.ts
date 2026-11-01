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
const API_ERROR_MESSAGE_KEYS: Partial<Record<number, string>> = {
  400: "apiErrors.badRequest",
  403: "apiErrors.forbidden",
  404: "apiErrors.notFound",
};

const UNEXPECTED_ERROR_MESSAGE_KEY = "apiErrors.unexpected";

/**
 * Returns the i18n key of a generic message describing a failed API call,
 * chosen from the HTTP status code of the error.
 */
export function getApiErrorMessageKey(error: unknown): string {
  const statusCode = (error as { statusCode?: unknown } | null | undefined)
    ?.statusCode;
  if (typeof statusCode !== "number") {
    return UNEXPECTED_ERROR_MESSAGE_KEY;
  }
  return API_ERROR_MESSAGE_KEYS[statusCode] ?? UNEXPECTED_ERROR_MESSAGE_KEY;
}

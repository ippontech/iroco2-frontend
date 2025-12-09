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
import type { $Fetch } from "ofetch";
import type { Mock } from "vitest";
import CurService from "~/service/curService";

const PRESIGNED_URL_ENDPOINT = "/api/analysis/presigned-url";
const MOCK_PRESIGNED_URL =
  "https://s3.amazonaws.com/bucket/file.csv?signature=abc123";
const MOCK_ANALYSIS_ID = "analysis-uuid-123";

const MOCK_SERVER_RESPONSE = {
  analysisId: MOCK_ANALYSIS_ID,
  presignedUrl: MOCK_PRESIGNED_URL,
};

describe("CurService", () => {
  let curService: CurService;
  let mockFetch: Mock;
  let mockGlobalFetch: Mock;

  beforeEach(() => {
    mockFetch = vi.fn();
    mockGlobalFetch = vi.fn();
    global.fetch = mockGlobalFetch;
    curService = new CurService(mockFetch as unknown as $Fetch);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("uploadFile", () => {
    it("should upload file to S3 when file has valid extension", async () => {
      // given
      const file = new File(["content"], "data.csv", { type: "text/csv" });
      mockFetch.mockResolvedValue(MOCK_SERVER_RESPONSE);
      mockGlobalFetch.mockResolvedValue({ ok: true });

      // when
      await curService.uploadFile(file);

      // then
      expect(mockFetch).toHaveBeenCalledWith(
        `${PRESIGNED_URL_ENDPOINT}/csv`,
        expect.objectContaining({
          method: "GET",
        }),
      );
      expect(mockGlobalFetch).toHaveBeenCalledWith(MOCK_PRESIGNED_URL, {
        method: "PUT",
        body: file,
      });
    });

    it("should handle file with multiple dots in filename when uploading", async () => {
      // given
      const file = new File(["content"], "my.data.file.xlsx", {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      mockFetch.mockResolvedValue(MOCK_SERVER_RESPONSE);
      mockGlobalFetch.mockResolvedValue({ ok: true });

      // when
      await curService.uploadFile(file);

      // then
      expect(mockFetch).toHaveBeenCalledWith(
        `${PRESIGNED_URL_ENDPOINT}/xlsx`,
        expect.objectContaining({
          method: "GET",
        }),
      );
      expect(mockGlobalFetch).toHaveBeenCalledWith(MOCK_PRESIGNED_URL, {
        method: "PUT",
        body: file,
      });
    });

    it("should handle file without extension when uploading", async () => {
      // given
      const file = new File(["content"], "filename_no_extension", {
        type: "text/plain",
      });
      mockFetch.mockResolvedValue(MOCK_SERVER_RESPONSE);
      mockGlobalFetch.mockResolvedValue({ ok: true });

      // when
      await curService.uploadFile(file);

      // then
      expect(mockFetch).toHaveBeenCalledWith(
        `${PRESIGNED_URL_ENDPOINT}/null`,
        expect.objectContaining({
          method: "GET",
        }),
      );
    });

    it("should propagate error when presigned URL request fails", async () => {
      // given
      const file = new File(["content"], "data.csv", { type: "text/csv" });
      const error = new Error("Failed to get presigned URL");
      mockFetch.mockRejectedValue(error);

      // when
      const promise = curService.uploadFile(file);

      // then
      await expect(promise).rejects.toThrow("Failed to get presigned URL");
      expect(mockFetch).toHaveBeenCalledWith(
        `${PRESIGNED_URL_ENDPOINT}/csv`,
        expect.objectContaining({}),
      );
      expect(mockGlobalFetch).not.toHaveBeenCalled();
    });

    it("should propagate error when S3 upload fails", async () => {
      // given
      const file = new File(["content"], "data.csv", { type: "text/csv" });
      mockFetch.mockResolvedValue(MOCK_SERVER_RESPONSE);
      const error = new Error("S3 upload failed");
      mockGlobalFetch.mockRejectedValue(error);

      // when
      const promise = curService.uploadFile(file);

      // then
      await expect(promise).rejects.toThrow("S3 upload failed");
      expect(mockFetch).toHaveBeenCalledWith(
        `${PRESIGNED_URL_ENDPOINT}/csv`,
        expect.objectContaining({}),
      );
    });
  });
});

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
import HttpFactory from "./factory/httpFactory";

type ServerResponse = {
  analysisId: string;
  presignedUrl: string;
};

export default class CurService extends HttpFactory {
  private PRESIGNED_URL = "/api/analysis/presigned-url";

  async uploadFile(file: File) {
    const extension = this.getFileExtension(file);
    const presignedUrl = await this.getPresignedUrl(extension);
    await this.uploadOnS3(presignedUrl, file);
  }

  private async uploadOnS3(presignedUrl: string, file: File) {
    return await fetch(presignedUrl, {
      method: "PUT",
      body: file,
    });
  }

  private async getPresignedUrl(
    extension: string | undefined | null,
  ): Promise<string> {
    return (
      await this.getCall<ServerResponse>(`${this.PRESIGNED_URL}/${extension}`)
    ).presignedUrl;
  }

  private getFileExtension(file: File): string | undefined | null {
    const nameParts = file.name.split(".");
    return nameParts.length > 1 ? nameParts.pop() : null;
  }
}

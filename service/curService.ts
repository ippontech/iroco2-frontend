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

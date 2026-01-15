import ApiClient from "~/service/api/apiClient";
import type { Region } from "~/type/Region";

export class AWSDataCenterApiClient extends ApiClient {
  private readonly RESOURCE = "/api/cloud-service-providers";

  async getAllAWSDataCenter(cspId: string): Promise<Region[]> {
    return await this.getCall<Region[]>(`${this.RESOURCE}/${cspId}/regions`);
  }
}

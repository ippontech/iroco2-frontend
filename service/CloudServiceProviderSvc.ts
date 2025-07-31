import HttpFactory from "./factory/httpFactory";
import type { CloudServiceProvider } from "~/type/infrastructure/CloudServiceProvider";
import type { CloudServiceProviderService } from "~/type/infrastructure/CloudServiceProviderService";

class CloudServiceProviderSvc extends HttpFactory {
  private RESOURCE = "/api/cloud-service-providers";

  async getCloudServiceProviders(): Promise<CloudServiceProvider[]> {
    return await this.getCall<CloudServiceProvider[]>(this.RESOURCE);
  }

  async getCloudServiceProviderServices(): Promise<
    CloudServiceProviderService[]
  > {
    return await this.getCall<CloudServiceProviderService[]>(
      `${this.RESOURCE}/${await useCloudServiceProviderStore().getCloudServiceProviderID("AWS")}/services`,
    );
  }
}

export default CloudServiceProviderSvc;

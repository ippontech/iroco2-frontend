import type { $Fetch } from "ofetch";
import ComponentService from "./componentService";
import HttpFactory from "./factory/httpFactory";
import { type Region } from "~/type/Region";
import InfrastructureService from "~/service/infrastructureService";

class AWSDataCenterService extends HttpFactory {
  private RESOURCE = "/api/cloud-service-providers";
  private componentService: ComponentService;
  private infrastructureService: InfrastructureService;

  constructor(fetcher: $Fetch) {
    super(fetcher);
    this.componentService = new ComponentService(fetcher);
    this.infrastructureService = new InfrastructureService(fetcher);
  }

  async getAllAWSDataCenter(): Promise<Region[]> {
    const cspId =
      await useCloudServiceProviderStore().getCloudServiceProviderID("AWS");

    return await this.getCall<Region[]>(`${this.RESOURCE}/${cspId}/regions`);
  }

  async getRegionByInfrastructureId(infrastructureId: string) {
    const infrastructure =
      await this.infrastructureService.getInfrastructure(infrastructureId);
    const regions = await this.getAllAWSDataCenter();
    const currentRegion = regions.find(
      (region) => region.id === infrastructure.defaultRegion,
    );
    return currentRegion;
  }
}

export default AWSDataCenterService;

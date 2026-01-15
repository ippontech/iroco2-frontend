import ApiClient from "~/service/api/apiClient";
import type { CarbonFootprintEstimateComponent } from "~/type/CarbonFootprintEstimateComponent";
import type { RegionCarbonFootprint } from "~/type/RegionCarbonFootprint";

export class IrocalcCarbonApiClient extends ApiClient {
  private readonly RESOURCE = "/api/v2/infrastructures";

  async getCarbonFootprintEstimateComponents(infrastructureId: string) {
    return await this.getCall<CarbonFootprintEstimateComponent[]>(
      `${this.RESOURCE}/${infrastructureId}/carbon-footprint`,
    );
  }

  async getEstimatedCO2ByRegion(infrastructureId: string) {
    return await this.getCall<RegionCarbonFootprint[]>(
      `${this.RESOURCE}/${infrastructureId}/byregion-carbon-footprint`,
    );
  }
}

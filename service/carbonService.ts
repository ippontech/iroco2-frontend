import HttpFactory from "~/service/factory/httpFactory";
import type { CarbonFootprintEstimateComponent } from "~/type/CarbonFootprintEstimateComponent";
import {
  aggregateCarbonFootPrint,
  convertEstimateToBestMassUnit,
} from "~/lib/utils";
import type { RegionCarbonFootprint } from "~/type/RegionCarbonFootprint";

class IrocalcCarbonService extends HttpFactory {
  private RESOURCE = "/api/v2/infrastructures";

  async estimateCarbonFootPrint(infrastructureId: string) {
    const url = `${this.RESOURCE}/${infrastructureId}/carbon-footprint`;

    const estimated = (
      await this.getCall<CarbonFootprintEstimateComponent[]>(url)
    ).map((e) => ({
      label: e.componentName,
      co2Gr: e.co2Gr,
    }));

    const { relativeCarbonFootprintList, totalCO2Gr } =
      aggregateCarbonFootPrint(estimated);

    const totalCO2Converted = convertEstimateToBestMassUnit(totalCO2Gr);

    return { totalCO2Converted, relativeCarbonFootprintList, totalCO2Gr };
  }

  async compareCarbonFootPrintbByRegion(
    infrastructureId: string,
    totalCO2Gr: number,
  ) {
    const url = `${this.RESOURCE}/${infrastructureId}/byregion-carbon-footprint`;

    const estimatedCO2ByRegion =
      await this.getCall<RegionCarbonFootprint[]>(url);

    const estimatedCO2WithPercentDiff = estimatedCO2ByRegion.map(
      (estimate) => ({
        ...estimate,
        co2PercentageDiff: Math.round(
          (100 * (estimate.co2Gr - totalCO2Gr)) / totalCO2Gr,
        ),
      }),
    );

    return estimatedCO2WithPercentDiff.sort((a, b) => a.co2Gr - b.co2Gr);
  }
}

export default IrocalcCarbonService;

import HttpFactory from "./factory/httpFactory";
import type { EstimatedScan, Scan, ScanDetails } from "~/type/Scan";
import {
  aggregateCarbonFootPrint,
  convertEstimateToBestMassUnit,
} from "~/lib/utils";

class ScanService extends HttpFactory {
  private RESOURCE = "/api/scanner";
  async getAllScans(): Promise<Scan[]> {
    const scans = await this.getCall<Scan[]>(this.RESOURCE);
    const scansWithCO2Converted = scans.map((scan) => ({
      ...scan,
      co2Converted: convertEstimateToBestMassUnit(scan.co2Gr),
    }));
    return scansWithCO2Converted;
  }

  async getScanById(scanId: string): Promise<EstimatedScan> {
    const scans = await this.getCall<ScanDetails>(`${this.RESOURCE}/${scanId}`);

    const estimated = scans.payloads.map((p) => ({
      label: p.name,
      co2Gr: p.carbonGramFootprint,
    }));

    const { relativeCarbonFootprintList, totalCO2Gr } =
      aggregateCarbonFootPrint(estimated);

    const totalCO2Converted = convertEstimateToBestMassUnit(totalCO2Gr);

    return {
      totalCO2Converted,
      relativeCarbonFootprintList,
    };
  }
}

export default ScanService;

import {
  aggregateCarbonFootPrint,
  convertEstimateToBestMassUnit,
} from "~/lib/utils";
import HttpFactory from "./factory/httpFactory";
import type { ReportStatus } from "~/type/ReportStatus";
import type { Payload } from "~/type/Payload";

type Analysis = {
  status: ReportStatus;
  id: string;
  dateCreation: string;
  co2Gr: number;
};

type AnalysisDetails = Analysis & {
  payloads: Payload[];
};

class AnalysisService extends HttpFactory {
  private RESOURCE = "/api/analysis";

  async getAllAnalyses() {
    const analyses = await this.getCall<Analysis[]>(this.RESOURCE);
    const analysesWithCO2Converted = analyses.map((analysis) => ({
      ...analysis,
      co2Converted: convertEstimateToBestMassUnit(analysis.co2Gr),
    }));

    return analysesWithCO2Converted;
  }

  async getAnalysisById(analysisId: string) {
    const estimated = (
      await this.getCall<AnalysisDetails>(`${this.RESOURCE}/${analysisId}`)
    ).payloads.map((p) => ({
      label: p.name,
      co2Gr: p.carbonGramFootprint,
    }));

    const { relativeCarbonFootprintList, totalCO2Gr } =
      aggregateCarbonFootPrint(estimated);

    const totalCO2Converted = convertEstimateToBestMassUnit(totalCO2Gr);

    return { totalCO2Converted, relativeCarbonFootprintList, totalCO2Gr };
  }

  async deleteAnalysis(analysisId: string): Promise<void> {
    return await this.deleteCall(`${this.RESOURCE}/${analysisId}`);
  }
}

export default AnalysisService;

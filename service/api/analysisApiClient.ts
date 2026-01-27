import ApiClient from "~/service/api/apiClient";
import type { Analysis } from "../analysisService";
import type { AnalysisDetails } from "~/service/analysisService";

export class AnalysisApiClient extends ApiClient {
  private readonly RESOURCE = "/api/analysis";

  async getAllAnalyses(): Promise<Analysis[]> {
    return await this.getCall<Analysis[]>(this.RESOURCE);
  }

  async getAnalysisById(analysisId: string): Promise<AnalysisDetails> {
    return await this.getCall<AnalysisDetails>(
      `${this.RESOURCE}/${analysisId}`,
    );
  }

  async deleteAnalysis(analysisId: string): Promise<void> {
    return await this.deleteCall(`${this.RESOURCE}/${analysisId}`);
  }
}

import type { RelativeCarbonFootprint } from "~/lib/utils";
import type { ReportStatus } from "./ReportStatus";
import type { UnitValue } from "./UnitValue";
import type { Payload } from "./Payload";

export type Scan = {
  status: ReportStatus;
  id: string;
  dateCreation: string;
  co2Gr: number;
  co2Converted: UnitValue;
};

export type ScanDetails = Pick<Scan, "id" | "status"> & {
  payloads: Payload[];
};

export type EstimatedScan = {
  totalCO2Converted: UnitValue;
  relativeCarbonFootprintList: RelativeCarbonFootprint[];
};

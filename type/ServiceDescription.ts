import type { Availability } from "~/type/Availability";
import type { VariableDescription } from "./VariableDescription";

export interface ServiceDescription {
  id: string;
  name: string;
  shortname: string;
  description: string;
  availability: Availability;
  levers: string[];
  limitations: string[];
  catalogVariableList: VariableDescription[];
}

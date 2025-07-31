import type { ConstantDescription } from "./ConstantDescription";

export interface VariableDescription {
  name: string;
  description: string;
  formula: string;
  catalogConstantList: ConstantDescription[];
}

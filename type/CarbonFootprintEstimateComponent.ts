type CarbonFootprintEstimateComponent = {
  componentName: string;
  serviceName: string;
  co2Gr: number;
};

type RelativeCarbonFootprintEstimateComponent =
  CarbonFootprintEstimateComponent & {
    percentage: number;
  };

export type {
  CarbonFootprintEstimateComponent,
  RelativeCarbonFootprintEstimateComponent,
};

import { createFetch } from "ofetch";
import { defineNuxtPlugin } from "#app";
import AWSDataCenterService from "../service/awsDataCenterService";
import CarbonService from "~/service/carbonService";
import CatalogService from "~/service/catalogService";
import AWSInstanceService from "~/service/awsInstanceService";
import AdminService from "~/service/adminService";
import { useAuth } from "vue-clerk";
import InfrastructureService from "~/service/infrastructureService";
import CloudServiceProviderSvc from "~/service/CloudServiceProviderSvc";
import ServiceConfigurationSettingSvc from "~/service/ServiceConfigurationSettingSvc";
import ComponentService from "~/service/componentService";
import AnalysisService from "~/service/analysisService";
import CurService from "~/service/curService";
import TokenService from "~/service/tokenService";
import ScanService from "~/service/scanService";

/** ApiInstance interface provides us with good typing */
interface IApiInstance {
  awsDataCenter: AWSDataCenterService;
  carbon: CarbonService;
  catalogService: CatalogService;
  instanceType: AWSInstanceService;
  adminService: AdminService;
  infrastructureService: InfrastructureService;
  componentService: ComponentService;
  cloudServiceProviderService: CloudServiceProviderSvc;
  serviceConfigurationSettingSvc: ServiceConfigurationSettingSvc;
  analysisService: AnalysisService;
  curService: CurService;
  tokenService: TokenService;
  scanService: ScanService;
}

export default defineNuxtPlugin({
  async setup() {
    const config = useRuntimeConfig();
    const { getToken } = useAuth();

    const apiFetcher = createFetch({
      defaults: {
        baseURL: config.public.irocalcApiBase,
        async onRequest({ options }) {
          const jwt = await getToken.value();
          const headers = new Headers([
            ...options.headers,
            ["Authorization", `Bearer ${jwt}`],
          ]);
          if (jwt) {
            options.headers = headers;
          }
        },
        async onResponseError({ response }) {
          throw createError({
            statusCode: response.status,
            message: response._data.message,
            fatal: true,
          });
        },
        async onRequestError() {
          throw createError({
            message: "Erreur réseau lors de la récupération des données",
            fatal: true,
            data: {
              noStatutCode: true,
            },
          });
        },
      },
    });

    /** an object containing all repositories we need to expose */
    const modules: IApiInstance = {
      carbon: new CarbonService(apiFetcher),
      awsDataCenter: new AWSDataCenterService(apiFetcher),
      catalogService: new CatalogService(apiFetcher),
      instanceType: new AWSInstanceService(apiFetcher),
      adminService: new AdminService(apiFetcher),
      infrastructureService: new InfrastructureService(apiFetcher),
      componentService: new ComponentService(apiFetcher),
      cloudServiceProviderService: new CloudServiceProviderSvc(apiFetcher),
      serviceConfigurationSettingSvc: new ServiceConfigurationSettingSvc(
        apiFetcher,
      ),
      analysisService: new AnalysisService(apiFetcher),
      curService: new CurService(apiFetcher),
      tokenService: new TokenService(apiFetcher),
      scanService: new ScanService(apiFetcher),
    };

    return {
      provide: {
        api: modules,
      },
    };
  },
});

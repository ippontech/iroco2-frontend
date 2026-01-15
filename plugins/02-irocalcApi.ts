/*
 * Copyright 2025 Ippon Technologies
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { createFetch } from "ofetch";
import { defineNuxtPlugin } from "#app";
import AWSDataCenterService from "../service/awsDataCenterService";
import CarbonService from "~/service/carbonService";
import CatalogApiClient from "~/service/api/catalogApiClient";
import AWSInstanceApiClient from "~/service/api/AWSInstanceApiClient";
import AdminApiClient from "~/service/api/adminApiClient";
import { useAuth } from "vue-clerk";
import InfrastructureApiClient from "~/service/api/infrastructureApiClient";
import CloudServiceProviderApiClient from "~/service/api/CloudServiceProviderApiClient";
import ServiceConfigurationSettingApiClient from "~/service/api/ServiceConfigurationSettingApiClient";
import ComponentApiClient from "~/service/api/componentApiClient";
import AnalysisService from "~/service/analysisService";
import CurApiClient from "~/service/api/curApiClient";
import TokenService from "~/service/tokenService";
import ScanService from "~/service/scanService";
import { AnalysisApiClient } from "~/service/api/analysisApiClient";
import { AWSDataCenterApiClient } from "~/service/api/AWSDataCenterApiClient";
import { IrocalcCarbonApiClient } from "~/service/api/irocalcCarbonApiClient";
import ScanApiClient from "~/service/api/scanApiClient";

/** ApiInstance interface provides us with good typing */
interface IApiInstance {
  awsDataCenter: AWSDataCenterService;
  carbon: CarbonService;
  catalogService: CatalogApiClient;
  instanceType: AWSInstanceApiClient;
  adminService: AdminApiClient;
  infrastructureService: InfrastructureApiClient;
  componentService: ComponentApiClient;
  cloudServiceProviderService: CloudServiceProviderApiClient;
  serviceConfigurationSettingSvc: ServiceConfigurationSettingApiClient;
  analysisService: AnalysisService;
  curService: CurApiClient;
  tokenService: TokenService;
  scanService: ScanService;
}

export default defineNuxtPlugin({
  async setup() {
    const config = useRuntimeConfig();
    const { getToken } =
      config.public.authActivate == "false"
        ? {
            getToken: {
              value() {
                return "demo";
              },
            },
          }
        : useAuth();

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

    const infrastructureApiClient = new InfrastructureApiClient(apiFetcher);

    /** an object containing all repositories we need to expose */
    const modules: IApiInstance = {
      carbon: new CarbonService(new IrocalcCarbonApiClient(apiFetcher)),
      awsDataCenter: new AWSDataCenterService(
        infrastructureApiClient,
        new AWSDataCenterApiClient(apiFetcher),
      ),
      catalogService: new CatalogApiClient(apiFetcher),
      instanceType: new AWSInstanceApiClient(apiFetcher),
      adminService: new AdminApiClient(apiFetcher),
      infrastructureService: infrastructureApiClient,
      componentService: new ComponentApiClient(apiFetcher),
      cloudServiceProviderService: new CloudServiceProviderApiClient(
        apiFetcher,
      ),
      serviceConfigurationSettingSvc: new ServiceConfigurationSettingApiClient(
        apiFetcher,
      ),
      analysisService: new AnalysisService(new AnalysisApiClient(apiFetcher)),
      curService: new CurApiClient(apiFetcher),
      tokenService: new TokenService(apiFetcher),
      scanService: new ScanService(new ScanApiClient(apiFetcher)),
    };

    return {
      provide: {
        api: modules,
      },
    };
  },
});

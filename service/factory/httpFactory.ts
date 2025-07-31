import type { ofetch } from "ofetch";

class HttpFactory {
  private $fetch: typeof ofetch;

  constructor(fetcher: typeof ofetch) {
    this.$fetch = fetcher;
  }

  protected async deleteCall(
    url: string,
    data?: object,
    params?: object,
    extras = {},
  ): Promise<void> {
    return this.call("DELETE", url, data, params, extras);
  }

  protected async patchCall(
    url: string,
    data?: object,
    params?: object,
    extras = {},
  ): Promise<void> {
    return this.call("PATCH", url, data, params, extras);
  }

  protected async putCall(
    url: string,
    data?: object,
    params?: object,
    extras = {},
  ): Promise<void> {
    return this.call("PUT", url, data, params, extras);
  }

  protected async postCall<T>(
    url: string,
    data?: object,
    extras = {},
  ): Promise<T> {
    return this.call("POST", url, data, extras);
  }

  protected async getCall<T>(
    url: string,
    query?: object,
    params?: object,
    extras = {},
  ): Promise<T> {
    return this.call("GET", url, undefined, query, params, extras);
  }

  private async call<T>(
    method: string,
    url: string,
    data?: object,
    query?: object,
    params?: object,
    extras = {},
  ): Promise<T> {
    return await this.$fetch(url, {
      method,
      body: data,
      ...extras,
      query: query,
      params: params,
    });
  }
}

export default HttpFactory;

import { ofetch } from "ofetch";

export default {
  async requestDemoEmail(body: string): Promise<void> {
    const irocoCustomerRequestEndpoint =
      useRuntimeConfig().public.irocoCustomerRequestEndpoint;

    if (typeof irocoCustomerRequestEndpoint !== "string") {
      throw new Error("irocoCustomerRequestEndpoint must be a string");
    }

    await ofetch(irocoCustomerRequestEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  },
};

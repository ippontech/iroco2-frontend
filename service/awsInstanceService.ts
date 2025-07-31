import HttpFactory from "./factory/httpFactory";
import type { EC2InstanceType } from "~/type/ec2InstanceType";

class AWSInstanceService extends HttpFactory {
  private RESOURCE = "/api/awsInstanceType";

  async getAllInstanceByType(
    serviceShortName: string,
  ): Promise<EC2InstanceType[]> {
    return await this.getCall(`${this.RESOURCE}`, { serviceShortName });
  }
}

export default AWSInstanceService;

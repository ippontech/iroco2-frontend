import HttpFactory from "./factory/httpFactory";

class AdminService extends HttpFactory {
  async evictRegionCache(): Promise<void> {
    return this.deleteCall(`/actuator/caches/regions`);
  }
}

export default AdminService;

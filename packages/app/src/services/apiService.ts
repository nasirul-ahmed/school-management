import { Inject, Service } from "typedi";
import { Logger } from "winston";

@Service()
export default class ApiService {
  constructor(@Inject("logger") private logger: Logger) {}

  public async addApi(input: any) {
    try {
        return "api added"
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

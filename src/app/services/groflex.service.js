import { login, request } from "../helpers/request";

class groflexService {
  constructor() {
    this.router = {
      navigate: (path) => {
        location.assign(path);
      },
    };

    this.request = request;
    this.login = login;
  }
}
export default new groflexService();

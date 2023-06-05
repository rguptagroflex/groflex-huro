import { login, request, logout } from "../helpers/request";

class GroflexService {
  constructor() {
    this.router = {
      navigate: (path) => {
        location.assign(path);
      },
    };

    this.request = request;
    this.login = login;
    this.logout = logout;
  }
}
export default new GroflexService();

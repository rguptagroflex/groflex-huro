import { login, request, logout, checkEmailExist } from "../helpers/request";

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
    this.checkEmailExist = checkEmailExist;
  }
}
export default new GroflexService();

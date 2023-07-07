import {
  login,
  request,
  logout,
  checkEmailExist,
  checkEmailExist2,
} from "../helpers/request";

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
    this.checkEmailExist2 = checkEmailExist2;
  }
}
export default new GroflexService();

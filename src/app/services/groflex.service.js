import webStorageKeyEnum from "../enums/web-storage-key.enum";
import {
  login,
  request,
  logout,
  checkEmailExist,
  checkEmailExist2,
  sendEmailOtp,
  verifyMobileOtp,
  sendMobileOtp,
  verifyEmailOtp,
  resendEmailOtp,
  getRegistrationToken,
} from "../helpers/request";
import WebStorageService from "./webstorage.service";

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
    this.sendEmailOtp = sendEmailOtp;
    this.resendEmailOtp = resendEmailOtp;
    this.verifyEmailOtp = verifyEmailOtp;
    this.sendMobileOtp = sendMobileOtp;
    this.verifyMobileOtp = verifyMobileOtp;
    this.getRegistartionToken = getRegistrationToken;
  }
}
export default new GroflexService();

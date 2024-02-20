import { assign } from "lodash";
import EventEmitter from "eventemitter3";
import {
  login,
  request,
  logout,
  checkEmailExist,
  sendEmailOtp,
  verifyMobileOtp,
  sendMobileOtp,
  verifyEmailOtp,
  resendEmailOtp,
  getRegistrationToken,
} from "../helpers/request";
import toastService from "./toast.service";
import User from "../models/user.model";

class GroflexService {
  constructor() {
    this.router = {
      navigate: (path) => {
        location.assign(path);
      },
      redirectTo: (path) => {
        location.assign(path);
      },
    };
    // this.user = User;
    this.request = request;
    this.login = login;
    this.logout = logout;
    this.checkEmailExist = checkEmailExist;
    this.sendEmailOtp = sendEmailOtp;
    this.resendEmailOtp = resendEmailOtp;
    this.verifyEmailOtp = verifyEmailOtp;
    this.sendMobileOtp = sendMobileOtp;
    this.verifyMobileOtp = verifyMobileOtp;
    this.getRegistartionToken = getRegistrationToken;
    this.toast = toastService;
  }
}

const eventEmitter = new EventEmitter();
assign(GroflexService.prototype, {
  off: eventEmitter.off.bind(eventEmitter),
  on: eventEmitter.on.bind(eventEmitter),
  trigger: eventEmitter.emit.bind(eventEmitter),
});

export default new GroflexService();

import webStorageKeyEnum from "./src/app/enums/web-storage-key.enum";
import WebStorageService from "./src/app/services/webstorage.service";

const apiServers = {
  // local: "http://localhost:3000",
  local: "https://dev.groflex.in",
  development: "https://dev.groflex.in",
  qa: "https://qa.groflex.in",
  staging: "https://staging.groflex.in",
  production: "https://app.groflex.in",
  // integration: "https://web-integration-invoiz.buhl.de",
  // admin: "https://invoiz-admin.buhl.de",
};
const loginExpireHours = 24;
const baseUrl = apiServers.local;

const setResourceHost = () => {
  return `${baseUrl}/api/`;
};
const resourceHost = setResourceHost();

const resourceUrls = {
  //Registration token
  getRegistartionToken: `${resourceHost}user/email`, // POST | body: {email: "ritesh098765432+15dev@gmail"} | Gives the registration token
  /*All verification APIs will need Registration token */
  //Email verification
  sendEmailOtp: `${resourceHost}user/password`, //  POST | body: {password: "rguptagrofleX1@", email: "ritesh098765432+15dev@gmail.com"} | Gives verifystep = "code"
  resendEmailOtp: `${resourceHost}user/email/resend_code`, // Dont know the method :( | no payload | no body res
  verifyEmailOtp: `${resourceHost}user/email/code`, // POST | body: {code: "1234"} | no body res :(
  //Mobile verification
  sendMobileOtp: `${resourceHost}tenant/set_mobile`, // PUT | body: {mobileNo : "9876543210"} | gives no body response
  verifyMobileOtp: `${resourceHost}tenant/verify_mobile_otp`, // PUT | body : {mobileOtp : "123456"} | success : true
  /* ALl in-app APIs will need Login token */
  //Login
  login: `${resourceHost}session/create?type=bearer`,
  checkEmailExist: `${resourceHost}user/checkUser`,
  //After login token needing
  articles: `${resourceHost}article?offset=0&searchText=&limit=9999999&orderBy=number&desc=false`,
  customers: `${resourceHost}customer?offset=0&searchText=&limit=9999999&orderBy=number&desc=false`,
  tenant: `${resourceHost}tenant`,
  accountSettings: `${resourceHost}setting/account`,
  changeProfileName: `${resourceHost}user/changePassword`,
  user: `${resourceHost}setting/user`,
  contact: `${resourceHost}customer`,
  articleSearch: `${resourceHost}find/eanRecord/`, // concatenate search query
  article: `${resourceHost}article`,
  miscellaneous: `${resourceHost}setting/miscellaneous`,
};

const checkLoginTokenIsValid = () => {
  const loginToken = WebStorageService.getItem(
    webStorageKeyEnum.LOGIN_TOKEN_KEY
  );
  const loginTokenStartTime = WebStorageService.getItem(
    webStorageKeyEnum.LOGIN_TOKEN_START_TIME
  );

  if (loginTokenStartTime && loginToken) {
    const difference = Math.abs(
      new Date().getTime() - parseInt(loginTokenStartTime)
    );
    const hours = Math.ceil(Math.abs(difference / 36e5));
    if (hours <= loginExpireHours) {
      return true;
    }
  }
  // localStorage.clear();
  WebStorageService.removeItem(webStorageKeyEnum.LOGIN_TOKEN_KEY);
  WebStorageService.removeItem(webStorageKeyEnum.LOGIN_TOKEN_START_TIME);
  return false;
};

const regex = {
  emailCheck:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
};

const config = {
  resourceHost,
  resourceUrls,
  checkLoginTokenIsValid,
  regex,
};

export default config;

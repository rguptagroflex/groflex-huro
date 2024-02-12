import invoiz from "services/invoiz.service";
import config from "oldConfig";

export const fetchAccounts = () => {
  return invoiz.request(`${config.resourceHost}banking/accounts`, {
    auth: true,
  });
};

import invoiz from "services/invoiz.service";
import q from "q";
import { omit } from "lodash";
import config from "oldConfig";
import { errorCodes } from "helpers/constants";
import Customer from "models/customer.model";
import { prepareCustomerDataForRequest } from "helpers/prepareCustomerDataForRequest";

const { NOT_FOUND, EXISTS } = errorCodes;

const propsToOmitForCustomerModel = [
  "street",
  "zipCode",
  "city",
  "country",
  "countryIso",
  "name",
  "number",
];

const saveAndUpdateCustomer = (model, view) => {
  const {
    transaction: { customerDataChanged, customerId, customerData },
  } = model;

  let customerModel = new Customer();

  if (!customerDataChanged) {
    const deferred = q.defer();
    deferred.resolve();
    return deferred.promise;
  }

  const getDefaultCustomerModelData = () => {
    return invoiz
      .request(config.customer.endpoints.fetchDefaultCustomerModelUrl, {
        auth: true,
      })
      .then(({ body: { data } }) => {
        customerModel = new Customer(data);
        return customerModel;
      });
  };

  const getExistingCustomerModel = () => {
    customerModel.id = customerId;
    return invoiz.request(`${config.customer.resourceUrl}/${customerId}`, {
      auth: true,
    });
  };

  const fetchCustomerModel = () => {
    if (!customerId) {
      return getDefaultCustomerModelData();
    }

    return getExistingCustomerModel();
  };

  const saveCustomerData = () => {
    const {
      street,
      zipCode,
      city,
      countryIso,
      number,
      cinNumber,
      gstType,
      gstNumber,
    } = customerData;
    const address = {
      street,
      zipCode,
      city,
      countryIso,
      cinNumber,
      gstType,
      gstNumber,
    };

    const omittedCustomerData = omit(customerData, propsToOmitForCustomerModel);
    const mergedCustomerData = Object.assign({}, omittedCustomerData, {
      address,
      number,
    });

    customerModel = new Customer(mergedCustomerData);

    const customerUrl = customerModel.id
      ? `${config.customer.resourceUrl}/${customerModel.id}`
      : `${config.customer.resourceUrl}`;

    return invoiz
      .request(customerUrl, {
        auth: true,
        method: customerModel.id ? "PUT" : "POST",
        data: customerModel,
      })
      .then(({ body: { data } }) => {
        customerModel = new Customer(data);
        return customerModel;
      });
  };

  const setCustomerDataOnTransaction = (response) => {
    const { id, number, name } = customerModel;
    const {
      transaction: { customerData },
    } = model;

    const mergedCustomerData = Object.assign(
      {},
      prepareCustomerDataForRequest(customerData),
      { number, name }
    );

    return { customerId: id, customerData: mergedCustomerData };
  };

  return q
    .fcall(fetchCustomerModel)
    .then(saveCustomerData)
    .then(setCustomerDataOnTransaction)
    .catch((error) => {
      if (error.meta.number && error.meta.number[0].code === EXISTS) {
        view && view.info.onCustomerNumberError();
      }

      if (error.meta.id && error.meta.id[0].code === NOT_FOUND) {
        return;
      }

      throw error;
    });
};

export default saveAndUpdateCustomer;

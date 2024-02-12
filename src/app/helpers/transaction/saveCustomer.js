import invoiz from "services/invoiz.service";
import config from "oldConfig";
import Customer from "models/customer.model";

export const saveCustomer = (requestData, isNew) => {
  return new Promise((resolve, reject) => {
    if (!requestData) {
      resolve(null);
    } else if (isNew) {
      const customer = new Customer(requestData.customerData);
      invoiz
        .request(`${config.resourceHost}customer`, {
          auth: true,
          method: "POST",
          data: customer,
        })
        .then((response) => {
          const {
            body: { data },
          } = response;

          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      invoiz
        .request(`${config.resourceHost}customer/${requestData.customerId}`, {
          auth: true,
        })
        .then((response) => {
          const {
            body: { data },
          } = response;

          const customerData = Object.assign(
            {},
            data,
            requestData.customerData
          );
          const {
            street,
            zipCode,
            city,
            countryIso,
            gstType,
            gstNumber,
            cinNumber,
          } = customerData;
          customerData.address = Object.assign(data.address, {
            street,
            zipCode,
            city,
            countryIso,
            gstType,
            gstNumber,
            cinNumber,
          });

          const customer = new Customer(customerData);
          invoiz
            .request(
              `${config.resourceHost}customer/${requestData.customerId}`,
              {
                auth: true,
                method: "PUT",
                data: customer,
              }
            )
            .then((response) => {
              const {
                body: { data },
              } = response;
              resolve(data);
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
};

import React, { useEffect, useState } from "react";
import { SelectInput } from "../../../shared/components/select/SelectInput";
import groflexService from "../../../services/groflex.service";
import config from "../../../../../oldConfig";
import _ from "lodash";

const ContactSearchComponent = ({ value, onChange, searchPayee }) => {
  const [contact, setContact] = useState(value);
  const [contactsOptions, setContactsOptions] = useState([]);

  useEffect(() => {
    handleLoadOptions();
  }, []);

  const handleChange = (option) => {
    setContact(option.value);
    onChange(option);
  };

  const handleLoadOptions = () => {
    // const searchTerm = inputString.trim() || "*";
    const searchTerm = "*";
    const recipientType = searchPayee ? "payee" : "customer";

    const query = `?type=${recipientType}&search='${encodeURIComponent(
      searchTerm
    )}'`;
    return groflexService
      .request(`${config.getAllCustomers}${query}`, { auth: true })
      .then((response) => {
        const {
          body: { data: customers },
        } = response;
        const mappedOptions = customers.map((customer) => {
          const {
            id,
            name,
            address: {
              street,
              zipCode,
              city,
              countryIso,
              gstNumber,
              cinNumber,
            },
            contactPersons,
          } = customer;
          if (countryIso === "IN") {
            customer.baseCurrency = "";
            customer.exchangeRate = 0.0;
            customer.defaultExchangeRateToggle = false;
          }
          const omittedCustomerData = _.omit(customer, [
            "address",
            "contactPersons",
          ]);

          if (contactPersons && contactPersons.length > 0) {
            const {
              id: contactPersonId,
              salutation,
              title,
              firstName,
              lastName,
            } = contactPersons[0];
            omittedCustomerData.contact = {
              id: contactPersonId,
              salutation,
              title,
              firstName,
              lastName,
            };
          }

          const mappedCustomerData = Object.assign({}, omittedCustomerData, {
            street,
            zipCode,
            city,
            countryIso,
            gstNumber,
            cinNumber,
          });
          return { value: id, label: name, customerData: mappedCustomerData };
        });

        // return mappedOptions;
        setContactsOptions(mappedOptions);
      });
  };

  return (
    <SelectInput
      options={contactsOptions}
      isCreatable
      onChange={handleChange}
      value={contact}
      placeholder={"Contact Name"}
    />
  );
};

export default ContactSearchComponent;

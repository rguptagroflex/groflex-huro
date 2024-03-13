import React, { useEffect, useState } from "react";
import { SelectInput } from "../components/select/SelectInput";
import { Input } from "../components/input/Input";
import { getMiscellaneousData } from "../../helpers/getSettingsData";
import { TextArea } from "../components/textArea/TextArea";
import { getCountries } from "../../helpers/getCountries";
import OnClickOutside from "../components/onClickOutside/OnClickOutside";

const countriesOptions = getCountries().map((country) => ({
  label: country.label,
  value: country.iso2,
}));

const RecipientFormPersonComponent = ({
  customerData,
  onBlur,
  stateOptions,
  kindSelectorRadio,
}) => {
  const {
    kind,
    street,
    countryIso,
    indiaState,
    gstNumber,
    cinNumber,
    mobile,
    companyName,
    contact,
    city,
    id,
    defaultExchangeRateToggle,
    exchangeRate,
    country,
    balance,
    openingBalance,
    title,
    salutation,
    firstName,
    lastName,
    name,
    baseCurrency,
    type,
    number,
    zipCode,
  } = customerData;

  const [salutationOptions, setSalutationOptions] = useState([]);
  const [titleOptions, setTitleOptions] = useState([]);
  const [recipientFormDataPerson, setRecipientFormDataPerson] = useState({
    salutation,
    title,
    firstName,
    lastName,
    mobile,
    street,
    countryIso,
    indiaState,
    baseCurrency,
    exchangeRate,
    defaultExchangeRateToggle,
  });

  const [formErrors, setFormErrors] = useState({
    companyNameError: "",
    contactError: "",
    mobileError: "",
    streetError: "",
    countryIsoError: "",
    indiaStateError: "",
    baseCurrencyError: "",
    exchangeRateError: "",
    gstNumberError: "",
    cinNumberError: "",
    salutationError: "",
    titleError: "",
    firstNameError: "",
    lastNameError: "",
    defaultExchangeRateToggleError: "",
  });

  useEffect(() => {
    fetchSalutations();
    fetchTitles();
  }, []);

  const fetchSalutations = () => {
    return getMiscellaneousData().then((response) => {
      const {
        body: {
          data: { salutations },
        },
      } = response;
      const mappedSalutations = salutations.map((salutation) => {
        return { label: salutation, value: salutation };
      });
      // return { options: mappedSalutations };
      // return mappedSalutations;
      setSalutationOptions(mappedSalutations);
    });
  };

  const fetchTitles = () => {
    return getMiscellaneousData().then((response) => {
      const {
        body: {
          data: { titles },
        },
      } = response;
      const mappedTitles = titles.map((title) => {
        return { label: title, value: title };
      });
      // return { options: mappedTitles };
      // return mappedTitles;
      setTitleOptions(mappedTitles);
    });
  };

  const handleSalutationChange = (option) => {
    const selectedSalucation = option?.value.trim();
    const isNew = option?.__isNew__;
    if (!isNew) {
      setRecipientFormDataPerson({
        ...recipientFormDataPerson,
        salutation: selectedSalucation,
      });
    }
  };

  const handleTitleChange = (option) => {
    const selectedTitle = option?.value.trim();
    const isNew = option?.__isNew__;
    if (!isNew) {
      setRecipientFormDataPerson({
        ...recipientFormDataPerson,
        title: selectedTitle,
      });
    }
  };

  const handleFirstNameChange = (event) => {
    let text = event.target.value.trim();
    setRecipientFormDataPerson({
      ...recipientFormDataPerson,
      firstName: text,
    });
  };

  const handleLastNameChange = (event) => {
    let text = event.target.value.trim();
    setRecipientFormDataPerson({
      ...recipientFormDataPerson,
      lastName: text,
    });
  };

  const handleMobileChange = (event) => {
    const num = String(event.target.value).trim();
    if (num.length > 10) return;

    setRecipientFormDataPerson({
      ...recipientFormDataPerson,
      mobile: num,
    });
  };

  const handleStreetChange = (event) => {
    const text = event.target.value.trim();
    setRecipientFormDataPerson({
      ...recipientFormDataPerson,
      street: text,
    });
  };

  const handleCountryChange = (option) => {
    if (option.value !== "IN") {
      setRecipientFormDataPerson({
        ...recipientFormDataPerson,
        countryIso: option.value,
        indiaState: null,
      });
    } else {
      setRecipientFormDataPerson({
        ...recipientFormDataPerson,
        countryIso: option.value,
      });
    }
  };

  const handleStateChange = (option) => {
    setRecipientFormDataPerson({
      ...recipientFormDataPerson,
      indiaState: {
        id: option.vale,
        stateName: option.label,
      },
    });
  };

  const handleBlur = () => {
    const formIsValid = checkFormIsValid();
    if (true) {
      onBlur(recipientFormDataPerson);
    }
  };

  const checkFormIsValid = () => {};

  console.log(recipientFormDataPerson);

  return (
    <OnClickOutside onClickOutside={handleBlur}>
      {kindSelectorRadio}
      <div className="columns is-multiline m-t-5">
        <div className="field column is-12 p-b-0 p-t-0">
          <label>Salutation</label>
          <SelectInput
            isCreatable
            options={salutationOptions}
            isLoading={!salutationOptions.length}
            placeholder={"Select Salutation"}
            onChange={handleSalutationChange}
            value={recipientFormDataPerson.salutation}
          />
        </div>
        <div className="field column is-12 p-b-0 p-t-0">
          <label>Title</label>
          <SelectInput
            isCreatable
            options={titleOptions}
            isLoading={!titleOptions.length}
            placeholder={"Select Title"}
            onChange={handleTitleChange}
            value={recipientFormDataPerson.title}
          />
        </div>
        <div className="field column is-12 p-b-0 p-t-0">
          <label>First Name</label>
          <Input
            placeholder={"Enter First Name"}
            hasValidation
            value={recipientFormDataPerson.firstName}
            onChange={handleFirstNameChange}
            helpText={formErrors.firstNameError}
            hasError={formErrors.firstNameError}
          />
        </div>
        <div className="field column is-12 p-b-0 p-t-0">
          <label>Surname</label>
          <Input
            placeholder={"Enter Surname"}
            hasValidation
            value={recipientFormDataPerson.lastName}
            onChange={handleLastNameChange}
            helpText={formErrors.lastNameError}
            hasError={formErrors.lastNameError}
          />
        </div>
        <div className="field column is-12 p-b-0 p-t-0">
          <label>Mobile No.</label>
          <Input
            type="number"
            placeholder={"Enter Mobile No."}
            hasValidation
            value={recipientFormDataPerson.mobile}
            onChange={handleMobileChange}
            helpText={formErrors.mobileError}
            hasError={formErrors.mobileError}
          />
        </div>
        <div className="field column is-12 p-b-0 p-t-0">
          <label>Address</label>
          <TextArea
            rows={4}
            placeholder={"Enter Address"}
            value={recipientFormDataPerson.street}
            onChange={handleStreetChange}
          />
        </div>
        <div className="field column is-12 p-b-0 p-t-0">
          <label>Country</label>
          <SelectInput
            options={countriesOptions}
            placeholder={"Select Country"}
            value={recipientFormDataPerson.countryIso}
            onChange={handleCountryChange}
          />
        </div>
        {recipientFormDataPerson?.countryIso === "IN" && (
          <div className="field column is-12 p-b-0 p-t-0">
            <label>State</label>
            <SelectInput
              options={stateOptions}
              placeholder={"Select State"}
              value={recipientFormDataPerson?.indiaState?.id}
              onChange={handleStateChange}
              isLoading={!stateOptions}
            />
          </div>
        )}
      </div>
    </OnClickOutside>
  );
};

export default RecipientFormPersonComponent;

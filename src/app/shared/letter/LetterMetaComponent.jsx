import React, { useState } from "react";
import config from "../../../../oldConfig";
import { isEmpty } from "lodash";
import { convertDateKeyToPreview } from "../../helpers/convertDateKeyToPreview";
import InvoiceState from "../../enums/invoice/invoice-state.enum";
import Modal from "../components/modal/Modal";
import Direction from "../../enums/direction.enum";
import Invoice from "../../models/invoice.model";
import {
  formateClientDateMonthYear,
  formatApiDate,
} from "../../helpers/formatDate";
import OfferState from "../../enums/offer/offer-state.enum";
import Offer from "../../models/offer.model";
import PurchaseOrder from "../../models/purchase-order.model";
import { getInvoiceNumber } from "../../helpers/transaction/getInvoiceNumber";
import groflexService from "../../services/groflex.service";
import { Input } from "../components/input/Input";
import LetterMetaEditComponent from "./LetterMetaEditComponent";
import LetterMetaDisplayComponent from "./LetterMetaDisplayComponent";

const KEYCODE_ENTER = 13;
const KEYCODE_ESCAPE = 27;
const MAX_CUSTOM_FIELDS = 3;

const DELIVERY_DATE_NAME = "deliveryDate";
const DATE_NAME = "date";
const DELIVERY_PERIOD_NAME = "deliveryPeriod";
const DELIVERY_PERIOD_START_NAME = "deliveryPeriodStartDate";
const DELIVERY_PERIOD_END_NAME = "deliveryPeriodEndDate";

const LetterMetaComponent = ({ onChange }) => {
  const [displayActive, setDisplayActive] = useState(false);

  const handleChange = (letterMetaData) => {
    onChange(letterMetaData);
  };

  // functions to close and open the displayActive state
  const closeDisplay = () => {
    setDisplayActive(false);
  };
  const openDisplay = () => {
    setDisplayActive(true);
  };

  return (
    <>
      {displayActive ? (
        <LetterMetaDisplayComponent
          onChange={handleChange}
          openDisplay={openDisplay}
        />
      ) : (
        <LetterMetaEditComponent onChange closeDisplay={closeDisplay} />
      )}
    </>
  );
};

export default LetterMetaComponent;

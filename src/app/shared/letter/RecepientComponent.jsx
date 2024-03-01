import React, { useState } from "react";
import { contactTypes } from "../../helpers/constants";
import { Button } from "../components/button/Button";
import RecepientEmptyComponent from "./RecepientEmptyComponent";
import RecepientSelectComponent from "./RecepientSelectComponent";
import RecepientDisplayComponent from "./RecepientDisplayComponent";
import RecepientFormComponent from "./RecepientFormComponent";

const RecepientComponent = ({
  transaction,
  customerData,
  recipientState,
  recipientType,
  customerFullData,
  initialShowStates = {
    showEmptyComp: Boolean,
    showSelectComp: Boolean,
    showDisplayComp: Boolean,
    showFormComp: Boolean,
  },
}) => {
  const [showEmptyComp, setShowEmptyComp] = useState(
    initialShowStates.showEmptyComp
  );
  const [showSelectComp, setShowSelectComp] = useState(
    initialShowStates.showSelectComp
  );
  const [showDisplayComp, setShowDisplayComp] = useState(
    initialShowStates.showDisplayComp
  );
  const [showFormComp, setShowFormComp] = useState(
    initialShowStates.showFormComp
  );

  const showEmpty = () => {
    setShowEmptyComp(true);
    setShowSelectComp(false);
    setShowDisplayComp(false);
    setShowFormComp(false);
  };
  const showSelect = () => {
    setShowEmptyComp(false);
    setShowSelectComp(true);
    setShowDisplayComp(false);
    setShowFormComp(false);
  };
  const showDisplay = () => {
    setShowEmptyComp(false);
    setShowSelectComp(false);
    setShowDisplayComp(true);
    setShowFormComp(false);
  };
  const showForm = () => {
    setShowEmptyComp(false);
    setShowSelectComp(false);
    setShowDisplayComp(false);
    setShowFormComp(true);
  };

  return (
    <>
      {showEmptyComp && <RecepientEmptyComponent onClick={showSelect} />}
      {showSelectComp && <RecepientSelectComponent onSelect={showDisplay} />}
      {showDisplayComp && <RecepientDisplayComponent onClick={showForm} />}
      {showFormComp && <RecepientFormComponent onBlur={showDisplay} />}
    </>
  );
};

export default RecepientComponent;

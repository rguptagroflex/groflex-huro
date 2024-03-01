import React from "react";
import { FeatherIcon } from "../featherIcon/FeatherIcon";

const RecepientEmptyComponent = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex-row border-on-hover cursor-pointer p-10 color-primary is-weight-600"
    >
      <FeatherIcon primaryColor name={"PlusCircle"} className={"m-r-10"} />
      Enter Customer
    </div>
  );
};

export default RecepientEmptyComponent;

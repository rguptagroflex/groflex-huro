import React, { useEffect } from "react";
import PageContent from "../../../shared/components/pageContent/PageContent";
import { ListAdvancedComponent } from "../../../shared/components/list-advanced/ListAdvancedComponent";
import { formatCurrency } from "../../../helpers/formatCurrency";
import config from "../../../../../newConfig";
import groflexService from "../../../services/groflex.service";

const DeliveryChallan = () => {
  const handleActionClick = () => {};
  useEffect(() => {
    fetchDeliveryChallan();
  }, []);
  const fetchDeliveryChallan = () => {
    groflexService
      .request(`${config.resourceUrls.deliveryChallanList}`, { auth: true })
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <PageContent title={"Delivery Challan"}>
      <ListAdvancedComponent
        onRowClicked={(e) => {}}
        onActionClick={handleActionClick}
        columnDefs={[
          {
            field: "number",
            headerName: "Number",
          },
          {
            field: "date",
            headerName: "Date",
          },
          {
            field: "customer",
            headerName: "Customer",
          },
          {
            field: "igst",
            headerName: "Igst",
            cellRenderer: (evt) => {
              return formatCurrency(evt.value);
            },
          },
        ]}
        fetchUrl={`${config.resourceUrls.deliveryChallanList}`}
      />
    </PageContent>
  );
};

export default DeliveryChallan;

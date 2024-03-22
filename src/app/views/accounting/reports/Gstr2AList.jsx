import React from "react";
import PageContent from "../../../shared/components/pageContent/PageContent";
import { AdvancedCard } from "../../../shared/components/cards/AdvancedCard";
import GstrDetailHeader from "./GstrDetailHeader";
import { ListAdvancedComponent } from "../../../shared/components/list-advanced/ListAdvancedComponent";
import { formatPercent } from "../../../helpers/formatPercent";
import { formatCurrency } from "../../../helpers/formatCurrency";

const Gstr2AList = () => {
  const handleActionClick = () => {};
  const gstr2AData = [
    {
      description: "Purchases Received From Registered taxpayers",
      igstAmount: 12,
      cgstAmount: 12,
      sgstAmount: 12,
      totalInvoice: 0,
    },
    {
      description: "Purchases Received From Unregistered taxpayers",
      igstAmount: 12,
      cgstAmount: 12,
      sgstAmount: 12,
      totalInvoice: 0,
    },
    {
      description: "Details of Credit/Debit Notes/Refund Voucher",
      igstAmount: 12,
      cgstAmount: 12,
      sgstAmount: 12,
      totalInvoice: 0,
    },
    {
      description:
        "Details of Credit/Debit Notes/Refund Voucher for Unregistered Vendor",
      igstAmount: 12,
      cgstAmount: 12,
      sgstAmount: 12,
      totalInvoice: 0,
    },
    {
      description: "Goods /Capital goods received from Overseas",
      igstAmount: 12,
      cgstAmount: 12,
      sgstAmount: 12,
      totalInvoice: 0,
    },
    {
      description: "Services received from Overseas",
      igstAmount: 12,
      cgstAmount: 12,
      sgstAmount: 12,
      totalInvoice: 0,
    },
    {
      description:
        "Supplies received from compounding dealer & other exempt/nil/non GST supplies",
      igstAmount: 12,
      cgstAmount: 12,
      sgstAmount: 12,
      totalInvoice: 0,
    },
    {
      description: "HSN-wise summary of inward supplies",
      igstAmount: 12,
      cgstAmount: 12,
      sgstAmount: 12,
      totalInvoice: 0,
    },
    {
      description: "TDS Credit received",
      igstAmount: 12,
      cgstAmount: 12,
      sgstAmount: 12,
      totalInvoice: 0,
    },
    {
      description: "ISD credit received",
      igstAmount: 12,
      cgstAmount: 12,
      sgstAmount: 12,
      totalInvoice: 0,
    },
    {
      description:
        "Inwards Supplies on which tax is to be paid on reverse charge",
      igstAmount: 12,
      cgstAmount: 12,
      sgstAmount: 12,
      totalInvoice: 0,
    },
    {
      description: "Advances paid on account of receipt of supply",
      igstAmount: 12,
      cgstAmount: 12,
      sgstAmount: 12,
      totalInvoice: 0,
    },
    {
      description: "Advance adjusted on account of receipt of supply",
      igstAmount: 12,
      cgstAmount: 12,
      sgstAmount: 12,
      totalInvoice: 0,
    },
  ];
  return (
    <PageContent title={"Reports GSTR-2A"}>
      <div className="gstReportsListMain">
        <AdvancedCard type={"s-card"}>
          <GstrDetailHeader reportType={"2A"} />
          <ListAdvancedComponent
            onRowClicked={(e) => {}}
            onActionClick={handleActionClick}
            columnDefs={[
              {
                field: "description",
                headerName: "Description",
                // cellStyle: { color: "#00a353" },
                minWidth: 259,
              },
              {
                field: "sgstAmount",
                headerName: "Sgst Amount",
                cellRenderer: (evt) => {
                  return formatPercent(evt.value);
                },
              },
              {
                field: "cgstAmount",
                headerName: "Cgst Amount",
                cellRenderer: (evt) => {
                  return formatPercent(evt.value);
                },
              },
              {
                field: "igstAmount",
                headerName: "Igst Amount",
                cellRenderer: (evt) => {
                  return formatPercent(evt.value);
                },
              },

              {
                field: "totalInvoice",
                headerName: "Total Invoice",
                cellRenderer: (evt) => {
                  return formatCurrency(evt.value);
                },
              },
            ]}
            customRowData={gstr2AData}
          />
        </AdvancedCard>
      </div>
    </PageContent>
  );
};

export default Gstr2AList;

import React from "react";
import { ListAdvancedComponent } from "../../../shared/components/list-advanced/ListAdvancedComponent";
import PageContent from "../../../shared/components/pageContent/PageContent";
import { formatCurrency } from "../../../helpers/formatCurrency";
import { AdvancedCard } from "../../../shared/components/cards/AdvancedCard";
import GstrDetailHeader from "./GstrDetailHeader";

const Gstr1List = () => {
  const handleActionClick = () => {};
  const gstr1Data = [
    {
      description: "B2B Invoices (4A, 4B, 4C, 6B, 6C)",
      igst: 0,
      cgst: 0,
      cessAmount: 0,
      sgstAmount: 0,
      taxableAmount: 0,
      invoiceAmount: 0,
      totalTaxableAmount: 0,
    },
    {
      description: "B2C Large Invoices (5A, 5B)",
      igst: 0,
      cgst: 0,
      cessAmount: 0,
      sgstAmount: 0,
      taxableAmount: 0,
      invoiceAmount: 0,
      totalTaxableAmount: 0,
    },
    {
      description: "B2C Small Invoices",
      igst: 0,
      cgst: 0,
      cessAmount: 0,
      sgstAmount: 0,
      taxableAmount: 0,
      invoiceAmount: 0,
      totalTaxableAmount: 0,
    },
    {
      description: "Credit/Debit Notes (Registered B9)",
      igst: 0,
      cgst: 0,
      cessAmount: 0,
      sgstAmount: 0,
      taxableAmount: 0,
      invoiceAmount: 0,
      totalTaxableAmount: 0,
    },
    {
      description: "Export Invoice (6A)",
      igst: 0,
      cgst: 0,
      cessAmount: 0,
      sgstAmount: 0,
      taxableAmount: 0,
      invoiceAmount: 0,
      totalTaxableAmount: 0,
    },
    {
      description: "Tax Liability (Advance received)",
      igst: 0,
      cgst: 0,
      cessAmount: 0,
      sgstAmount: 0,
      taxableAmount: 0,
      invoiceAmount: 0,
      totalTaxableAmount: 0,
    },
    {
      description: "Adjustment of Advances",
      igst: 0,
      cgst: 0,
      cessAmount: 0,
      sgstAmount: 0,
      taxableAmount: 0,
      invoiceAmount: 0,
      totalTaxableAmount: 0,
    },
    {
      description: "Nil Rated Invoices 8A, 8B, 8C, 8D",
      igst: 0,
      cgst: 0,
      cessAmount: 0,
      sgstAmount: 0,
      taxableAmount: 0,
      invoiceAmount: 0,
      totalTaxableAmount: 0,
    },
    {
      description: "HSN Invoices",
      igst: 0,
      cgst: 0,
      cessAmount: 0,
      sgstAmount: 0,
      taxableAmount: 0,
      invoiceAmount: 0,
      totalTaxableAmount: 0,
    },
  ];
  return (
    <PageContent title={"Reports GSTR-1"}>
      <div className="gstReportsListMain">
        <AdvancedCard type={"s-card"}>
          <GstrDetailHeader reportType={"1"} />
          <ListAdvancedComponent
            onRowClicked={(e) => {}}
            onActionClick={handleActionClick}
            columnDefs={[
              {
                field: "description",
                headerName: "Description",
                cellStyle: { color: "#00a353" },
                minWidth: 259,
              },
              {
                field: "igst",
                headerName: "Igst",
                cellRenderer: (evt) => {
                  return formatCurrency(evt.value);
                },
              },
              {
                field: "cgst",
                headerName: "Cgst",
                cellRenderer: (evt) => {
                  return formatCurrency(evt.value);
                },
              },
              {
                field: "cessAmount",
                headerName: "Cess Amount",
                cellRenderer: (evt) => {
                  return formatCurrency(evt.value);
                },
              },
              {
                field: "sgstAmount",
                headerName: "Sgst Amount",
                cellRenderer: (evt) => {
                  return formatCurrency(evt.value);
                },
              },
              {
                field: "taxableAmount",
                headerName: "Taxable Amount",
                cellRenderer: (evt) => {
                  return formatCurrency(evt.value);
                },
              },
              {
                field: "invoiceAmount",
                headerName: "Invoice Amount",
                cellRenderer: (evt) => {
                  return formatCurrency(evt.value);
                },
              },
              {
                field: "totalTaxableAmount",
                headerName: "Total Taxable Amount",
                cellRenderer: (evt) => {
                  return formatCurrency(evt.value);
                },
              },
            ]}
            customRowData={gstr1Data}
          />
        </AdvancedCard>
      </div>
    </PageContent>
  );
};

export default Gstr1List;

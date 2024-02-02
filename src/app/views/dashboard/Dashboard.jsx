import React, { useEffect, useState } from "react";
import PageContent from "../../shared/components/pageContent/PageContent";
import { FeatherIcon } from "../../shared/featherIcon/FeatherIcon";
import { AdvancedCard } from "../../shared/components/cards/AdvancedCard";
import Tabs from "../../shared/components/tabs/Tabs";
import DateInput from "../../shared/components/datePicker/DateInput";
import moment from "moment";
import { SelectInput } from "../../shared/components/select/SelectInput";
import DashBoardInvoiceTab from "./DashBoardInvoiceTab";
import DashboardExpenseTab from "./DashboardExpenseTab";
import DashboardQuotation from "./DashboardQuotationTab";
import DashboardSalesExpenseStats from "./DashboardSalesExpenseStats";
import DashboardSalesByArticle from "./DashboardSalesByArticle";
import DashboardSalesByCustomer from "./DashboardSalesByCustomer";
import DashboardExpenseByArticle from "./DashboardExpenseByArticle";
import DashboardExpenseByPayee from "./DashboardExpenseByPayee";

import DashBoardSummaryCard from "./DashBoardSummaryCard";

const Dashboard = () => {
  const invoicesTabList = [
    { label: "Invoices", content: <DashBoardInvoiceTab /> },
    { label: "Expenses", content: <DashboardExpenseTab /> },
  ];
  const quotationTabList = [
    { label: "Quotation", content: <DashboardQuotation /> },
  ];

  const salesTabList = [
    { label: "Sales By Article", content: <DashboardSalesByArticle /> },
    { label: "Sales By Customer", content: <DashboardSalesByCustomer /> },
  ];

  const expenseTabList = [
    { label: "Expense By Article", content: <DashboardExpenseByArticle /> },
    { label: "Expense By Payee", content: <DashboardExpenseByPayee /> },
  ];

  return (
    <PageContent
      breadCrumbIcon={
        <FeatherIcon
          color="#272D30"
          name="Activity"
          size={18}
          style={{ marginRight: "10px" }}
        />
      }
      breadCrumbData={["Home", "Dashboard"]}
      title="Dashboard"
    >
      <div className="dashboard-wrapper">
        <div className="columns is-multiline" style={{ marginBottom: "20px" }}>
          <div className="column is-6">
            <DashBoardSummaryCard
              heading={"To Receive"}
              subHeading={" Receivables from unpaid invoices"}
            />
          </div>
          <div className={"column is-6"}>
            <DashBoardSummaryCard
              heading={"To Pay"}
              subHeading={"Unpaid bill amount"}
            />
          </div>
        </div>

        <div className="columns is-mulitline">
          <div className="column is-6 dashboard-invoice-expense-card">
            <AdvancedCard type={"s-card"}>
              <Tabs tabList={invoicesTabList} />
            </AdvancedCard>
          </div>
          <div className="column is-6 quotation-card">
            <AdvancedCard type={"s-card"}>
              <Tabs tabList={quotationTabList} />
            </AdvancedCard>
          </div>
        </div>

        <DashboardSalesExpenseStats />

        <div className="columns is-mulitline">
          <div className="column is-6 sale-tabs">
            <AdvancedCard type={"s-card"}>
              <Tabs tabList={salesTabList} />
            </AdvancedCard>
          </div>
          <div className="column is-6 expense-tabs">
            <AdvancedCard type={"s-card"}>
              <Tabs tabList={expenseTabList} />
            </AdvancedCard>
          </div>
        </div>
      </div>
    </PageContent>
  );
};

export default Dashboard;

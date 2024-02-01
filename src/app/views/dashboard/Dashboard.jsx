import React, { useState } from "react";
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
          <div className="column is-5">
            <AdvancedCard type={"s-card"}>
              <h4 className="dashboard-card-title">To Receive</h4>
              <div style={{ marginBottom: "10px" }}>
                Receivables from unpaid invoices
              </div>
              <div className="columns is-multiline receivable-container">
                <div className="column is-6">
                  <h4 className="receivable-label">
                    <span className="text-indicator-green"></span>
                    Total Amount
                  </h4>
                  <h4 className="receivable-value">₹ 782</h4>
                </div>
                <div className="column is-6">
                  <h4 className="receivable-label">
                    <span className="text-indicator-red"></span>
                    Over Due {`(> 3)`}
                  </h4>
                  <h4 className="receivable-overdue-value">₹ 782</h4>
                </div>
              </div>
            </AdvancedCard>
          </div>
          <div className={"column is-5"}>
            <AdvancedCard type={"s-card"}>
              <h4 className="dashboard-card-title">To Pay</h4>
              <div style={{ marginBottom: "10px" }}>Unpaid bill amount</div>

              <div className="columns is-multiline receivable-container">
                <div className="column is-6">
                  <h4 className="receivable-label">
                    <span className="text-indicator-green"></span>
                    Total Amount
                  </h4>
                  <h4 className="receivable-value">₹ 782</h4>
                </div>
                <div className="column is-6">
                  <h4 className="receivable-label">
                    <span className="text-indicator-red"></span>
                    Over Due {`(> 3)`}
                  </h4>
                  <h4 className="receivable-overdue-value">₹ 782</h4>
                </div>
              </div>
            </AdvancedCard>
          </div>
        </div>

        <div className="columns is-mulitline">
          <div className="column is-5 dashboard-invoice-expense-card">
            <AdvancedCard type={"s-card"}>
              <Tabs tabList={invoicesTabList} />
            </AdvancedCard>
          </div>
          <div className="column is-5 quotation-card">
            <AdvancedCard type={"s-card"}>
              <Tabs tabList={quotationTabList} />
            </AdvancedCard>
          </div>
        </div>

        <DashboardSalesExpenseStats />

        <div className="columns is-mulitline">
          <div className="column is-5 sale-tabs">
            <AdvancedCard type={"s-card"}>
              <Tabs tabList={salesTabList} />
            </AdvancedCard>
          </div>
          <div className="column is-5 expense-tabs">
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

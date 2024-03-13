import React, { useEffect, useState } from "react";
import PageContent from "../../../shared/components/pageContent/PageContent";
import { useNavigate } from "react-router";
import groflexService from "../../../services/groflex.service";
import { FeatherIcon } from "../../../shared/featherIcon/FeatherIcon";
import { AdvancedCard } from "../../../shared/components/cards/AdvancedCard";
import config from "../../../../../config";
import Tabs from "../../../shared/components/tabs/Tabs";
import moment from "moment";
import InventoryDashboardTopSellingArticles from "./InventoryDashboardTopSellingArticles";
import InventoryDashboardArticlesLowOnStock from "./InventoryDashboardArticlesLowOnStock";
import InventoryDashboardLastOrdersTab from "./InventoryDashboardLastOrdersTab";
import InventoryDashboardSlowMowingArticles from "./InventoryDashboardSlowMowingArticles";
import InventoryDashboardSalesAndPurchase from "./InventoryDashboardSalesAndPurchase";
import InventoryDashboardProfitAndLoss from "./InventoryDashboardProfitAndLoss";

const InventoryDashboard = () => {
  const navigate = useNavigate();
  const [receivablesCard, setReceivablesCard] = useState({
    invoices: [],
    totalAmount: 0,
    overdue3Days: 0,
    overdue15Days: 0,
    overdue45Days: 0,
    overdueAbove45days: 0,
  });

  const [payableCard, setPayableCard] = useState({
    expenses: [],
    totalAmount: 0,
    overdue3Days: 0,
    overdue15Days: 0,
    overdue45days: 0,
    overdueAbove45days: 0,
  });

  useEffect(() => {
    fetchRecievablesData();
    fetchPayableData();
  }, []);
  const fetchRecievablesData = async () => {
    const response = await groflexService.request(
      `${config.resourceUrls.recievables}`,
      { auth: true }
    );

    const invoices = response.body.data;
    const lockedInvoices = invoices.filter(
      (invoice) => invoice.state === "locked"
    );
    const totalAmount = invoices.reduce(
      (sum, item) => sum + item.outstandingAmount,
      0
    );
    const overdue3Days = findOverdueByDaysInvoices(3, invoices);
    const overdue15Days =
      findOverdueByDaysInvoices(15, invoices) - overdue3Days;
    const overdue45Days =
      findOverdueByDaysInvoices(45, invoices) -
      findOverdueByDaysInvoices(15, invoices);
    const overdueAbove45days =
      totalAmount - findOverdueByDaysInvoices(45, invoices);

    setReceivablesCard({
      invoices: lockedInvoices,
      totalAmount: totalAmount,
      overdue3Days: overdue3Days,
      overdue15Days: overdue15Days,
      overdue45Days: overdue45Days,
      overdueAbove45days: overdueAbove45days,
    });
  };

  const fetchPayableData = async () => {
    const response = await groflexService.request(
      `${config.resourceUrls.payable}`,
      { auth: true }
    );

    const expenses = response.body.data.filter(
      (invoice) => invoice.status === "open"
    );

    const totalAmount = expenses.reduce(
      (sum, item) => sum + item.totalGross,
      0
    );

    const overdue3Days = findOverdueByDaysExpenses(3, expenses);
    const overdue15Days =
      findOverdueByDaysExpenses(15, expenses) - overdue3Days;
    const overdue45Days =
      findOverdueByDaysExpenses(45, expenses) -
      findOverdueByDaysExpenses(15, expenses);
    const overdueAbove45days =
      totalAmount - findOverdueByDaysExpenses(45, expenses);

    setPayableCard({
      expenses: expenses,
      overdue3Days: overdue3Days,
      overdue15Days: overdue15Days,
      overdue45days: overdue45Days,
      overdueAbove45days: overdueAbove45days,
      totalAmount: totalAmount,
    });
  };

  const findOverdueByDaysExpenses = (days, expenses) => {
    return expenses.reduce((sum, item) => {
      const noOfDaysDue = moment().diff(item.date, "days");
      if (noOfDaysDue > days) return sum + 0;
      return sum + item.totalGross;
    }, 0);
  };

  const findOverdueByDaysInvoices = (days, invoices) => {
    return invoices.reduce((sum, item) => {
      const noOfDaysDue = moment().diff(item.dueToDate, "days");
      if (noOfDaysDue > days) return sum + 0;
      return sum + item.outstandingAmount;
    }, 0);
  };

  const articlesTabList = [
    {
      label: "Top Selling Articles",
      content: <InventoryDashboardTopSellingArticles />,
    },
    {
      label: "Slow-Moving Articles",
      content: <InventoryDashboardSlowMowingArticles />,
    },
  ];

  const stockTabList = [
    {
      label: "Articles Low On Stock",
      content: <InventoryDashboardArticlesLowOnStock />,
    },
    { label: "Last Orders ", content: <InventoryDashboardLastOrdersTab /> },
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
      <div className="inventorydashboard-wrapper">
        <div className="columns is-mulitline">
          <div className="column is-6 article-tabs">
            <AdvancedCard type={"s-card"}>
              <Tabs tabList={articlesTabList} />
            </AdvancedCard>
          </div>
          <div className="column is-6 stock-tabs">
            <AdvancedCard type={"s-card"}>
              <Tabs tabList={stockTabList} />
            </AdvancedCard>
          </div>
        </div>

        <InventoryDashboardSalesAndPurchase />
        <InventoryDashboardProfitAndLoss />
      </div>
    </PageContent>
  );
};

export default InventoryDashboard;

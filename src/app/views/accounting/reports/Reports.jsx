import React from "react";
import PageContent from "../../../shared/components/pageContent/PageContent";
import { AdvancedCard } from "../../../shared/components/cards/AdvancedCard";
import { FeatherIcon } from "../../../shared/featherIcon/FeatherIcon";
import { useNavigate } from "react-router-dom";

const Reports = () => {
  const navigate = useNavigate();
  return (
    <PageContent title={"Reports"}>
      <AdvancedCard
        type={"s-card"}
        className={"reports-wrapper"}
        style={{ marginTop: "30px" }}
      >
        <div className="columns is-multiline sub-cards-container">
          <AdvancedCard
            type={"s-card"}
            containerClassName="column is-5 report-card"
            onClick={() => navigate("/accounting/reports/balance-sheet")}
          >
            <div className="report-card-heading-container">
              <FeatherIcon name={"Book"} color="#00A353" />
              <h5 className="report-card-heading">Balance sheet</h5>
            </div>
            <div className="reports-description">
              A snapshot of your company's financial position at a specific
              point in time showing assets, liabilities, and equity.
            </div>
          </AdvancedCard>
          <AdvancedCard
            type={"s-card"}
            containerClassName="column is-5 report-card"
            onClick={() => navigate("/accounting/reports/general-ledger")}
          >
            <div className="report-card-heading-container">
              <FeatherIcon name={"Book"} color="#00A353" />
              <h5 className="report-card-heading">General ledger</h5>
            </div>
            <div className="reports-description">
              A record of all the financial transactions of your company using
              double-entry bookkeeping, including all accounts.
            </div>
          </AdvancedCard>
        </div>

        <div className="columns is-multiline sub-cards-container">
          <AdvancedCard
            type={"s-card"}
            containerClassName="column is-5 report-card"
            onClick={() => navigate("/accounting/reports/profit-and-loss")}
          >
            <div className="report-card-heading-container">
              <FeatherIcon name={"Book"} color="#00A353" />
              <h5 className="report-card-heading">Profit and loss statement</h5>
            </div>
            <div className="reports-description">
              A report showing your company's revenues, expenses, gains, and
              losses over a specified period of time.
            </div>
          </AdvancedCard>
          <AdvancedCard
            type={"s-card"}
            containerClassName="column is-5 report-card"
            onClick={() => navigate("/accounting/reports/cash-flow")}
          >
            <div className="report-card-heading-container">
              <FeatherIcon name={"Book"} color="#00A353" />
              <h5 className="report-card-heading">Cash Flow Statement</h5>
            </div>
            <div className="reports-description">
              A report showing the inflows and outflows of cash and cash
              equivalents for a specified period of time.
            </div>
          </AdvancedCard>
        </div>

        <div className="columns is-multiline sub-cards-container">
          <AdvancedCard
            type={"s-card"}
            containerClassName="column is-5 report-card"
            onClick={() => navigate("/accounting/reports/gst-reports")}
          >
            <div className="report-card-heading-container">
              <FeatherIcon name={"Book"} color="#00A353" />
              <h5 className="report-card-heading">GST Reports</h5>
            </div>
            <div className="reports-description">
              A report showing your company's revenues, expenses, gains, and
              losses over a specified period of time.
            </div>
          </AdvancedCard>
          <div className="column is-5"></div>
        </div>
      </AdvancedCard>
    </PageContent>
  );
};

export default Reports;

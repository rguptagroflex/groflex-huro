import React, { useEffect, useState } from "react";
import PageContent from "../../../shared/components/pageContent/PageContent";
import { AdvancedCard } from "../../../shared/components/cards/AdvancedCard";
import GstrDetailHeader from "./GstrDetailHeader";
import { ListAdvancedComponent } from "../../../shared/components/list-advanced/ListAdvancedComponent";
import { formatCurrency } from "../../../helpers/formatCurrency";
import { useParams } from "react-router-dom";
import groflexService from "../../../services/groflex.service";
import config from "../../../../../newConfig";
import moment from "moment";

const Gstr3BList = () => {
  const { reportId } = useParams();
  const [header, setHeader] = useState({});
  useEffect(() => {
    groflexService
      .request(`${config.resourceUrls.getGstReport}/${reportId}`, {
        auth: true,
      })
      .then((res) => {
        let reportData = {
          startDate: moment(res.body.data.startDate).format("YYYY-MM-DD"),
          endDate: moment(res.body.data.endDate).format("YYYY-MM-DD"),
          exportPeriod: res.body.data.exportPeriod,
          exportFormat: res.body.data.exportFormat,
          type: "JSON",
        };
        setHeader({
          auth: true,
          data: reportData,
          method: "POST",
        });
      });
  }, []);
  const handleActionClick = () => {};
  const gstr3BData1 = [
    {
      natureOfSupply:
        "(a) Outward taxable supplies (other than zero rated, nil rated and exempted)",
      taxableValue: 0,
      integratedTax: 0,
      centralTax: 0,
      stateUtTax: 0,
      cessTax: 0,
    },
    {
      natureOfSupply: "(b) Outward taxable supplies (zero rated)",
      taxableValue: 0,
      integratedTax: 0,
      centralTax: 0,
      stateUtTax: 0,
      cessTax: 0,
    },
    {
      natureOfSupply:
        "(c) Other outward taxable supplies (nil rated, exempted)",
      taxableValue: 0,
      integratedTax: 0,
      centralTax: 0,
      stateUtTax: 0,
      cessTax: 0,
    },
    {
      natureOfSupply: "(d) Inward supplies (liable to reverse charge)",
      taxableValue: 0,
      integratedTax: 0,
      centralTax: 0,
      stateUtTax: 0,
      cessTax: 0,
    },
    {
      natureOfSupply: "(e) Non-GST outward supplies",
      taxableValue: 0,
      integratedTax: 0,
      centralTax: 0,
      stateUtTax: 0,
      cessTax: 0,
    },
  ];
  const gstr3BData2 = [
    {
      natureOfSupply:
        "a. Taxable supplies on which electronic commerce operator pays tax u/s 9(5) [to be furnished by electronic commerce operator]",
      taxableValue: 0,
      integratedTax: 0,
      centralTax: 0,
      stateUtTax: 0,
      cessTax: 0,
    },
    {
      natureOfSupply:
        "b. Taxable supplies made by registered person through electrnic commerce operator on which electronic commerce operator is required to pay tax u/s 9(5) [to be furnished by registered person making supplies through electronic commerce operated]",
      taxableValue: 0,
      integratedTax: 0,
      centralTax: 0,
      stateUtTax: 0,
      cessTax: 0,
    },
  ];

  const gstr3BData3 = [
    {
      details: "Supplies made to Unregistered Persons",
      totalTaxableValue: 0,
      integratedTax: 0,
    },
    {
      details: "Supplies made to composition Taxable Persons",
      totalTaxableValue: 0,
      integratedTax: 0,
    },
    {
      details: "Supplies made to UIN holders",
      totalTaxableValue: 0,
      integratedTax: 0,
    },
  ];
  return (
    <PageContent title={"Reports GSTR-3B"}>
      <div className="gstReportsListMain">
        <AdvancedCard type={"s-card"}>
          <GstrDetailHeader reportType={"3B"} />
          {Object.keys(header).length > 0 ? (
            <>
              <div className="gstr-table-heading">
                I. Details of Outward supplies and inward supplies liable to
                reverse charge (other than those covered by table II)
              </div>

              <ListAdvancedComponent
                onRowClicked={(e) => {}}
                onActionClick={handleActionClick}
                columnDefs={[
                  {
                    field: "natureOfSupplies",
                    headerName: "Nature Of Supply",
                    // cellStyle: { color: "#00a353" },
                    minWidth: 259,
                  },
                  {
                    field: "taxableValue",
                    headerName: "Taxable Value",
                    cellRenderer: (evt) => {
                      return formatCurrency(evt.value);
                    },
                  },
                  {
                    field: "igst",
                    headerName: "Integrated Tax",
                    cellRenderer: (evt) => {
                      return formatCurrency(evt.value);
                    },
                  },
                  {
                    field: "cgst",
                    headerName: "Central Tax",
                    cellRenderer: (evt) => {
                      return formatCurrency(evt.value);
                    },
                  },

                  {
                    field: "sgst",
                    headerName: "State/UT Tax",
                    cellRenderer: (evt) => {
                      return formatCurrency(evt.value);
                    },
                  },

                  {
                    field: "cessAmount",
                    headerName: "Cess Tax",
                    cellRenderer: (evt) => {
                      return formatCurrency(evt.value);
                    },
                  },
                ]}
                // customRowData={gstr3BData1}
                fetchUrl={() => `${config.resourceUrls.getGstDetail}`}
                headers={header}
                responseDataMapFunc={(response) => {
                  let result = [];
                  const outward = response.data.outwardCSV;

                  outward.forEach((item, index) => {
                    if (index === 0 || item.natureOfSupplies === "Total") {
                      return;
                    }
                    result.push({
                      natureOfSupplies: item.natureOfSupplies,
                      igst: parseFloat(item.IGST) ? item.IGST : 0,
                      cgst: parseFloat(item.CGST) ? item.CGST : 0,
                      sgst: parseFloat(item.SGST) ? item.SGST : 0,
                      cessAmount: item.cessAmount
                        ? parseFloat(item.cessAmount)
                        : 0,
                      taxableValue: item.net ? parseFloat(item.net) : 0,
                    });
                  });
                  return result;
                }}
                pagination={false}
              />

              <div className="gstr-table-heading">
                II. Details of supplies notified under section 9(5) of the CGST
                Act, 2017 and corresponding provisions in IGST/UTGST/SGST acts
              </div>

              <ListAdvancedComponent
                onRowClicked={(e) => {}}
                onActionClick={handleActionClick}
                columnDefs={[
                  {
                    field: "natureOfSupplies",
                    headerName: "Nature Of Supply",
                    // cellStyle: { color: "#00a353" },
                    minWidth: 259,
                    colSpan: (params) => {
                      const natureOfSupply = params.data.natureOfSupplies;
                      if (
                        natureOfSupply ===
                        "ITC Available (whether full or in part)"
                      ) {
                        return 5;
                      } else if (natureOfSupply === "ITC Reversed") {
                        return 5;
                      } else if (
                        natureOfSupply === "Net ITC Available (A)-(B)"
                      ) {
                        return 5;
                      } else {
                        return 1;
                      }
                    },
                  },

                  {
                    field: "igst",
                    headerName: "Integrated Tax",
                    cellRenderer: (evt) => {
                      return formatCurrency(evt.value);
                    },
                  },
                  {
                    field: "cgst",
                    headerName: "Central Tax",
                    cellRenderer: (evt) => {
                      return formatCurrency(evt.value);
                    },
                  },

                  {
                    field: "sgst",
                    headerName: "State/UT Tax",
                    cellRenderer: (evt) => {
                      return formatCurrency(evt.value);
                    },
                  },

                  {
                    field: "cess",
                    headerName: "Cess Tax",
                    cellRenderer: (evt) => {
                      return formatCurrency(evt.value);
                    },
                  },
                ]}
                fetchUrl={() => `${config.resourceUrls.getGstDetail}`}
                headers={header}
                responseDataMapFunc={(response) => {
                  let result = [];

                  const itc = response.data.ITCCSV;
                  itc.forEach((item, index) => {
                    if (index === 0) {
                      return;
                    }
                    if (
                      item.details ===
                        "ITC Available (whether full or in part)" ||
                      item.details === "ITC Reversed" ||
                      item.details === "Net ITC Available (A)-(B)"
                    ) {
                      result.push({
                        natureOfSupplies: item.details,
                      });
                    } else {
                      result.push({
                        natureOfSupplies: item.details,
                        igst: item.IGST ? parseFloat(item.IGST) : 0,
                        cgst: item.CGST ? parseFloat(item.CGST) : 0,
                        sgst: item.SGST ? parseFloat(item.SGST) : 0,
                        cess: item.cessAmount ? parseFloat(item.cessAmount) : 0,
                      });
                    }
                  });

                  return result;
                }}
                pagination={false}
              />

              <div className="gstr-table-heading">IV. Eligible ITC</div>
              <ListAdvancedComponent
                onRowClicked={(e) => {}}
                onActionClick={handleActionClick}
                columnDefs={[
                  {
                    field: "details",
                    headerName: "Details",
                    // cellStyle: { color: "#00a353" },
                    minWidth: 259,
                  },
                  {
                    field: "totalTaxableValue",
                    headerName: "Total Taxable Value",
                    cellRenderer: (evt) => {
                      return formatCurrency(evt.value);
                    },
                  },
                  {
                    field: "integratedTax",
                    headerName: "Integrated Tax",
                    cellRenderer: (evt) => {
                      return formatCurrency(evt.value);
                    },
                  },
                ]}
                customRowData={gstr3BData3}
                pagination={false}
              />

              <div className="gstr-table-heading">
                V. Values of exempt, nil rated and Non-GST inward supplies
              </div>

              <ListAdvancedComponent
                onRowClicked={(e) => {}}
                onActionClick={handleActionClick}
                columnDefs={[
                  {
                    field: "natureOfSupplies",
                    headerName: "Nature Of Supply",
                    // cellStyle: { color: "#00a353" },
                    minWidth: 259,
                  },
                  {
                    field: "interStateValue",
                    headerName: "Inter-State",
                    cellRenderer: (evt) => {
                      return formatCurrency(evt.value);
                    },
                  },
                  {
                    field: "intraStateValue",
                    headerName: "Intra-State",
                    cellRenderer: (evt) => {
                      return formatCurrency(evt.value);
                    },
                  },
                ]}
                fetchUrl={() => `${config.resourceUrls.getGstDetail}`}
                headers={header}
                responseDataMapFunc={(response) => {
                  let result = [];

                  const exempt = response.data.exemptCSV;
                  exempt.forEach((item, index) => {
                    if (index === 0 || item.natureOfSupplies === "Total") {
                      return;
                    }
                    result.push({
                      natureOfSupplies: item.natureOfSupplies,
                      interStateValue: item.interStateValue,
                      intraStateValue: item.intraStateValue,
                    });
                  });
                  return result;
                }}
                pagination={false}
              />

              <div className="gstr-table-heading">
                VI. Interest and Late fee for previous tax period
              </div>
              <ListAdvancedComponent
                onRowClicked={(e) => {}}
                onActionClick={handleActionClick}
                columnDefs={[
                  {
                    field: "details",
                    headerName: "Details",
                    // cellStyle: { color: "#00a353" },
                    minWidth: 259,
                  },
                  {
                    field: "integratedTax",
                    headerName: "Integrated Tax",
                    cellRenderer: (evt) => {
                      return formatCurrency(evt.value);
                    },
                  },
                  {
                    field: "centralTax",
                    headerName: "Central Tax",
                    cellRenderer: (evt) => {
                      return formatCurrency(evt.value);
                    },
                  },
                  {
                    field: "stateUtTax",
                    headerName: "State/UT Tax",
                    cellRenderer: (evt) => {
                      return formatCurrency(evt.value);
                    },
                  },

                  {
                    field: "cessTax",
                    headerName: "Cess Tax",
                    cellRenderer: (evt) => {
                      return formatCurrency(evt.value);
                    },
                  },
                ]}
                customRowData={gstr3BData2}
                pagination={false}
              />

              <div className="gstr-table-heading">VII. Payment of tax</div>
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
                    field: "totalTaxPayable",
                    headerName: "Total Tax Payable",
                    cellRenderer: (evt) => {
                      return formatCurrency(evt.value);
                    },
                  },
                  {
                    field: "integratedTax",
                    headerName: "Integrated Tax",
                    cellRenderer: (evt) => {
                      return formatCurrency(evt.value);
                    },
                  },
                  {
                    field: "centralTax",
                    headerName: "Central Tax",
                    cellRenderer: (evt) => {
                      return formatCurrency(evt.value);
                    },
                  },
                  {
                    field: "stateUtTax",
                    headerName: "State/UT Tax",
                    cellRenderer: (evt) => {
                      return formatCurrency(evt.value);
                    },
                  },

                  {
                    field: "cessTax",
                    headerName: "Cess Tax",
                    cellRenderer: (evt) => {
                      return formatCurrency(evt.value);
                    },
                  },
                  {
                    field: "taxPaidInCash",
                    headerName: "Tax Paid In Cash",
                    cellRenderer: (evt) => {
                      return formatCurrency(evt.value);
                    },
                  },
                  {
                    field: "intrestPaidInCash",
                    headerName: "Intrest Paid In Cash",
                    cellRenderer: (evt) => {
                      return formatCurrency(evt.value);
                    },
                  },
                  {
                    field: "lateFeePaidInCash",
                    headerName: "Late Fee Paid In Cash",
                    cellRenderer: (evt) => {
                      return formatCurrency(evt.value);
                    },
                  },
                ]}
                customRowData={gstr3BData2}
                pagination={false}
              />

              <div className="gstr-table-heading">
                VIII. Breakup of tax liability declared (for interest
                computation)
              </div>
              <ListAdvancedComponent
                onRowClicked={(e) => {}}
                onActionClick={handleActionClick}
                columnDefs={[
                  {
                    field: "period",
                    headerName: "Period",
                    // cellStyle: { color: "#00a353" },
                    minWidth: 259,
                  },

                  {
                    field: "integratedTax",
                    headerName: "Integrated Tax",
                    cellRenderer: (evt) => {
                      return formatCurrency(evt.value);
                    },
                  },
                  {
                    field: "centralTax",
                    headerName: "Central Tax",
                    cellRenderer: (evt) => {
                      return formatCurrency(evt.value);
                    },
                  },
                  {
                    field: "stateUtTax",
                    headerName: "State/UT Tax",
                    cellRenderer: (evt) => {
                      return formatCurrency(evt.value);
                    },
                  },

                  {
                    field: "cessTax",
                    headerName: "Cess Tax",
                    cellRenderer: (evt) => {
                      return formatCurrency(evt.value);
                    },
                  },
                ]}
                customRowData={gstr3BData2}
                pagination={false}
              />
            </>
          ) : (
            <div
              style={{
                height: "500px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "18px",
              }}
            >
              Loading Data
            </div>
          )}
        </AdvancedCard>
      </div>
    </PageContent>
  );
};

export default Gstr3BList;

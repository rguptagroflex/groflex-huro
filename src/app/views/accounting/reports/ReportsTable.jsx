import React, { useState } from "react";
import { FeatherIcon } from "../../../shared/featherIcon/FeatherIcon";
import { formatCurrency } from "../../../helpers/formatCurrency";

const ReportsTable = ({ rowData, tableHeaders, rowTotals }) => {
  // State to manage the visibility of each group
  const [expandedGroups, setExpandedGroups] = useState({});

  // Function to toggle the visibility of a group
  const toggleGroup = (groupId) => {
    setExpandedGroups((prevState) => ({
      ...prevState,
      [groupId]: !prevState[groupId],
    }));
  };

  // Function to render the table rows
  const renderRows = () => {
    // Grouping logic
    const groupedData = {};
    rowData.forEach((item) => {
      const groupKey = item.groupColumn;
      if (!groupedData[groupKey]) {
        groupedData[groupKey] = [];
      }
      groupedData[groupKey].push(item);
    });

    // Rendering logic
    return Object.entries(groupedData).map(([groupKey, groupItems]) => (
      <React.Fragment key={groupKey}>
        <tr onClick={() => toggleGroup(groupKey)} className="table-accordian">
          <th>{groupKey}</th>
          <th colSpan={tableHeaders.length} style={{ textAlign: "right" }}>
            {expandedGroups[groupKey] ? (
              <FeatherIcon name={"ChevronUp"} />
            ) : (
              <FeatherIcon name={"ChevronDown"} />
            )}
            {/* Button to expand/collapse group */}
          </th>
        </tr>
        {/* Render group rows if group is expanded */}
        {expandedGroups[groupKey] &&
          groupItems.map((item) => (
            <tr key={item.id} className="row-entry">
              <td></td>
              {Object.keys(item).map((subItem, index) =>
                index > 1 ? (
                  <td key={`row-data-${index}`}>{item[subItem]}</td>
                ) : null
              )}
            </tr>
          ))}
        {rowTotals && (
          <tr className="accordian-total">
            <td className="total-label">Total {groupKey}</td>

            {rowTotals &&
              rowTotals[groupKey + "Total"].map((item, id) => (
                <td className="total-value" key={id}>
                  {item ? formatCurrency(item) : item}
                </td>
              ))}
          </tr>
        )}
      </React.Fragment>
    ));
  };

  return (
    <div className="reports-table">
      <table className="table  is-fullwidth">
        <tbody>
          <tr className="reports-table-header">
            <th style={{ width: "413px", paddingTop: "15px" }}>Group</th>
            {tableHeaders.map((heading, id) => (
              <th
                style={{ width: "413px", paddingTop: "15px" }}
                key={`heading-${id}`}
              >
                {heading}
              </th>
            ))}
          </tr>
          {renderRows()}
          {rowTotals && (
            <tr className="net-container">
              <td className="net-label">{rowTotals?.netValue?.label}</td>
              {rowTotals?.netValue?.value.map((item, id) => (
                <td className="net-value" key={id}>
                  {item ? formatCurrency(item) : item}
                </td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsTable;

import React, { useState } from "react";
import { FeatherIcon } from "../../../shared/featherIcon/FeatherIcon";

const ReportsTable = ({ rowData, tableHeaders }) => {
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
          <th>{groupKey}</th> {/* Render group header */}
          <th colSpan={2} style={{ textAlign: "right" }}>
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
              <td>
                {item.column1
                  .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                  .charAt(0)
                  .toUpperCase() +
                  item.column1.replace(/([a-z0-9])([A-Z])/g, "$1 $2").slice(1)}
              </td>
              <td>{item.column2}</td>
            </tr>
          ))}
      </React.Fragment>
    ));
  };

  return (
    <div className="reports-table">
      <table className="table  is-fullwidth">
        <tbody>
          <tr className="reports-table-header">
            <th>Group</th>
            {tableHeaders.map((heading) => (
              <th style={{ width: "413px" }}>{heading}</th>
            ))}
          </tr>
          {renderRows()}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsTable;

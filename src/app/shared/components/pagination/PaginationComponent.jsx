import { Pagination } from "@mui/material";
import React from "react";
import { SelectInput } from "../select/SelectInput";

const PaginationComponent = ({ paginationInfo, setPaginationInfo }) => {
  const handleChange = (event, value) => {
    setPaginationInfo({
      ...paginationInfo,
      currentPage: value,
    });
  };

  const handleEntriesPerPage = (option) => {
    setPaginationInfo({
      ...paginationInfo,
      currentPage: 1,
      entriesPerPage: option.value,
      numberOfPages: Math.ceil((1 / option.value) * paginationInfo.rowCount),
    });
  };

  return (
    <div className="pagination-main">
      <div className="entries-per-page-drowpdown">
        <div className="field">
          {/* <label>Entries Per Page</label> */}
          <SelectInput
            options={[
              { label: "5", value: 5 },
              { label: "10", value: 10 },
              { label: "20", value: 20 },
              { label: "50", value: 50 },
            ]}
            placeholder={"None"}
            onChange={handleEntriesPerPage}
            value={paginationInfo.entriesPerPage}
            menuPlacement="top"
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pagination
          count={paginationInfo.numberOfPages}
          page={paginationInfo.currentPage}
          onChange={handleChange}
          variant="outlined"
        />
      </div>
      <div className="column is-2"></div>
    </div>
  );
};

export default PaginationComponent;

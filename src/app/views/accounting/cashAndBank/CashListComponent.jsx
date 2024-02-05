import React, { useState, useEffect, useCallback } from "react";
import { FeatherIcon } from "../../../shared/featherIcon/FeatherIcon";
import { Button } from "../../../shared/components/button/Button";
import { formatCurrency } from "../../../helpers/formatCurrency";
import { Link } from "react-router-dom";
import groflexService from "../../../services/groflex.service";
import config from "../../../../../config";

const CashListComponent = () => {
  const [banks, setBanks] = useState([]);
  const [clickedRows, setClickedRows] = useState(
    new Array(banks.length).fill(false)
  );

  // Function to toggle the dropdown for a specific row
  const toggleDropdown = (index) => {
    setClickedRows((prevClickedRows) => {
      const newClickedRows = [...prevClickedRows];
      newClickedRows[index] = !newClickedRows[index];
      return newClickedRows;
    });
  };

  useEffect(() => {
    groflexService
      .request(`${config.resourceHost}bank`, { auth: true })
      .then((res) => {
        console.log(res);

        setBanks(res.body.data);
      });
  }, []);

  return (
    <div className="s-card demo-table" id="custom">
      <table className="table is-hoverable is-fullwidth ">
        <tbody>
          <tr id="table-sup-heading">
            <td>Cash</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <th className="is-end">
              <div className="dark-inverted">
                <Button
                  isOutlined
                  isPrimary
                  icon={
                    <FeatherIcon
                      primaryColor
                      name="Plus"
                      size={18}
                      style={{ height: "18px", width: "18px" }}
                    />
                  }
                >
                  Add cash type
                </Button>
              </div>
            </th>
          </tr>
          <tr id="table-sub-heading">
            <td>Balance</td>
            <td></td>
            <td>Cash type</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          {banks.map((bank, index) => {
            // Check if IFSC code contains a number
            if (/[a-zA-Z]/.test(bank.IFSCCode)) {
              return (
                <tr key={index}>
                  <td>{bank.openingBalance}</td>
                  <td></td>
                  <td>{bank.accountNumber}</td>
                  <td></td>
                  <td> </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td> </td>
                  <td></td>
                  <td> </td>
                  <td></td>
                  <td
                    style={{
                      display: "flex",
                      flexDirection: "row-reverse",
                      textAlign: "right",
                    }}
                  >
                    <Link>
                      <Button isPrimary isOutlined style={{ border: "none" }}>
                        View Transactions
                      </Button>
                    </Link>
                  </td>
                  <td className="is-end">
                    <div>
                      <div
                        key={index}
                        className={`${"dropdown is-spaced  is-right dropdown-trigger is-pushed-mobile is-up"}  ${
                          clickedRows[index] && "is-active"
                        }`}
                        onClick={() => toggleDropdown(index)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="is-trigger" aria-haspopup="true">
                          <FeatherIcon primaryColor name={"MoreVertical"} />
                        </div>
                        <div
                        style={{ minWidth: "118px" }}
                          className="dropdown-menu"
                          role="menu"
                          
                        >
                          <div className="dropdown-content">
                            <a href="#" className="dropdown-item is-media">
                              <div class="icon">
                                <FeatherIcon name={"Edit"} />
                              </div>
                              <div className="meta">
                                <span>edit</span>
                              </div>
                            </a>

                            <a href="#" className="dropdown-item is-media">
                              <div class="icon">
                                <FeatherIcon name={"Trash2"} />
                              </div>
                              <div className="meta">
                                <span>delete</span>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            }
            return null; // Skip rendering if IFSC code doesn't contain a number
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CashListComponent;

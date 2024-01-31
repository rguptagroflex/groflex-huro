import React, { useState, useEffect, useCallback } from "react";

import { Button } from "../../../shared/components/button/Button";
import { FeatherIcon } from "../../../shared/featherIcon/FeatherIcon";
import { Link } from "react-router-dom";
import config from "../../../../../config";
import groflexService from "../../../services/groflex.service";

const BankListComponent = () => {
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
      <table className="table is-hove rable is-fullwidth">
        <tbody>
          <tr id="table-heading">
            <th>Bank Details</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
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
                  Add new bank
                </Button>
              </div>
            </th>
          </tr>
          <tr id="table-sub-heading">
            <th>Bank name</th>
            <th>Account number</th>
            <th>Account type</th>
            <th>IFSC code</th>
            <th>Balance</th>
            <th></th>
            <th></th>
          </tr>
          {banks.map((bank, index) => {
            // Check if IFSC code contains a number
            if (/\d/.test(bank.IFSCCode)) {
              return (
                <tr key={index}>
                  <td>{bank.bankName}</td>
                  <td>{bank.accountNumber}</td>
                  <td>{bank.accountType}</td>
                  <td>{bank.IFSCCode}</td>
                  <td>{bank.openingBalance}</td>

                  <td>
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
                        className={`${"dropdown is-spaced   is-right dropdown-trigger is-pushed-mobile is-up"}  ${
                          clickedRows[index] && "is-active"
                        }`}
                        onClick={() => toggleDropdown(index)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="is-trigger" aria-haspopup="true">
                          <FeatherIcon primaryColor name={"MoreVertical"} />
                        </div>
                        <div
                          className="dropdown-menu"
                          role="menu"
                          style={{ minWidth: "118px" }}
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
                            <hr className="dropdown-divider" />
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
// const data = [
//   {
//     openingBalance: 55,
//     id: 39,
//     bankName: "Cash",
//     accountNumber: "cash",
//     accountType: "savings",
//     branch: "cash",
//     IFSCCode: "cash",
//     customerId: "",
//     type: "cash",
//     notes: "bgfbfgbgt",
//     cashType: "cash",
//     chartOfAccountId: 144,
//     bankTransactions: [],
//     chartOfAccount: {
//       id: 144,
//       accountTypeId: "assets",
//       accountSubTypeId: "cashAndBank",
//       accountName: "Cash",
//       accountCode: 45263,
//       description: "Created from Cash And Bank",
//       status: "active",
//     },
//   },
//   {
//     openingBalance: 510,
//     id: 37,
//     bankName: "Indian",
//     accountNumber: "7584353847561",
//     accountType: "current",
//     branch: "rambha",
//     IFSCCode: "11111111111",
//     customerId: "1111111",
//     type: "bank",
//     notes: "gergfrgfv",
//     cashType: "cash",
//     chartOfAccountId: 142,
//     bankTransactions: [
//       {
//         credits: 0,
//         debits: 555,
//         balance: 610,
//         id: 80,
//         date: "2024-01-19T00:00:00.000Z",
//         notes: "vadfvafvfd",
//         reconcileStatus: false,
//         type: "in",
//         chartOfAccountId: 141,
//         bankDetailId: 37,
//         deletedAt: null,
//         invoiceId: null,
//         expenseId: null,
//         purchaseOrderId: null,
//         sourceType: null,
//       },
//       {
//         credits: 100,
//         debits: 0,
//         balance: 510,
//         id: 81,
//         date: "2024-01-19T00:00:00.000Z",
//         notes: "ththtyeh",
//         reconcileStatus: false,
//         type: "out",
//         chartOfAccountId: 134,
//         bankDetailId: 37,
//         deletedAt: null,
//         invoiceId: null,
//         expenseId: null,
//         purchaseOrderId: null,
//         sourceType: null,
//       },
//     ],
//     chartOfAccount: {
//       id: 142,
//       accountTypeId: "assets",
//       accountSubTypeId: "cashAndBank",
//       accountName: "Indian",
//       accountCode: 17680,
//       description: "Created from Cash And Bank",
//       status: "active",
//     },
//   },
//   {
//     openingBalance: 655,
//     id: 40,
//     bankName: "Petty Cash",
//     accountNumber: "pettyCash",
//     accountType: "savings",
//     branch: "cash",
//     IFSCCode: "cash",
//     customerId: "",
//     type: "cash",
//     notes: "bgbheebtgh",
//     cashType: "pettyCash",
//     chartOfAccountId: 145,
//     bankTransactions: [],
//     chartOfAccount: {
//       id: 145,
//       accountTypeId: "assets",
//       accountSubTypeId: "cashAndBank",
//       accountName: "Petty Cash",
//       accountCode: 67835,
//       description: "Created from Cash And Bank",
//       status: "active",
//     },
//   },
//   {
//     openingBalance: 66,
//     id: 38,
//     bankName: "SBI",
//     accountNumber: "44444444444444",
//     accountType: "savings",
//     branch: "bhopal",
//     IFSCCode: "55555555555",
//     customerId: "5555555557777",
//     type: "bank",
//     notes: "nhghnhnhrnrhnhtnhtnh",
//     cashType: "cash",
//     chartOfAccountId: 143,
//     bankTransactions: [],
//     chartOfAccount: {
//       id: 143,
//       accountTypeId: "assets",
//       accountSubTypeId: "cashAndBank",
//       accountName: "SBI",
//       accountCode: 93663,
//       description: "Created from Cash And Bank",
//       status: "active",
//     },
//   },
// ];

export default BankListComponent;

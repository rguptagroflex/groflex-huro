import React, { useState, useEffect, useCallback } from "react";

import { Button } from "../../../shared/components/button/Button";
import { FeatherIcon } from "../../../shared/featherIcon/FeatherIcon";
import { Link } from "react-router-dom";
import config from "../../../../../config";
import groflexService from "../../../services/groflex.service";
import EditBankModal from "./EditBankModal";

const BankListComponent = () => {
  const [banks, setBanks] = useState([]);
  const [addNewBankVisibility, setAddNewBankVisibility] = useState(false);

  const [clickedRows, setClickedRows] = useState(
    new Array(banks.length).fill(false)
  );
  useEffect(() => {
    getBanksList();
  }, []);

  const getBanksList = () => {
    groflexService
      .request(`${config.resourceUrls.bank}`, { auth: true })
      .then((res) => {
        console.log(res);

        setBanks(res.body.data);
      });
  };
  const handleDeleteBank = (id) => {
    groflexService.request(`${config.resourceHost}bank/${id}`, { auth: true, method: "DELETE" }).then((res) => {
      // console.log(res, "DELETE KIYA BANK");
      // const newBankList = banksList.filter((bank) => {
      // 	return bank.id !== id;
      // });
      // setBanksList([...newBankList]);
      getBanksList();
    });
    ModalService.close();
  };
  const handleAddBankSubmit = (newBankData) => {
    groflexService
      .request(`${config.resourceUrls.bank}`, {
        auth: true,
        method: "POST",
        data: { ...newBankData },
      })
      .then((res) => {
        getBanksList();
        setAddNewBankVisibility(false);
      });
  };

  // Function to toggle the dropdown for a specific row
  const toggleDropdown = (index) => {
    setClickedRows((prevClickedRows) => {
      const newClickedRows = [...prevClickedRows];
      newClickedRows[index] = !newClickedRows[index];
      return newClickedRows;
    });
  };

  return (
    <div className="s-card demo-table" id="custom">
      <table className="table is-hove rable is-fullwidth">
        <tbody>
          <tr id="table-sup-heading">
            <td>Bank Details</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="is-end">
              <div className="dark-inverted">
                <Button
                  onClick={() => setAddNewBankVisibility(true)}
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
                <EditBankModal
                  isActive={addNewBankVisibility}
                  setIsActive={setAddNewBankVisibility}
                  onConfirm={handleAddBankSubmit}
                />
              </div>
            </td>
          </tr>
          <tr id="table-sub-heading">
            <td>Bank name</td>
            <td>Account number</td>
            <td>Account type</td>
            <td>IFSC code</td>
            <td>Balance</td>
            <td></td>
            <td></td>
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
                              <div className="icon">
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
                              <div onClick={() => handleDeleteBank(bank.id)} className="meta" >
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

export default BankListComponent;

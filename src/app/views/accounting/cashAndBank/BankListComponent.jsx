import React, { useState, useEffect, useCallback } from "react";

import { Button } from "../../../shared/components/button/Button";
import { FeatherIcon } from "../../../shared/featherIcon/FeatherIcon";
import { Link } from "react-router-dom";
import config from "../../../../../config";
import groflexService from "../../../services/groflex.service";
import EditBankModal from "./EditBankModal";
import { formatCurrency } from "../../../helpers/formatCurrency";
import DeleteBankModal from "./DeleteBankModal";
import PopOver from "../../../shared/components/popOver/PopOver";

const BankListComponent = () => {
  const [banks, setBanks] = useState([]);
  const [addNewBankVisibility, setAddNewBankVisibility] = useState(false);
  const [deleteBankVisibility, setDeleteBankVisibility] = useState(false);
  const [selectedBankId, setSelectedBankId] = useState(null); // State to hold the selected bank ID for deletions

  useEffect(() => {
    getBanksList();
  }, []);

  const getBanksList = () => {
    groflexService
      .request(`${config.resourceUrls.bank}`, { auth: true })
      .then((res) => {
        console.log(res);

        setBanks([...res.body.data].filter((bank) => bank.type === "bank"));
      });
  };
  const handleEditBank = () => {};
  const handleDeleteBank = () => {
    groflexService
      .request(`${config.resourceHost}bank/${selectedBankId}`, {
        auth: true,
        method: "DELETE",
      })
      .then((res) => {
        console.log(res, "DELETE KIYA BANK");

        getBanksList();
        setDeleteBankVisibility(false);
      });
    console.log(id);
  };
  const handleAddBankSubmit = (
    newBankData,
    setNewBankData,
    setReEnteredAccountNumber
  ) => {
    groflexService
      .request(`${config.resourceUrls.bank}`, {
        auth: true,
        method: "POST",
        data: { ...newBankData },
      })
      .then((res) => {
        getBanksList();
        setAddNewBankVisibility(false);
        setNewBankData({
          type: "bank",
          bankName: "",
          accountNumber: "",
          accountType: "",
          accountName: "",
          IFSCCode: "",
          openingBalance: "",
          branch: "",
          customerId: "",
          description: "",
          cashType: "cash",
        });
        setReEnteredAccountNumber("");
      });
  };

  return (
    <div className="s-card demo-table" id="custom">
      <table className="table is-hove rable is-fullwidth">
        <tbody>
          <tr id="table-sup-heading">
            <td>Bank</td>
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
          {banks.length
            ? banks.map((bank, index) => {
                return (
                  <tr key={index}>
                    <td>{bank.bankName}</td>
                    <td>{bank.accountNumber}</td>
                    <td style={{ textTransform: "capitalize" }}>
                      {bank.accountType}
                    </td>
                    <td>{bank.IFSCCode.toUpperCase()}</td>
                    <td>{formatCurrency(bank.openingBalance)}</td>

                    <td>
                      <Link>
                        <Button isPrimary isOutlined style={{ border: "none" }}>
                          View Transactions
                        </Button>
                      </Link>
                    </td>
                    <td className="is-end">
                      <div>
                        <PopOver
                          elements={[
                            {
                              title: "Edit",
                              handleClick: () => handleEditBank(bank.id),
                            },
                            {
                              title: "Delete",
                              handleClick: () => {
                                setSelectedBankId(bank.id); // Set selected bank ID for deletion
                                setDeleteBankVisibility(true);
                              },
                            },
                          ]}
                        />
                        <DeleteBankModal
                          isActive={deleteBankVisibility}
                          setIsActive={setDeleteBankVisibility}
                          title={"Delete bank account"}
                          onConfirmDelete={handleDeleteBank} // Remove bank.id from here
                          text={"bank account"}
                          // Pass bank.id as a prop
                        />
                      </div>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default BankListComponent;

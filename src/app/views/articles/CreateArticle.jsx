import React, { useState } from "react";
import PageContent from "../../shared/components/pageContent/PageContent";
import { AdvancedCard } from "../../shared/components/cards/AdvancedCard";
import { Button } from "../../shared/components/button/Button";
import { Input } from "../../shared/components/input/Input";
import { SelectInput } from "../../shared/components/select/SelectInput";
import { FileInput } from "../../shared/components/fileInput/FileInput";
import { TextArea } from "../../shared/components/textArea/TextArea";
import { Switch } from "../../shared/components/switch/Switch";
import groflexService from "../../services/groflex.service";
import config from "../../../../config";

const CreateArticle = () => {
  const [createArticleData, setCreateArticleData] = useState({
    articleNumber: "",
    hsnSacCode: "",
    articleName: "",
    articleDescription: "",
    articleImage: "",
    ean: "",
    sku: "",
    articleCategory: "",
    unit: "",
    gstRate: 0,
    mrp: "",
    netPurchasePrice: "",
    grossPurchasePrice: "",
    netSalesPrice: "",
    grossSalesPrice: "",
    notes: "",
    showNotes: false,
  });

  const handleSave = () => {
    const payload = {
      avgPurchaseValue: 0,
      calculationBase: "net",
      category: createArticleData.articleCategory,
      currentStock: null,
      description: createArticleData.articleDescription,
      eanNo: createArticleData.ean.toString(),
      hsnSacCode: createArticleData.hsnSacCode.toString(),
      images: [],
      isValidated: false,
      metaData: {
        imageUrl: null,
      },
      minimumBalance: null,
      mrp: createArticleData.mrp,
      notesAlert: createArticleData.showNotes,
      number: createArticleData.articleNumber.toString(),
      openingBalance: null,
      price: createArticleData.netSalesPrice,
      priceGross: createArticleData.grossSalesPrice,
      purchasePrice: createArticleData.netPurchasePrice,
      purchasePriceGross: createArticleData.grossPurchasePrice,
      title: createArticleData.articleName,
      trackedInInventory: false,
      unit: createArticleData.unit,
      value: 0,
      vatPercent: createArticleData.gstRate,
      notes: createArticleData.notes,
    };
    groflexService
      .request(config.resourceUrls.article, {
        auth: true,
        data: payload,
        method: "POST",
      })
      .then((res) => {
        console.log(res, "Article created");
      });

    console.log(payload);
  };

  const handleArticleNumberChange = (e) => {
    const inputArticleNumber = parseInt(e.target.value);
    setCreateArticleData({
      ...createArticleData,
      articleNumber: inputArticleNumber,
    });
  };

  const handleHsnSacCodeChange = (e) => {
    const inputHsnSacCode = parseInt(e.target.value);
    setCreateArticleData({
      ...createArticleData,
      hsnSacCode: inputHsnSacCode,
    });
  };

  const handleArticleNameChange = (option) => {
    setCreateArticleData({
      ...createArticleData,
      articleName: option.value,
    });
  };

  const handleArticleDescriptionChange = (e) => {
    setCreateArticleData({
      ...createArticleData,
      articleDescription: e.target.value,
    });
  };

  const handleArticleImageChange = (e) => {
    if (e.target.files[0].size > 2000000) {
      console.log("Size more than 2MB");
      return;
    }
    setCreateArticleData({
      ...createArticleData,
      articleImage: e.target.files[0],
    });
  };

  const handleEanChange = (e) => {
    const inputEan = parseInt(e.target.value);
    setCreateArticleData({
      ...createArticleData,
      ean: inputEan,
    });
  };

  const handleSkuChange = (e) => {
    const inputSku = parseInt(e.target.value);
    setCreateArticleData({
      ...createArticleData,
      sku: inputSku,
    });
  };

  const handleArticleCategoryChange = (option) => {
    setCreateArticleData({
      ...createArticleData,
      articleCategory: option.value,
    });
  };

  const handleUnitChange = (option) => {
    setCreateArticleData({
      ...createArticleData,
      unit: option.value,
    });
  };

  const handleGstRateChange = (option) => {
    setCreateArticleData({
      ...createArticleData,
      gstRate: option.value,
    });
  };

  const handleMrpChange = (e) => {
    if (e.target.value === "") {
      setCreateArticleData({ ...createArticleData, mrp: "" });
      return;
    }

    const inputMrp = parseFloat(e.target.value);

    setCreateArticleData({
      ...createArticleData,
      mrp: inputMrp,
    });
  };

  const handleNetPurchasePriceChange = (e) => {
    if (e.target.value === "") {
      setCreateArticleData({ ...createArticleData, netPurchasePrice: "" });
      return;
    }

    const inputNetPurchasePrice = parseFloat(e.target.value);

    setCreateArticleData({
      ...createArticleData,
      netPurchasePrice: inputNetPurchasePrice,
      grossPurchasePrice: (
        inputNetPurchasePrice *
        (1 + createArticleData.gstRate / 100)
      ).toFixed(2),
    });
  };

  const handleGrossPurchasePriceChange = (e) => {
    if (e.target.value === "") {
      setCreateArticleData({ ...createArticleData, grossPurchasePrice: "" });
      return;
    }

    const inputGrossPurchasePrice = parseFloat(e.target.value);

    setCreateArticleData({
      ...createArticleData,
      grossPurchasePrice: inputGrossPurchasePrice,
      netPurchasePrice: (
        inputGrossPurchasePrice /
        (1 + createArticleData.gstRate / 100)
      ).toFixed(2),
    });
  };

  const handleNetSalesPriceChange = (e) => {
    if (e.target.value === "") {
      setCreateArticleData({ ...createArticleData, netSalesPrice: "" });
      return;
    }

    const inputNetSalesPrice = parseFloat(e.target.value);

    setCreateArticleData({
      ...createArticleData,
      netSalesPrice: inputNetSalesPrice,
      grossSalesPrice: (
        inputNetSalesPrice *
        (1 + createArticleData.gstRate / 100)
      ).toFixed(2),
      mrp: (inputNetSalesPrice * (1 + createArticleData.gstRate / 100)).toFixed(
        2
      ),
    });
  };

  const handleGrossSalesPriceChange = (e) => {
    if (e.target.value === "") {
      setCreateArticleData({ ...createArticleData, grossSalesPrice: "" });
      return;
    }

    const inputGrossSalesPrice = parseFloat(e.target.value);

    setCreateArticleData({
      ...createArticleData,
      grossSalesPrice: inputGrossSalesPrice,
      mrp: inputGrossSalesPrice,
      netSalesPrice: (
        inputGrossSalesPrice /
        (1 + createArticleData.gstRate / 100)
      ).toFixed(2),
    });
  };

  const handleShowNotesToggle = () => {
    setCreateArticleData({
      ...createArticleData,
      showNotes: !createArticleData.showNotes,
    });
  };

  const handleNotesChange = (e) => {
    setCreateArticleData({ ...createArticleData, notes: e.target.value });
  };

  console.log(createArticleData, "createArticleData");

  return (
    <PageContent
      title={"Create Article"}
      breadCrumbData={["Home", "Articles", "Create Article"]}
    >
      <div className="columns is-multiline">
        <div className="column is-7">
          <AdvancedCard
            type={"s-card"}
            // footer
            // footerContentRight={<Button isSuccess>Save</Button>}
          >
            <h2 className="title is-5 is-bold">Article Info</h2>
            <div className="columns is-multiline m-b-5">
              <div className="column is-6">
                <div className="field">
                  <label>Article number *</label>
                  <Input
                    onChange={handleArticleNumberChange}
                    placeholder={"Enter Article number"}
                    type={"number"}
                    value={createArticleData.articleNumber}
                  />
                </div>
              </div>
              <div className="column is-6">
                <div className="field">
                  <label>HSN/SAC Code *</label>
                  <Input
                    onChange={handleHsnSacCodeChange}
                    type={"number"}
                    placeholder={"E.g., 720991"}
                    value={createArticleData.hsnSacCode}
                  />
                </div>
              </div>
            </div>

            <div className="columns is-multiline m-b-5">
              <div className="column is-12">
                <div className="field">
                  <label>Article name *</label>
                  <SelectInput
                    options={[
                      { label: "Article 1", value: "article1" },
                      { label: "Article 2", value: "article2" },
                      { label: "Article 3", value: "article3" },
                    ]}
                    placeholder={<p>Search or type article name</p>}
                    onChange={handleArticleNameChange}
                    value={createArticleData.articleName}
                  />
                </div>
              </div>
            </div>

            <div className="columns is-multiline m-b-5">
              <div className="column is-6">
                <div className="field">
                  <label>Article description</label>
                  <TextArea
                    rows={3}
                    placeholder="Enter Details"
                    onChange={handleArticleDescriptionChange}
                    value={createArticleData.articleDescription}
                  />
                </div>
              </div>

              <div className="column is-6">
                <div className="field">
                  <label>Article Image</label>
                  {createArticleData.articleImage ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        alt="Not found"
                        style={{
                          width: "290px",
                          height: "82px",
                          objectFit: "contain",
                        }}
                        src={URL.createObjectURL(
                          createArticleData.articleImage
                        )}
                      />
                      <br />
                      <p
                        className="button h-button"
                        onClick={() =>
                          setCreateArticleData({
                            ...createArticleData,
                            articleImage: "",
                          })
                        }
                      >
                        Change Logo
                      </p>
                    </div>
                  ) : (
                    <FileInput
                      onChange={handleArticleImageChange}
                      errorMessage={""}
                      label={"Upload Article Image"}
                      description={"(Upload jpeg/png image upto 2 MB size)"}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="columns is-multiline m-b-5">
              <div className="column is-12">
                <div className="field">
                  <label>EAN *</label>
                  <Input
                    onChange={handleEanChange}
                    placeholder={"Enter EAN"}
                    type={"number"}
                    value={createArticleData.ean}
                  />
                </div>
              </div>
            </div>

            <div className="columns is-multiline m-b-5">
              <div className="column is-12">
                <div className="field">
                  <label>SKU *</label>
                  <Input
                    onChange={handleSkuChange}
                    placeholder={"Enter SKU"}
                    type={"number"}
                    value={createArticleData.sku}
                  />
                </div>
              </div>
            </div>

            <div className="columns is-multiline m-b-5">
              <div className="column is-6">
                <div className="field">
                  <label>Article category *</label>
                  <SelectInput
                    onChange={handleArticleCategoryChange}
                    placeholder={<p>Search or type article name</p>}
                    options={[
                      { label: "Not specified", value: "Not specified" },
                      { label: "Equipment", value: "Equipment" },
                      { label: "Consulting", value: "Consulting" },
                      { label: "Spare parts", value: "Spare parts" },
                      { label: "Programming", value: "Programming" },
                    ]}
                    value={createArticleData.articleCategory}
                  />
                </div>
              </div>
              <div className="column is-6">
                <div className="field">
                  <label>Unit</label>
                  <SelectInput
                    onChange={handleUnitChange}
                    placeholder={<p>Choose units</p>}
                    options={[
                      { label: "meters", value: "meters" },
                      { label: "carton", value: "carton" },
                      { label: "m²", value: "m²" },
                      { label: "liters", value: "liters" },
                    ]}
                    value={createArticleData.unit}
                  />
                </div>
              </div>
            </div>
          </AdvancedCard>

          <div className="m-t-20" />

          <AdvancedCard
            type={"s-card"}
            footer
            footerContentRight={
              <Button onClick={handleSave} isSuccess>
                Save
              </Button>
            }
          >
            <h2 className="title is-5 is-bold">Price</h2>

            <div className="columns is-multiline m-b-5">
              <div className="column is-6">
                <div className="field">
                  <label>GST Rate *</label>
                  <SelectInput
                    onChange={handleGstRateChange}
                    options={[
                      { label: "0%", value: 0 },
                      { label: "3%", value: 3 },
                      { label: "5%", value: 5 },
                      { label: "12%", value: 12 },
                      { label: "18%", value: 18 },
                      { label: "28%", value: 28 },
                    ]}
                    placeholder={"Choose GST rate"}
                    value={createArticleData.gstRate}
                    defaultValue={0}
                  />
                </div>
              </div>
              <div className="column is-6">
                <div className="field">
                  <label>MRP *</label>
                  <Input
                    onChange={handleMrpChange}
                    type={"number"}
                    placeholder={"₹ 0.00"}
                    value={createArticleData.mrp}
                  />
                </div>
              </div>
            </div>
            <div className="m-t-15" />

            <div className="columns is-multiline m-b-5">
              <div className="column is-6">
                <div className="field">
                  <label>Purchase Price (net) *</label>
                  <Input
                    onChange={handleNetPurchasePriceChange}
                    placeholder={"₹ 0.00"}
                    type={"number"}
                    value={createArticleData.netPurchasePrice}
                  />
                </div>
              </div>
              <div className="column is-6">
                <div className="field">
                  <label>Purchase Price (gross) *</label>
                  <Input
                    onChange={handleGrossPurchasePriceChange}
                    placeholder={"₹ 0.00"}
                    type={"number"}
                    value={createArticleData.grossPurchasePrice}
                  />
                </div>
              </div>
            </div>

            <div className="columns is-multiline m-b-5">
              <div className="column is-6">
                <div className="field">
                  <label>Sales price (net) *</label>
                  <Input
                    onChange={handleNetSalesPriceChange}
                    placeholder={"₹ 0.00"}
                    type={"number"}
                    value={createArticleData.netSalesPrice}
                  />
                </div>
              </div>
              <div className="column is-6">
                <div className="field">
                  <label>Sales Price (gross) *</label>
                  <Input
                    onChange={handleGrossSalesPriceChange}
                    placeholder={"₹ 0.00"}
                    type={"number"}
                    value={createArticleData.grossSalesPrice}
                  />
                </div>
              </div>
            </div>
          </AdvancedCard>
        </div>

        {/* Notes section */}
        <div className="column is-5">
          <AdvancedCard
            type={"s-card"}
            footer
            footerContentLeft={"Show notes when creating new documents"}
            footerContentRight={
              <Switch
                onChange={handleShowNotesToggle}
                checked={createArticleData.showNotes}
                isSuccess
              />
            }
          >
            <h2 className="title is-5 is-bold">Notes</h2>
            <TextArea
              rows={3}
              placeholder="Enter notes here"
              onChange={handleNotesChange}
              value={createArticleData.notes}
            />
          </AdvancedCard>
        </div>
      </div>
    </PageContent>
  );
};

export default CreateArticle;

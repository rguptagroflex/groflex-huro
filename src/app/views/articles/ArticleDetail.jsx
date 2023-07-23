import React, { useEffect, useState } from "react";
import rupeeSvg from "../../../assets/groflex/icons/rupee.svg";
import rupeeRedSvg from "../../../assets/groflex/icons/rupeeRed.svg";
import shoppingCartRedSvg from "../../../assets/groflex/icons/shoppingCartRed.svg";
import balanceScaleSvg from "../../../assets/groflex/icons/balanceScale.svg";
import lowStockAlertSvg from "../../../assets/groflex/icons/lowStockAlert.svg";
import minimumStockSvg from "../../../assets/groflex/icons/minimumStock.svg";
import totalStockSvg from "../../../assets/groflex/icons/totalStock.svg";
import PageContent from "../../shared/components/pageContent/PageContent";
import { Link, useNavigate, useParams } from "react-router-dom";
import groflexService from "../../services/groflex.service";
import config from "../../../../config";
import { AdvancedCard } from "../../shared/components/cards/AdvancedCard";
import { formatCurrency } from "../../helpers/formatCurrency";
import { TextArea } from "../../shared/components/textArea/TextArea";
import Articles from "./Articles";

const ArticleDetail = () => {
  const navigate = useNavigate();
  const { articleId } = useParams();
  const [overViewActive, setOverViewActive] = useState(true);
  const [articleData, setArticleData] = useState({});
  useEffect(() => {
    if (articleId) {
      groflexService
        .request(`${config.resourceUrls.article}${articleId}`, { auth: true })
        .then((res) => {
          if (!res.body.data) {
            console.log("KAR RHA AHI AKKAM");
            navigate("/articles");
            return;
          }
          console.log(res, "Article data from edit");
          setArticleData({
            ...res.body.data,
          });
        });
    }
  }, [articleId]);

  //Overview Tab Component
  const OverviewTab = () => {
    return (
      <div
        id="article-overview-tab"
        className={`tab-content ${overViewActive ? "is-active" : ""}`}
      >
        <div className="columns is-multiline">
          <div className="column is-4">
            <AdvancedCard style={{ padding: "15px" }} type={"r-card"}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  padding: "0 25px",
                }}
              >
                <img
                  style={{
                    objectFit: "contain",
                    border: "2px solid #DDDDDD",
                    width: "112px",
                    height: "112px",
                    borderRadius: "50%",
                  }}
                  src={"https://source.unsplash.com/random"}
                  alt="article-logo"
                />
                <div style={{ textAlign: "center", marginTop: "10px" }}>
                  {articleData.title}
                </div>
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "12px",
                    marginTop: "5px",
                  }}
                >
                  {articleData.description}
                </p>
                <div>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      marginTop: "5px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    MRP:{" "}
                    <span className="title is-5" style={{ color: "#283252" }}>
                      {formatCurrency(articleData?.mrp)}/{articleData?.unit}
                    </span>
                  </p>
                </div>
              </div>
              <div style={{ marginTop: "10px" }}>
                <div
                  style={{
                    backgroundColor: "#F1F8FB",
                    marginBottom: "2px",
                    display: "flex",
                    justifyContent: "space-between",
                    borderRadius: "8px 8px 0 0",
                  }}
                >
                  <span style={{ padding: "15px 15px 15px 15px", flex: 1 }}>
                    <p
                      style={{
                        marginBottom: "10px",
                        fontWeight: "500",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Article no
                    </p>
                    <div>{articleData?.number}</div>
                  </span>
                  <span style={{ padding: "15px 15px 15px 0px", flex: 1 }}>
                    <p
                      style={{
                        marginBottom: "10px",
                        fontWeight: "500",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Category
                    </p>
                    <div>{articleData?.category}</div>
                  </span>
                </div>
                <div
                  style={{
                    backgroundColor: "#F1F8FB",
                    marginBottom: "2px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ padding: "15px 15px 15px 15px", flex: 1 }}>
                    <p
                      style={{
                        marginBottom: "10px",
                        fontWeight: "500",
                        whiteSpace: "nowrap",
                      }}
                    >
                      EAN no
                    </p>
                    <div>{articleData.eanNo}</div>
                  </span>
                  <span style={{ padding: "15px 15px 15px 0px", flex: 1 }}>
                    <p
                      style={{
                        marginBottom: "10px",
                        fontWeight: "500",
                        whiteSpace: "nowrap",
                      }}
                    >
                      GST
                    </p>
                    <div>{articleData?.vatPercent}%</div>
                  </span>
                </div>
                <div
                  style={{
                    backgroundColor: "#F1F8FB",
                    display: "flex",
                    justifyContent: "space-between",
                    borderRadius: "0 0 8px 8px",
                  }}
                >
                  <span style={{ padding: "15px 15px 15px 15px", flex: 1 }}>
                    <p
                      style={{
                        marginBottom: "10px",
                        fontWeight: "500",
                        whiteSpace: "nowrap",
                      }}
                    >
                      HSN code
                    </p>
                    <div>{articleData?.hsnSacCode}</div>
                  </span>
                  <span style={{ padding: "15px 15px 15px 0px", flex: 1 }}>
                    <p
                      style={{
                        marginBottom: "10px",
                        fontWeight: "500",
                        whiteSpace: "nowrap",
                      }}
                    >
                      SKU no
                    </p>
                    <div>{articleData.skuNo}</div>
                  </span>
                </div>
              </div>
            </AdvancedCard>
            <div style={{ marginTop: "10px" }}>
              <AdvancedCard style={{ padding: "15px" }} type={"s-card"}>
                <div>
                  <div className="title is-4">Notes</div>
                  <TextArea
                    onChange={(e) => {
                      // setArticleData({ ...articleData, notes: e.target.value });
                    }}
                    value={articleData.notes}
                  />
                </div>
              </AdvancedCard>
            </div>
          </div>
          <div className="column is-8">
            <div className="columns is-multiline">
              <div className="column is-8 prices-card-container">
                <AdvancedCard style={{ padding: "15px" }} type={"r-card"}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gap: "15px",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        minWidth: "125px",
                        height: "140px",
                        backgroundColor: "#F1F8FB",
                        borderRadius: "8px",
                        display: "flex",
                        flexDirection: "column",
                        padding: "15px",
                      }}
                    >
                      <img
                        src={rupeeSvg}
                        style={{
                          width: "30px",
                          height: "30px",
                          marginBottom: "10px",
                        }}
                        alt="rupeeSvg"
                      />
                      <p style={{ fontWeight: "500", marginBottom: "5px" }}>
                        Selling Price (Net)
                      </p>
                      <div style={{ marginTop: "auto" }}>₹12,800</div>
                    </div>
                    <div
                      style={{
                        minWidth: "125px",
                        height: "140px",
                        backgroundColor: "#F1F8FB",
                        borderRadius: "8px",
                        display: "flex",
                        flexDirection: "column",
                        padding: "15px",
                      }}
                    >
                      <img
                        src={rupeeSvg}
                        style={{
                          width: "30px",
                          height: "30px",
                          marginBottom: "10px",
                        }}
                        alt="rupeeSvg"
                      />
                      <p style={{ fontWeight: "500", marginBottom: "5px" }}>
                        Selling price (Gross)
                      </p>
                      <div style={{ marginTop: "auto" }}>₹12,800</div>
                    </div>
                    <div
                      style={{
                        minWidth: "125px",
                        height: "140px",
                        backgroundColor: "#F1F8FB",
                        borderRadius: "8px",
                        display: "flex",
                        flexDirection: "column",
                        padding: "15px",
                      }}
                    >
                      <img
                        src={rupeeSvg}
                        style={{
                          width: "30px",
                          height: "30px",
                          marginBottom: "10px",
                        }}
                        alt="rupeeSvg"
                      />
                      <p style={{ fontWeight: "500", marginBottom: "5px" }}>
                        Total revenue
                      </p>
                      <div style={{ marginTop: "auto" }}>₹12,800</div>
                    </div>
                    <div
                      style={{
                        minWidth: "125px",
                        height: "140px",
                        backgroundColor: "#F1F8FB",
                        borderRadius: "8px",
                        display: "flex",
                        flexDirection: "column",
                        padding: "15px",
                      }}
                    >
                      <img
                        src={rupeeRedSvg}
                        style={{
                          width: "30px",
                          height: "30px",
                          marginBottom: "10px",
                        }}
                        alt="rupeeSvg"
                      />
                      <p style={{ fontWeight: "500", marginBottom: "5px" }}>
                        Purchase price (Net)
                      </p>
                      <div style={{ marginTop: "auto" }}>₹12,800</div>
                    </div>
                    <div
                      style={{
                        minWidth: "125px",
                        height: "140px",
                        backgroundColor: "#F1F8FB",
                        borderRadius: "8px",
                        display: "flex",
                        flexDirection: "column",
                        padding: "15px",
                      }}
                    >
                      <img
                        src={rupeeRedSvg}
                        style={{
                          width: "30px",
                          height: "30px",
                          marginBottom: "10px",
                        }}
                        alt="rupeeSvg"
                      />
                      <p style={{ fontWeight: "500", marginBottom: "5px" }}>
                        Purchase price (Gross)
                      </p>
                      <div style={{ marginTop: "auto" }}>₹12,800</div>
                    </div>
                    <div
                      style={{
                        minWidth: "125px",
                        height: "140px",
                        backgroundColor: "#F1F8FB",
                        borderRadius: "8px",
                        display: "flex",
                        flexDirection: "column",
                        // justifyContent:'space-between',
                        padding: "15px",
                      }}
                    >
                      <img
                        src={shoppingCartRedSvg}
                        style={{
                          width: "30px",
                          height: "30px",
                          marginBottom: "10px",
                        }}
                        alt="rupeeSvg"
                      />
                      <p style={{ fontWeight: "500", marginBottom: "5px" }}>
                        Total orders
                      </p>
                      <div style={{ marginTop: "auto" }}>75pcs</div>
                    </div>
                  </div>
                </AdvancedCard>
              </div>
              <div className="column is-4 coming-soon-container">
                <AdvancedCard
                  type={"r-card"}
                  style={{ padding: "15px", height: "325px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      backgroundColor: "#F2F2F2",
                      height: "100%",
                      padding: "0 10px",
                    }}
                  >
                    <div
                      style={{
                        textAlign: "center",
                        marginTop: "10px",
                      }}
                    >
                      <div className="title is-4 mb-2 mt-4">Coming Soon</div>
                      <div>Launching new Inventory features very soon </div>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        height: "100%",
                        width: "100%",
                        justifyItems: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          // justifyContent: "center",
                          height: "100%",
                          padding: "8px",
                        }}
                      >
                        <img src={balanceScaleSvg} alt="coming-soon" />
                        <p style={{ textAlign: "center", marginTop: "10px" }}>
                          Opening Balance
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          // justifyContent: "center",
                          height: "100%",
                          padding: "8px",
                        }}
                      >
                        <img src={lowStockAlertSvg} alt="coming-soon" />
                        <p style={{ textAlign: "center", marginTop: "10px" }}>
                          Low Stock Alert
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          // justifyContent: "center",
                          height: "100%",
                          padding: "8px",
                        }}
                      >
                        <img src={minimumStockSvg} alt="coming-soon" />
                        <p style={{ textAlign: "center", marginTop: "10px" }}>
                          Minimum Stock
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          // justifyContent: "center",
                          height: "100%",
                          padding: "8px",
                        }}
                      >
                        <img src={totalStockSvg} alt="coming-soon" />
                        <p style={{ textAlign: "center", marginTop: "10px" }}>
                          Total Stock
                        </p>
                      </div>
                    </div>
                  </div>
                </AdvancedCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  //Overview Component
  const HistoryTab = () => {
    return (
      <div
        id="article-history-tab"
        className={`tab-content ${overViewActive ? "" : "is-active"}`}
      >
        <Articles />
      </div>
    );
  };

  console.log(articleData, "Article Data in Article Detail");
  return (
    <PageContent
      title={overViewActive ? "Article Overview" : "History"}
      breadCrumbData={["Home", "Articles", "Article Overview"]}
      loading={articleData?.id ? false : true}
    >
      <div className="tabs-wrapper">
        {/* Tab switchers */}
        <div className="tabs-inner">
          <div className="tabs">
            <ul>
              <li
                data-tab="article-overview-switch"
                className={overViewActive ? "is-active" : ""}
              >
                <Link onClick={() => setOverViewActive(true)}>
                  Article Overview
                </Link>
              </li>
              <li
                data-tab="article-history-switch"
                className={overViewActive ? "" : "is-active"}
              >
                <Link onClick={() => setOverViewActive(false)}>History</Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Tab content */}
        <OverviewTab />
        <HistoryTab />
      </div>
    </PageContent>
  );
};

export default ArticleDetail;

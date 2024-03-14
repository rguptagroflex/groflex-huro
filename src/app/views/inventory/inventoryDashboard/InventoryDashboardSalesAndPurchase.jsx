import React from "react";
import CreateChart from "../../../shared/components/chartjs/CreateChart";
import { AdvancedCard } from "../../../shared/components/cards/AdvancedCard";
import { SelectInput } from "../../../shared/components/select/SelectInput";

const InventoryDashboardSalesAndPurchase = () => {
  return (
    <div className="dashboard-sales-expense-stats-wrapper columns is-multiline">
      <div className="column is-12">
        <AdvancedCard type={"s-card"}>
          <h4
            className="inventorydashboard-card-title"
            // style={{ fontSize: "22px", marginBottom: "30px" }}
          >
            Sales and Purchase
          </h4>
          <div className="columns is-mulitline">
            <div className="column is-3">
              {/* <SelectInput
                //options={dateOptions}
                placeholder={"None"}
               // onChange={handleDateDropDown}
                //value={dateDropDown}
              /> */}
            </div>
            <div
              className="column is-9 columns"
              style={{ justifyContent: "flex-end" }}
            >
              <div className="column is-4">
                <AdvancedCard type={"s-card"} style={{ padding: "0" }}>
                  <div className="total-sales-label">Spent</div>
                  <div className="total-sales-value">
                    ₹ 0
                    {/* {parseFloat(totalValues.totalSales).toFixed(0)} */}
                  </div>
                </AdvancedCard>
              </div>
              <div className="column is-4">
                <AdvancedCard type={"s-card"} style={{ padding: "0" }}>
                  <div className="total-expense-label">Profit</div>
                  <div className="total-expense-value">
                    ₹  0
                     {/* {parseFloat(totalValues.totalExpenses).toFixed(0)} */}
                  </div>
                </AdvancedCard>
              </div>
            </div>
          </div>

          <div
            className="columns is-mulitline"
            style={{ justifyContent: "flex-end" }}
          >
            <div
              className="column is-2"
              style={{ display: "flex", alignItems: "center" }}
            >
              <span
                className="category-dot"
                style={{ backgroundColor: "rgb(0, 163, 83)" }}
              ></span>
              <span className="category-text">Selling</span>
            </div>
            <div
              className="column is-2"
              style={{ display: "flex", alignItems: "center" }}
            >
              <span
                className="category-dot"
                style={{ backgroundColor: "rgb(0, 113, 202)" }}
              ></span>
              <span className="category-text">Profit</span>
            </div>
          </div>

          <div className="column is-12 bar-chart-wrapper">
            {/* <CreateChart
            data={chartData}
            options={chartOptions}
            chartType={"barChart"}
            chartId={"sales-expense"}
          /> */}
            <CreateChart
            //  chartData={chartData}
              //chartOptions={chartOptions}
              //chartType={"barChart"}
            />
          </div>
        </AdvancedCard>
      </div>
    </div>
  );
};

export default InventoryDashboardSalesAndPurchase;

// import React, { useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Filler,
//   Legend
// );

// const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top' as const,
//     },
//     title: {
//       display: true,
//       text: 'Monthly Sales and Purchases',
//     },
//   },
// };

// const defaultArticleId = 'Select Article';

// const responseData = {
//   "success": true,
//   "meta": {},
//   "data": {
//       "articles": {
//           "secondLastMonth": [],
//           "lastMonth": [],
//           "week": [],
//           "month": [],
//           "year": {
//               "saleData": [
//                 {
//                   "month": "January",
//                   "articleid": 1047,
//                   "title": "gold",
//                   "totalsaleprice": "244.28"
//               },
//                   {
//                       "month": "March",
//                       "articleid": 1031,
//                       "title": "article2",
//                       "totalsaleprice": "73.92"
//                   },
//                   {
//                       "month": "March",
//                       "articleid": 1041,
//                       "title": "vyu",
//                       "totalsaleprice": "4.72"
//                   },
//                   {
//                       "month": "March",
//                       "articleid": 1044,
//                       "title": "uyuyu",
//                       "totalsaleprice": "400.02"
//                   },
//                   {
//                       "month": "March",
//                       "articleid": 1046,
//                       "title": "plastic",
//                       "totalsaleprice": "57820.00"
//                   },
//                   {
//                       "month": "March",
//                       "articleid": 1047,
//                       "title": "gold",
//                       "totalsaleprice": "644.28"
//                   },
//                   {
//                       "month": "March",
//                       "articleid": 1048,
//                       "title": "Coal",
//                       "totalsaleprice": "20956.80"
//                   },
//                   {
//                     "month": "January",
//                     "articleid": 1047,
//                     "title": "gold",
//                     "totalsaleprice": "244.28"
//                 },
//               ],
//               "purchaseData": [
//                   {
//                       "month": "February",
//                       "articleid": 1031,
//                       "title": "article2",
//                       "totalpurchaseprice": "1740.48"
//                   },
//                   {
//                     "month": "January",
//                     "articleid": 1041,
//                     "title": "vyu",
//                     "totalpurchaseprice": "1365.00"
//                 },
//                   {
//                       "month": "February",
//                       "articleid": 1041,
//                       "title": "vyu",
//                       "totalpurchaseprice": "1665.00"
//                   },
//                   {
//                     "month": "December",
//                     "articleid": 1041,
//                     "title": "vyu",
//                     "totalpurchaseprice": "1265.00"
//                 }

//               ]
//           },
//           "custom": []
//       }
//   }
// };

// const saleDataByArticle = {};
// const purchaseDataByArticle = {};

// if (responseData.success) {
//   responseData.data.articles.year.saleData.forEach(item => {
//     if (!saleDataByArticle[item.articleid]) {
//       saleDataByArticle[item.articleid] = {
//         month: [],
//         totalsaleprice: []
//       };
//     }
//     saleDataByArticle[item.articleid].month.push(item.month);
//     saleDataByArticle[item.articleid].totalsaleprice.push(parseFloat(item.totalsaleprice));
//   });

//   responseData.data.articles.year.purchaseData.forEach(item => {
//     if (!purchaseDataByArticle[item.articleid]) {
//       purchaseDataByArticle[item.articleid] = {
//         month: [],
//         totalpurchaseprice: []
//       };
//     }
//     purchaseDataByArticle[item.articleid].month.push(item.month);
//     purchaseDataByArticle[item.articleid].totalpurchaseprice.push(parseFloat(item.totalpurchaseprice));
//   });
// }

// const App = () => {
//   const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

//   const [selectedArticleId, setSelectedArticleId] = useState(defaultArticleId);

//   const handleArticleChange = (e) => {
//     setSelectedArticleId(e.target.value);
//   };

//   const saleData = saleDataByArticle[selectedArticleId] || { month: [], totalsaleprice: [] };
//   const purchaseData = purchaseDataByArticle[selectedArticleId] || { month: [], totalpurchaseprice: [] };

//   const chartData = {
//     labels: months,
//     datasets: [
//       {
//         label: `Sale Data - Article ${selectedArticleId}`,
//         data: months.map(month => saleData.month.includes(month) ? parseFloat(saleData.totalsaleprice[saleData.month.indexOf(month)]) : 0),
//         borderColor: 'rgb(53, 162, 235)',
//         backgroundColor: 'rgba(53, 162, 235, 0.5)',
//       },
//       {
//         label: `Purchase Data - Article ${selectedArticleId}`,
//         data: months.map(month => purchaseData.month.includes(month) ? parseFloat(purchaseData.totalpurchaseprice[purchaseData.month.indexOf(month)]) : 0),
//         borderColor: 'rgb(255, 99, 132)',
//         backgroundColor: 'rgba(255, 99, 132, 0.5)',
//       },
//     ],
//   };

//   return (
//     <div>
//       <select value={selectedArticleId} onChange={handleArticleChange}>
//         <option value={defaultArticleId}>{defaultArticleId}</option>
//         {Object.keys(saleDataByArticle).map(articleId => (
//           <option key={articleId} value={articleId}>Article {articleId}</option>
//         ))}
//       </select>
//       <div>
//         <h2>Combined Data</h2>
//         <Line options={options} data={chartData} />
//       </div>
//     </div>
//   );
// };

// export default App;

const axios = require("axios");

let stockCode = "2330";
let today = "20211017";
let format = "json";

async function getStock() {
  try {
    let res = await axios.get(
      "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
      {
        params: {
          response: format,
          date: today,
          stockNo: stockCode,
        },
      }
    );
    console.log(res.data);
  } catch {
    console.error(err);
  }
}

getStock();

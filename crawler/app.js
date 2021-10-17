const axios = require("axios");

let stockCode = "0050";
let today = "20210917";
let format = "json";

axios
  .get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
    params: {
      response: format,
      data: today,
      stockNo: stockCode,
    },
  })
  .then((res) => {
    //HTTP response
    console.log(res.data);
  })
  .catch((err) => {
    console.error(err);
  });

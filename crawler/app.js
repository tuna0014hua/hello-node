const axios = require("axios");

let stockCode = "0050";
let today = "20211017";
let format = "json";

//原網址
//https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20211017&stockNo=2330&_=1634470803174

// "https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=" + format + "&date=" + today + "&stockNo=" + stockCode
// `https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=${format}&date=${today}&stockNo=${stockCode}`

axios
  .get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
    params: {
      response: format,
      date: today,
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

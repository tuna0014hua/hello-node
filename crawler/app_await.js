const axios = require("axios");
const moment = require("moment");
const fs = require("fs/promises");

// 一開始寫法容易產生 callback hell
// fs.readFile("stock.txt", "utf-8", (err, stockNo) => {
//   axios.get();
// });

// 排成
// crontab 、 windows的工作排成器....
// let stockCode = "2330"; // 給不懂程式檔的人使用的方式，另寫在.txt檔
// let today = "20211017"; //日期希望是變動的
// 關於JS日期處理，可以使用第三方套件 EX:moment...

// Date ==> "20211017" "2021/10/17" "2021-10-17"

// 這個 async 是一個 function 會回傳 promise
async function getStock() {
  // let stockCode = "2330";
  let today = moment().format("YYYYMMDD"); //"20211017"
  let format = "json";

  try {
    let stockCode = await fs.readFile("stock.txt", "utf-8");
    console.log("stockCode", stockCode);
    // 如果想要處理多個，使用 split() 來分割

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
    // return res.data;
    console.log(res.data);
  } catch (e) {
    // return e;
    console.error(err);
  }
}

getStock();

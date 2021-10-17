const axios = require("axios");
const moment = require("moment");
const fs = require("fs/promises");
const mySql = require("mysql");
// const { resolve } = require("path");

const connection = mySql.createConnection({
  host: "localhost", //本機 127.0.0.1
  // port: 3306, //埠號 mysql  預設就是  3306
  user: "admin",
  password: "12345",
  database: "stock_mfee20",
});

// -------callback 寫法------------

// connection.connect(); //開始連線

// connection.query("SELECT * FROM stock", function (error, results) {
//   if (error) {
//     // 如果error 是個物件
//     console.err("資料庫錯誤", error); // 兩個不同資料
//     console.err("資料庫錯誤" + error); // "字串" + 物件 <- 串接， 後面的物件會被自動轉型 [object Object]
//   }
//   console.log("查到資料", results);
// });

// connection.end(); //結束連線

connection.connect();

async function queryData() {
  //   let stockCode = "2330";
  let today = moment().format("YYYYMMDD"); // 自動給當天的日期
  let format = "json";

  try {
    let stockCode = await fs.readFile("stock.txt", "utf-8");
    console.log("stockCode", stockCode);

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
    // res: axios 回覆給你的 http response
    // res.data <-- http response 裡的 data
    // console.log(res.data);
    let firstItem = res.data.data[0];
    // console.log(firstItem);
    // 0 1 2  8

    // 資料庫很容易寫出callback hell
    /*
      connection.query("SELECT....", (err, data) => {
          // data 有沒有值
          //沒有的話
          connection.query("INSERT ....", (err, data) => {

          }); 
      })
      */

    // sql injection
    connection.query(
      // IGNORE 要使用時，要先判斷是不是需要
      "INSERT IGNORE INTO stock (stock_no, date, deal, amount, count) VALUES(?, ?, ?, ?, ?);", //sql語法
      [stockCode, firstItem[0], firstItem[1], firstItem[2], firstItem[8]], //要透過陣列傳入值
      (err, results) => {
        if (err) {
          // 如果error 是個物件
          console.err("資料庫錯誤", err);
        }
        console.log("db結果", results);
      }
    );
    console.log(firstItem);
  } catch (e) {
    console.error(e);
  } finally {
    connection.end();
  }
}

queryData();

const axios = require("axios");
const moment = require("moment");
const fs = require("fs/promises");
const mySql = require("mysql");
require("dotenv").config();

const connection = mySql.createConnection({
  host: process.env.DB_HOST, //本機 127.0.0.1
  port: process.env.DB_PORT, //埠號 mysql  預設就是  3306
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
});

// --------await / aysnc 版---------------
connection.connect();

function insertPromise(insertData) {
  // 1. 建立 new Promise 物件
  // 2. 建構式傳入執行者 (本身也是一個函式，而且有兩個參數 (resolve, reject))
  return new Promise((resolve, reject) => {
    // 3. 搬入非同步工作
    connection.query(
      // IGNORE 要使用時，要先判斷是不是需要
      "INSERT IGNORE INTO stock (stock_no, date, deal, amount, count) VALUES(?, ?, ?, ?, ?);", //sql語法
      insertData,
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
}

async function getStock() {
  let today = moment().format("YYYYMMDD"); // 自動給當天的日期
  let format = "json";
  //   let stockCode = "2330";

  try {
    // 使用讀檔方式來存 stockCode
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
    // console.log(res.data);
    let firstItem = res.data.data[0]; // 單筆資料
    console.log(firstItem);
    // 0  1 2  8

    let insertData = [
      stockCode,
      firstItem[0],
      firstItem[1],
      firstItem[2],
      firstItem[8],
    ];

    let results = await insertPromise(insertData);
    console.log(results);
  } catch (e) {
    console.error(e);
  } finally {
    connection.end();
  }
}

getStock();

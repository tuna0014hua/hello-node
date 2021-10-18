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

// --------await / aysnc 版  多筆資料處理方式---------------
connection.connect();

function insertPromise(insertData) {
  let dataQty = insertData.length / 5; // dataQty 是根據資料庫的欄位數量來判斷，當前要insert去table的資料筆數(目前是5)

  /*
 (statement = 敘述 = stmt) stmtInsert 是最後將要傳送給db執行的指令，
 預期最後結果 //INSERT IGNORE INTO stock (stock_no, date, deal, amount, count) VALUES(?, ?, ?, ?, ?), ... ,(?, ?, ?, ?, ?);

 初始的樣子:  "INSERT IGNORE INTO stock (stock_no, date, deal, amount, count) VALUES";

 使用 for loop 的技巧去補全後面的字串(資料數量): (?, ?, ?, ?, ?), ... ,(?, ?, ?, ?, ?);
 (?, ?, ?, ?, ?) => 一組()表示一筆資料，一個?表示一筆資料的一個欄位

 */
  let stmtInsert =
    "INSERT IGNORE INTO stock (stock_no, date, deal, amount, count) VALUES";
  //O(n)
  for (let i = 0; i < dataQty; i++) {
    stmtInsert = stmtInsert + "(?, ?, ?, ?, ?)";
    // dataQty 資料總筆數 (?, ?, ?, ?, ?) 的數量; -1 表示for loop執行到最後一次;
    if (i == dataQty - 1) {
      stmtInsert = stmtInsert + ";";
    } else {
      stmtInsert = stmtInsert + ",";
    }
  }
  // console.log(stmtInsert);

  // 1. 建立 new Promise 物件
  // 2. 建構式傳入執行者 (本身也是一個函式，而且有兩個參數 (resolve, reject))
  return new Promise((resolve, reject) => {
    // 3. 搬入非同步工作
    connection.query(
      // IGNORE 要使用時，要先判斷是不是需要
      stmtInsert, //組裝好的sql指令
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
    let stockCode = (await fs.readFile("stock.txt", "utf-8")).split(","); // 如果想要處理多個，使用 split() 來分割
    console.log("stockCode", stockCode); //stockCode 0050,2330

    // 先準備一個空陣列 => 是為了將請求而來的不同支股票資訊(包含各個欄位)照順序排列，並打包成一個完整陣列傳送給Promise()函式做後續處理
    let insertData = new Array();

    // 使用for loop 去取得多支股票各自對應的多筆資料
    for (let i = 0; i < stockCode.length; i++) {
      let res = await axios.get(
        "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
        {
          params: {
            response: format,
            date: today,
            stockNo: stockCode[i],
          },
        }
      );
      // console.log(res.data);
      for (let j = 0; j < res.data.data.length; j++) {
        // temporary(暫時的) = Tmp 、 Temp
        let dataTmp = res.data.data[j];
        insertData.push(stockCode[i]);
        insertData.push(dataTmp[0]);
        insertData.push(dataTmp[1]);
        insertData.push(dataTmp[2]);
        insertData.push(dataTmp[8]);
      }
    }
    // console.log(insertData);

    let results = await insertPromise(insertData);
    console.log(results);
  } catch (e) {
    console.error(e);
  } finally {
    connection.end();
  }
}

getStock();

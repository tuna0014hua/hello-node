const mysql = require("mysql");

// 安裝 bluebird 慣例都會用 Promise去當變數
const Promise = require("bluebird");

//  再多人使用的系統裡面，需要做多條連線出來給多人使用
let connection = mysql.createPool({
  host: process.env.DB_HOST, // 本機 127.0.0.1
  port: process.env.DB_PORT, // 埠號 mysql 預設就是 3306
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  //  通常會用設定檔，因為可能會需要根據設備的規格不同而調整
  connectionLimit: process.env.CONNECTION_LIMIT || 10,
});

// 利用 bluebird 把 connection 的函式都變成 Promise
// promisifyAll ==>把這個東西 promise化
connection = Promise.promisifyAll(connection); //把connection函式帶入

module.exports = connection;

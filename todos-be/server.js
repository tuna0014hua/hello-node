const express = require("express");
const path = require("path");
require("dotenv").config();
const mysql = require("mysql");

// 安裝 bluebird 慣例都會用 Promise去當變數
const Promise = require("bluebird");

let connection = mysql.createConnection({
  host: process.env.DB_HOST, // 本機 127.0.0.1
  port: process.env.DB_PORT, // 埠號 mysql 預設就是 3306
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
});

// 利用 bluebird 把 connection 的函式都變成 Promise
// promisifyAll ==>把這個東西 promise化
connection = Promise.promisifyAll(connection); //把connection函式帶入

let app = express(); //application(請求、申請)

// app.use 告訴 express 這裡有一個中間件(middleware)
// middleware 只是一個函式 ，會有三個參數
app.use((req, res, next) => {
  console.log("我是第一個中間件");
  // 如果沒有 next ，程式就會停在這裡，會顯示出 Pending
  next();
  // 加入next 可以往下一關前進
  // 但是目前這個中間件，「不需要」知道下一個是誰?
});

app.use((req, res, next) => {
  // 建立一個時間
  let current = new Date();
  console.log(`有人來訪問 at ${current.toISOString()}`); //抓當下進入頁面的時間

  // 完全不關心 next 是誰
  // 只知道要給下一個
  next();
  // 低耦合
});

// nodeJS 套件
// - 自己寫
// - 第三方
//  - 內建

// middleware
// - 自己寫
// - 第三方
//  - 內建

// app.use(PATH,express.static(檔案夾))
// express.static(檔案夾名稱) 是內建的中間件
// 不指定路徑
app.use(express.static("static"));
// http://localhost:3001/about.html

// 指定路徑
app.use("/static", express.static("static"));
// http://localhost:3001/static/about.html

// react 路由 route/ router --> 其實也算是一種中間件
// app.Method(Path, Handler)
// Method: GET, POST, PUT, DELETE, PATCH,....
// Handler 是一個函式，會有兩個參數 request, response
app.get("/", (req, res) => {
  console.log("我是首頁");
  res.send("我是 Express 首頁");
});

app.get("/member", (req, res, next) => {
  console.log("我是會員頁A");
  // res.send("我是會員頁");
  next(); //比較少使用
});

app.get("/member", (req, res) => {
  console.log("我是會員頁B");
  res.send("我是會員頁B");
});

// MVC 架構
// 先製作一個能動的版本 -> 「重構」成好的版本

// 耦合: 高耦合 - 相關性太高、綁得太緊就不好擴充跟優化
//      低耦合 - 相關性低一點 --> 比較好修改、好維護、較彈性、好擴充 ==> 不用加班

// 什麼角色做什麼事，當程式設計師會將不同的事情給切割來寫 =>  職責切割
// 函式 --> 好維護，reuse
// 請問:函式要怎麼抽?
// 單一職責(單一功能職責)

app.get("/api/test", (req, res) => {
  res.json({
    name: "tuna",
    job: "designer",
  });
});

// 抓資料庫API
app.get("/api/todos", async (req, res) => {
  let data = await connection.queryAsync("SELECT * FROM todos");
  res.json(data);
});

// 這個中間件是負責做紀錄的
app.use((req, res, next) => {
  console.log(`${req.url}找不到路由`);
  next();
});

// 會走到所有路由後面的這個中間件
// 就表示前面的路由中間件的 path 都比不到
// 這就表示 ==> 404!!!
// 負責回復的
app.use((req, res, next) => {
  console.log("我是路由後面的中間件");
  res.status(404).send("Not Found");
});

// 3001 port
app.listen(3001, () => {
  connection.connect();
  console.log("express app 啟動了囉");
});

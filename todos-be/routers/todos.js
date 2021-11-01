const express = require("express");
const router = express.Router();
// 子站
const connection = require("../utils/db");

// 抓資料庫API => 拿全部資料
// query 是 mysql 內建函式 => callback型式
// 使用中間件，只會對這個 router 生效
router.get("/", async (req, res) => {
  let data = await connection.queryAsync("SELECT * FROM todos");
  res.json(data);
});

//  /api/todos/24 => 24是網頁上的變數
// 根據 id 取得單筆資料
// 一開始測試資料會先寫死資料，後續有抓到資料，要記得改回變數
// : 後面是抓變數名稱(todoId)
router.get("/:todoId", async (req, res) => {
  // req.params.todoId => params是一個物件
  let data = await connection.queryAsync("SELECT * FROM todos WHERE id = ?;", [
    req.params.todoId,
  ]);
  // 規劃好前端路由、後端路由、API格式
  // 直接把陣列回給前端
  // res.json(data);
  if (data.length > 0) {
    // 只回覆一個物件
    res.json(data[0]);
  } else {
    // ?空的
    // ex: /api/todos/24
    // res.send(null);
    res.status(404).send("Not Found");
    // 兩者都可以，但是團隊要一致性
  }
});

module.exports = router;

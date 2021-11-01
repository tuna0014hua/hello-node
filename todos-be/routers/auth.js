// 第一步 引用 express
const express = require("express");
// 第二步 利用 express 做一個 ruter
const router = express.Router();
const connection = require("../utils/db");
const bcrypt = require("bcrypt");

// 加入套件
const { body, validationResult } = require("express-validator");

// registerRules 是一個中間件的陣列
const registerRules = [
  body("email").isEmail().withMessage("Email欄位請正確填寫"),
  body("password").isLength({ min: 6 }).withMessage("密碼長度至少為6"),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("密碼不一致"),
];

// /api/auth/register
router.post("/register", registerRules, async (req, res) => {
  console.log("req.body", req.body);
  // req.body {
  //   email: 'tuna@gmail.com',
  //   password: 'testtext',
  //   confirmPassword: 'testtext',
  //   name: 'tuna',
  //   photo: null
  // }

  //  TODO: 驗證前端送來的資料
  //  後端一定不可以相信來自前端的資料
  //  前端做驗證是為了 UX (方便、即時、 減輕負擔) HTML5
  //  後端做驗證是為了安全、資料乾淨
  //  使用第三方套件 : express-validator (去找適合自己的)
  const validateResult = validationResult(req);
  if (!validateResult.isEmpty()) {
    // validateResult 不是空的，那表示有欄位沒有通過驗證
    let error = validateResult.array();
    return res.status(400).json({ code: 99, message: error });
  }
  // 表示 validateResult 是空的 => 都通過驗證了

  // TODO: 是否已註冊
  try {
    let member = await connection.queryAsync(
      "SELECT * FROM members WHERE email = ?",
      req.body.email
    );

    if (member.length > 0) {
      // 表示這個 email 已經存在過
      // code 是團隊自己定義
      return res.json({ code: "1101", message: "該 email 已註冊" });
    }

    // TODO: 密碼加密
    // bcrypt 加密套件
    // 是Promise
    let hashPassword = await bcrypt.hash(req.body.password, 10);
    // console.log("hashPassword", hashPassword);

    // bcrypt.hash("登入的時候的密碼", 10) === 資料庫比;

    // TODO: 建立一筆資料
    let result = await connection.queryAsync(
      "INSERT INTO members (email, password, name) VALUES (?)",
      [[req.body.email, hashPassword, req.body.name]]
    );

    // res.json({ code: "0", result: "OKOK from server" });
    res.json({ code: "0", message: "已建立" });
  } catch (e) {
    console.error(e);
    res.json({ code: 9999, message: "請洽系統管理員" });
  }
});

router.post("/login", async (req, res) => {
  console.log(req.body);

  // 比對資料 - 帳號
  let member = await connection.queryAsync(
    "SELECT * FROM members WHERE email = ?",
    [req.body.email]
  );

  if (member.length === 0) {
    // 表示這個 email 根本沒有建立帳號
    res.json({ code: "1102", message: "查無此帳號" });
  }
  member = member[0];

  // 比對密碼
  let result = await bcrypt.compare(req.body.password, member.password);
  if (!result) {
    // 密碼比對失敗
    res.json({ code: "1102", message: "查無此帳號" });
  }

  // TODO: 比對資料成功，那我們就寫 session
  // 紀錄一下有這個 session id 的人是登入成功的

  res.json({ code: "0", message: "登入成功" });
});

// 第三步 將組成模組的 router 輸出
module.exports = router;

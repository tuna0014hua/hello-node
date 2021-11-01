const express = require("express");
const router = express.Router();

// 應該是一組 「分組」
// /api/member/info
// /api/member/orders
// /api/member/comments

// router 就是一堆相關的路由的集合

// app.get("/api/member/info", (req, res) => {})
router.get("/info", (req, res) => {
  res.json();
});

// app.get("/api/member/orders", (req, res) => {})
router.get("/orders", (req, res) => {});

// app.get("/api/member/comments", (req, res) => {})
router.get("/comments", (req, res) => {});

module.exports = router;

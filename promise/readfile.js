// 1. new Promise
// 2. 製作執行函式
// 3. 把非同步函式放進去
// 4.1 成功的地方，呼叫 resolve 把資料傳出來
// 4.2 失敗的地方，呼叫 reject 把錯誤傳出來

//callback 版
// const fs = require("fs");

// fs.readFile("input.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.error("發生錯誤", err);
//   } else {
//     console.log("正確讀到", data);
//   }
// });

//----------promise----------------

const fs = require("fs");

function readFilePromise() {
  return new Promise((resolve, reject) => {
    fs.readFile("input.txt", "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

readFilePromise()
  .then((data) => {
    console.log("正確讀到: ", data);
  })
  .catch((err) => {
    console.error("發生錯誤", err);
  });

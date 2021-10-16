// 模擬callback
let doWork = function (job, timer, cb) {
  // 模擬非同步
  // 最方便模擬非同步工作 => 使用setTimeout
  setTimeout(() => {
    let dt = new Date();

    // 呼叫callback
    cb(null, `完成工作 ${job} at ${dt.toISOString()}`); //先假設工作都會做對情況下 (toISOString => 取得現在時間)
    /*
    callback 在慣例上 :
    第一個參數: 「錯誤」
    第二個參數: 要回覆的資料/訊息
    --------------------------
    兩個參數自行定義
    */
  }, timer);
};

//先印出開始時間
let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);

/*
非同步範例舉例: 註冊會員
(1) 資料庫裡有沒有這個 email 帳號 -> 查資料庫(是一個非同步的動作) [查資料庫需要跨網路/server -> 跑資料會較慢]
(2) 2.1 如果沒有，才會建立這個會員
    2.2 如果有，你就會直接回覆前端說已經註冊過
*/

// 模擬非同步工作狀態 刷牙(3000) -> 吃早餐(5000) -> 寫功課(3000) [使用巢狀結構]
doWork("刷牙", 3000, function (err, data) {
  /*
    function(err, data) => cb(null, `完成工作 ${job} at ${dt.toISOString()}`);
    err, data => 自行定義的參數名稱  |  null, `完成工作 ${job} at ${dt.toISOString()}` => 參數(err, data)的值
    -------------------------------------------------------------------------------------------------------
    "錯誤"習慣的參數名稱 err, error, [e(需小心使用) => JS 事件(event) ]
    err = null 代表沒有錯誤
    err = '' 代表沒有錯誤
    err = 0 代表沒有錯誤
    */

  if (err) {
    // log(日誌)訊息的等級 [log level] => 紀錄一些 log 可保存一段時間
    // log 太多，會消化(犧牲)系統效能
    /*
    console.log 的分類
    -----------------------------
    console. + 函式
    a. console.info  <-- 一般訊息
    b. console.warn  <-- 警告訊息
    c. console.trace <-- 追蹤訊息
    d. console.error <-- 錯誤訊息 -> 機制: 發email/slack 通知工程師  [嚴重錯誤]
    e. console.debug <-- 除錯訊息 -> 開發過程當中需要檢查 [正式環境不要使用]
    */

    // 有錯誤的情況下
    // 要怎麼處理錯誤
    console.log(err);
    // 下一件事要做什麼事?
  } else {
    // 正確的情況
    console.log(data);

    doWork("吃早餐", 5000, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);

        doWork("寫功課", 3000, function (err, data) {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
          }
        });
      }
    });
  }
});

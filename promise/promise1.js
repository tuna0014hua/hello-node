/*
promise 重點!!
1. Promise 是一個表示非同步運算的最終完成或失敗的物件!
    -> 物件
    -> 最終成功
    -> 最終失敗
    -> 最終:　非同步完成的時候
2. Promise 是用來解決 callback hell

3. 在Promise的機制下，不管成功或失敗 | 不寫 return下 ，都會回傳一個 Promise
*/

let doWork = function (job, timer) {
  // Promise 型式
  // 物件 [new Promise(...)] = 建構式函式 --> 建立一個 Promise 物件
  // 建構式(Promise) 必須要傳一個函式 (executer 執行者)
  // executer要吃兩個回呼函式(處理成功 resolve、處理失敗 reject)

  return new Promise((resolve, reject) => {
    // 非同步工作
    setTimeout(() => {
      let dt = new Date();
      // 如果會失敗， 呼叫 reject('錯誤的訊息') pending ==>　rejected
      //   reject(`"故意失敗!!" at ${dt.toISOString()}`);

      // 成功的 pending ==> resolved/ fulfilled
      // resolve(`完成工作 ${job} at ${dt.toDateString()}`); //Fri Oct 15 2021
      resolve(`完成工作 ${job} at ${dt.toISOString()}`);
    }, timer);
  }); // new Pormise =>　物件　(resolve, reject)函式需要兩個cb
};

let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);

// 刷牙(3000) -> 吃早餐(5000) -> 寫功課(3000)
let brushPromise = doWork("刷牙", 3000);
console.log("brushPromise: ", brushPromise); //Promise { <pending> }

// brushPromise 是一個 Promise 物件， 而且他的狀態是在 pending <規定>
// fulfilled (resolved) ==> 成功
// rejected             ==> 失敗
// * 狀態只能改變一次 *

// then 然後做什麼事(狀態改變之後)
// brushPromise.then(fn1[成功], fn2[失敗]);
brushPromise
  .then(
    (data) => {
      // fulfilled 時執行 <----> resolve
      console.log("fulfilled: ", data);

      let eatPromise = doWork("吃早餐", 5000); // doWork 會回傳一個 new Promise(eatPromise)
      return eatPromise; // 會在這裡回傳一個 Promise
      // brushPromise.then(fn1[成功], fn2[失敗]); 的回傳結果是這一個 eatPromise
    },
    (err) => {
      // rejected 時執行 <----> reject
      console.error("rejected: ", err);
    }
  )

  //稱呼為 Promise chain
  // eatPromise.then
  .then(
    (data) => {
      console.log("fulfilled: ", data);
      let homeworkPromise = doWork("寫功課", 3000);
      return homeworkPromise;
    },
    (err) => {
      console.log("rejected: ", err);
    }
  )

  //homeworkPromise.then
  .then(
    (data) => {
      console.log("fulfilled: ", data);
    },
    (err) => {
      console.log("rejected: ", err);
    }
  );

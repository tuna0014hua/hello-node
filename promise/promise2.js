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

// 物件導向(PHP、C#、JAVA、...) vs functional languge
// JavaScript: 原型式 prototype[面試會問]
// 建構式(也只是一個 funcrtion)
// new 建構式([預設值]) --> 做出一個新的物件
// new 跟作業系統要一塊記憶體的空間

let doWork = function (job, timer, isok) {
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
      if (isok) {
        resolve(`完成工作 ${job} at ${dt.toISOString()}`);
      } else {
        reject(`"故意失敗!!" at ${dt.toISOString()}`);
      }
    }, timer);
  }); // new Pormise =>　物件　(resolve, reject)函式需要兩個cb
};

let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);

// 刷牙(3000) -> 吃早餐(5000) -> 寫功課(3000)

//.then 稱呼為 Promise chain
doWork("刷牙", 3000, true)
  .then((data) => {
    // fulfilled 時執行 <----> resolve
    console.log("fulfilled: ", data);
    return doWork("吃早餐", 5000, true); // doWork 會回傳一個 new Promise(eatPromise)
  })

  // eatPromise.then
  .then((data) => {
    console.log("fulfilled: ", data);
    return doWork("寫功課", 3000, false);
  })

  //homeworkPromise.then
  .then((data) => {
    console.log("fulfilled: ", data);
  })
  .catch((err) => {
    // 攔截前面的 then 第二參數要做的那個錯誤處理函式
    console.log("rejected: ", err);
  });

/*
 error/exception
  try {

    // ......do something
  } catch (e) {
    // 攔截錯誤(在try catch裡面)
  }

  */

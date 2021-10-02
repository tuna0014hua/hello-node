# event loop 作業

Q1: 請問以下執行結果為何？ after 會在什麼數字後印出？ 為什麼？  
<small>。提示: 手動自己畫畫看整段程式的執行過程，call stack 的變化為何？</small>

```JavaScript
function readData(idx) {
  for (let i = 0; i < 100; i++) {
    idx++;
    console.log(idx);
  }
  if (idx < 500) {
    readData(idx);
  }
}

readData(0);
console.log("after");
```

---

A1:

1. 執行結果:

```JavaScript
1
2
3
....
498
499
500
after
```

2. after 會在什麼數字後印出？

   > 500 之後出現

3. 為什麼?
   > 因為<b>readData(0)</b>會在 call stack 裡去跑 for loop (1~100)，當 100 跑完後發現到 for loop 裡的 if(< 500)時，程式會繼續在 call stack 裡跑 101~500。接著<b>readData(0)</b>都跑完結束後，再來會跑 console.log(after); 程式碼裡都是 javascript 原生的函式，所以都會在 callstack 裡執行。

- [手繪連結](https://www.figma.com/proto/MuaTVDoDde8oSo3idi077o/event-loop?node-id=1%3A2&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=1%3A2)
  <small>(請一直往下點即可)</small>

---

Q2: 請問以下執行結果為何？ after 會在什麼數字後印出？ 為什麼？  
<small>。提示: 手動自己畫畫看整段程式的執行過程，call stack 的變化為何？</small>

```javascript
function readData(idx) {
  for (let i = 0; i < 100; i++) {
    idx++;
    console.log(idx);
  }
  if (idx < 500) {
    setTimeout(function () {
      readData(idx);
    }, 0);
  }
}

readData(0);
console.log("after");
```

---

A2:

1. 執行結果:

```JavaScript
1
2
3
....
100
after
101
102
103
...
500

```

2. after 會在什麼數字後印出？

   > 100 之後出現

3. 為什麼?

   > 因為<b>readData(0)</b>會在 call stack 裡去跑 for loop (1~100)。當 for loop(i<100)跑完後，往下執行程式時發現到<b>readData(0)</b>裡有使用 setTimeout(不是 JS 原生的函式，屬於非同步的函式)則需要到 web APIs 去執行，
   > 在 web APIs 執行中後先會在 callback Queue 裡排列等待。

   > 在 web APIs 執行中程式會在繼續往下找是否還有屬於 JS 原生的程式，發現到還有 console.log("after");於是在 call stack 裡會再繼續跑完(after)。
   > 當 call stack 為空時，callback Queue 裡的程式會依序被 event loop 放入 call stack(101~500)

- [手繪連結](https://www.figma.com/proto/MuaTVDoDde8oSo3idi077o/event-loop?node-id=104%3A119&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=104%3A119)
  <small>(請一直往下點即可)</small>

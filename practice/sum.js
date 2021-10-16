console.log("hello world!");

function sum(param) {
  //梯形公式: (上底+下底)*高/2
  let total = ((1 + param) * param) / 2;
  // param=5 => 1次
  // param=10 => 1次
  // param=10000 => 1次
  //時間複雜度 big O O(1) = O(2)=O(3)....
  //O(常數): 不管param執行多少，執行次數都是固定的
  return total;
}

function sum(param) {
  //   let total = 0;
  //   for (let i = 1; i <= param; i++) {
  //     total += i;
  // param=5 => 5次
  // param=10 => 10次
  // param=10000 => 10000次
  //   }
  // O(1)=>會跟參數成等比例成長
  //   return total;
}

console.log(sum(10));

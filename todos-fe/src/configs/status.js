// switch, if/else
// 會用查表法來簡化程式，容易擴充，有效率
// O(1)
export const STATUS_WORD = {
  A: "進行中",
  B: "已完成",
  c: "已暫停",
};

export const STATUS_COLOR = {
  A: "is-info",
  B: "is-success",
  C: "is-danger",
};

// 當程式越多時，請將共用的程式碼給單獨出來。這樣後續好管理、好維護擴充

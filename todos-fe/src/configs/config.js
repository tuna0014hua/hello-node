// export const API_URL = "http://localhost:3001/api";

// 變數名稱可能會改來改去，會再config檔統一處理
// 利用 || 來設定預設值 (不會有其他的錯誤)
export const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3001/api";

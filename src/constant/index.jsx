const now = new Date();

// '년_월_일_시간_분_초' 포맷으로 변환합니다.
export const formattedDate =
  now.getFullYear() +
  "_" +
  (now.getMonth() + 1).toString().padStart(2, "0") +
  "_" +
  now.getDate().toString().padStart(2, "0") +
  "_" +
  now.getHours().toString().padStart(2, "0") +
  "_" +
  now.getMinutes().toString().padStart(2, "0") +
  "_" +
  now.getSeconds().toString().padStart(2, "0");

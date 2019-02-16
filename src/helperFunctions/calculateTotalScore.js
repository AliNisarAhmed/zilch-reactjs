export default function (banksArr) {
  return banksArr.reduce((a, x) => typeof x === "number" ? a + x : a, 0);
}
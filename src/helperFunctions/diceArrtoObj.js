// converts a list of diceObj to consolidated object showing count of each die

export default function diceArrToObj (diceArr) {
  return diceArr.reduce((acc, x) => {
    if (acc[x.dots]) {
      acc[x.dots]++;
    } else {
      acc[x.dots] = 1;
    }
    return acc;
  }, {});
  
}
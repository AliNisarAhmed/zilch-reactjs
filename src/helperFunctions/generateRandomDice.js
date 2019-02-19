import generateRandomBetween from "./generateRandomBetween";


function generateRandomDice (diceArr) {
  return diceArr.map(diceObj => !diceObj.selected && diceObj.dots ? {...diceObj, dots: generateRandomBetween(1, 6) } : diceObj);
}

export default generateRandomDice;

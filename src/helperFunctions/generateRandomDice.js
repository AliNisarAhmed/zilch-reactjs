function generateRandomDice (diceArr) {
  return diceArr.map(diceObj => !diceObj.selected && diceObj.dots ? {...diceObj, dots: generateRandomDieNumber() } : diceObj);
}

export default generateRandomDice;

// function shuffleArray(array) { // fisher-yates algo
//   for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// }

function generateRandomDieNumber () {
  return Math.floor(Math.random() * 6 + 1);
}
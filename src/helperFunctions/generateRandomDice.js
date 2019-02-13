function generateRandomDice (length) {
  let arr = new Array(length).fill(0).map((elem, i) => i + 1);
  return shuffleArray(arr);
}

export default generateRandomDice;

function shuffleArray(array) { // fisher-yates algo
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
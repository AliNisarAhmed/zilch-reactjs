import diceArrToObj from "./diceArrtoObj";
import compareArrays from './compareArrays';

// takes in diceArr, returns {score: xx, count: yy}

export default function calculateScore(diceArr, selectedBool = true) {

  // We first filter the diceArr based on "SELECTED" & "LOCKED" flags
  let selectedAndNotLocked = diceArr.filter(dieObj => (dieObj.selected === selectedBool) && (!dieObj.locked));
  
  // if nothing is selected, the score would be zero 
  // ??? Check if this clashes with FREE ROLL
  if (selectedAndNotLocked.length === 0) return { score: 0, count: 0};

  let current = diceArrToObj(selectedAndNotLocked);
  let score = 0;
  let count = 0;
  
  // checking for three, four, five or six of a kind
  for (let [key, val] of Object.entries({...current})) {
    if (val >= 3) {
      if (key === "1") {
        score += (val - 2) * 1000;
      } else {
        score += (Number(key) * (val - 2)) * 100;
      }
      count = count + val;
      delete current[key];
    }
  }

  
  // checking for straight
  if (Object.keys(current).length === 6 && compareArrays(Object.keys(current), ["1", "2", "3", "4", "5", "6"])) {
    score += 1500;
    current = {};
    count = 6;
  }
  
  // checking for three pairs
  if (Object.keys(current).length === 3 && compareArrays(Object.values(current), [2, 2, 2])) {
    score += 750;
    current = {};
    count = 6;
  }
  
  // Checking for two or less ONES and Two or less FIVES 
  let entries = Object.entries(current);
  if (entries.length > 0) {
    for (let [key, val] of entries) {
      if (key === "1") {
        score += val * 100;
        count = count + val;
        delete current[key];
      } else if (key === "5") {
        score += val * 50;
        count = count + val;
        delete current[key];
      }
    }
  }

  // even after all the above, if sum of counts of all keys is 6, that means the player has score "NO SCORING DIE"
  // player gets 500 points, and he gets a free roll
  if (Object.values(current).reduce((a, x) => a + x, 0) === 6) {
    score = 500;
    count = 6;
  }

  return { score, count };
}

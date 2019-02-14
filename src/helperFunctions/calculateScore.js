import diceArrToObj from "./diceArrtoObj";
import compareArrays from './compareArrays';


export default function calculateScore(diceArr, selectedBool = true) {
  let selectedAndNotLocked = diceArr.filter(dieObj => (dieObj.selected === selectedBool) && (!dieObj.locked));
  
  if (selectedAndNotLocked.length === 0) return 0;

  let current = diceArrToObj(selectedAndNotLocked);
  let score = 0;
  
  // checking for three, four, five or six of a kind
  for (let [key, val] of Object.entries({...current})) {
    if (val >= 3) {
      if (key === "1") {
        score += (val - 2) * 1000;
      } else {
        score += (Number(key) * (val - 2)) * 100;
      }
      delete current[key];
    }
  }
  
  // checking for straight
  if (Object.keys(current).length === 6 && compareArrays(Object.keys(current), ["1", "2", "3", "4", "5", "6"])) {
    score += 1500;
    current = {};
  }
  
  // checking for three pairs
  if (Object.keys(current).length === 3 && compareArrays(Object.values(current), [2, 2, 2])) {
    score += 750;
    current = {};
  }
  
  let entries = Object.entries(current);
  if (entries.length > 0) {
    for (let [key, val] of entries) {
      if (key === "1") {
        score += val * 100;
      } else if (key === "5") {
        score += val * 50;
      }
    }
  }
  return score;
}

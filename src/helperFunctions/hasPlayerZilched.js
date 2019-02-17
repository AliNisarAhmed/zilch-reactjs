import diceArrToObj from "./diceArrtoObj";
import compareArrays from "./compareArrays";

// this function checks, after each roll, whether the player has zilched,
// we could ve used the calculateScore function, but checkForZilch needs to be faster
// it returns true if player has zilched.

export default function hasPlayerZilched(diceArr) {
  let filtered = diceArr.filter(dieObj => !dieObj.selected);  // keeping only non=selected 
  let diceObj = diceArrToObj(filtered);  // converting diceArray to DIce Object containing counts for each die roll
  let keys = Object.keys(diceObj).sort();
  if (filtered.length === 6 || keys.includes("1") || keys.includes("5")) {  // single 1 or 5 means player has scored something.
    return false;
  }

  
  // checking for three or more of a kind
  let values = Object.values(diceObj);

  for (let val of values) {
    if (val >= 3) {
      return false;
    }
  }

  if (keys.length < 3) return true;  // return true immediately if keys < 3 and 1 or a 5 or three of a kind is not included, since scoring is no longer possible
  
  // check for straight
  if (keys.length === 6 && compareArrays(keys, ["1", "2", "3", "4", "5", "6"])) {
    return false;
  }
  // check for three pairs
  if (keys.length === 3 && compareArrays(values, [2, 2, 2])) {
    return false;
  }

  // if none of the above holds, but the length of diceArr is still six, that means the player has scored "NO SCORING DIE"
  if (keys.length === 6) {
    return false;
  }

  return true;
}
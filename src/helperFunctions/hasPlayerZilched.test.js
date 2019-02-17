import hasPlayerZilched from "./hasPlayerZilched";

// function checks for dice other than those selected by the player. hence selected = false to be included in the test

describe("Testing hasPlayerZilched function", () => {
  test("Correctly returns false with a presence of a 5", () => {
    let diceArr = [{dots:2,selected:false},{dots:2,selected:true},{dots:2,selected:true},{dots:2,selected:false},{dots:5,selected:false},{dots:6,selected:false}];
    let result = hasPlayerZilched(diceArr);
    expect(result).toBeFalsy();
  });
  test("Correctly returns false with a presence of a 1", () => {
    let diceArr = [{dots:2,selected:false},{dots:2,selected:true},{dots:2,selected:true},{dots:1,selected:false},{dots:5,selected:true},{dots:6,selected:false}];
    let result = hasPlayerZilched(diceArr);
    expect(result).toBeFalsy();
  });
  test("Correctly returns false with presence of three of a kind", () => {
    let diceArr = [{dots:2,selected:false},{dots:2,selected:false},{dots:2,selected:false},{dots:4,selected:false},{dots:4,selected:false},{dots:6,selected:false}];
    let result = hasPlayerZilched(diceArr);
    expect(result).toBeFalsy();
  });
  test("Should return true with dice rolls of [3, 3, 4, 4, 6, 2]", () => {
    let diceArr = [{dots:3,selected:false},{dots:3,selected:false},{dots:4,selected:false},{dots:4,selected:false},{dots:6,selected:false},{dots:2,selected:false}];
    let result = hasPlayerZilched(diceArr);
    expect(result).toBeFalsy();
  });
  test("Should return false with a straight", () => {
    let diceArr = [{dots:3,selected:false},{dots:4,selected:false},{dots:6,selected:false},{dots:5,selected:false},{dots:1,selected:false},{dots:2,selected:false}];
    let result = hasPlayerZilched(diceArr);
    expect(result).toBeFalsy();
  });
  test("Should return true with dice rolls of [3, 3, 4, 4, 2]", () => {
    let diceArr = [{dots:3,selected:false},{dots:3,selected:false},{dots:4,selected:false},{dots:4,selected:false},{dots:6,selected:true},{dots:2,selected:false}];
    let result = hasPlayerZilched(diceArr);
    expect(result).toBeTruthy();
  });
  test("Should return false with dice rolls of [3, 3, 3]", () => {
    let diceArr = [{dots:3,selected:false},{dots:3,selected:false},{dots:5,selected:true},{dots:4,selected:true},{dots:6,selected:true},{dots:3,selected:false}];
    let result = hasPlayerZilched(diceArr);
    expect(result).toBeFalsy();
  });
  test("Should return true with dice rolls of [3, 3]", () => {
    let diceArr = [{dots:3,selected:false},{dots:3,selected:false},{dots:4,selected:true},{dots:4,selected:true},{dots:6,selected:true},{dots:2,selected:true}];
    let result = hasPlayerZilched(diceArr);
    expect(result).toBeTruthy();
  });
});
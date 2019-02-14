import calculateScore from './calculateScore';

describe("Testing calculate Score function for various inputs", () => {
  test("Computes the score correctly: three twos = 200", () => {
    let diceArr = [{dots: 2, selected: true}, {dots: 2, selected: true},{dots: 2,selected: true},{dots: 2,selected: false},{dots: 5,selected: false},{dots: 6,selected: false}];
    let result = calculateScore(diceArr);
    expect(result).toBe(200);
  });
  test("Computes the score correctly: three ones = 1000", () => {
    let diceArr = [{dots: 1, selected: true}, {dots: 1, selected: true},{dots: 1,selected: true},{dots: 1,selected: false},{dots: 5,selected: false},{dots: 6,selected: false}];
    let result = calculateScore(diceArr);
    expect(result).toBe(1000);
  });
  test("Computes the score correctly: four fours = 800", () => {
    let diceArr = [{dots: 4, selected: true}, {dots: 4, selected: true},{dots: 4,selected: true},{dots: 4,selected: true},{dots: 4,selected: false},{dots: 6,selected: false}];
    let result = calculateScore(diceArr);
    expect(result).toBe(800);
  });
  test("Computes the score correctly: six fives = 2000", () => {
    let diceArr = [{dots: 5, selected: true}, {dots: 5, selected: true},{dots: 5,selected: true},{dots: 5,selected: true},{dots: 5,selected: true},{dots: 5,selected: true}];
    let result = calculateScore(diceArr);
    expect(result).toBe(2000);
  });
  test("Computes the score correctly: straight = 1500", () => {
    let diceArr = [{dots:1,selected:true},{dots:2,selected:true},{dots:3,selected:true},{dots:4,selected:true},{dots:5,selected: true},{dots:6,selected:true}];
    let result = calculateScore(diceArr);
    expect(result).toBe(1500);
  });
  test("Computes the score correctly: three pairs = 750", () => {
    let diceArr = [{dots:1,selected:true},{dots:1,selected:true},{dots:3,selected:true},{dots:3,selected:true},{dots:5,selected: true},{dots:5,selected:true}];
    let result = calculateScore(diceArr);
    expect(result).toBe(750);
  });
  test("Computes the score correctly: three pairs = 750", () => {
    let diceArr = [{dots:2,selected:true},{dots:2,selected:true},{dots:3,selected:true},{dots:3,selected:true},{dots:5,selected: true},{dots:5,selected:true}];
    let result = calculateScore(diceArr);
    expect(result).toBe(750);
  });
  test("Computes the score correctly: two Ones = 200", () => {
    let diceArr = [{dots:1,selected:true},{dots:1,selected:true},{dots:1,selected:false},{dots:4,selected:true},{dots:5,selected: false},{dots:6,selected:true}];
    let result = calculateScore(diceArr);
    expect(result).toBe(200);
  });
  test("Computes the score correctly: two Ones & two Fives = 300", () => {
    let diceArr = [{dots:1,selected:true},{dots:1,selected:true},{dots:5,selected:true},{dots:5,selected:true},{dots:4,selected: true},{dots:6,selected:true}];
    let result = calculateScore(diceArr);
    expect(result).toBe(300);
  });
  test("Computes the score correctly: three Ones & two Fives = 1100", () => {
    let diceArr = [{dots:1,selected:true},{dots:1,selected:true},{dots:1,selected:true},{dots:5,selected:true},{dots:5,selected: true},{dots:6,selected:true}];
    let result = calculateScore(diceArr);
    expect(result).toBe(1100);
  });
});
import calculateScore from './calculateScore';

describe("Testing calculate Score function for various inputs", () => {
  
  test("Computes the score correctly: three twos = 200, count = 3", () => {
    let diceArr = [{dots: 2, selected: true}, {dots: 2, selected: true},{dots: 2,selected: true},{dots: 2,selected: false},{dots: 5,selected: false},{dots: 6,selected: false}];
    let result = calculateScore(diceArr);
    expect(result).toEqual({score: 200, count: 3});
  });

  test("Computes the score correctly: three ones = 1000, count = 3", () => {
    let diceArr = [{dots: 1, selected: true}, {dots: 1, selected: true},{dots: 1,selected: true},{dots: 1,selected: false},{dots: 5,selected: false},{dots: 6,selected: false}];
    let result = calculateScore(diceArr);
    expect(result).toEqual({score: 1000, count: 3 });
  });

  test("Computes the score correctly: four fours = 800, count = 4", () => {
    let diceArr = [{dots: 4, selected: true}, {dots: 4, selected: true},{dots: 4,selected: true},{dots: 4,selected: true},{dots: 4,selected: false},{dots: 6,selected: false}];
    let result = calculateScore(diceArr);
    expect(result).toEqual({score: 800, count: 4 });
  });

  test("Computes the score correctly: six fives = 2000, count = 6", () => {
    let diceArr = [{dots: 5, selected: true}, {dots: 5, selected: true},{dots: 5,selected: true},{dots: 5,selected: true},{dots: 5,selected: true},{dots: 5,selected: true}];
    let result = calculateScore(diceArr);
    expect(result).toEqual({ score: 2000, count: 6 });
  });

  test("Computes the score correctly: straight = 1500, count = 6", () => {
    let diceArr = [{dots:1,selected:true},{dots:2,selected:true},{dots:3,selected:true},{dots:4,selected:true},{dots:5,selected: true},{dots:6,selected:true}];
    let result = calculateScore(diceArr);
    expect(result).toEqual({score: 1500, count: 6 });
  });

  test("Computes the score correctly: three pairs = 750, count = 6", () => {
    let diceArr = [{dots:1,selected:true},{dots:1,selected:true},{dots:3,selected:true},{dots:3,selected:true},{dots:5,selected: true},{dots:5,selected:true}];
    let result = calculateScore(diceArr);
    expect(result).toEqual({ score: 750, count: 6 });
  });

  test("Computes the score correctly: three pairs = 750", () => {
    let diceArr = [{dots:2,selected:true},{dots:2,selected:true},{dots:3,selected:true},{dots:3,selected:true},{dots:5,selected: true},{dots:5,selected:true}];
    let result = calculateScore(diceArr);
    expect(result).toEqual({ score: 750, count: 6});
  });

  test("Computes the score correctly: two Ones = 200, count = 2", () => {
    let diceArr = [{dots:1,selected:true},{dots:1,selected:true},{dots:1,selected:false},{dots:4,selected:true},{dots:5,selected: false},{dots:6,selected:true}];
    let result = calculateScore(diceArr);
    expect(result).toEqual({ score: 200, count: 2 });
  });

  test("Computes the score correctly: two Ones & two Fives = 300, count = 4", () => {
    let diceArr = [{dots:1,selected:true},{dots:1,selected:true},{dots:5,selected:true},{dots:5,selected:true},{dots:4,selected: true},{dots:6,selected:true}];
    let result = calculateScore(diceArr);
    expect(result).toEqual({score: 300, count: 4});
  });

  test("Computes the score correctly: three Ones & two Fives = 1100, count = 5", () => {
    let diceArr = [{dots:1,selected:true},{dots:1,selected:true},{dots:1,selected:true},{dots:5,selected:true},{dots:5,selected: true},{dots:6,selected:true}];
    let result = calculateScore(diceArr);
    expect(result).toEqual({ score: 1100, count: 5 });
  });

  test("Computes the score correctly: two 4s & two 6s = 0, count = 0", () => {
    let diceArr = [{dots:4,selected:true},{dots:4,selected:true},{dots:6,selected:true},{dots:6,selected:true},{dots:5,selected:false},{dots:6,selected:false}];
    let result = calculateScore(diceArr);
    expect(result).toEqual({ score: 0, count: 0 });
  });

  test("Computes the score correctly: [3, 2, 6, 2, 3, 4] (NO SCORING DIE) = 500, count = 6", () => {
    let diceArr = [{dots:3,selected:true},{dots:2,selected:true},{dots:6,selected:true},{dots:2,selected:true},{dots:3,selected:true},{dots:4,selected:true}];
    let result = calculateScore(diceArr);
    expect(result).toEqual({ score: 500, count: 6 });
  });
  
});
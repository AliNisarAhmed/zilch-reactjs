import generateRandomDice from './generateRandomDice';

describe('Testing rollDice helper function', () => {
  test("gets an array of specified length of random and unique die rolls", () => {
    let arrLength = 4;
    let result = generateRandomDice(arrLength);
    expect(result.length).toEqual(arrLength);
    expect(result).toContain(1);
    expect(result).toContain(2);
    expect(result).toContain(3);
    expect(result).toContain(4);
    expect(result.includes(5)).toBeFalsy();
    expect(result.includes(6)).toBeFalsy();
  });
});
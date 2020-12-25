import {
  solvePart1,
  parseInput,
  calculateFuelRequirement,
  calculateSubFuelRequirement
} from '.';

describe('solvePart1()', () => {
  it('should calculate the total fuel sum from an input file', async () => {
    const expected = 34241;
    const actual = await solvePart1('2019/inputs/day1_test');
    expect(actual).toEqual(expected);
  });
});

describe('parseInput()', () => {
  it('should convert a file to an array of numbers', async () => {
    const actual = await parseInput('2019/inputs/day1_test');
    const expected = [12, 14, 1969, 100756];
    expect(actual).toEqual(expected);
  });
});

describe('calculateFuelRequirement()', () => {
  it('should calculate the fuel requirement of a mass', () => {
    expect(calculateFuelRequirement(12)).toEqual(2);
    expect(calculateFuelRequirement(14)).toEqual(2);
    expect(calculateFuelRequirement(1969)).toEqual(654);
  });
});

describe('calculateSubFuelRequirement()', () => {
  it('should calculate the subfuel requirement of a mass', () => {
    expect(calculateSubFuelRequirement(14)).toEqual(2);
    expect(calculateSubFuelRequirement(1969)).toEqual(966);
    expect(calculateSubFuelRequirement(100756)).toEqual(50346);
    expect(calculateSubFuelRequirement(0)).toEqual(0);
    expect(calculateSubFuelRequirement(-23)).toEqual(0);
  });
});

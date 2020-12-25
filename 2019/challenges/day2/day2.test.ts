import { parseInput, runProgram, runOpcode } from './day2';

describe('parseInput()', () => {
  it('should read a file and return an array of numbers', async () => {
    const actual = await parseInput('2019/inputs/day2_test');
    const expected = [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50];
    expect(actual).toEqual(expected);
  });
});

describe('runOpcode()', () => {
  it('should perform addition with code 1', () => {
    expect(runOpcode(1, 2, 5)).toEqual(7);
  });

  it('should perform multiplication with code 2', () => {
    expect(runOpcode(2, 10, 5)).toEqual(50);
  });

  it('should error and return null with bad input', () => {
    expect(runOpcode(3, 10, 5)).toBeNull;
  });
});

describe('runProgram()', () => {
  it('should process opcodes correctly', () => {
    expect(runProgram([1, 0, 0, 0, 99])).toEqual([2, 0, 0, 0, 99]);
    expect(runProgram([2, 3, 0, 3, 99])).toEqual([2, 3, 0, 6, 99]);
    expect(runProgram([2, 4, 4, 5, 99, 0])).toEqual([2, 4, 4, 5, 99, 9801]);
    expect(runProgram([1, 1, 1, 4, 99, 5, 6, 0, 99])).toEqual([
      30,
      1,
      1,
      4,
      2,
      5,
      6,
      0,
      99
    ]);
  });

  it('should return null with bad input', () => {
    expect(runProgram([9, 3, 0, 3, 99])).toBeNull;
  });
});

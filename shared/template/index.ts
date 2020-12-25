import { read } from '../../../shared/utils';
const inputPath = 'INPUT/PATH/HERE';
const inputPathTest = 'TEST/PATH/HERE';

export const parseInput = async (filename: string): Promise<string> => {
  const string = await read(filename);
  return string;
};

export const solvePart1 = async (filepath: string): Promise<string> => {
  const puzzle = await parseInput(filepath);
  return puzzle;
};

// export const solvePart2 = async (filepath: string): Promise<string> => {
//   const puzzle = await parseInput(filepath);
//   return puzzle;
// };

solvePart1(inputPathTest).then((result) =>
  console.log('Part 1 solution:', result)
);

// solvePart2(inputPathTest).then((result) =>
//   console.log('Part 2 solution:', result)
// );

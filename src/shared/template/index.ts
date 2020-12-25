import { read } from '~/shared/utils';

export const parseInput = async (filename: string): Promise<string> => {
  const string = await read(__dirname, filename);
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

solvePart1('input_test').then((result) =>
  console.log('Part 1 solution:', result)
);

// solvePart2('input_test').then((result) =>
//   console.log('Part 2 solution:', result)
// );

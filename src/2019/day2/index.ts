import { read } from '~/shared/utils';

export const parseInput = async (filename: string): Promise<number[]> => {
  const program = await (await read(__dirname, filename))
    .split(',')
    .map(Number);
  return program;
};

export const runOpcode = (
  code: number,
  a: number,
  b: number
): number | null => {
  let result: number | null = null;
  switch (code) {
    case 1:
      // Addition
      result = a + b;
      break;
    case 2:
      // Multiplication
      result = a * b;
      break;
    default:
      console.error(`${code} is not a valid opcode.`);
  }
  return result;
};

export const runProgram = (program: number[]): number[] | null => {
  // Move through the program, executing opcodes as necessary
  for (let i = 0; i < program.length; i += 4) {
    const opcode = program[i];

    if (opcode === 99) {
      break;
    }

    const [j, k] = [program[i + 1], program[i + 2]];
    const indexToReplace = program[i + 3];
    const result = runOpcode(opcode, program[j], program[k]);

    if (!result) {
      return null;
    }

    program[indexToReplace] = result;
  }
  return program;
};

export const runProgramWithInputs = async (
  noun: number,
  verb: number,
  filepath: string
): Promise<number[] | null> => {
  const program: number[] = await parseInput(filepath);

  program[1] = noun;
  program[2] = verb;

  return runProgram(program);
};

export const solvePart1 = async (filepath: string): Promise<number | null> => {
  const result: number[] | null = await runProgramWithInputs(12, 2, filepath);

  if (!result) {
    return null;
  }

  return result[0];
};

export const solvePart2 = async (filepath: string): Promise<number | null> => {
  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      const result = await runProgramWithInputs(noun, verb, filepath);
      if (!result) {
        continue;
      }
      if (result[0] === 19690720) {
        return 100 * noun + verb;
      }
    }
  }

  return null;
};

solvePart1('input').then((result) => console.log('Part 1 solution:', result));
solvePart2('input').then((result) => console.log('Part 2 solution:', result));

// redo template
// Total time: 1h20. Need to cut that in HALF.
// Review the style of your tests against that article.

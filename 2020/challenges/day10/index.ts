import { read } from '../../../shared/utils';

const parseInput = async (filename: string): Promise<number[]> => {
  const string = await read(filename);
  return createAdapterArray(
    string
      .split('\n')
      .map((str) => Number(str))
      .sort((a, b) => a - b)
  );
};

const createAdapterArray = (arr: number[]) => {
  return [0].concat(arr).concat(arr[arr.length - 1] + 3);
};

const solvePart1 = async () => {
  const adapters = await parseInput('day10');
  let oneJoltDiffs: number = 0;
  let threeJoltDiffs: number = 0;

  for (let i = 0; i < adapters.length - 1; i++) {
    const diff = adapters[i + 1] - adapters[i];
    if (diff > 3) {
      return console.error('eek! not enough adapters');
    }

    if (diff === 1) {
      oneJoltDiffs++;
    } else if (diff === 3) {
      threeJoltDiffs++;
    }
  }
  return oneJoltDiffs * threeJoltDiffs;
};

// Credit to https://www.reddit.com/r/adventofcode/comments/ka8z8x/2020_day_10_solutions/gfbo61q?utm_source=share&utm_medium=web2x&context=3
const getInputCount = (adapters: number[]): number => {
  console.log(adapters);
  const countTracker = adapters.map((a) => {
    return 0;
  });

  countTracker[0] = 1;

  for (let i = 0; i < adapters.length; i++) {
    for (let j = i + 1; j <= i + 3 && j < adapters.length; j++) {
      if (adapters[j] - adapters[i] > 3) {
        break;
      }
      countTracker[j] += countTracker[i];
    }
  }
  console.log(countTracker);

  return countTracker[countTracker.length - 1];
};

const solvePart2 = async () => {
  const adapters = await parseInput('day10_test');
  return getInputCount(adapters);
};

solvePart1().then((result) => console.log('Part 1 solution:', result));
solvePart2().then((result) => console.log('Part 2 solution:', result));

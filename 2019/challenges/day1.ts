import { read } from '../../shared/utils';

export const parseInput = async (filename: string): Promise<number[]> => {
  const masses = await (await read(filename)).split('\n').map(Number);
  return masses;
};

export const calculateFuelRequirement = (mass: number): number => {
  return Math.floor(mass / 3) - 2;
};

export const calculateSubFuelRequirement = (mass: number): number => {
  const fuelAmount: number = calculateFuelRequirement(mass);
  return fuelAmount <= 0
    ? 0
    : fuelAmount + calculateSubFuelRequirement(fuelAmount);
};

export const solvePart1 = async (filepath: string): Promise<number> => {
  const masses: number[] = await parseInput(filepath);
  const fuelSum: number = masses
    .map(calculateFuelRequirement)
    .reduce((acc, curr) => acc + curr);
  return fuelSum;
};

export const solvePart2 = async (filepath: string): Promise<number> => {
  const masses: number[] = await parseInput(filepath);
  const fuelSum: number = masses
    .map(calculateSubFuelRequirement)
    .reduce((acc, curr) => acc + curr);
  return fuelSum;
};

solvePart1('2019/inputs/day1').then((result) =>
  console.log('Part 1 solution:', result)
);
solvePart2('2019/inputs/day1').then((result) =>
  console.log('Part 2 solution:', result)
);

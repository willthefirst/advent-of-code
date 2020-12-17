import { read } from "../../utils";

const parseInput = async (filename: string) => {
	const string = await read(filename);
	return string.split("\n").map((s) => Number(s));
};

// Checks if n is sum of two numbers in preamble
const isValid = (n: number, preamble: number[]): boolean => {
	for (let i = 0; i < preamble.length; i++) {
		const targetNum = n - preamble[i];
		if (targetNum !== n && preamble.includes(targetNum)) {
			return true;
		}
	}
	return false;
};

const findError = (data: number[], preambleLength: number): number | null => {
	for (let i = preambleLength; i < data.length; i++) {
		const n = data[i];
		const preamble: number[] = data.slice(i - preambleLength, i);

		if (!isValid(n, preamble)) {
			return n;
		}
	}
	return null;
};

const solvePart1 = async () => {
	const data: number[] = await parseInput("day9");
	return findError(data, 25);
};

let sumFromIndex = (index: number, range: number, nums: number[], cachedFn: Function): number => {
	if (range < 0) {
		return 0;
	}
	return nums.slice(index, index + range + 1).reduce((acc, curr) => acc + curr);
};

const memoizeSumFromIndex = (fn: Function) => {
	const sumPairCache: any = {};

	return (index: number, range: number, nums: number[], cachedFn: Function) => {
		if (index in sumPairCache && range === 1) {
			return sumPairCache[index];
		}

		if (range < 1) {
			return nums[index];
		}

		let result = cachedFn(index, range - 1, nums, cachedFn) + nums[index + range];

		if (range === 1) {
			// Only cache pairs
			sumPairCache[index] = result;
		}

		return result;
	};
};

sumFromIndex = memoizeSumFromIndex(sumFromIndex);

const minPlusMax = (array: number[]) => {
	return Math.min(...array) + Math.max(...array);
};

let findEncryptionWeakness = (data: number[], preambleLength: number): number | null => {
	const error = findError(data, preambleLength);
	for (let range = 1; range < data.length; range++) {
		for (let i = 0; i < data.length; i++) {
			if (i + range > data.length) {
				continue;
			}
			const sumOfRange = sumFromIndex(i, range, data, sumFromIndex);
			if (sumOfRange === error) {
				return minPlusMax(data.slice(i, i + range + 1));
			}
		}
	}
	return null;
};

const solvePart2 = async () => {
	const data = await parseInput("day9");
	return findEncryptionWeakness(data, 25);
};

solvePart1().then((result) => console.log("Part 1 solution:", result));
solvePart2().then((result) => console.log("Part 2 solution:", result));

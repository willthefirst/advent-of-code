import { read } from "../../utils";

const strToNums = (str: string): number[] => {
	return str.split("\n").map((line) => parseInt(line, 10));
};

const parsePuzzleInput = async (filename: string): Promise<number[]> => {
	return read(filename).then(strToNums);
};

const sortNumArray = (nums: number[]) => {
	return nums.sort((a, b) => a - b);
};

/* Part 1 */

const findTwoNumsThatSumToX = (nums: number[], x: number): number[] | null => {
	nums = sortNumArray(nums);

	let i = 0,
		j = nums.length;

	let solution: number[] | null = null;

	// Compare first and last nums in sorted array
	// If sum is smaller than 2020, increase index of first num
	// Else if sum is larger than 2020, decrease index of last num
	while (i < j && !solution) {
		let a = nums[i],
			b = nums[j];
		const sum = a + b;

		if (sum === x) {
			solution = [a, b];
		} else if (sum < x) {
			i++;
		} else {
			j--;
		}
	}
	return solution;
};

const solvePart1 = async (): Promise<void> => {
	let nums: number[] = await parsePuzzleInput("day1");
	const result = findTwoNumsThatSumToX(nums, 2020);

	if (!result) {
		console.log("Part 1 solution:", null);
	} else {
		console.log("Part 1 solution:", result[0] * result[1]);
	}
};

solvePart1();

/* Part 2 */

const solvePart2 = async () => {
	let nums: number[] = await parsePuzzleInput("day1");
	let foundTwoNums = null;
	let i = 0;
	let x = 0;

	while (i < nums.length && !foundTwoNums) {
		foundTwoNums = findTwoNumsThatSumToX(nums.slice(i + 1), 2020 - nums[i]);
		if (foundTwoNums) {
			return nums[i] * foundTwoNums[0] * foundTwoNums[1];
		}
		i++;
	}

	return null;
};

solvePart2().then((solution) => console.log("Part 2 solution:", solution));
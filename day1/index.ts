import { read } from "../utils";

const strToNums = (str: string): number[] => {
	return str.split("\n").map((line) => parseInt(line, 10));
};

const parsePuzzleInput = async (filename: string): Promise<number[]> => {
	return read(filename).then(strToNums);
};

const solvePart1 = async (): Promise<number | null> => {
	const nums = await parsePuzzleInput("day1");
	nums.sort();

	let i = 0,
		j = nums.length;

	let solution: number | null = null;

	// Compare first and last nums in sorted array
	// If sum is smaller than 2020, increase index of first num
	// Else if sum is larger than 2020, decrease index of last num
	while (i < j && !solution) {
		let a = nums[i],
			b = nums[j];
		const sum = a + b;

		if (sum === 2020) {
			solution = a * b;
		} else if (sum < 2020) {
			i++;
		} else {
			j--;
		}
	}
	return solution;
};

solvePart1().then((solution) => console.log(solution));

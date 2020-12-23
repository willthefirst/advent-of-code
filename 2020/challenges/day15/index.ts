import { read } from "../../utils";

const parseInput = async (filename: string) => {
	const string = await read(filename);
	return string.split(",").map(Number);
};

const getNthNumber = (n: number, nums: number[]): number => {
	while (nums.length < n) {
		const lastTurnNum = nums.length;
		const last = nums[lastTurnNum - 1];
		const lastIndexOfLast = nums.slice(0, nums.length - 1).lastIndexOf(last);

		if (lastIndexOfLast === -1) {
			nums.push(0);
		} else {
			nums.push(lastTurnNum - (lastIndexOfLast + 1));
		}
	}
	return nums[nums.length - 1];
};

const solvePart1 = async () => {
	const numbers = await parseInput("day15");
	return getNthNumber(10, numbers);
};

const solvePart2 = async () => {
	const numbers = await parseInput("day15_test");
	return getNthNumber(10, numbers);
};

// solvePart1().then((result) => console.log("Part 1 solution:", result));
solvePart2().then((result) => console.log("Part 2 solution:", result));

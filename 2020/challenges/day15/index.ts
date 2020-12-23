import { createVoidZero } from "typescript";
import { read } from "../../utils";

const parseInput = async (filename: string) => {
	const string = await read(filename);
	return string.split(",").map(Number);
};

const getNthNumber = (n: number, nums: number[]): number => {
	const latest = new Map();
	const penultimate = new Map();
	
	// 0:1	3:6	6:3
	// penultimtate
	// 0:1	3:5

	for (let i = 0; i < nums.length; i++) {
		latest.set(nums[i], i + 1);
	}

	let last = nums[nums.length - 1];

	for (let turnNum = nums.length + 1; turnNum <= n; turnNum++) {
		const previousTurnForNum = penultimate.get(last);
		if (!previousTurnForNum) {
			// If this is the first time we've seen this value
			const lastZero = latest.get(0);
			penultimate.set(0, lastZero);
			latest.set(0, turnNum);
			last = 0;
		} else {
			// If we've seen this value before
			const turnDiff = latest.get(last) - previousTurnForNum;
			const latestVal = latest.get(turnDiff)
			if (latestVal) {
				penultimate.set(turnDiff, latestVal)
			};
			latest.set(turnDiff, turnNum);
			last = turnDiff;
		}
		console.log(turnNum, last)
	}
	return last;
};

const solvePart1 = async () => {
	const numbers = await parseInput("day15");
	return getNthNumber(10, numbers);
};

const solvePart2 = async () => {
	const numbers = await parseInput("day15");
	return getNthNumber(30000000, numbers);
};

// solvePart1().then((result) => console.log("Part 1 solution:", result));
solvePart2().then((result) => console.log("Part 2 solution:", result));

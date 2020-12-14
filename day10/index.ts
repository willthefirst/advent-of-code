import { read } from "../utils";

const parseInput = async (filename: string): Promise<number[]> => {
	const string = await read(filename);
	return string
		.split("\n")
		.map((str) => Number(str))
		.sort((a, b) => a - b);
};

const solvePart1 = async () => {
	const adapters = await parseInput("day10");
	let oneJoltDiffs: number = 1; // the plug's diff.
	let threeJoltDiffs: number = 1; // our device's diff.
	for (let i = 0; i < adapters.length - 1; i++) {
		const diff = adapters[i + 1] - adapters[i];
		if (diff > 3) {
			return console.error("eek! not enough adapters");
		}

		if (diff === 1) {
			oneJoltDiffs++;
		} else if (diff === 3) {
			threeJoltDiffs++;
		}
	}
	return oneJoltDiffs * threeJoltDiffs;
};

const solvePart2 = async () => {
	const puzzle = await parseInput("day10");
	return puzzle;
};

// solvePart1().then((result) => console.log("Part 1 solution:", result));
solvePart2().then((result) => console.log("Part 2 solution:", result));

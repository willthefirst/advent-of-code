import { read } from "../utils";

const parseInput = async (filename: string): Promise<number[]> => {
	const string = await read(filename);
	return createAdapterArray(
		string
			.split("\n")
			.map((str) => Number(str))
			.sort((a, b) => a - b)
	);
};

const createAdapterArray = (arr: number[]) => {
	return [0].concat(arr).concat(arr[arr.length - 1] + 3);
};

const solvePart1 = async () => {
	const adapters = await parseInput("day10");
	let oneJoltDiffs: number = 0;
	let threeJoltDiffs: number = 0;

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

const cloneArray = (arr: any[]) => {
	return Array.from(arr);
};

const getAllArrangements = (adapters: number[]): number[][] => {
	const arrangements = [adapters];
	for (let i = 1; i < adapters.length - 1; i++) {
		let arrangement = Array.from(adapters);
		for (let j = i; j < arrangement.length - 1; ) {
			if (arrangement[i + 1] - arrangement[i - 1] <= 3) {
				arrangement.splice(i, 1);
				getAllArrangements(arrangement.slice(i)).forEach((arr) => {
					arrangements.push(arrangement.slice(0, i).concat(arr));
				})
			} else {
				break;
			}
		}
	}
	return arrangements;
};

const solvePart2 = async () => {
	const adapters = await parseInput("day10");
	const arrangements = getAllArrangements(adapters);
	console.log(arrangements);
	return arrangements.length;
};

// solvePart1().then((result) => console.log("Part 1 solution:", result));
solvePart2().then((result) => console.log("Part 2 solution:", result));

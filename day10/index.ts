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

const generateArrangements = (adapters: number[]): number[][] => {
	const arrangements = [];
	if (adapters.length !== 3) {
		console.error("bad length fed to generateArrangements");
	} else if (adapters[2] - adapters[0] <= 3) {
		arrangements.push([adapters[0], adapters[2]]);
	}
	arrangements.push(adapters);
	return arrangements;
};

const getAllArrangements = (adapters: any[]): any[] => {
	// Base case
	if (adapters.length <= 2) {
		return [adapters];
	}

	if (adapters.length === 3) {
		return generateArrangements(adapters);
	} else {
		const arrangements = getAllArrangements(adapters.slice(0, 3)).map((arr1) => {
			const nextArrs = getAllArrangements(arr1.slice(1).concat(adapters.slice(3)));
			return nextArrs.flatMap((arr2) => {
				return [arr1[0]].concat(arr2);
			});
		});
		return arrangements;
	}

	// Recursive case
	// if () {

	// }

	return [[0]];
};

const solvePart2 = async () => {
	const adapters = await parseInput("day10_test");
	const arrangements = getAllArrangements(adapters);
	console.log(arrangements);
	return arrangements.length;
};

// solvePart1().then((result) => console.log("Part 1 solution:", result));
solvePart2().then((result) => console.log("Part 2 solution:", result));

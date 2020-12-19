import { read } from "../../utils";

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

const memoize = (fn: Function): any => {
	const cache: any = {};
	return function (arr: any[]) {
		const key = arr[0];

		if (key in cache) {
			return cache[key];
		}

		const result = fn(arr);

		cache[key] = result;
		console.log(cache);
		return result;
	};
};

const getAllPaths = (adapters: number[]): {} => {
	const paths: any = {};
	for (let i = 0; i < adapters.length; i++) {
		let pathsFromI = [];
		for (let j = 3; j >= 1; j--) {
			// Push the serial sequence once
			if (adapters[i + j] - adapters[i] <= 3) {
				pathsFromI.push(j + i);
			}
		}
		// This gives us all travel paths between i and i + 3;
		paths[i] = pathsFromI.sort();
	}
	return paths;
};

const newArrayForEach = (arr: any[], newItems: any[]): any[][] => {
	return newItems.map(val => arr.concat(val))
}

const allPossibleArrays = (arraysToAddTo: any[][], newItems: any[]): any[][] => {
	return arraysToAddTo.map((item) => {
		return newArrayForEach(item, newItems)
	}).flat();
} 

let getMapsFromPaths = (adapters: number[], paths: any): number[][] => {
	let unfinishedMaps: number[][] = [[0]];
	let finishedMaps: number[][] = [];

	const lastIndex = Object.keys(paths).length - 1;
	console.log(paths);

	while (unfinishedMaps.length > 0) {
		for (let i = 0; i < unfinishedMaps.length; i++) {
			const m = unfinishedMaps[i];
			const nextDestKey: number = m[m.length - 1];

			if (nextDestKey === lastIndex) {
				unfinishedMaps.splice(i, 1);
				finishedMaps.push(m);
				break;
			}

			const nextDestVals: number[] = paths[nextDestKey];
			if (nextDestVals.length > 1) {
				let newPaths = newArrayForEach(m, nextDestVals);
				unfinishedMaps.splice(i, 1, ...newPaths);
				break;
			} else {
				unfinishedMaps[i] = m.concat(nextDestVals[0]);
			}
		}
	}
	return finishedMaps;
};

const solvePart2 = async () => {
	const adapters = await parseInput("day10_test");
	const paths = getAllPaths(adapters);
	const maps = getMapsFromPaths(adapters, paths);
	return maps.length;
};

// solvePart1().then((result) => console.log("Part 1 solution:", result));
solvePart2().then((result) => console.log("Part 2 solution:", result));

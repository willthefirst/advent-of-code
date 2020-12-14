import { read } from "../utils";

const parseInput = async (filename: string): Promise<{ earliestDepartTime: number; busIds: number[] }> => {
	const string = await read(filename);
	const [s1, s2] = string.split("\n");
	const earliestDepartTime: number = Number(s1);
	const busIds: number[] = s2
		.split(",")
		.filter((str) => str !== "x")
		.map((str) => Number(str));
	return { earliestDepartTime, busIds };
};

const getSoonestDepartTime = (earliestTime: number, busId: number): number => {
	return Math.floor(earliestTime / busId) * busId + busId;
};

// console.log(getSoonestDepartTime(6, 3));

const getWait = (t1: number, t2: number) => {
	if (t1 > t2) {
		console.log("t1 comes after t2 :/");
	}
	return t2 - t1;
};

const solvePart1 = async () => {
	const { earliestDepartTime, busIds } = await parseInput("day13");
	let minWait: number = Infinity;
	let bestBusId: number = 0;

	busIds.forEach((busId) => {
		const soonestDepartTime = getSoonestDepartTime(earliestDepartTime, busId);
		const wait = getWait(earliestDepartTime, soonestDepartTime);
		if (wait < minWait || !minWait) {
			minWait = wait;
			bestBusId = busId;
		}
	});

	return bestBusId * minWait;
};

type busId = string | number;

const earliestTimeForBusEveryMinute = (busIds: busId[], times: busId[]): number => {
	console.log(times);

	for (let i = 0; i < times.length - 1; i++) {
		let t1 = times[i];
		let t2 = times[i + 1];

        console.log(times);
        if (t2 === "x" && typeof t1 === 'number') {
            times[i + 1] = t1 + 1;
            continue;
        }

		// Success, we have sequential time.
		if (getWait(t1 as number, t2 as number) === 1) {
			continue;
		}


		if (t1 > t2) {
			times[i + 1] = getSoonestDepartTime(t1 as number, busIds[i + 1] as number);
			return earliestTimeForBusEveryMinute(busIds, times);
		} else {
            if (busIds[i] === "x") {
                
            }

			times[i] = (times[i] as number) + (busIds[i] as number); //todo this could be more efficient
			return earliestTimeForBusEveryMinute(busIds, times);
		}
	}

	console.log("Success!", times);
	return times[0] as number;
};

console.log(earliestTimeForBusEveryMinute([2, "x", "x", "x", 11], [2, "x", "x", "x", 11]));

const solvePart2 = async (): Promise<number> => {
	const { earliestDepartTime, busIds } = await parseInput("day13_test");
	console.log(earliestDepartTime, busIds);

	return 0;
};

/* Part 1 */
// solvePart1().then((result) => console.log("Part 1 solution: ", result));

// /* Part 2 */
solvePart2().then((result) => console.log("Part 2 solution is", result === 1068781));

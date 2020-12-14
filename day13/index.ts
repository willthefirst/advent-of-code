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

	for (let i = 0; i < times.length; i++) {
		let t = times[i];

        if (t === "x") {
            continue;
        }

        // Now we know that t is a number.
        t = t as number;
        times[i] = times[i] as number;
        busIds[i] = busIds[i] as number;
        times[0] = times[0] as number;
        busIds[0] = busIds[0] as number;  // This is an assumption since we never see x as the first value.

        const differenceFromFirst: number = (t - i) - times[0];

		// Continue if time is what it should be given its index.
		if (differenceFromFirst === 0) {
			continue;
        } else if (differenceFromFirst < 0) {
            times[i] = (times[i] as number) + (busIds[i] as number);
			return earliestTimeForBusEveryMinute(busIds, times);
        } else {
			times[0] = times[0] + busIds[0];
			return earliestTimeForBusEveryMinute(busIds, times);
        }5
	}

	console.log("Success!", times);
	return times[0] as number;
};

console.log(earliestTimeForBusEveryMinute([17,'x',13,19],[17,'x',13,19]));

const solvePart2 = async (): Promise<number> => {
	const { earliestDepartTime, busIds } = await parseInput("day13_test");
	console.log(earliestDepartTime, busIds);

	return 0;
};

/* Part 1 */
// solvePart1().then((result) => console.log("Part 1 solution: ", result));

// /* Part 2 */
solvePart2().then((result) => console.log("Part 2 solution is", result === 1068781));

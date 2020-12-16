import { read } from "../../utils";

type busId = string | number;

const parseInputForP1 = async (filename: string): Promise<{ earliestDepartTime: number; busIds: number[] }> => {
	const string = await read(filename);
	const [s1, s2] = string.split("\n");
	const earliestDepartTime: number = Number(s1);
	const busIds: number[] = s2
		.split(",")
		.filter((str) => str !== "x")
		.map((str) => Number(str));
	return { earliestDepartTime, busIds };
};

const parseInputForP2 = async (filename: string): Promise<{ earliestDepartTime: number; busIds: busId[] }> => {
	const string = await read(filename);
	const [s1, s2] = string.split("\n");
	const earliestDepartTime: number = Number(s1);
	const busIds: busId[] = s2
		.split(",")
		.map((str) => str === "x" ? str : Number(str));
	return { earliestDepartTime, busIds };
};

const getSoonestDepartTimeAfter = (earliestTime: number, busId: number): number => {
    if (earliestTime % busId === 0) {
        return earliestTime
    } else {
        return Math.floor(earliestTime / busId) * busId + busId;
    }
};

const getSoonestDepartTimeBefore = (earliestTime: number, busId: number): number => {
    const remainder = earliestTime % busId;
    if (remainder === 0) {
        return earliestTime
    } else {
        return Math.floor(earliestTime / busId) * busId
    }
};

const getWait = (t1: number, t2: number) => {
	if (t1 > t2) {
		console.log("t1 comes after t2 :/");
	}
	return t2 - t1;
};

const solvePart1 = async () => {
	const { earliestDepartTime, busIds } = await parseInputForP1("day13");
	let minWait: number = Infinity;
	let bestBusId: number = 0;

	busIds.forEach((busId) => {
		const soonestDepartTime = getSoonestDepartTimeAfter(earliestDepartTime, busId);
		const wait = getWait(earliestDepartTime, soonestDepartTime);
		if (wait < minWait || !minWait) {
			minWait = wait;
			bestBusId = busId;
		}
	});

	return bestBusId * minWait;
};

const lowestCommonMultiple = (a: number, b: number) => {
	return a * b;
}


const earliestTimeForBusEveryMinute = (busIds: busId[], times: busId[]): number => {
	console.log(times);
	const firstBusId = busIds[0] as number;
	const firstTime = times[0] as number;

	for (let i = 0; i < times.length; i++) {
		let t = times[i];

		if (typeof t === "string") {
			continue;
        }
        
		const differenceFromFirst: number = t - i - firstTime;

		// Continue if time is what it should be given its index.
		if (differenceFromFirst === 0) {
			continue;
		} else if (differenceFromFirst < 0) {
			times[0] = getSoonestDepartTimeBefore(t - i, firstBusId);
			return earliestTimeForBusEveryMinute(busIds, times);
		} else {
            times[i] = (firstTime - i) * (busIds[i] as number);
            times[0] = getSoonestDepartTimeBefore(times[i] as number - i, firstBusId)
			return earliestTimeForBusEveryMinute(busIds, times);
		}
	}

	return firstTime;
};

const solvePart2 = async (): Promise<number> => {
	const { busIds } = await parseInputForP2("day13_test");
	const  busIds2  = Object.assign({}, busIds);
    return earliestTimeForBusEveryMinute(busIds2, busIds);
};

/* Part 1 */
// solvePart1().then((result) => console.log("Part 1 solution: ", result));

/* Part 2 */
solvePart2().then((result) => console.log("Part 2 solution is", result === 1068781));

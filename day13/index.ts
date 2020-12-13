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

const getWaitForBus = (earliestTime: number, busId: number) => {
	const soonestDepartTime = Math.floor(earliestTime / busId) * busId + busId;
	return soonestDepartTime - earliestTime;
};

const solvePart1 = async () => {
	const { earliestDepartTime, busIds } = await parseInput("day13");
	let minWait: number = Infinity;
	let bestBusId: number = 0;

	busIds.forEach((busId) => {
		const wait = getWaitForBus(earliestDepartTime, busId);
		if (wait < minWait || !minWait) {
			minWait = wait;
			bestBusId = busId;
		}
	});

	return bestBusId * minWait;
};

/* Part 1 */
solvePart1().then((result) => console.log("Part 1 solution: ", result));

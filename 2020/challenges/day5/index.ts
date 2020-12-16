import { read } from "../../utils";

const parseInput = async (filename: string): Promise<string[]> => {
	const string = await read(filename);
	return string.split("\n");
};

const binToInt = (bin: string): number => {
	return parseInt(bin, 2);
};

const anyToBinary = (str: string, zero: string, one: string) => {
	return str.replace(new RegExp(zero, "g"), "0").replace(new RegExp(one, "g"), "1");
};

const calculateRow = (directions: string): number => {
	return binToInt(anyToBinary(directions.slice(0, 7), "F", "B"));
};

const calculateColumn = (directions: string): number => {
	return binToInt(anyToBinary(directions.slice(7), "L", "R"));
};

const calculateSeatId = (row: number, col: number) => {
	return row * 8 + col;
};

const directionsToSeatId = (directions: string): number => {
	return calculateSeatId(calculateRow(directions), calculateColumn(directions));
};

const solvePart1 = async () => {
	const seats = await parseInput("day5");
	const seatIds = seats.map(directionsToSeatId);
	return Math.max(...seatIds);
};

const solvePart2 = async () => {
	const seats = await parseInput("day5");
	const seatIds = seats.map(directionsToSeatId).sort((a, b) => a - b);
	for (let i = seatIds.length - 1; i >= 0; i--) {
		if (seatIds[i] - seatIds[i - 1] > 1) {
			return seatIds[i] - 1;
		}
	}
};

solvePart1().then((result) => console.log("Part 1 solution:", result));
solvePart2().then((result) => console.log("Part 2 solution:", result));

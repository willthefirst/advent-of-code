import { read } from "../utils";

const parseInput = (filename: string) => {
	return read(filename).then((string: string) => {
		return string;
	});
};

const solvePart1 = async () => {
	const puzzle = await parseInput("day5");
	return puzzle;
};

const solvePart2 = async () => {
	const puzzle = await parseInput("day5");
	return puzzle;
};

solvePart1().then((result) => console.log("Part 1 solution:", result));
// solvePart2().then((result) => console.log("Part 2 solution:", result));
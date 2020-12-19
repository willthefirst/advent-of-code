import { read } from "../../utils";

const parseInput = async (filename: string) => {
	const string = await read(filename);
	return string;
};

const solvePart1 = async () => {
	const puzzle = await parseInput("day11_test˝");
	return puzzle;
};

const solvePart2 = async () => {
	const puzzle = await parseInput("day11_test˝");
	return puzzle;
};

solvePart1().then((result) => console.log("Part 1 solution:", result));
// solvePart2().then((result) => console.log("Part 2 solution:", result));©
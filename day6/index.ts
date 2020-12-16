import { read } from "../utils";

const parseInput = async (filename: string) => {
	const string = await read(filename);
	return string.split("\n\n");
};

const countUniqueChars = (str: string): number => {
	return([...new Set(str)].length);
}

const solvePart1 = async () => {
	const groups = await parseInput("day6");
	return groups
			.map(group => {
				return countUniqueChars(
					group.replace(/\n/g, "")
				)
			}).reduce((acc, curr) => acc + curr);
};

const solvePart2 = async () => {
	const puzzle = await parseInput("day6");
	return puzzle;
};

solvePart1().then((result) => console.log("Part 1 solution:", result));
// solvePart2().then((result) => console.log("Part 2 solution:", result));

import { read } from "../utils";

const parseInput = async (filename: string) => {
	const string = await read(filename);
	return string.split("\n\n");
};

const countUniqueChars = (str: string): number => {
	return [...new Set(str)].length;
};

const countAgreements = (group: string[]): number => {
	const numMembers = group.length;
	const yesses = group.join("");
	const record = [...new Set(yesses)];
	return record
		.map((char): number => {
			const occurrences = yesses.match(new RegExp(char, "g"));
			if (occurrences && occurrences.length === numMembers) {
				return 1;
			}
			return 0;
		})
		.reduce((acc, curr) => acc + curr);
};

const solvePart1 = async () => {
	const groups = await parseInput("day6");
	return groups
		.map((group) => {
			return countUniqueChars(group.replace(/\n/g, ""));
		})
		.reduce((acc, curr) => acc + curr);
};

const solvePart2 = async () => {
	const groups = await parseInput("day6");
	return groups
		.map((group) => {
			return countAgreements(group.split("\n"));
		})
		.reduce((acc, curr) => acc + curr);
};

solvePart1().then((result) => console.log("Part 1 solution:", result));
solvePart2().then((result) => console.log("Part 2 solution:", result));
